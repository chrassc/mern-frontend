import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import readOpenAPI from './components/ReadOpenAPI';
import updateOpenAPI from './components/UpdateOpenAPI';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={readOpenAPI} />
          <Route path='/update-openAPI' component={updateOpenAPI} />
        </div>
      </Router>
    );
  }
}

export default App;