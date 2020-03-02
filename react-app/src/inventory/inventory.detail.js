import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import Unit from './../services/unit';
import HttpService from './../services/http.service';

class InventoryDetail extends Component {
  constructor(props) {
    super(props);
    this.units = Unit.getUnits();
    this.state = {
      item: { name: '', price: '', unit: this.units[0].value },
      errors: {
        name: '',
        price: ''
      },
      validated: false
    }

    this.onChange = this.onChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.validate = this.validate.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  componentWillReceiveProps(props) {
    this.props = props;
  }

  validate() {
    this.validateInput('name', this.state.item.name);
    this.validateInput('price', this.state.item.price);
    return this.state.validated;
  }

  validateInput(key, value) {
    const errors = this.state.errors;
    let validate = true;
    switch (key) {
      case 'name':
        errors.name = value.length === 0 ? 'Name Can not be empty' : '';
        validate = errors.name.length === 0;
        break;
      case 'price':
        errors.price = !isNaN(value) && (value < 1 || value > 9999) ? 'price must be between 1 - 9999' : '';
        validate = errors.price.length === 0;
        break;
      default:
        break;
    }

    const item = this.state.item;
    item[key] = value;

    this.setState({ errors, item, validated: !!validate });
  }

  onChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.validateInput(name, value);
  }

  async saveItem() {
    if (!this.validate())
      return;
    try {
      const response = await HttpService.call('/inventory', 'POST', this.state.item);
      this.props.onInventoryAdd(response);
    } catch (e) {
      console.log(e);
    }
  }

  async updateItem() {
    if (!this.validate())
      return;
    try {
      const response = await HttpService.call(`/inventory/${this.state.item.id}`, 'PUT', this.state.item);
      this.props.onInventoryUpdate(response);
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    if (!this.props.match.params.itemId)
      return;
    try {
      const item = await HttpService.get(`/inventory/${this.props.match.params.itemId}`);
      this.setState({ item: item });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const formStyle = {
      marginTop: 100
    }

    const errorStyle = {
      fontSize: 11,
      color: 'red',
      margin: '2px auto'
    }


    return (
      <Form style={formStyle}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' type="text" maxLength='30' placeholder="Enter Inventory Name"
                        value={this.state.item.name}
                        onChange={this.onChange}/>
          {this.state.errors.name.length > 0 ? <span style={errorStyle}>{this.state.errors.name}</span> : null}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control name='price' type="number" value={this.state.item.price} max='{99999}' placeholder="Enter Price"
                        onChange={this.onChange}/>
          {this.state.errors.price.length > 0 ? <span style={errorStyle}>{this.state.errors.price}</span> : null}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Unit</Form.Label>
          <Form.Control as="select" name='unit' defaultValue={this.state.item.unit} onChange={this.onChange}>
            {this.units.map((unit, i) => <option key={i} value={unit.value}>{unit.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" className='textRight' disabled={this.state.validated === false}
                onClick={!!this.state.item.id ? this.updateItem : this.saveItem}>
          {!!this.state.item.id ? 'Update' : 'Add'}
        </Button>
      </Form>
    )
  }
}

export default InventoryDetail;