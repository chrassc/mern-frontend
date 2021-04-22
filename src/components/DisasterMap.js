import React, { Component, useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "../App.css";

function DisasterMap() {
  //coloring scheme for weighted data (count), see fx style()
  //potentially rename count variable to percentage for dynamic types of counts
  function getColor(count) {
    return count > 222 ? "#3eb80e" :
      count > 140 ? "#509923" :
        count > 75 ? "#789E2D" :
          count > 300 ? "#A1A436" :
            count > 0 ? "#C9A83E" :
              "#F06E45";
  }

  //style for geoJSON layer
  function style(feature) {
    return {
      fillColor: getColor(feature.properties.count),
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: .6
    };
  }

  //fetch GeoJSON from db
  useEffect(() => {
    fetchGeoJSON();
  }, []);

  const [geoJSON, setGeoJSON] = useState([]);

  const fetchGeoJSON = async () => {
    const geoJSON = await fetch("http://71.227.163.23:8082/api/geoJSON");
    const response = await geoJSON.json();
    console.log(response[0]);
    setGeoJSON(response[0]);
  }


  const [selected, setSelected] = useState([]);

  function highlightFeature(e) {
    var layer = e.target;
    const { name, disasterType, count } = e.target.feature.properties;
    console.log(e.target.feature.properties);
    setSelected({
      district: name,
      count: count
    });
    layer.setStyle({
      weight: 3,
      color: "black",
      fillOpacity: .8
    });
  }
  function resetHighlight(e) {
    setSelected({});
    e.target.setStyle(style(e.target.feature));
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }



  return (
    <div className="DisasterMap">
      <MapContainer center={[36.15, 128.24]} zoom={7} scrollWheelZoom={true}>
        {!selected.district && (
          <div className="hover-info">Hover over an area</div>
        )}
        {selected.district && (
          <div className="info">
            <strong>{selected.district}</strong>
            <span>{selected.count} counts</span>
          </div>
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJSON && (
          <GeoJSON key={geoJSON._id} data={geoJSON} style={style} onEachFeature={onEachFeature} />
        )}
      </MapContainer>
    </div>
  )
}

export default DisasterMap
