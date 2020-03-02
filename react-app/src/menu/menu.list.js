import React, { Component } from 'react';
import MenuDetail from './menu.detail';
import MenuItem from './menu.item';
import { Table } from "react-bootstrap";
import { Link, Route, Redirect } from "react-router-dom";
import EmptyRecordMessage from './../messages/empty-record-message';
import HttpService from './../services/http.service';

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      items: [],
      error: false
    }
    this.addMenu = this.addMenu.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  async addMenu(item) {
    const response = await HttpService.call(`/menus/`, 'POST', item);
    const { items } = this.state;
    items.push(item);
    this.setState({ loaded: true, items });
  }

  async removeMenu(id) {
    await HttpService.call(`/menus/${id}`, 'DELETE');
    const items = this.state.items.filter((item) => item.id !== id);
    this.setState({ items });
  }

  async updateMenu(item) {
    const response = await HttpService.call(`/menus/${item.id}`, 'PUT', item)
    const items = this.state.items;
    const index = items.indexOf(items.find(({ id }) => id === item.id))
    items[index] = item;
    this.setState({ items });
  }

  async loadItems() {
    try {
      const list = await HttpService.get(`/menus`);
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
        <div className={'col-lg-6'}>
          {this.state.items.length > 0 ?
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {this.state.items.map((item, i) => (
                <MenuItem key={i} index={i + 1} item={item} removeMenu={this.removeMenu}/>))}
              </tbody>
            </Table>
            : <EmptyRecordMessage/>
          }
        </div>
        <div className='col-lg-6'>
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
                 component={(props) => <MenuDetail {...props} addMenu={this.addMenu}/>}/>
          <Route path={`${this.props.match.path}/:itemId/details`}
                 component={(props) => <MenuDetail {...props}/>}/>
          <Route path={`${this.props.match.path}/:itemId/edit`}
                 component={(props) => <MenuDetail {...props} updateMenu={this.updateMenu}/>}/>
        </div>
      </div>
    )
  }
}

export default Menu;