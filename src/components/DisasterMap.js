import React, { Component } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Select from 'react-select';


export class DisasterMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_start: "2019-01-01",
      date_end: "2020-12-31",
      disaster_type: [],
      organizedGeoJSON: {},
      selected: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMultipleChange = e => {
    console.log(e);
    this.setState({
      disaster_type: Array.from(e, option => option.value)
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const query = encodeURIComponent(JSON.stringify({
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      disaster_type: this.state.disaster_type,
    }));
    const fetchInfo = async () => {
      const disasterData = await fetch(`http://71.227.163.23:8082/api/organizedGeoJSON?query=${query}`);
      const data = await disasterData.json();
      console.log(data);
      this.setState({organizedGeoJSON: data});
    }
    fetchInfo();
  };
  render() {

    const options = [
      { value: "covid_19", label: "COVID-19" }, { value: "typhoon", label: "Typhoon" }, { value: "downpour", label: "Downpour" }, { value: "flood", label: "Flood" }, { value: "heavy_snow", label: "Heavy Snow" }, { value: "storm_surge", label: "Storm Surg" }, { value: "cold_wave", label: "Cold Wave" }, { value: "strong_wind", label: "Strong Wind" }, { value: "storm", label: "Storm" }, { value: "dry", label: "Dry" }, { value: "heatwave", label: "Heatwave" }, { value: "fine_dust", label: "Fine Dust" }, { value: "yellow_dust", label: "Yellow Dust" }, { value: "forest_fire", label: "Forest Fire" }, { value: "landslide", label: "Landslide" }, { value: "dam_collapse", label: "Dam Collapse" }, { value: "electrical", label: "Electrical" }, { value: "infectious_disease", label: "Infectious" }, { value: "radioactive_leak", label: "Radioactive Leak" }, { value: "terrorism", label: "Terrorism" }, { value: "civil_air_defense", label: "Civil Air Defense (Chemical)" }, { value: "etc", label: "Etc (accidents)" }, { value: "drought", label: "Drought" }, { value: "tides", label: "Tides" }, { value: "earthquake", label: "Earthquake" }, { value: "informational", label: "Etc (Informational)" }
    ];

    const getColor = (count) => {
      return count > 222 ? "#3eb80e" :
      count > 140 ? "#509923" :
        count > 75 ? "#789E2D" :
          count > 300 ? "#A1A436" :
            count > 0 ? "#C9A83E" :
              "#F06E45";
    }

    const highlightFeature = e => {
      var layer = e.target;
      const { name, disasterType, count } = e.target.feature.properties;
      this.setState({selected: {
        district: name,
        count: count
      }});
      layer.setStyle({
        weight: 3,
        color: "black",
        fillOpacity: .8
      });
    }

    const resetHighlight = e => {
      this.setState({selected: {}});
      e.target.setStyle(style(e.target.feature));
    }

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: showHighlight
      });
    }

    const style = (feature) => {
      return {
        fillColor: getColor(feature.properties.count),
        weight: 1,
        opacity: 1,
        color: "black",
        fillOpacity: .6
      };
    }
    return (
      <div className="DisasterMap">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center"><strong>Search Disasters</strong></h1>
              <p className="lead text-center">Search disasters by date range and type</p>
              <form id="query" noValidate onSubmit={this.onSubmit}>
                <input type="submit" className="btn btn-outline-warning btn-block mt-4" />
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="date">Start Date</label>
                        <input type="date" name="date_start" className="form-control" style={{ width: "11rem" }} value={this.state.date_start} onChange={this.onChange}></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="date">End Date</label>
                        <input type="date" name="date_end" className="form-control" style={{ width: "11rem" }} value={this.state.date_end} onChange={this.onChange} />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="select">Select Disaster Type</label>
                    <Select options={options} isMulti onChange={this.onMultipleChange} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
        <br />
        <MapContainer id={"map"} className={"map"} center={[36.2, 128.1]} zoom={7}>
          {!this.state.selected.district && (
              <div className="hover-info">Hover over an area</div>
            )}
            {this.state.selected.district && (
              <div className="info">
                <strong>{this.state.selected.district}</strong>
                <span>{this.state.selected.count} counts</span>
              </div>
            )}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.organizedGeoJSON.geoJSON && (
              <GeoJSON key={this.state.organizedGeoJSON.geoJSON._id} data={this.state.organizedGeoJSON.geoJSON} style={style} onEachFeature={onEachFeature} />
            )}
        </MapContainer>
      </div >
    )
  }
}

export default DisasterMap