import "./App.css";
import React, { useState } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () =>  {
  const apiKey = process.env.REACT_APP_NEWS_APIKEY
  const pageSize = 10;
  const [progress, setProgress] = useState(0)


    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" country="in" category="general" pageSize={pageSize} />} > </Route>
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" country="in" category="business" pageSize={pageSize} />} > </Route>
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" country="in" category="entertainment" pageSize={pageSize} />} > </Route>
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" country="in" category="health" pageSize={pageSize} />} >  </Route>
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" country="in" category="science" pageSize={pageSize} />} > </Route>
            <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" country="in" category="sports" pageSize={pageSize} />} > </Route>
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" country="in" category="technology" pageSize={pageSize} />} > </Route>
          </Routes>
        </Router>
      </div>
    );

}

export default App;
