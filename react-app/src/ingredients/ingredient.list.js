import React, { Component } from 'react';
import IngredientDetail from './ingredient.detail';
import IngredientItem from './ingredient.item';
import { Table } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import EmptyRecordMessage from './../messages/empty-record-message';
import HttpService from './../services/http.service';

class Ingredient extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      items: [],
      error: false
    }
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  async addIngredient(item) {
    const response = await HttpService.call(`/ingredients/`, 'POST', item);
    const { items } = this.state;
    items.push(response);
    this.setState({ loaded: true, items });
  }

  async removeIngredient(id) {
    await HttpService.call(`/ingredients/${id}`, 'DELETE');
    const items = this.state.items.filter((item) => item.id !== id);
    this.setState({ items });
  }

  async updateIngredient(item) {
    const response = await HttpService.call(`/ingredients/${item.id}`, 'PUT', item);
    const items = this.state.items;
    const index = items.indexOf(items.find(({ id }) => id === item.id))
    items[index] = item;
    this.setState({ items });
  }

  async loadItems() {
    try {
      const list = await HttpService.get(`/ingredients`);
      this.setState({ loaded: true, error: false, items: list });
    } catch (e) {
      this.setState({ error: true })
    }
  }

  async componentDidMount() {
    this.loadItems()
  }

  render() {

    const addImgStyle = {
      width: 30,
      height: 30
    }

    const reloadImgStyle = {
      width: 30,
      height: 30,
      margin: 10
    }

    return (
      <div className='row' style={{ minWidth: 500 }}>
        <div className={'col-lg-5'}>
          {this.state.items.length > 0 ?
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {this.state.items.map((item, i) => (
                <IngredientItem key={i} index={i + 1} item={item} removeIngredient={this.removeIngredient}/>))}
              </tbody>
            </Table>
            : <EmptyRecordMessage/>
          }
        </div>
        <div className='col-lg-7'>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link><img src='/public/reload.png' style={reloadImgStyle} alt=''
                         onClick={this.loadItems}/></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`${this.props.match.path}/new`}>
                <img src='/public/add.png' style={addImgStyle} alt=''/></Link>
            </li>
          </ul>

          <Route path={`${this.props.match.path}/new`}
                 component={(props) => <IngredientDetail {...props} addIngredient={this.addIngredient}/>}/>
          <Route path={`${this.props.match.path}/:itemId/details`}
                 component={(props) => <IngredientDetail {...props}/>}/>
          <Route path={`${this.props.match.path}/:itemId/edit`}
                 component={(props) => <IngredientDetail {...props} updateIngredient={this.updateIngredient}/>}/>
        </div>
      </div>
    )
  }
}

export default Ingredient;