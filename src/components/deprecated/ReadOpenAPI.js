import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";

class ReadOpenAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/openAPI")
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log("error from ReadOpenAPI");
      })
  };
  // fetch("http://localhost:8082/api/openAPI")
  //   .then(response => {
  //     this.setState({data: response.PromiseResult})
  //   })
  //   .then(console.log(this.state.data))
  //   .catch(error => {
  //     console.log("Error from readOpenAPI");
  //     this.setState({
  //       data: "error"
  //     });
  //   })
  // };

  render() {
    const data = this.state.data;
    console.log(data);
    let dataList = Object.keys(data);
    let dataIndeces = Object.keys(data);
    // let dataValues = Object.map();


    return (
      <div className="ReadOpenAPI">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">한국재난정보</h2>
            </div>

            <div className="col-md-11">
              <Link to="/update-openAPI" className="btn btn-outline-warning float-right">
                Update openAPI
              </Link>
              <br />
              <br />
              <hr />

            </div>
          </div>
        </div>
        <div className="list">
          <table className="disaster-list">
            <thead>
              <tr>
                <th scope="col" style={{ width: "10%" }}>Date/Time</th>
                <th scope="col" style={{ width: "10%" }}>Location Name</th>
                <th scope="col" style={{ width: "10%" }}>Location ID</th>
                <th scope="col" style={{ width: "50%" }}>Message</th>
                <th scope="col" style={{ width: "10%" }}>Message ID</th>
                <th scope="col" style={{ width: "10%" }}>Send Platform</th>
              </tr>
            </thead>
            {/* {this.state.data.map((info, ))} */}

          </table>
          <table>
            {/* <tr key={"header"}>
              {Object.keys(data[0]).map((key) => (
                <th>{key}</th>
              ))}
            </tr>
            {data.map((item) => (
              <tr key={item.md101_sn}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} 
              </tr>
            ))}*/}
          </table>
        </div>
      </div>
    );
  }
}

export default ReadOpenAPI;