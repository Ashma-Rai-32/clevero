import React, { Component } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Row } from "reactstrap";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import moment from "moment";
import { MoonLoader } from "react-spinners";

const ManageTable = (props) => {
  const data = props.state;
  console.log("state.data inside maanga", data);
  const navigate = useNavigate();
  const pageSize = 10;
  const [prevPageIndex, setPrevPageIndex] = React.useState(0);

  const handlePrevPage = (event) => {
    if (prevPageIndex > 0) setPrevPageIndex(prevPageIndex - 1);
    else setPrevPageIndex(0);
  };

  const handleNextPage = (event) => {
    console.log("data.length", data.length);
    if (prevPageIndex < Math.ceil(data.length / pageSize) - 1)
      setPrevPageIndex(prevPageIndex + 1);
  };

  const handleView = (item) => {
    // e.preventDefault();
    // const navigate = useNavigate();
    navigate("/artworkView", { state: { item: item } });
    console.log("handleView", item);
    // const state = { item };
    // history.push({
    //   pathname: "/artworkView",
    //   state: state,
    // });
    // return <Navigate to="/artworkView" state={item} props={item} />;
  };
  const handleEdit = (item) => {
    navigate("/artworkForm", { state: item });
    console.log("handleEdit", item);
  };

  const handleDelete = (item, e) => {
    // e.preventDefault();
    console.log("item", item);
    axios
      .delete(`http://localhost:8081/artwork/${item.artworkId}`)
      .then((res) => {
        console.log("Deleted", res);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error Deleting data", error);
      });
  };

  return (
    <>
      <Row className="p-3" style={{ overflowX: "auto", marginBottom: "10px" }}>
        <div
          style={{
            width: "max-content",
            overflowX: "auto",
            marginBottom: "-16px",
          }}
        >
          {data && (
            <>
              <Table responsive="true">
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th style={{ width: "20%" }}>Title</th>

                    <th>Artist</th>
                    <th className="hidden">URL</th>
                    <th style={{ width: "10%" }}>Thumbnail</th>
                    <th className="hidden">Nationality</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .slice(
                      prevPageIndex * pageSize,
                      prevPageIndex * pageSize + pageSize
                    )
                    .map((item, index) => (
                      // const id = item.artworkId;

                      <>
                        <tr key={item.artworkId}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.title}</td>
                          <td>
                            <Link
                              to={{
                                pathname: "/artist",
                                state: { id: item.ConstituentIds },
                              }}
                            >
                              {item.artistNames}
                            </Link>
                          </td>
                          <td className="hidden">
                            <Badge
                              color="info"
                              href={item.url}
                              target="_blank"
                              pill
                            >
                              Link
                            </Badge>
                          </td>
                          <td>
                            <img
                              src={item.thumbnailUrl}
                              // alt={item.thumbnailUrl}
                              width="100%"
                              height="auto"
                            />
                          </td>
                          <td className="hidden">{item.nationalities}</td>
                          <td>{moment(item.date).format("MMM YYYY")}</td>
                          <td>
                            <Row>
                              <Col className="p-1 px-2 ">
                                <Button
                                  color="primary"
                                  style={{ width: "100%" }}
                                  onClick={() => {
                                    handleView(item);
                                  }}
                                >
                                  View
                                </Button>
                              </Col>
                              <Col className="p-1 px-2">
                                <Button
                                  color="warning"
                                  style={{ width: "100%" }}
                                  onClick={() => {
                                    handleEdit(item);
                                  }}
                                >
                                  Edit
                                </Button>
                              </Col>
                              <Col className="p-1 px-2">
                                <Button
                                  color="danger"
                                  style={{ width: "100%" }}
                                  onClick={(e) => {
                                    handleDelete(item, e);
                                  }}
                                >
                                  Delete
                                </Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Row>
      <Row className="p-2">
        <div className="d-flex justify-content-end primary">
          <Pagination>
            <PaginationItem>
              <PaginationLink onClick={handlePrevPage}>
                <i class="fas fa-solid fa-angle-left"></i>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={handleNextPage}>
                <i class="fas fa-solid fa-angle-right"></i>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </Row>
    </>
  );
};

class Artwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      displayName: "",
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:8081/artwork")
      .then((res) => {
        this.setState({ data: res.data });

        res.data = res.data.map((e) => {
          return {
            artworkId: e.ArtworkId,
            title: e.Title,
            constituentIds: e.ConstituentIds,
            artistNames: e.artistNames,
            nationalities: e.nationalities,
            date: e.Date,
            medium: e.Medium,
            dimensions: e.Dimensions,
            creditLine: e.CreditLine,
            accessionNumber: e.AccessionNumber,
            classification: e.Classification,
            department: e.Department,
            dateAcquired: e.DateAcquired,
            seatHeight: e.SeatHeight,
            catalogued: e.Catalogued,
            objectId: e.ObjectId,
            url: e.Url,
            thumbnailUrl: e.ThumbnailUrl,
            circumference: e.Circumference,
            depth: e.Depth,
            diameter: e.Diameter,
            height: e.Height,
            length: e.Length,
            weight: e.Weight,
            width: e.Width,
            duration: e.Duration,
            // artistArtworkId: e.ArtistArtworkId,
            // displayName: e.DisplayName,
            // artistBio: e.ArtistBio,
            // nationality: e.Nationality,
            // gender: e.Gender,
            // beginDate: e.BeginDate,
            // endDate: e.EndDate,
            // wikiQid: e.WikiQid,
            // ulan: e.Ulan,
          };
        });
        this.setState({ data: res.data });
        console.log("this.state.data", this.state.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  render() {
    // const { data } = this.state;
    return (
      <>
        <Container className="mt-5 p-3">
          <Card>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h1 className="p-3">ARTWORKS</h1>
                </Col>
                <Col className="p-3 d-flex align-items-center justify-content-center">
                  <Link
                    to={{ pathname: "/artworkForm", state: { data: null } }}
                  >
                    <Button color="primary">Add Artworks</Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {this.state.data ? (
                <ManageTable state={this.state.data} />
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <MoonLoader color="#767676" size={30} />
                </div>
              )}
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Artwork;
