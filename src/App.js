import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Home from "./components/Home";
import DisasterList from "./components/DisasterList";
import DisasterMap from "./components/DisasterMap";
import Map from "./components/Map";
import MapSearch from "./components/MapSearch";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path ="/disaster-map" component={DisasterMap} />
          <Route path ="/disaster-list" component={DisasterList} />
          <Route path ="/map" component={Map} />
          <Route path ="/map-search" component={MapSearch} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;