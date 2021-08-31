import React, { Component } from 'react'
import './App.css';
import Navbar from './Navbar';
import News from './News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const pageSize = 5;

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      progress: 0
    }
  }
  
  setProgress = (progress) => {
    this.setState({progress})
  }

  render() {
    return (
      <Router >
        <div>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
          <Navbar />
          <Switch>
          <Route exact path="/" render={()=><Redirect to="/science" />}></Route>
          <Route exact path="/science"><News apiKey={apiKey} progress={this.setProgress} key="science" pageSize={pageSize} country="in" category="science" /></Route>
          <Route exact path="/technology"><News apiKey={apiKey} progress={this.setProgress} key="technology" pageSize={pageSize} country="in" category="technology" /></Route>
          <Route exact path="/sports"><News apiKey={apiKey} progress={this.setProgress} key="sports" pageSize={pageSize} country="in" category="sports" /></Route>
          <Route exact path="/entertainment"><News apiKey={apiKey} progress={this.setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" /></Route>
        </Switch>
        </div>
      </Router>
    )
  }
}
