import React, { Component } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import { Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
class Artwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      displayName: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8081/artwork")
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
            endDate: e.eEndDate,
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
      .delete(`http://localhost:8081/artwork/delete/${item.constituentId}`)
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
        <Card>
          <CardHeader>Artists</CardHeader>
          <CardBody>
            <Row>
              <Col auto></Col>
              <Col sm="3">
                <Link to={{ pathname: "/addArtist", state: { data: null } }}>
                  <Button>Add</Button>
                </Link>
              </Col>
            </Row>
            {this.state.data && (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Artwork</th>
                      <th>Gender</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((item, index) => (
                      <tr key={item.constituentId}>
                        <td>{index + 1}</td>
                        <td>{item.displayName}</td>
                        <td>{item.artistBio}</td>
                        <td>
                          <Button
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
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Artwork;
