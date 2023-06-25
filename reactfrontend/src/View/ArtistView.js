import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  CarouselItem,
  CarouselCaption,
  Carousel,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
import moment from "moment";
import axios from "axios";

const ArtistView = () => {
  const location = useLocation();
  const data = location.state.item;
  console.log("data", data);
  const [loadedArtworkData, setloadedArtworkData] = React.useState(false);
  const [artworkData, setArtworkData] = React.useState([]);

  //Carousel
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [loadingCarousel, setLoadingCarousel] = React.useState(false);
  const handleNextCarousel = () => {
    if (loadingCarousel) return;
    const nextIndex =
      activeIndex === artworkData.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const handlePreviousCarousel = () => {
    if (loadingCarousel) return;
    const nextIndex =
      activeIndex === 0 ? artworkData.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (loadedArtworkData) return;
    setActiveIndex(newIndex);
  };

  const carouselItemStyle = {
    height: "300px", // Set the desired height for the carousel images
  };

  const imageStyle = {
    height: "auto",
    width: "100%",
  };
  const slides = artworkData.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setLoadingCarousel(true)}
        onExited={() => {
          setLoadingCarousel(false);
        }}
        key={item.ArtworkId}
      >
        <img
          src={item.ThumbnailUrl}
          style={{ ...carouselItemStyle, ...imageStyle }}
        />
        <CarouselCaption
          captionText={moment(item.Date).format("MMM YYYY")}
          captionHeader={item.Title}
        />
      </CarouselItem>
    );
  });

  useEffect(() => {
    const ComponentDidMount = async () => {
      try {
        axios
          .get(
            `http://localhost:8081/artistSpecificArtwork/${data.constituentId}`
          )
          .then((res) => {
            setArtworkData(res.data);
            setloadedArtworkData(true);
            console.log("artworkdata from server", artworkData);
          });
      } catch (err) {
        console.error("Error Fetching Artwork:", err);
      }
    };

    ComponentDidMount();
  }, []);

  return (
    <>
      {loadedArtworkData && (
        <Container className="mt-5 p-3">
          <Card className="custom-card">
            <Row className="p-4">
              <Col>
                <Card className="p-2">
                  <CardHeader>
                    <h3 className="p-3">{data.displayName}</h3>
                  </CardHeader>
                  <CardBody>
                    <Row
                      className="
                  pt-3"
                    >
                      <Col md="5">Bio</Col>
                      <Col auto>{data.artistBio ? data.artistBio : "-"}</Col>
                    </Row>
                    <Row
                      className="
                  pt-3"
                    >
                      <Col md="5">Gender</Col>
                      <Col auto>
                        {data.gender ? (
                          <Badge color="info" target="_blank" pill>
                            Male
                          </Badge>
                        ) : (
                          <>
                            <Badge color="danger" target="_blank" pill>
                              Female
                            </Badge>
                          </>
                        )}
                      </Col>
                    </Row>
                    <Row
                      className="
                  pt-3"
                    >
                      <Col md="5">Nationality</Col>
                      <Col auto>
                        {data.nationality ? data.nationality : "Unassigned"}
                      </Col>
                    </Row>
                    <Row
                      className="
                  pt-3"
                    >
                      <Col md="5">Duration</Col>
                      <Col auto>
                        {moment(data.beginDate).format("MMM YYYY")} -{" "}
                        {moment(data.endDate).format("MMM YYYY")}
                      </Col>
                    </Row>

                    <Row
                      className="
                  pt-3"
                    >
                      <Col md="5">Wiki QID</Col>
                      <Col auto>{data.wikiQid ? data.wikiQid : "-"}</Col>
                    </Row>
                    <Row
                      className="
                  pt-3"
                    >
                      <Col md="5">ULAN</Col>
                      <Col auto>{data.ulan ? data.ulan : "-"}</Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <Card className="p-2">
                  <CardHeader>
                    <h5 className="p-3">Artworks by {data.displayName}</h5>
                  </CardHeader>
                  {console.log("artworkDtaa", artworkData)}

                  <Carousel
                    activeIndex={activeIndex}
                    next={handleNextCarousel}
                    previous={handlePreviousCarousel}
                    key={artworkData.ArtworkId}
                  >
                    <CarouselIndicators
                      items={artworkData}
                      activeIndex={activeIndex}
                      onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={handlePreviousCarousel}
                    />
                    <CarouselControl
                      direction="next"
                      directionText="Next"
                      onClickHandler={handleNextCarousel}
                    />
                  </Carousel>
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ArtistView;
