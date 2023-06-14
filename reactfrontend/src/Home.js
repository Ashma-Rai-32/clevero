import React, { Component } from "react";
import axios from 'axios';

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

    {this.state.data && this.state.data.map(item=>(<div key ={item.ConstituentId}>{item.DisplayName}</div>))}</>);
  }
}

export default Home;
