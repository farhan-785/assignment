import React, { Component } from 'react';
import InventoryDetail from './inventory.detail';
import InventoryItem from './inventory.item';
import { Table } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import EmptyRecordMessage from './../messages/empty-record-message';
import HttpService from './../services/http.service';

class Inventory extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      items: [],
      error: false
    }
    this.insertInventoryItem = this.insertInventoryItem.bind(this);
    this.removeInventoryItem = this.removeInventoryItem.bind(this);
    this.updateInventoryItem = this.updateInventoryItem.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  insertInventoryItem(item) {
    const { items } = this.state;
    items.push(item);
    this.setState({ loaded: true, items });
  }

  removeInventoryItem(id) {
    const items = this.state.items.filter((item) => item.id !== id);
    this.setState({ items });
  }

  updateInventoryItem(item) {
    const items = this.state.items;
    const index = items.indexOf(items.find(({ id }) => id === item.id))
    items[index] = item;
    this.setState({ items });
  }

  async loadItems() {
    try {
      const list = await HttpService.get(`/inventory`);
      this.setState({ loaded: true, error: false, items: list });
    } catch (e) {
      this.setState({ error: true })
    }
  }

  async componentDidMount() {
    await this.loadItems();
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
        <div className={'col-lg-8'}>
          {this.state.items.length > 0 ?
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Unit</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {this.state.items.map((item, i) => (
                <InventoryItem key={i} index={i + 1} item={item} onInventoryRemove={this.removeInventoryItem}/>))}
              </tbody>
            </Table>
            : <EmptyRecordMessage/>
          }
        </div>
        <div className='col-lg-4'>
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
                 component={(props) => <InventoryDetail {...props} onInventoryAdd={this.insertInventoryItem}/>}/>
          <Route path={`${this.props.match.path}/:itemId/edit`}
                 component={(props) => <InventoryDetail {...props} onInventoryUpdate={this.updateInventoryItem}/>}/>
        </div>
      </div>
    )
  }
}

export default Inventory;