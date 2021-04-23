import React, { Component } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 36.15,
      lng: 128.24,
      zoom: 7,
      geoJSON: {},
      isLoaded: false,
      selected: [],
      geoJSONStyle: {
        // fillColor: this.state.geoJSONColor(feature.properties.count),
        weight: 1,
        opacity: 1,
        color: "black",
        fillOpacity: .6
      },
      geoJSONColor: (count) => {
        return count > 222 ? "#3eb80e" :
          count > 140 ? "#509923" :
          count > 75 ? "#789E2D" :
          count > 300 ? "#A1A436" :
          count > 0 ? "#C9A83E" :
          "#F06E45";
      },

    };
  }
  componentDidMount() {
    fetch("http://71.227.163.23:8082/api/geoJSON")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          geoJSON: res,
          isLoaded: true
        });
      },
        () => {
          console.log("error in geoJSON fetch");
        })
    // async function fetchGeoJSON() {
    //   const response = await fetch("http://71.227.163.23:8082/api/geoJSON");
    //   console.log(response);
    //   this.setState({ geoJSON: response.json() });
    // };
  };


  render() {
    return (
      <div className="DisasterMap">
        <MapContainer center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.isLoaded && (
            <GeoJSON key={this.state.geoJSON._id} style={this.state.geoJSONStyle} data={this.state.geoJSON} />
          )}
        </MapContainer>
      </div>
    )
  }
}







// //////////////////////////////////////////
// function DisasterMap2() {
//   //coloring scheme for weighted data (count), see fx style()
//   //potentially rename count variable to percentage for dynamic types of counts
//   function getColor(count) {
//     return count > 222 ? "#3eb80e" :
//       count > 140 ? "#509923" :
//         count > 75 ? "#789E2D" :
//           count > 300 ? "#A1A436" :
//             count > 0 ? "#C9A83E" :
//               "#F06E45";
//   }

//   //style for geoJSON layer
//   function style(feature) {
//     return {
//       fillColor: getColor(feature.properties.count),
//       weight: 1,
//       opacity: 1,
//       color: "black",
//       fillOpacity: .6
//     };
//   }

//   //fetch GeoJSON from db
//   useEffect(() => {
//     fetchGeoJSON();
//   }, []);

//   const [geoJSON, setGeoJSON] = useState([]);

//   const fetchGeoJSON = async () => {
//     const geoJSON = await fetch("http://71.227.163.23:8082/api/geoJSON");
//     const response = await geoJSON.json();
//     console.log(response);
//     setGeoJSON(response);
//   }



//   const [selected, setSelected] = useState([]);


//   function highlightFeature(e) {
//     var layer = e.target;
//     const { name, disasterType, count } = e.target.feature.properties;
//     setSelected({
//       district: name,
//       count: count
//     });
//     layer.setStyle({
//       weight: 3,
//       color: "black",
//       fillOpacity: .8
//     });
//   }
//   function resetHighlight(e) {
//     setSelected({});
//     e.target.setStyle(style(e.target.feature));
//   }

//   function showHighlight(e) {

//   }

//   function onEachFeature(feature, layer) {
//     layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//       click: showHighlight
//     });
//   }

//   return (
//     <div className="DisasterMap">
//       <MapContainer center={[36.15, 128.24]} zoom={7}>
//         {!selected.district && (
//           <div className="hover-info">Hover over an area</div>
//         )}
//         {selected.district && (
//           <div className="info">
//             <strong>{selected.district}</strong>
//             <span>{selected.count} counts</span>
//           </div>
//         )}
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {geoJSON && (
//           <GeoJSON key={geoJSON._id} data={geoJSON} style={style} onEachFeature={onEachFeature} />
//         )}
//       </MapContainer>
//     </div>
//   )
// }
