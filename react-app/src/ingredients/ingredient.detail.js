import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import RecipeDetails from './../recipe/recipe.details';
import Unit from './../services/unit';
import HttpService from './../services/http.service';

class IngredientDetail extends Component {
  constructor(props) {
    super(props);
    this.units = Unit.getUnits();
    this.state = {
      item: { name: '', unit: this.units[0].value, recipe: { recipeItems: [this.getEmptyItem()] } },
      errors: {
        name: '',
        price: '',
        unit: ''
      },
      validated: false,
      edit: this.props.match.url.indexOf('edit') > 0,
      createNew: this.props.match.url.indexOf('new') > 0
    }
    this.onChange = this.onChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.insertEmptyItem = this.insertEmptyItem.bind(this);
    this.saveIngredient = this.saveIngredient.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
  }

  validateInput(key, value) {
    const errors = this.state.errors;
    let validate = true;
    switch (key) {
      case 'name':
        errors.name = value.length === 0 ? 'Name Can not be empty' : '';
        validate = errors.name.length === 0;
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

  // remove recipe item from recipe items list by filter where id doesn't match
  removeItem(id) {
    const { item } = this.state;
    const recipeItems = item.recipe.recipeItems.filter((item) => item.id !== id);
    item.recipe.recipeItems = recipeItems.length === 0 ? [this.getEmptyItem()] : recipeItems;
    this.setState({ item: item });
  }

  //insert new recipe item in ingredients list
  getEmptyItem() {
    return {
      id: Math.random(), //empty id for key indexing of element
      quantity: '',
      unit: '',
      inventoryItem: [],
      ingredient: []
    }
  }

  async getInventoryList() {
    return HttpService.get('/inventory');
  }

  async getIngredients() {
    return HttpService.get('/ingredients');
  }


  async getIngredient() {
    const { item } = this.state;
    const ingredient = await HttpService.get(`/ingredients/${this.props.match.params.itemId}`);
    if (!ingredient.recipe)
      ingredient.recipe = { recipeItems: [this.getEmptyItem()] };
    this.setState({ item: ingredient });
  }

  async componentDidMount() {

    if (!!this.props.match.params.itemId)
      await this.getIngredient();
  }

  hasValidRecipeItems() {
    const { recipeItems } = this.state.item.recipe;
    for (let i in recipeItems) {
      if (recipeItems[i].inventoryItem.length === 0 && recipeItems[i].ingredient.length === 0)
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

  async saveIngredient() {
    const validate = this.state.item.name != '' && this.hasValidRecipeItems();
    this.removeInvalidIds();
    this.setState({ validate });
    if (validate) {
      if (this.state.edit) {
        return this.props.updateIngredient(this.state.item);
      } else if (this.state.createNew) {
        return this.props.addIngredient(this.state.item);
      }
    }
  }

  async calculateCost() {
    const response = await HttpService.get(`/ingredients/${this.props.match.params.itemId}/cost`);
    const item = this.state.item;
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
              <Form.Control name='name' type="text" maxLength='30' placeholder="Enter Ingredient Name"
                            value={this.state.item.name}
                            onChange={this.onChange}/>
              {this.state.errors.name.length > 0 ? <span style={errorStyle}>{this.state.errors.name}</span> : null}
            </Form.Group>
            :
            <div>
              <h2 className='text-center'>{this.state.item.name}</h2>

              {this.state.item.cost ?
                <div>
                  <label>Cost: </label>
                  <h3> {this.state.item.cost} / {this.state.item.unit}</h3>
                </div>
                : null}
            </div>
        }
        {
          this.state.edit || this.state.createNew ?
            <Form.Group controlId="formBasicEmail">
              <Form.Control as="select" name='unit' value={this.state.item.unit} onChange={this.onChange}>
                {this.units.map((unit, i) => <option key={i} value={unit.value}>{unit.name}</option>)}
              </Form.Control>
            </Form.Group>
            :
            null
        }
        <hr/>
        <RecipeDetails
          recipe={this.state.item.recipe} insertEmptyItem={this.insertEmptyItem}
          removeItem={this.removeItem} edit={this.state.edit} createNew={this.state.createNew}
        />

        {this.state.validate === false ? <p style={errorStyle}>Please add valid recipe items</p> : null}

        {this.state.edit === true || this.state.createNew === true ?
          <div className='text-right' style={{ marginTop: 30 }}>
            <Button variant='primary' onClick={this.saveIngredient}
                    disabled={this.state.item.name === ''}
                    style={{ width: 150 }}>Save</Button>
          </div>
          : null
        }

        {!this.state.edit === true && !this.state.createNew ?
          <div className='text-right' style={{ marginTop: 30 }}>
            <Button variant='primary' onClick={this.calculateCost}
                    disabled={this.state.item.name === ''}
                    style={{ width: 150 }}>CalculateCost</Button>
          </div>
          : null
        }
      </div>
    } else
      return (null)
  }
}

export default IngredientDetail;