import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './views/home/Home';
import About from './views/about/About';
import Contact from './views/contact/Contact';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home}/>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
    </Route>
  </Router>
), document.getElementById('app'))