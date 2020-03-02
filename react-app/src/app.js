import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import Menu from './menu/menu.list';
import Inventory from './inventory/inventory.list';
import Ingredient from './ingredients/ingredient.list';
import Header from './header.js';
import { browserHistory } from "react-router";

class App extends Component {

  render() {

    return (
      <div>
        <Router history={browserHistory}>
          <Header/>
          <Route path='*' component={(props) => <Redirect to='/menu'/>}/>
          <Route path='/menu' component={Menu}/>
          <Route path='/inventory' component={Inventory}/>
          <Route path='/ingredient' component={Ingredient}/>
        </Router>
      </div>
    )
  }
}

export default App;