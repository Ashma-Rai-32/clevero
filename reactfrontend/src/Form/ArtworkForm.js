import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  FormHeader,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import axios from "axios";
import Datetime from "react-datetime";
import moment from "moment";
class ArtworkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //init state
      // data:this.props.location.state.data==null?[]:this.props.location.state.data,
      title: "",
      constituentId: "",
      url: "",
      thumbnailUrl: "",
      date: null,

      checkTitle: "invalid",
      checkConstituentId: "invalid",
      checkUrl: "invalid",
      checkThumbnailUrl: "invalid",
      checkDate: "invalid",
      // displayNameValidationError: "Please provide Full Name",

      //for dropdown
      artistName: "Select",
      toggleOpenArtist: false,
      // this.props.location.state.gender == null
      //   ? "Select Gender"
      //   : this.props.location.state.gender === true
      //   ? "Male"
      //   : "Female",
      artistDropDownData: [],

      //placeholder for dates
      datePlaceholder: "Select Date",
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:8081/artistDropDownData")
      .then((res) => {
        this.setState({ artistDropDownData: res.data });
      })
      .catch((err) => {
        console.log("SERVER ERROR");
      });
  }

  handleTextValidation = () => {
    const fullNameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    if (!fullNameRegExp.test(this.state.displayName)) {
      //invalid
      return false;
    } else return true;
  };

  render() {
    console.log("this.state.title:", this.state.title);
    console.log(
      "this.state.selectedConstituentId:",
      this.state.selectedConstituentId
    );
    console.log("this.state.url:", this.state.url);
    console.log("this.state.thumbnailUrl:", this.state.thumbnailUrl);
    console.log("this.state.date:", this.state.date);

    return (
      <div>
        <Container className="mt-5 p-3">
          <Card>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h1 className="p-3">Add Artwork</h1>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="pt-2">
                <Col lg="12">
                  {/* title */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Artwork Title
                    </label>

                    <Input
                      id="title"
                      placeholder="e.g. The Manhattan Transcripts Project"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={this.state.title}
                      onChange={(e) => {
                        this.setState({ title: e.target.value });
                        //   if(e.target.value!==this.state.location.title)
                        // }}
                        // if (e.target.value === "" || !this.handleTextValidation()) {
                        if (e.target.value === "") {
                          this.setState({ checkTitle: "invalid" });
                        } else {
                          this.setState({ checkTitle: "valid" });
                        }
                      }}
                    />
                    {this.state.checkTitle === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {this.state.titleValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="pt-2">
                <Col lg="12">
                  {/* artist dropdown */}
                  <label className="form-control-label" htmlFor="artist">
                    Artist <span className="text-danger">*</span>
                  </label>
                  <Dropdown
                    isOpen={this.state.toggleOpenArtist}
                    toggle={() => {
                      this.setState({
                        toggleOpenArtist: !this.state.toggleOpenArtist,
                      });
                    }}
                    className="w-100"
                    style={{ color: "blue" }}
                  >
                    <DropdownToggle
                      caret
                      className="w-100 text-left"
                      color="primary"
                    >
                      {this.state.artistName}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                      {this.state.artistDropDownData.map((i, key) => (
                        <DropdownItem
                          key={i.ConstituentId}
                          onClick={() => {
                            this.setState({
                              artistName: i.DisplayName,
                              selectedConstituentId: i.ConstituentId,
                            });
                            // setartistName(i.artistName);
                            // setSelectedartistId(i.artistId);
                            // setSelectedartistIdState("valid");
                          }}
                        >
                          {i.DisplayName}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col lg="12">
                  {/* url */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="url">
                      Link
                    </label>

                    <Input
                      id="url"
                      placeholder="e.g. http://example.com"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={this.state.url}
                      onChange={(e) => {
                        this.setState({ url: e.target.value });
                        //   if(e.target.value!==this.state.location.url)
                        // }}
                        // if (e.target.value === "" || !this.handleTextValidation()) {
                        if (e.target.value === "") {
                          this.setState({ checkUrl: "invalid" });
                        } else {
                          this.setState({ checkUrl: "valid" });
                        }
                      }}
                    />
                    {this.state.checkUrl === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {this.state.urlValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col lg="12">
                  {/* thumbnailUrl */}
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="thumbnailUrl"
                    >
                      Artwork thumbnailUrl
                    </label>

                    <Input
                      id="thumbnailUrl"
                      placeholder="e.g. http://example.com/example.jpeg"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={this.state.thumbnailUrl}
                      onChange={(e) => {
                        this.setState({ thumbnailUrl: e.target.value });
                        //   if(e.target.value!==this.state.location.thumbnailUrl)
                        // }}
                        // if (e.target.value === "" || !this.handleTextValidation()) {
                        if (e.target.value === "") {
                          this.setState({ checkThumbnailUrl: "invalid" });
                        } else {
                          this.setState({ checkThumbnailUrl: "valid" });
                        }
                      }}
                    />
                    {this.state.checkThumbnailUrl === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {this.state.thumbnailUrlValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                {/* date */}
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="date">
                      Date
                    </label>
                    <InputGroup className="input-group-alternative">
                      {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon> */}
                      {/* //datetime */}
                      <Datetime
                        inputProps={{
                          placeholder: this.state.datePlaceholder,
                        }}
                        closeOnSelect={true}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        utc={true}
                        value={this.state.date}
                        isInvalid={this.state.checkDate === "invalid"}
                        onChange={(e) => {
                          this.setState({ date: moment(e).format() });
                          if (moment(e).format() === null) {
                            this.setState({ checkDate: "invalid" });
                          } else this.setState({ checkDate: "valid" });
                        }}
                      />
                    </InputGroup>
                    <div className="invalid-feedback">
                      Please provide valid begin date
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col>
                  <Button
                    onClick={() => {
                      // if (
                      //   this.state.checkArtistBio === "valid" &&
                      //   this.state.checkDate === "valid" &&
                      //   this.state.checkDisplayName === "valid" &&
                      //   this.state.checkEndDate === "valid" &&
                      //   this.state.checkGender === "valid" &&
                      //   this.state.checkNationality === "valid" &&
                      //   this.state.checkUlan === "valid" &&
                      //   this.state.checkWikiQid === "valid"
                      // )
                      {
                        axios
                          .post("http://localhost:8081/artwork", {
                            title: this.state.title,
                            constituentId: this.state.selectedConstituentId,
                            url: this.state.url,
                            thumbnailUrl: this.state.thumbnailUrl,
                            date: this.state.date,
                          })
                          .then((res) => {
                            if (res.status >= 200 && res.status < 300) {
                              console.log("SUccess");
                            } else {
                              console.log("Error creating artist");
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ArtworkForm;
