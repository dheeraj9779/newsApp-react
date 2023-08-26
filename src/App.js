import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_APIKEY
  pageSize = 10;
  state = {
      progress: 0
  }

  setProgress = (progress) =>{
      this.setState({
        progress: progress
      })
  }

  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="in" category="general" pageSize={this.pageSize} />} > </Route>
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country="in" category="business" pageSize={this.pageSize} />} > </Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" country="in" category="entertainment" pageSize={this.pageSize} />} > </Route>
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="in" category="health" pageSize={this.pageSize} />} >  </Route>
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country="in" category="science" pageSize={this.pageSize} />} > </Route>
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="in" category="sports" pageSize={this.pageSize} />} > </Route>
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country="in" category="technology" pageSize={this.pageSize} />} > </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
