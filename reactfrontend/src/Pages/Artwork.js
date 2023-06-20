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
} from "reactstrap";
import { Row } from "reactstrap";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import moment from "moment";

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
      .get("http://localhost:8081/artistxartwork")
      .then((res) => {
        this.setState({ data: res.data });

        res.data = res.data.map((e) => {
          return {
            title: e.Title,
            constituentId: e.ConstituentId,
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
            artistArtworkId: e.ArtistArtworkId,
            displayName: e.DisplayName,
            artistBio: e.ArtistBio,
            nationality: e.Nationality,
            gender: e.Gender,
            beginDate: e.BeginDate,
            endDate: e.EndDate,
            wikiQid: e.WikiQid,
            ulan: e.Ulan,
          };
        });
        this.setState({ data: res.data });
        console.log("this.state.data", this.state.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    // axios
    // .get("http://localhost:8081/artistxartwork/",this.state.)
    // .then((res) => {

    //   // res.data = res.data.map((e) => {
    //   //   return {
    //   //     displayName: e.displayName,

    //   //   };
    //   // });
    //   this.setState({ artistData: res.data });
    //   console.log("this.state.data", this.state.data);
    // })
    // .catch((error) => {
    //   console.error("Error fetching data", error);
    // });
  }

  handleView = (item) => {
    // e.preventDefault();
    // const navigate = useNavigate();
    // navigate("/artworkView", { state: { myData: "Hello!" } });
    console.log("handleView", item);
    const state = { item };
    this.props.history.push({
      pathname: "/artworkView",
      state: state,
    });
    // return <Navigate to="/artworkView" state={item} props={item} />;
  };

  handleDelete = (item, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8081/artwork/${item.artworkId}`)
      .then((res) => {
        console.log("Deleted", res);
      })
      .catch((error) => {
        console.error("Error Deleting data", error);
      });
  };

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
                <Col className="p-3">
                  <Link
                    to={{ pathname: "/artworkForm", state: { data: null } }}
                  >
                    <Button color="primary">Add Artworks</Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row
                className="p-3"
                style={{ overflowX: "auto", marginBottom: "10px" }}
              >
                <div
                  style={{
                    width: "max-content",
                    overflowX: "auto",
                    marginBottom: "-16px",
                  }}
                >
                  {this.state.data && (
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
                          {this.state.data.map((item, index) => (
                            // const id = item.artworkId;

                            <>
                              <tr key={item.artworkId}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.displayName}</td>
                                <td className="hidden">
                                  <Badge color="info" href={item.url} pill>
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
                                <td className="hidden">{item.nationality}</td>
                                <td>{moment(item.date).format("MMM YYYY")}</td>
                                <td>
                                  <Row>
                                    <Col className="p-1 px-2 ">
                                      <Button
                                        color="primary"
                                        style={{ width: "100%" }}
                                        onClick={() => {
                                          this.handleView(item);
                                        }}
                                      >
                                        View
                                      </Button>
                                    </Col>
                                    <Col className="p-1 px-2">
                                      <Button
                                        color="warning"
                                        style={{ width: "100%" }}
                                        onClick={(e) => {
                                          this.handleDelete(item, e);
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
                                          this.handleDelete(item, e);
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
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Artwork;
