import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class UpdateOpenAPI extends Component {
  constructor() {
    super();
    this.state = {
      create_date: "",
      location_id: "",
      location_name: "",
      md101_sn: "",
      msg: "",
      send_platform: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    let data = {
      create_date: this.state.create_date,
      location_id: this.state.location_id,
      location_name: this.state.location_name,
      md101_sn: this.state.md101_sn,
      msg: this.state.msg,
      send_platform: this.state.send_platform
    };
    console.log(JSON.stringify(data));

    //console.log("print params: " + this.props)
    fetch("http://localhost:8082/api/openAPI", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        this.setState({
          create_date: "",
          location_id: "",
          location_name: "",
          md101_sn: "",
          msg: "",
          send_platform: ""
        });
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("error in updateOpenAPI");
      })
  };

  render() {
    return (
      <div className="UpdateOpenAPI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Read Open API
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">
                  Create new document
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='create_date'
                    name='create_date'
                    className='form-control'
                    value={this.state.create_date}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='location_id'
                    name='location_id'
                    className='form-control'
                    value={this.state.location_id}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='location_name'
                    name='location_name'
                    className='form-control'
                    value={this.state.location_name}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='md101_sn'
                    name='md101_sn'
                    className='form-control'
                    value={this.state.md101_sn}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='msg'
                    name='msg'
                    className='form-control'
                    value={this.state.msg}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='send_platform'
                    name='send_platform'
                    className='form-control'
                    value={this.state.send_platform}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateOpenAPI