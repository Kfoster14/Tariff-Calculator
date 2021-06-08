import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import About from './components/About'
import Calc from './components/Calc'
import NotFound from './components/NotFound'


const App = () => {
  return (
    <Router>
      <ul>
        <li><Link to="/">About</Link></li>
        <li><Link to="/calc">Calculator</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/calc" component={Calc} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
