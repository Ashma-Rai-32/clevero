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

const ArtworkView = () => {
  //   const { id } = useParams();
  const location = useLocation();
  const { item } = location.state;
  console.log("locaiton.state", item);
  //   console.log("id", id);
  return <div>ArtworkView</div>;
};

export default ArtworkView;
