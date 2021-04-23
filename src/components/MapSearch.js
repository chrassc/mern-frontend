import React, { Component } from 'react'


class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_start: "2019-01-01",
      date_end: "2020-12-31",
      disaster_type: [],
      geoJSON: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onMultipleChange = e => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    this.setState({disaster_type: value});
  }

  onSubmit = e => {
    e.preventDefault();

    const search = {
      date_start: this.state.query.date_start,
      date_end: this.state.query.date_end,
      disaster_type: this.state.query.disaster_type,
    }
  }


  componentDidMount() {
    // fetch("http://71.227.163.23:8082/api/organizedGeoJSON") // /api/organizedGeoJSON
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       geoJSON: res
    //     })
    //   },
    //     () => {
    //       console.log("error in organizedGeoJSON fetch")
    //     })
  };


  render() {
    return (
      <div className="MapSearch">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Search Disasters</h1>
              <p className="lead text-center">
                Search disasters by date range and type
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col">
                    <label htmlFor="date">Start Date</label>
                    <input type="date" name="date_start" className="form-control" value={this.state.date_start} onChange={this.onChange}></input>
                  </div>
                  <div className="col">
                    <label htmlFor="date">End Date</label>
                    <input type="date" name="date_end" className="form-control" value={this.state.date_end} onChange={this.onChange} />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="select">Select Disaster Type</label>
                  <select multiple={true} name="disaster_type" className="form-control" onChange={this.onMultipleChange}>
                    <option value="covid_19">COVID-19</option>
                    <option value="typhoon">Typhoon</option>
                    <option value="downpour">Downpour</option>
                    <option value="flood">Flood</option>
                    <option value="heavy_snow">Heavy Snow</option>
                    <option value="storm_surge">Storm Surge</option>
                    <option value="cold_wave">Cold Wave</option>
                    <option value="strong_wind">Strong Wind</option>
                    <option value="storm">Storm</option>
                    <option value="dry">Dry</option>
                    <option value="heatwave">Heatwave</option>
                    <option value="fine_dust">Fine Dust</option>
                    <option value="yellow_dust">Yellow Dust</option>
                    <option value="forest_fire">Forest Fire</option>
                    <option value="landslide">Landslide</option>
                    <option value="dam_collapse">Dam Collapse</option>
                    <option value="electrical">Electrical</option>
                    <option value="infectious_disease">Infectious Disease</option>
                    <option value="radioactive_leak">Radioactive Leak</option>
                    <option value="terrorism">Terrorism</option>
                    <option value="civil_air_defense">Civil Air Defense (Chemical)</option>
                    <option value="etc">Etc (accidents)</option>
                    <option value="drought">Drought</option>
                    <option value="tides">Tides</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="informational">Etc (Informational)</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
    )
  }
}

export default MapSearch
