import React, { Component, useRef } from "react";
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
  Alert,
} from "reactstrap";
import axios from "axios";
import Datetime from "react-datetime";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const ArtistForm = () => {
  const location = useLocation();
  const state = location != null ? location.state : null;
  const navigate = useNavigate();
  const [alertState, setAlertState] = React.useState(false);

  // artworkId
  const [constituentId, setConstituentId] = React.useState(null);

  // displayName
  const [displayName, setdisplayName] = React.useState(null);
  const [checkdisplayName, setCheckdisplayName] = React.useState("invalid");
  const [displayNameValidationError, setdisplayNameValidationError] =
    React.useState("Please enter a valid name.");

  // artistBio
  const [artistBio, setartistBio] = React.useState(null);
  const [checkartistBio, setCheckartistBio] = React.useState("invalid");
  const [artistBioValidationError, setartistBioValidationError] =
    React.useState("Please enter a valid bio  .");

  // nationality
  const [nationality, setnationality] = React.useState(null);
  const [checknationality, setChecknationality] = React.useState("invalid");
  const [nationalityValidationError, setnationalityValidationError] =
    React.useState("Please enter a valid nationality.");

  // gender
  const genderDropDownData = [
    { genderId: true, genderName: "Male" },
    { genderId: false, genderName: "Female" },
  ];
  const [genderName, setgenderName] = React.useState("Select Gender");
  const [selectedGender, setselectedGender] = React.useState(null);

  const [toggleOpengender, settoggleOpengender] = React.useState(null);

  // beginDate
  const [beginDate, setbeginDate] = React.useState(null);
  const [beginDatePlaceholder, setbeginDatePlaceholder] =
    React.useState("Select begin date");
  const [checkbeginDate, setCheckbeginDate] = React.useState("invalid");
  const [beginDateValidationError, setbeginDateValidationError] =
    React.useState("Please enter a valid begin date.");
  const [isOpenBeginDate, setIsOpenBeginDate] = React.useState(false);

  const handleBlurBeginDate = () => {
    setTimeout(() => {
      setIsOpenBeginDate(false);
    }, 100);
  };

  // endDate
  const [endDate, setendDate] = React.useState(null);
  const [endDatePlaceholder, setendDatePlaceholder] =
    React.useState("Select end date");
  const [checkendDate, setCheckendDate] = React.useState("invalid");
  const [endDateValidationError, setendDateValidationError] = React.useState(
    "Please enter a valid end date."
  );
  const [isOpenEndDate, setIsOpenEndDate] = React.useState(false);

  const handleBlurEndDate = () => {
    setTimeout(() => {
      setIsOpenEndDate(false);
    }, 100);
  };

  // wikiQid
  const [wikiQid, setwikiQid] = React.useState(null);
  const [checkwikiQid, setCheckwikiQid] = React.useState("invalid");
  const [wikiQidValidationError, setwikiQidValidationError] = React.useState(
    "Please enter a valid Wiki QID."
  );
  // ulan
  const [ulan, setulan] = React.useState(null);
  const [checkulan, setCheckulan] = React.useState("invalid");
  const [ulanValidationError, setulanValidationError] = React.useState(
    "Please enter a valid ULAN."
  );

  //init
  const [initializedData, setInitializedData] = React.useState(false);
  const [initializedValidation, setInitializedValidation] =
    React.useState(false);

  const InitData = () => {
    setConstituentId(state.constituentId);
    setdisplayName(state.displayName);
    setartistBio(state.artistBio);
    setnationality(state.nationality);
    setselectedGender(state.gender);
    if (state.gender) setgenderName("Male");
    else setgenderName("Female");
    setbeginDate(state.beginDate);
    setbeginDatePlaceholder(moment(state.beginDate).format("YYYY-MM-DD"));
    setendDate(state.endDate);
    setwikiQid(state.wikiQid);
    setulan(state.ulan);

    setInitializedData(true);

    // console.log("title", title);
    // console.log("url", url);
    // console.log("thumbnailUrl", thumbnailUrl);
    // console.log("date", date);
    // console.log("constituentIds", selectedConstituentId);
    // console.log("artistNames", artistName);
  };

  const InitValidation = () => {
    setCheckartistBio("valid");
    setCheckdisplayName("valid");
    setCheckbeginDate("valid");
    setCheckendDate("valid");
    setChecknationality("valid");
    setCheckulan("valid");
    setCheckwikiQid("valid");

    setInitializedValidation(true);
  };

  const HandleTextValidation = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()-=_+{}[\]|;:',.<>/?\s]+$/;

    if (regex.test(value)) return true;
    else return false;
  };

  return (
    <>
      {state != null && !initializedData && <InitData />}
      {state != null && !initializedValidation && <InitValidation />}

      <div>
        <Container className="mt-5 p-3">
          <Card>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h1 className="p-3">
                    {state != null ? "Update" : "Add"} Artist
                  </h1>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {alertState ? (
                <Row className="p-3">
                  <Alert color="danger">
                    Invalid Entry! Please enter valid answers only.
                  </Alert>
                </Row>
              ) : null}

              <Row className="pt-2">
                <Col lg="12">
                  {/* title */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Artist Name<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="displayName"
                      placeholder="e.g. Ruth Asawa"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={displayName}
                      onChange={(e) => {
                        setdisplayName(e.target.value);
                        if (HandleTextValidation(e.target.value))
                          setCheckdisplayName("valid");
                        else setCheckdisplayName("invalid");
                      }}
                    />
                    {checkdisplayName === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {displayNameValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col lg="12">
                  {/* artistBio */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Artist Bio<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="artistBio"
                      placeholder="Short Bio on the artist"
                      type="textarea"
                      required
                      maxLength={800}
                      defaultValue={artistBio}
                      onChange={(e) => {
                        setartistBio(e.target.value);
                        if (HandleTextValidation(e.target.value))
                          setCheckartistBio("valid");
                        else setCheckartistBio("invalid");
                      }}
                    />
                    {checkartistBio === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {artistBioValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col lg="6">
                  {/* Nationality */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Nationality<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="nationality"
                      placeholder="e.g. UK"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={nationality}
                      onChange={(e) => {
                        setnationality(e.target.value);
                        if (HandleTextValidation(e.target.value))
                          setChecknationality("valid");
                        else setChecknationality("invalid");
                      }}
                    />
                    {checknationality === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {nationalityValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>

                <Col lg="6">
                  {/* gender dropdown */}
                  <label className="form-control-label" htmlFor="gender">
                    Gender<span className="text-danger pl-1">*</span>
                  </label>
                  {/* <Row>
                    <Col> */}
                  <Dropdown
                    isOpen={toggleOpengender}
                    toggle={() => {
                      settoggleOpengender(!toggleOpengender);
                    }}
                    className="w-100"
                    style={{ color: "blue" }}
                  >
                    <DropdownToggle
                      caret
                      className="w-100 text-left"
                      color="primary"
                    >
                      {genderName}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                      {genderDropDownData != null &&
                        genderDropDownData.map((i, key) => (
                          <DropdownItem
                            key={i.ConstituentId}
                            onClick={() => {
                              setselectedGender(i.genderId);
                              setgenderName(i.genderName);
                            }}
                          >
                            {i.genderName}
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </Dropdown>
                  {/* </Col> */}
                  {/* <Col
                      sm="1"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <FontAwesomeIcon icon={faCirclePlus} size="lg" />
                    </Col> */}
                  {/* </Row> */}
                </Col>
              </Row>

              <Row className="pt-2">
                {/* beginDate */}
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="beginDate">
                      Begin Date<span className="text-danger pl-1">*</span>
                    </label>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            iconClassName="fa-solid"
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* //beginDatetime */}

                      <Datetime
                        inputProps={{
                          placeholder: beginDatePlaceholder,
                          className: "custom-calendar",
                        }}
                        closeOnSelect={true}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        utc={true}
                        value={
                          beginDate == null
                            ? null
                            : moment(beginDate).format("YYYY-MM-DD")
                        }
                        isInvalid={checkbeginDate === "invalid"}
                        onChange={(e) => {
                          setbeginDate(moment(e).format());
                          // setbeginDatePlaceholder(moment(e).format());
                          if (moment(e).format() === null) {
                            setCheckbeginDate("invalid");
                          } else setCheckbeginDate("valid");
                        }}
                      />
                    </InputGroup>
                    {checkbeginDate === "invalid" && (
                      <div className="invalid-feedback d-block">
                        Please provide valid begin date.
                      </div>
                    )}
                  </FormGroup>
                </Col>

                {/* endDate */}
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="endDate">
                      End Date<span className="text-danger pl-1">*</span>
                    </label>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            iconClassName="fa-solid"
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* //endDatetime */}

                      <Datetime
                        inputProps={{
                          placeholder: endDatePlaceholder,
                          className: "custom-calendar",
                        }}
                        closeOnSelect={true}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        utc={true}
                        value={
                          endDate == null
                            ? null
                            : moment(endDate).format("YYYY-MM-DD")
                        }
                        isInvalid={checkendDate === "invalid"}
                        onChange={(e) => {
                          setendDate(moment(e).format());
                          if (moment(e).format() === null) {
                            setCheckendDate("invalid");
                          } else setCheckendDate("valid");
                        }}
                      />
                    </InputGroup>
                    {checkendDate === "invalid" && (
                      <div className="invalid-feedback d-block">
                        Please provide valid end date.
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col lg="6">
                  {/* wikiQid */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      Wiki QID<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="wikiQid"
                      placeholder="e.g. Q12345"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={wikiQid}
                      onChange={(e) => {
                        setwikiQid(e.target.value);
                        if (HandleTextValidation(e.target.value))
                          setCheckwikiQid("valid");
                        else setCheckwikiQid("invalid");
                      }}
                    />
                    {checkwikiQid === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {wikiQidValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col lg="6">
                  {/* ulan */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="title">
                      ULAN<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="ulan"
                      placeholder="e.g. 531234"
                      type="number"
                      required
                      maxLength={255}
                      defaultValue={ulan}
                      onChange={(e) => {
                        setulan(e.target.value);
                        if (e.target.value != null) setCheckulan("valid");
                        else setCheckulan("invalid");
                      }}
                    />
                    {checkulan === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {ulanValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="pt-2">
                <Col>
                  <Button
                    onClick={() => {
                      console.log(
                        "displayName",
                        displayName,
                        "artistBio",
                        artistBio,
                        "nationality",
                        nationality,
                        "gender",
                        selectedGender,
                        "wikiQid",
                        wikiQid,
                        "ulan",
                        ulan,
                        "begindate",
                        moment(beginDate).format("YYYY-MM-DD HH:mm:ss.sss"),
                        "endDate",
                        moment(endDate).format("YYYY-MM-DD HH:mm:ss.sss")
                      );

                      if (
                        checkartistBio === "valid" &&
                        checkbeginDate === "valid" &&
                        checkdisplayName === "valid" &&
                        checkendDate === "valid" &&
                        selectedGender != null &&
                        checknationality === "valid" &&
                        checkulan === "valid" &&
                        checkwikiQid === "valid"
                      ) {
                        if (state == null) {
                          axios
                            .post("http://localhost:8081/artist", {
                              displayName: displayName,
                              artistBio: artistBio,
                              nationality: nationality,
                              gender: selectedGender ? 1 : 0,
                              beginDate: moment(beginDate).format(
                                "YYYY-MM-DD HH-mm-ss.sss"
                              ),
                              endDate: moment(endDate).format(
                                "YYYY-MM-DD HH-mm-ss.sss"
                              ),
                              wikiQid: wikiQid,
                              ulan: ulan,
                            })
                            .then((res) => {
                              if (res.status >= 200 && res.status < 300) {
                                setAlertState(false);
                                navigate("/artist");
                                //window.location.reload();
                              } else {
                                console.log("Error creating artist");
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        } else {
                          axios
                            .put(
                              `http://localhost:8081/artist/${constituentId}`,
                              {
                                displayName: displayName,
                                artistBio: artistBio,
                                nationality: nationality,
                                gender: selectedGender,
                                beginDate: moment(beginDate).format(
                                  "YYYY-MM-DD HH:mm:ss.sss"
                                ),
                                endDate: moment(endDate).format(
                                  "YYYY-MM-DD HH:mm:ss.sss"
                                ),
                                wikiQid: wikiQid,
                                ulan: ulan,
                              }
                            )
                            .then((res) => {
                              if (res.status >= 200 && res.status < 300) {
                                setAlertState(false);
                                navigate("/artist");
                                console.log("Success");
                              } else {
                                console.log("Error Updating artwork");
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }
                      } else {
                        setAlertState(true);
                        console.log("Invalid Entries");
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
    </>
  );
};

export default ArtistForm;
