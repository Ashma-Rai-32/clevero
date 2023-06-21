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

const ManageTable = (props) => {
  const data = props.state;
  const navigate = useNavigate();

  const handleView = (item) => {
    navigate("/artistView", { state: { item: item } });
    console.log("handleView", item);
  };

  const handleEdit = (item) => {
    navigate("/artistForm", { state: item });
    console.log("handleEdit", item);
  };

  const handleDelete = (item, e) => {
    // e.preventDefault();
    console.log("item", item);
    axios
      .delete(`http://localhost:8081/artist/${item.artistId}`)
      .then((res) => {
        console.log("Deleted", res);
      })
      .catch((error) => {
        console.error("Error Deleting data", error);
      });
  };

  return (
    <Row className="p-3">
      <div>
        {data && (
          <>
            <Table responsive="true">
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Artist</th>
                  <th>Bio</th>
                  <th>Gender</th>
                  <th>Nationality</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  // const id = item.artistId;

                  <>
                    <tr key={item.ConstituentId}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ width: "20%" }}>{item.displayName}</td>
                      <td>{item.artistBio}</td>

                      <td className="hidden">
                        {item.gender ? (
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
                      </td>

                      <td className="hidden">{item.nationality}</td>
                      <td>
                        <Row>
                          {/* <Col className="p-1 px-2 ">
                            <Button
                              color="primary"
                              style={{ width: "100%" }}
                              onClick={() => {
                                handleView(item);
                              }}
                            >
                              View
                            </Button>
                          </Col> */}
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
  );
};

class artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:8081/artist")
      .then((res) => {
        this.setState({ data: res.data });

        res.data = res.data.map((e) => {
          return {
            constituentId: e.ConstituentId,
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
                  <h1 className="p-3">Artists</h1>
                </Col>
                <Col className="p-3 d-flex align-items-center justify-content-center">
                  <Link to={{ pathname: "/artistForm", state: { data: null } }}>
                    <Button color="primary">Add Artists</Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {this.state.data && <ManageTable state={this.state.data} />}
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default artist;
