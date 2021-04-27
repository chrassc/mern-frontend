import React, { Component } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Select from 'react-select';


export class DisasterMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_start: "2020-01-01",
      date_end: new Date().toISOString().slice(0, 10),
      disaster_type: ["covid_19"],
      organizedGeoJSON: {},
      selected: {},
      totalCount: 0
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMultipleChange = e => {
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
      this.setState({ totalCount: data.geoJSON.totalCount });
      this.setState({ organizedGeoJSON: data });
    }
    fetchInfo();
  };
  render() {

    const options = [
      { value: "covid_19", label: "COVID-19" }, { value: "typhoon", label: "Typhoon" }, { value: "downpour", label: "Downpour" }, { value: "flood", label: "Flood" }, { value: "heavy_snow", label: "Heavy Snow" }, { value: "storm_surge", label: "Storm Surge" }, { value: "cold_wave", label: "Cold Wave" }, { value: "strong_wind", label: "Strong Wind" }, { value: "storm", label: "Storm" }, { value: "dry", label: "Dry" }, { value: "heatwave", label: "Heatwave" }, { value: "fine_dust", label: "Fine Dust" }, { value: "yellow_dust", label: "Yellow Dust" }, { value: "forest_fire", label: "Forest Fire" }, { value: "landslide", label: "Landslide" }, { value: "dam_collapse", label: "Dam Collapse" }, { value: "electrical", label: "Electrical" }, { value: "infectious_disease", label: "Infectious" }, { value: "radioactive_leak", label: "Radioactive Leak" }, { value: "terrorism", label: "Terrorism" }, { value: "civil_air_defense", label: "Civil Air Defense (Chemical)" }, { value: "etc", label: "Etc (accidents)" }, { value: "drought", label: "Drought" }, { value: "tides", label: "Tides" }, { value: "earthquake", label: "Earthquake" }, { value: "informational", label: "Etc (Informational)" }
    ];

    const getColor = (count) => {
      let percent = count / this.state.totalCount;
      return percent > .2 ? "#800026" :
        percent > .1 ? "#BD0026" :
          percent > .05 ? "#E31A1C" :
            percent > .025 ? "#FC4E2A" :
              percent > .01 ? "#FD8D3C" :
                percent > .005 ? "#FEB24C" :
                  percent > 0 ? "#FED976" :
                    "#FFEDA0";
    }

    const highlightFeature = e => {
      var layer = e.target;
      const { name, count } = e.target.feature.properties;
      this.setState({
        selected: {
          district: name,
          count: count
        }
      });
      layer.setStyle({
        weight: 3,
        color: "black",
        fillOpacity: 0.9
      });
    }

    const resetHighlight = e => {
      this.setState({ selected: {} });
      e.target.setStyle(style(e.target.feature));
    }

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: showHighlight
      });
      layer.bindTooltip("<div>"+ feature.properties.name + ": " + feature.properties.count + "</div>", { permanent: true, direction: "center", className: "districtName" });
    }

    const style = (feature) => {
      return {
        fillColor: getColor(feature.properties.count),
        weight: 1,
        opacity: 1,
        color: "black",
        fillOpacity: .7
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
                    <label htmlFor="select">Select Disaster Type(s)</label>
                    <Select options={options} isMulti defaultValue={options[0]} onChange={this.onMultipleChange} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
        <br />
        <MapContainer id={"map"} className={"map"} center={[36.2, 128.1]} zoom={7}>
          {!this.state.selected.district && (
            <div className="hover-info"><strong>Tap or hover over an area</strong><span>Total Count: {this.state.totalCount}</span></div>
          )}
          {this.state.selected.district && (
            <div className="info">
              <strong>{this.state.selected.district}</strong>
              <span>{this.state.selected.count} counts</span>
            </div>
          )}
          <div className="legend">
            <div style={{ "--color": "#800026" }}>20%+</div>
            <div style={{ "--color": "#BD0026" }}>10%</div>
            <div style={{ "--color": "#E31A1C" }}>5%</div>
            <div style={{ "--color": "#FC4E2A" }}>2.5%</div>
            <div style={{ "--color": "#FD8D3C" }}>1%</div>
            <div style={{ "--color": "#FEB24C" }}>0.5%</div>
            <div style={{ "--color": "#FED976" }}>0-0.5%</div>
            <div style={{ "--color": "#FFEDA0" }}>0%</div>
          </div>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}@2x.png"
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