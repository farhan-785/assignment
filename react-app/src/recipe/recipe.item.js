import React, { Component } from 'react';
import Form from "react-bootstrap/esm/Form";
import Unit from './../services/unit';
import ItemList from './../services/item.list';


class RecipeItem extends Component {

  constructor(props) {
    super(props);
    this.units = Unit.getUnits();
    this.state = {
      item: this.props.item,
      selectedIndex: -1,
      errors: {
        name: '', unit: this.units[0].value, quantity: ''
      },
      itemsList: []
    };

    this.itemsList = new ItemList();
    this.onChange = this.onChange.bind(this);
    this.getSelectedIndex = this.getSelectedIndex.bind(this);
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.setState({ item: this.props.item, selectedIndex: -1 });
    const index = this.getSelectedIndex();
  }

  async componentDidMount() {
    if ((this.props.edit || this.props.createNew)) {
      const list = await this.itemsList.getAllItems();
      this.setState({ itemsList: list });
    }
  }

  getSelectedIndex() {
    if (!(this.props.item.inventoryItem.length == 0 || this.props.item.ingredient.length === 0))
      return;

    let item = {};
    if (this.props.item.inventoryItem.length > 0) {
      item = this.props.item.inventoryItem[0];
    } else if (this.props.item.ingredient.length > 0) {
      item = this.props.item.ingredient[0];
      item.isIngredient = true;
    }

    const list = this.state.itemsList;

    for (let i in list) {
      var obj = list[i];
      if (item.isIngredient && obj.isIngredient && item.id === obj.id) {
        return i;
      } else if (item.id === obj.id && !obj.isIngredient) {
        return i;
      }
    }
    return -1;
  }

  onChange(event) {
    const { name, value } = event.target;
    const { errors, item } = this.state;
    const list = this.state.itemsList;
    switch (name) {
      case 'item':
        const obj = list[value];
        item.ingredient = [];
        item.inventoryItem = [];
        if (!obj)
          break;
        if (obj.isIngredient) {
          const ingredient = obj;
          delete ingredient['isIngredient'];
          item.ingredient[0] = ingredient;
        } else {
          const inventory = obj;
          item.inventoryItem[0] = inventory;
        }
        this.setState({ item, selectedIndex: value });
        break;
      case 'quantity':
        errors.quantity = !isNaN(value) && (value < 1 || value > 999) ? 'price must be between 1 - 999  ' : '';
        item.quantity = value;
        this.setState({ item, errors })
        break;
      case 'unit':
        item.unit = value;
        this.setState({ item, errors })
        break;
    }

    this.setState({ errors: errors });
  }


  render() {

    const addImgStyle = {
      width: 15,
      height: 15,
      margin: 'auto 15px',
      cursor: 'pointer'
    }

    const errorStyle = {
      fontSize: 11,
      color: 'red',
      margin: '2px auto'
    }

    return (
      <tr>
        <td>{this.props.index}</td>
        {
          this.props.edit || this.props.createNew
            ?
            <td>

              <Form.Control as="select" name='item' value={this.getSelectedIndex()}
                            onChange={this.onChange}>
                <option value='-1'>Select Type</option>
                {this.state.itemsList.map((item, i) => <option key={i} value={i}>{item.name}</option>)}
              </Form.Control>
            </td>
            :
            <td>{this.state.item.inventoryItem.length > 0 ? this.state.item.inventoryItem[0].name : this.state.item.ingredient.length > 0 ? this.state.item.ingredient[0].name : ''}</td>
        }

        {
          this.props.edit || this.props.createNew
            ?
            <td>
              <Form.Control name='quantity' type="number" value={this.state.item.quantity} max='{99999}'
                            placeholder="Enter Quantity"
                            onChange={this.onChange}/>
              {this.state.errors.quantity.length > 0 ?
                <span style={errorStyle}>{this.state.errors.quantity}</span> : null}
            </td>
            : <td>{this.state.item.quantity}</td>
        }
        {
          this.props.edit || this.props.createNew
            ?
            <td>
              <Form.Control as="select" name='unit' defaultValue={this.state.item.unit} onChange={this.onChange}>
                {this.units.map((unit, i) => <option key={i} value={unit.value}>{unit.name}</option>)}
              </Form.Control>
            </td>
            : <td>{Unit.getUnitName(this.state.item.unit)}</td>
        }

        {
          this.props.edit || this.props.createNew
            ?
            <td className='text-right'>
              <img src='/public/delete.png' style={addImgStyle} alt='' onClick={this.props.removeItem}/>
            </td>
            :
            null
        }
      </tr>
    )
  }
}

export default RecipeItem;