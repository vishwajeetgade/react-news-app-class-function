import React, { useState } from 'react'
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

const App = () => {
  const [progress, setprogress] = useState(0)
  
  const setProgress = (progress) => {
    setprogress(progress);
  }

    return (
      <Router >
        <div>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <Navbar />
          <Switch>
          <Route exact path="/" render={()=><Redirect to="/science" />}></Route>
          <Route exact path="/science"><News apiKey={apiKey} progress={setProgress} key="science" pageSize={pageSize} country="in" category="science" /></Route>
          <Route exact path="/technology"><News apiKey={apiKey} progress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" /></Route>
          <Route exact path="/sports"><News apiKey={apiKey} progress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" /></Route>
          <Route exact path="/entertainment"><News apiKey={apiKey} progress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" /></Route>
        </Switch>
        </div>
      </Router>
    )
}

export default  App;