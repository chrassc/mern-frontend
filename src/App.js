import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import ReadOpenAPI from "./components/ReadOpenAPI";
import UpdateOpenAPI from "./components/UpdateOpenAPI";
import DisasterTable from "./components/DisasterTable";

import Nav from "./components/Nav";
import Home from "./components/Home";
import DisasterList from "./components/DisasterList";
import DisasterMap from "./components/DisasterMap";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/update-openAPI" component={UpdateOpenAPI} />
          <Route path ="/disaster-map" component={DisasterMap} />
          <Route path ="/disaster-list" component={DisasterList} />
        </Switch>
      </div>
    </Router>
  )
}

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div>
//           <Route exact path="/" component={ReadOpenAPI} />
//           <Route path="/update-openAPI" component={UpdateOpenAPI} />
//         </div>
//       </Router>
//     );
//   }
// }

export default App;