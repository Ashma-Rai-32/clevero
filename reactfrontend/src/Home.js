import React, { Component } from "react";
import axios from 'axios';
import {Table} from "reactstrap";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:null,
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8081/')
    .then(res=>{
      this.setState({data:res.data});
    console.log("this.state.data",this.state.data);}
      )
    .catch(error=>{
      console.error('Error fetching data',error)}
      );
  }

  render() {
    const {data}=this.state;
    return (<>
    {this.state.data && (<><Table>
  <thead>
    <tr><th>S.No.</th>
    <th>Artist</th>
    <th>Gender</th></tr>
  </thead>
  <tbody>
  
  {this.state.data.map((item,index)=>
    (

    <tr key={item.ConstituentId}>
      <td>{index+1}</td>
      <td>{item.DisplayName}</td>
      <td>{item.ArtistBio}</td>
      {console.log("Inside td", item.DisplayName)}
    </tr>))
    }
  </tbody>
</Table></>)}

</>)
    
  }
}

export default Home;
