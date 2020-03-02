import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import RecipeDetails from './../recipe/recipe.details';
import HttpService from './../services/http.service';


class MenuDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { name: '', recipe: { recipeItems: [this.getEmptyItem()] } },
      errors: {
        name: '',
        price: '',
        quantity: ''
      },
      validated: false,
      edit: this.props.match.url.indexOf('edit') > 0,
      createNew: this.props.match.url.indexOf('new') > 0,
      itemsList: []
    }


    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.insertEmptyItem = this.insertEmptyItem.bind(this);
    this.saveMenu = this.saveMenu.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
  }

  validate() {
    this.validateInput('name', this.state.item.name);
    this.validateInput('price', this.state.item.price);
    this.validateInput('quantity', this.state.item.quantity);
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
        errors.price = isNaN(value) || (value < 1 || value > 9999) ? 'price must be between 1 - 9999' : '';
        validate = errors.price.length === 0;
        break;
      case 'quantity':
        errors.quantity = isNaN(value) || (value < 1 || value > 999) ? 'price must be between 1 - 999' : '';
        validate = errors.quantity.length === 0;
        break;
      default:
        break;
    }

    const item = this.state.item;
    item[key] = value;

    this.setState({ errors, item, validated: validate });
  }

  onChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.validateInput(name, value);
  }

  insertEmptyItem() {
    const { item } = this.state;
    item.recipe.recipeItems.push(this.getEmptyItem());
    this.setState({ item });
  }

  removeItem(id) {
    const { item } = this.state;
    const recipeItems = item.recipe.recipeItems.filter((item) => item.id !== id);
    item.recipe.recipeItems = recipeItems.length === 0 ? [this.getEmptyItem()] : recipeItems;
    this.setState({ item: item });
  }

  getEmptyItem() {
    return {
      id: Math.random(),
      quantity: '',
      unit: '',
      inventoryItem: [],
      ingredient: []
    }
  }

  async getMenu() {
    const menu = await HttpService.get(`/menus/${this.props.match.params.itemId}`);
    if (!menu.recipe)
      menu.recipe = { recipeItems: [this.getEmptyItem()] };
    this.setState({ item: menu });
  }

  async componentDidMount() {

    if (!this.props.match.params.itemId)
      return;

    try {
      await this.getMenu();
    } catch (e) {
      console.log(e);
    }
  }

  hasValidRecipeItems() {
    const { recipeItems } = this.state.item.recipe;
    for (let i in recipeItems) {
      if (!recipeItems[i].inventoryItem && !recipeItems[i].ingredient)
        return false;
      else if (!recipeItems[i].quantity || recipeItems[i].quantity === '' || recipeItems[i].quanity < 1 || recipeItems[i].quantity > 999)
        return false;
    }
    return true;
  }

  removeInvalidIds() {
    const { item } = this.state;
    item.recipe.recipeItems = item.recipe.recipeItems.map((item) => {
      if (item.id < 1) delete item.id;
      return item;
    });
    this.setState({ item });
  }

  async saveMenu() {
    const validate = this.state.item.name != '' && this.hasValidRecipeItems();
    this.removeInvalidIds();
    this.setState({ validate });
    if (validate) {
      if (this.state.edit) {
        await this.props.updateMenu(this.state.item);
      } else if (this.state.createNew) {
        await this.props.addMenu(this.state.item);
      }
    }
  }

  async calculateCost() {
    const item = this.state.item;
    const response = await HttpService.get(`/menus/${this.props.match.params.itemId}/cost`);
    item.cost = response.cost;
    this.setState({ item: item });
  }

  render() {
    const itemStyle = {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#dee2e6',
      padding: '40px 20px'
    }

    const errorStyle = {
      fontSize: 11,
      color: 'red',
      margin: '2px auto'
    }

    if (this.state.item) {
      return <div style={itemStyle}>
        {
          this.state.edit || this.state.createNew ?
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control name='name' type="text" maxLength='30' placeholder="Enter Menu Name"
                            value={this.state.item.name}
                            onChange={this.onChange}/>
              {this.state.errors.name.length > 0 ? <span style={errorStyle}>{this.state.errors.name}</span> : null}
            </Form.Group>
            :
            <h2 className='text-center'>{this.state.item.name}</h2>
        }
        <div className='row'>
          <div className='col-lg-4'>
            {
              this.state.edit || this.state.createNew ?
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>price</Form.Label>
                  <Form.Control name='price' type="number" max='9999' placeholder="Enter Menu Price"
                                value={this.state.item.price}
                                onChange={this.onChange}/>
                  {this.state.errors.price.length > 0 ?
                    <span style={errorStyle}>{this.state.errors.price}</span> : null}
                </Form.Group>
                :
                <div>
                  <h6>Price </h6><h4>{this.state.item.price}</h4>
                </div>
            }
          </div>
          <div className='col-lg-4'>
            {
              this.state.item.cost ?
                <div className='text-center'>
                  <h6>Cost: </h6><h4>{this.state.item.cost}</h4>
                </div>
                : null
            }
          </div>
          <div className='col-lg-4'>
            {
              this.state.edit || this.state.createNew ?
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control name='quantity' type="number" max='9999' placeholder="Enter Menu Price"
                                value={this.state.item.quantity}
                                onChange={this.onChange}/>
                  {this.state.errors.quantity.length > 0 ?
                    <span style={errorStyle}>{this.state.errors.quantity}</span> : null}
                </Form.Group>
                :
                <div className='text-right'>
                  <h6>Quantity </h6><h4>{this.state.item.quantity}</h4>
                </div>
            }
          </div>
        </div>
        <hr/>
        <RecipeDetails
          recipe={this.state.item.recipe} insertEmptyItem={this.insertEmptyItem}
          removeItem={this.removeItem} edit={this.state.edit} createNew={this.state.createNew}
          itemsList={this.state.itemsList}/>

        {this.state.validate === false ? <p style={errorStyle}>Please add valid information and recipe items</p> : null}
        {this.state.edit === true || this.state.createNew === true ?
          <div className='text-right' style={{ marginTop: 30 }}>
            <Button variant='primary' onClick={this.saveMenu}
                    disabled={this.state.item.name === ''}
                    style={{ width: 150 }}>Save</Button>
          </div>
          : null
        }

        {!this.state.edit === true && !this.state.createNew ?
          <div className='text-right' style={{ marginTop: 30 }}>
            <Button variant='primary' onClick={this.calculateCost}
                    disabled={this.state.validated}
                    style={{ width: 150 }}>CalculateCost</Button>
          </div>
          : null
        }
      </div>
    } else
      return (null)
  }
}

export default MenuDetail;