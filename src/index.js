import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Cube } from "./panorama/cube";
import { Sphere } from "./panorama/sphere";
import { SceneBackground } from "./panorama/sceneBackground";

function Home () {
  return (
    <div>
      <ul>
        <li><Link to="/cube">cube</Link></li>
        <li><Link to="/sphere">sphere</Link></li>
        <li><Link to="/sceneBackground">sceneBackground</Link></li>
      </ul>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/cube">
            <Cube />
          </Route>
          <Route path="/sphere">
            <Sphere />
          </Route>
          <Route path="/sceneBackground">
            <SceneBackground />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
