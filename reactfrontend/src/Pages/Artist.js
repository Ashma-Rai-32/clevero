import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Table,
} from "reactstrap";
import { Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      displayName: "",
    };
  }

  componentDidMount() {
    axios
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

  handleDelete = (item, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8081/artist/${item.constituentId}`)
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
                  <h1 className="p-3">ARTISTS</h1>
                </Col>
                <Col className="p-3">
                  <Link to={{ pathname: "/artistForm", state: { data: null } }}>
                    <Button color="primary">Add Artists</Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="p-3">
                {this.state.data && (
                  <>
                    <Table>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Artist</th>
                          <th>Bio</th>
                          <th>Nationality</th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.data.map((item, index) => (
                          <tr key={item.constituentId}>
                            <td>{index + 1}</td>
                            <td>{item.displayName}</td>
                            <td>{item.artistBio}</td>
                            <td>{item.nationality}</td>

                            <td>
                              <Button
                                color="primary"
                                onClick={(e) => {
                                  this.handleDelete(item, e);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Row>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Artist;
