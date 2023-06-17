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
class ArtistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //init state
      // data:this.props.location.state.data==null?[]:this.props.location.state.data,
      displayName: "",
      artistBio: "",
      nationality: "",
      gender: "",
      beginDate: "",
      endDate: "",
      wikiQid: "",
      ulan: "",
      checkDisplayName: "invalid",
      checkArtistBio: "invalid",
      checkNationality: "invalid",
      checkGender: "invalid",
      checkBeginDate: "invalid",
      checkEndDate: "invalid",
      checkWikiQid: "invalid",
      checkUlan: "invalid",

      // this.props.location.state.displayName == null ? "invalid" : "valid",

      displayNameValidationError: "Please provide Full Name",
      artistBioValidationError: "Please provide Full Name",
      nationalityValidationError: "Please provide Full Name",
      genderValidationError: "Please provide Full Name",
      beginDateValidationError: "Please provide Full Name",
      endDateValidationError: "Please provide Full Name",
      wikiQidValidationError: "Please provide Full Name",
      ulanValidationError: "Please provide Full Name",

      //for dropdown
      genderName: "Select",
      // this.props.location.state.gender == null
      //   ? "Select Gender"
      //   : this.props.location.state.gender === true
      //   ? "Male"
      //   : "Female",
      genderData: [
        { genderId: true, genderName: "Male" },
        { genderId: false, genderName: "Female" },
      ],

      //placeholder for dates
      beginDatePlaceholder: "Select Date",
    };
  }

  handleTextValidation = () => {
    const fullNameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
    if (!fullNameRegExp.test(this.state.displayName)) {
      //invalid
      return false;
    } else return true;
  };

  render() {
    console.log("this.props.location.state:", this.state);

    return (
      <div>
        <Card className="m-3">
          {/* <Container className="mt-2" fluid> */}
          <CardHeader>
            {/* <FormHeader id={this.state.location.id}></FormHeader> */}
            Create Artist
          </CardHeader>
          <CardBody>
            <Row className="pt-2">
              <Col lg="12"></Col>
              <FormGroup>
                <label className="form-control-label" htmlFor="displayName">
                  Artist Name
                </label>
              </FormGroup>
              <Input
                id="displayName"
                placeholder="e.g. Madonna"
                type="text"
                required
                maxLength={60}
                defaultValue={this.state.displayName}
                onChange={(e) => {
                  //   this.setState({displayName:e.target.value});
                  //   if(e.target.value!==this.state.location.displayName)
                  // }}
                  if (e.target.value === "" || !this.handleTextValidation()) {
                    this.setState({ checkDisplayName: "invalid" });
                  } else {
                    this.setState({ checkDisplayName: "valid" });
                  }
                }}
              />
              {this.state.checkDisplayName === "invalid" && (
                <div className="invalid-feedback d-block">
                  {this.state.displayNameValidationError}
                </div>
              )}
            </Row>
            <Row className="pt-2">
              <Col lg="12"></Col>
              <FormGroup>
                <label className="form-control-label" htmlFor="artistBio">
                  Bio
                </label>
              </FormGroup>
              <Input
                id="artistBio"
                placeholder="e.g."
                type="textarea"
                required
                maxLength={60}
                defaultValue={this.state.artistBio}
                onChange={(e) => {
                  //   this.setState({artistBio:e.target.value});
                  //   if(e.target.value!==this.state.location.artistBio)
                  // }}
                  if (e.target.value === "" || !this.handleTextValidation()) {
                    this.setState({ checkArtistBio: "invalid" });
                  } else {
                    this.setState({ checkArtistBio: "valid" });
                  }
                }}
              />
              {this.state.checkArtistBio === "invalid" && (
                <div className="invalid-feedback d-block">
                  {this.state.artistBioValidationError}
                </div>
              )}
            </Row>

            {/* nationality */}
            <Row className="pt-2">
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="nationality">
                    Nationality
                  </label>
                </FormGroup>
                <Input
                  id="nationality"
                  placeholder="e.g. USA"
                  type="text"
                  required
                  maxLength={60}
                  defaultValue={this.state.nationality}
                  onChange={(e) => {
                    //   this.setState({nationality:e.target.value});
                    //   if(e.target.value!==this.state.location.nationality)
                    // }}
                    if (e.target.value === "" || !this.handleTextValidation()) {
                      this.setState({ checkNationality: "invalid" });
                    } else {
                      this.setState({ checkNationality: "valid" });
                    }
                  }}
                />
                {this.state.checkNationality === "invalid" && (
                  <div className="invalid-feedback d-block">
                    {this.state.nationalityValidationError}
                  </div>
                )}
              </Col>

              {/* gender */}
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="gender">
                    Gender
                  </label>
                </FormGroup>
                <Dropdown
                  isOpen={this.state.toggleOpenGender}
                  toggle={() => {
                    this.setState({
                      toggleOpenGender: !this.state.toggleOpenGender,
                    });
                  }}
                  className="w-100"
                >
                  <DropdownToggle caret className="w-100">
                    {this.state.genderName}
                  </DropdownToggle>
                  <DropdownMenu className="w-100">
                    {this.state.genderData.map((i, identity) => (
                      <DropdownItem
                        valid={this.state.checkGender === "valid"}
                        invalid={this.state.checkGender === "invalid"}
                        key={identity}
                        onClick={() => {
                          this.setState({
                            genderName: i.genderName,
                            gender: i.genderId,
                          });
                          if (i.genderId === null) {
                            this.setState({ checkGender: "invalid" });
                          } else {
                            this.setState({ checkGender: "valid" });
                          }
                        }}
                      >
                        {i.genderName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="pt-2">
              {/* BeginDate */}
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="beginDate">
                    Begin Date
                  </label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      {/* <InputGroupText></InputGroupText> */}
                    </InputGroupAddon>
                    {/* //datetime */}
                    <Datetime
                      inputProps={{
                        placeholder: this.state.beginDatePlaceholder,
                      }}
                      closeOnSelect={true}
                      dateFormat="YYYY-MM-DD"
                      timeFormat={false}
                      utc={true}
                      value={this.state.beginDate}
                      isInvalid={this.state.checkBeginDate === "invalid"}
                      onChange={(e) => {
                        this.setState({ beginDate: moment(e).format() });
                        if (moment(e).format() === null) {
                          this.setState({ checkBeginDate: "invalid" });
                        } else this.setState({ checkBeginDate: "valid" });
                      }}
                    />
                  </InputGroup>
                  <div className="invalid-feedback">
                    Please provide valid begin date
                  </div>
                </FormGroup>
              </Col>

              {/* EndDate */}
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="endDate">
                    End Date
                  </label>
                </FormGroup>
                <Input
                  id="endDate"
                  placeholder="e.g. USA"
                  type="text"
                  required
                  maxLength={60}
                  defaultValue={this.state.endDate}
                  onChange={(e) => {
                    //   this.setState({endDate:e.target.value});
                    //   if(e.target.value!==this.state.location.endDate)
                    // }}
                    if (e.target.value === "" || !this.handleTextValidation()) {
                      this.setState({ checkEndDate: "invalid" });
                    } else {
                      this.setState({ checkEndDate: "valid" });
                    }
                  }}
                />
                {this.state.checkEndDate === "invalid" && (
                  <div className="invalid-feedback d-block">
                    {this.state.endDateValidationError}
                  </div>
                )}
              </Col>
            </Row>

            <Row className="pt-2">
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="wikiQid">
                    Wiki Qid
                  </label>
                </FormGroup>
                <Input
                  id="wikiQid"
                  placeholder="123424"
                  type="text"
                  required
                  maxLength={60}
                  defaultValue={this.state.wikiQid}
                  onChange={(e) => {
                    //   this.setState({wikiQid:e.target.value});
                    //   if(e.target.value!==this.state.location.wikiQid)
                    // }}
                    if (e.target.value === "" || !this.handleTextValidation()) {
                      this.setState({ checkWikiQid: "invalid" });
                    } else {
                      this.setState({ checkWikiQid: "valid" });
                    }
                  }}
                />
                {this.state.checkWikiQid === "invalid" && (
                  <div className="invalid-feedback d-block">
                    {this.state.wikiQidValidationError}
                  </div>
                )}
              </Col>

              {/* ULAN */}
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="ulan">
                    ULAN
                  </label>
                </FormGroup>
                <Input
                  id="ulan"
                  placeholder="E1223249"
                  type="text"
                  required
                  maxLength={60}
                  defaultValue={this.state.ulan}
                  onChange={(e) => {
                    //   this.setState({ulan:e.target.value});
                    //   if(e.target.value!==this.state.location.ulan)
                    // }}
                    if (e.target.value === "" || !this.handleTextValidation()) {
                      this.setState({ checkUlan: "invalid" });
                    } else {
                      this.setState({ checkUlan: "valid" });
                    }
                  }}
                />
                {this.state.checkUlan === "invalid" && (
                  <div className="invalid-feedback d-block">
                    {this.state.ulanValidationError}
                  </div>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  onClick={() => {
                    // if (
                    //   this.state.checkArtistBio === "valid" &&
                    //   this.state.checkBeginDate === "valid" &&
                    //   this.state.checkDisplayName === "valid" &&
                    //   this.state.checkEndDate === "valid" &&
                    //   this.state.checkGender === "valid" &&
                    //   this.state.checkNationality === "valid" &&
                    //   this.state.checkUlan === "valid" &&
                    //   this.state.checkWikiQid === "valid"
                    // )
                    {
                      axios
                        .post("https://localhost:8081/artist", {
                          displayName: this.state.displayName,
                          artistBio: this.state.artistBio,
                          nationality: this.state.nationality,
                          displayName: this.state.displayName,
                          gender: this.state.gender,
                          beginDate: this.state.beginDate,
                          endDate: this.state.endDate,
                          wikiQid: this.state.wikiQid,
                          ulan: this.state.ulan,
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
          {/* </Container> */}
        </Card>
      </div>
    );
  }
}

export default ArtistForm;
