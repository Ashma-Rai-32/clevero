// import React, { Component } from "react";
// import { useLocation } from "react-router-dom";

// export class ArtworkView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //   location: this.props.location.state,
//     };
//     // const { data } = this.props.state;
//   }
//   render() {
//     const location = useLocation();

//     {
//       //   console.log("this.state.data.item", this.state.location);
//       console.log("this.state.data.item", location.state);
//     }
//     return <div>ArtworkView</div>;
//   }
// }

// export default ArtworkView;

import React from "react";
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
} from "reactstrap";
import moment from "moment";
// import "../custom.css";

const ArtworkView = () => {
  //   const { id } = useParams();
  const location = useLocation();
  const data = location.state.item;
  console.log("data", data);

  return (
    <>
      <Container className="mt-5 p-3">
        <Card className="custom-card">
          <Row className="p-4">
            <Col md="6">
              <Card className="p-2">
                <img
                  src={data.thumbnailUrl}
                  href={data.url}
                  width="100%"
                  height="auto"
                />
              </Card>
            </Col>
            <Col>
              <Card className="p-2">
                <CardHeader>
                  <a href={data.url} target="_blank">
                    <h3 className="p-3">{data.title}</h3>
                  </a>
                </CardHeader>
                <CardBody>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Artist</Col>
                    <Col auto>
                      {data.artistNames ? data.artistNames : "Unassigned"}
                    </Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Date</Col>
                    <Col auto>{moment(data.date).format("MMM YYYY")}</Col>
                  </Row>

                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Medium</Col>
                    <Col auto>{data.medium ? data.medium : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Dimensions</Col>
                    <Col auto>{data.dimensions ? data.dimensions : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">CreditLine</Col>
                    <Col auto>{data.creditLine ? data.creditLine : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Accession Number</Col>
                    <Col auto>
                      {data.accessionNumber ? data.accessionNumber : "-"}
                    </Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Classification</Col>
                    <Col auto>
                      {data.classification ? data.classification : "-"}
                    </Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Department</Col>
                    <Col auto>{data.department ? data.department : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Date Acquired</Col>
                    <Col auto>
                      {data.dateAcquired ? data.dateAcquired : "-"}
                    </Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Catalogued</Col>
                    <Col auto>
                      {data.catalogued ? (
                        data.catalogued == true ? (
                          <>
                            <Badge color="danger" pill>
                              Yes
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Badge pill>No</Badge>
                          </>
                        )
                      ) : (
                        "-"
                      )}
                    </Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Circumference</Col>
                    <Col auto>
                      {data.circumference ? data.circumference : "-"}
                    </Col>
                  </Row>

                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Depth</Col>
                    <Col auto>{data.depth ? data.depth : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Diameter</Col>
                    <Col auto>{data.diameter ? data.diameter : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Height</Col>
                    <Col auto>{data.height ? data.height : "-"}</Col>
                  </Row>
                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Length</Col>
                    <Col auto>{data.length ? data.length : "-"}</Col>
                  </Row>

                  <Row
                    className="
                  pt-3"
                  >
                    <Col md="5">Weight</Col>
                    <Col auto>{data.weight ? data.weight : "-"}</Col>
                  </Row>

                  <Row
                    className="
                  pt-3"
                  >
                    {/* <Col md="5"></Col>
                    <Col auto>{data.}</Col> */}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default ArtworkView;
