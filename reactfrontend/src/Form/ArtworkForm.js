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

const ArtworkForm = () => {
  const location = useLocation();
  const state = location != null ? location.state : null;
  const navigate = useNavigate();
  const [alertState, setAlertState] = React.useState(false);

  // init artworkId
  const [artworkId, setArtworkId] = React.useState(null);

  // title
  const [title, setTitle] = React.useState(null);
  const [checkTitle, setCheckTitle] = React.useState("invalid");
  const [titleValidationError, setTitleValidationError] = React.useState(
    "Please enter a valid title."
  );

  // artistDropDownData
  const [artistDropDownData, setArtistDropDownData] = React.useState(null);
  const [artistName, setArtistName] = React.useState("Select Artist");
  const [toggleOpenArtist, setToggleOpenArtist] = React.useState(null);
  const [selectedConstituentId, setSelectedConstituentId] =
    React.useState(null);

  // url
  const [url, setUrl] = React.useState(null);
  const [checkUrl, setCheckUrl] = React.useState("invalid");
  const [urlValidationError, setUrlValidationError] = React.useState(
    "Please enter a valid url."
  );

  // thumbnailUrl
  const [thumbnailUrl, setThumbnailUrl] = React.useState(null);
  const [checkThumbnailUrl, setCheckThumbnailUrl] = React.useState("invalid");
  const [thumbnailUrlValidationError, setThumbnailUrlValidationError] =
    React.useState("Please enter a valid thumbnail url.");

  // date
  const [date, setDate] = React.useState(null);
  const [datePlaceholder, setDatePlaceholder] = React.useState("Select Date");
  const [checkDate, setCheckDate] = React.useState("invalid");
  const [dateValidationError, setDateValidationError] = React.useState(
    "Please enter a valid thumbnail date."
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  //init
  const [initializedData, setInitializedData] = React.useState(false);
  const [initializedValidation, setInitializedValidation] =
    React.useState(false);

  const InitArtistDropDown = () => {
    axios
      .get("http://localhost:8081/artistDropDownData")
      .then((res) => {
        setArtistDropDownData(res.data);
      })
      .catch((err) => {
        console.log("SERVER ERROR");
      });

    console.log("artistdropdowndata", artistDropDownData);
  };

  const InitData = () => {
    setArtworkId(state.artworkId);
    setTitle(state.title);
    setUrl(state.url);
    setThumbnailUrl(state.thumbnailUrl);
    setDate(state.date);
    if (state.constituentIds != null) {
      setArtistName(state.artistNames);
      setSelectedConstituentId(state.constituentIds);
    }
    setInitializedData(true);

    console.log("title", title);
    console.log("url", url);
    console.log("thumbnailUrl", thumbnailUrl);
    console.log("date", date);
    console.log("constituentIds", selectedConstituentId);
    console.log("artistNames", artistName);
  };

  const InitValidation = () => {
    setCheckTitle("valid");
    setCheckDate("valid");
    setCheckThumbnailUrl("valid");
    setCheckUrl("valid");
    setInitializedValidation(true);
  };

  const HandleTextValidation = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()-=_+{}[\]|;:',.<>/?\s]+$/;

    if (regex.test(value)) return true;
    else return false;
  };

  const HandleUrlValidation = (value) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+|^www\.[^ "]+\.[^ "]+$/;
    if (regex.test(value)) return true;
    else return false;
  };
  return (
    <>
      {artistDropDownData == null && <InitArtistDropDown />}
      {state != null && !initializedData && <InitData />}
      {state != null && !initializedValidation && <InitValidation />}

      <div>
        <Container className="mt-5 p-3">
          <Card>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h1 className="p-3">
                    {state != null ? "Update" : "Add"} Artwork
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
                      Artwork Title<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="title"
                      placeholder="e.g. The Manhattan Transcripts Project"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (HandleTextValidation(e.target.value))
                          setCheckTitle("valid");
                        else setCheckTitle("invalid");
                      }}
                    />
                    {checkTitle === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {titleValidationError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="pt-2 pb-3">
                <Col lg="12">
                  {/* artist dropdown */}
                  <label className="form-control-label" htmlFor="artist">
                    Artist<span className="text-danger pl-1">*</span>
                  </label>
                  {/* <Row>
                    <Col> */}
                  <Dropdown
                    isOpen={toggleOpenArtist}
                    toggle={() => {
                      setToggleOpenArtist(!toggleOpenArtist);
                    }}
                    className="w-100"
                    style={{ color: "blue" }}
                  >
                    <DropdownToggle
                      caret
                      className="w-100 text-left"
                      color="primary"
                    >
                      {artistName}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                      {artistDropDownData != null &&
                        artistDropDownData.map((i, key) => (
                          <DropdownItem
                            key={i.ConstituentId}
                            onClick={() => {
                              setArtistName(i.DisplayName);
                              setSelectedConstituentId(i.ConstituentId);
                            }}
                          >
                            {i.DisplayName}
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
                <Col lg="12">
                  {/* url */}
                  <FormGroup>
                    <label className="form-control-label" htmlFor="url">
                      Link<span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="url"
                      placeholder="e.g. http://example.com"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (
                          HandleUrlValidation(e.target.value) &&
                          e.target.value != ""
                        )
                          setCheckUrl("valid");
                        else setCheckUrl("invalid");
                      }}
                    />
                    {checkUrl === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {urlValidationError}
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
                      Thumbnail url
                      <span className="text-danger pl-1">*</span>
                    </label>

                    <Input
                      id="thumbnailUrl"
                      placeholder="e.g. http://example.com/example.jpeg"
                      type="text"
                      required
                      maxLength={255}
                      defaultValue={thumbnailUrl}
                      onChange={(e) => {
                        setThumbnailUrl(e.target.value);
                        if (
                          HandleUrlValidation(e.target.value) &&
                          e.target.value != ""
                        )
                          setCheckThumbnailUrl("valid");
                        else setCheckThumbnailUrl("invalid");
                      }}
                    />
                    {checkThumbnailUrl === "invalid" && (
                      <div className="invalid-feedback d-block">
                        {thumbnailUrlValidationError}
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
                      Date<span className="text-danger pl-1">*</span>
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
                      {/* //datetime */}

                      <Datetime
                        inputProps={{
                          placeholder: datePlaceholder,
                          className: "custom-calendar",
                        }}
                        closeOnSelect={true}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        utc={true}
                        value={moment(date).format("YYYY-MM-DD")}
                        isInvalid={checkDate === "invalid"}
                        onChange={(e) => {
                          setDatePlaceholder(moment(e).format());
                          setDate(moment(e).format());
                          if (moment(e).format() === null) {
                            setCheckDate("invalid");
                          } else setCheckDate("valid");
                        }}
                      />
                    </InputGroup>
                    {checkDate === "invalid" && (
                      <div className="invalid-feedback d-block">
                        Please provide valid begin date
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row className="pt-2">
                <Col>
                  <Button
                    onClick={() => {
                      console.log("title", title);
                      console.log("date", date);
                      console.log("url", url);
                      console.log("thumbnailUrl", thumbnailUrl);
                      console.log(
                        "selectedConstituentId",
                        selectedConstituentId
                      );

                      if (
                        checkTitle === "valid" &&
                        checkDate === "valid" &&
                        checkUrl === "valid" &&
                        checkThumbnailUrl === "valid" &&
                        selectedConstituentId != null
                      ) {
                        if (state == null) {
                          axios
                            .post("http://localhost:8081/artwork", {
                              title: title,
                              constituentId: selectedConstituentId,
                              url: url,
                              thumbnailUrl: thumbnailUrl,
                              date: moment(date).format(
                                "YYYY-MM-DD HH-mm-ss.sss"
                              ),
                            })
                            .then((res) => {
                              if (res.status >= 200 && res.status < 300) {
                                console.log("Success");
                                setAlertState(false);
                                navigate("/artwork");
                                window.location.reload();
                              } else {
                                console.log("Error creating artwork");
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        } else {
                          axios
                            .put(`http://localhost:8081/artwork/${artworkId}`, {
                              title: title,
                              constituentId: selectedConstituentId,
                              url: url,
                              thumbnailUrl: thumbnailUrl,
                              date: moment(date).format(
                                "YYYY-MM-DD HH-mm-ss.sss"
                              ),
                            })
                            .then((res) => {
                              if (res.status >= 200 && res.status < 300) {
                                navigate("/artworkView", {
                                  state: {
                                    item: {
                                      title: title,
                                      constituentId: selectedConstituentId,
                                      url: url,
                                      thumbnailUrl: thumbnailUrl,
                                      date: date,
                                      artistNames: artistName,
                                      artworkId:
                                        state == null ? null : state.artworkId,
                                      nationalities: state.nationalities,
                                      medium: state.medium,
                                      dimensions:
                                        state == null ? null : state.dimensions,
                                      creditLine:
                                        state == null ? null : state.creditLine,
                                      accessionNumber:
                                        state == null
                                          ? null
                                          : state.accessionNumber,
                                      classification:
                                        state == null
                                          ? null
                                          : state.classification,
                                      department:
                                        state == null ? null : state.department,
                                      dateAcquired:
                                        state == null
                                          ? null
                                          : state.dateAcquired,
                                      seatHeight:
                                        state == null ? null : state.seatHeight,
                                      catalogued:
                                        state == null ? null : state.catalogued,
                                      objectId:
                                        state == null ? null : state.objectId,
                                      circumference:
                                        state == null
                                          ? null
                                          : state.circumference,
                                      depth: state == null ? null : state.depth,
                                      diameter:
                                        state == null ? null : state.diameter,
                                      height:
                                        state == null ? null : state.height,
                                      length:
                                        state == null ? null : state.length,
                                      weight:
                                        state == null ? null : state.weight,
                                      width: state == null ? null : state.width,
                                      duration:
                                        state == null ? null : state.duration,
                                      length:
                                        state == null ? null : state.length,
                                    },
                                  },
                                });
                                setAlertState(false);

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

export default ArtworkForm;
