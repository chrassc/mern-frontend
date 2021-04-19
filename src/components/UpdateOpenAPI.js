import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class UpdateOpenAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_date: "",
      location_id: "",
      location_name: "",
      md101_sn: "",
      msg: "",
      send_platform: ""
    };
  }
  componentDidMount() {
    //console.log("print params: " + this.props)
    fetch("http://localhost:8082/api/openAPI)
  }


}

export default UpdateOpenAPI