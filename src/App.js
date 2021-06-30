import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'react-bootstrap/dist/react-bootstrap.min.js';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Calc from './components/Calc';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <div className="App">
        <Router>
          <NavBar></NavBar>
            <Route exact path="/" component={Home}></Route>
            <Route path="/calculator" component={Calc}></Route>
            <Route path="/notfound" component={NotFound}></Route>
        </Router>
    </div>
    
  )
}

export default App
