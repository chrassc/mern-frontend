import {Component} from "react";
import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";

export class DisasterMapC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoJSON: {},
      bounds: [],

    }
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default DisasterMapC
