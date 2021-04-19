import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class ReadOpenAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8082/api/openAPI")
      .then(response => {
        this.setState({
          data: response.json()
        })
      })
      .catch(error => {
        console.log("Error from readOpenAPI");
      })
  };

  render() {
    const data = this.state.data;
    console.log ("printdata: " + data);
    let display = <div>this should work</div>;
    return display;
  }
}

export default ReadOpenAPI;