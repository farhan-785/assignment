import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import RecipeItem from './recipe.item';

class RecipeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { recipe: this.props.recipe }
  }

  componentDidMount() {
    this.setState({ recipe: this.props.recipe });
  }

  componentWillReceiveProps(props) {
    this.setState({ recipe: props.recipe });
  }

  render() {
    const addImgStyle = {
      width: 20,
      height: 20,
      marginLeft: 40,
      float: 'right',
      cursor: 'pointer'
    }

    return (
      <div>
        <div>
          <h4 style={{ display: 'inline-block', width: '50%' }}>Recipe:</h4>
          {
            this.props.edit || this.props.createNew
              ?
              <img src='/public/add.png' className='text-righ' style={addImgStyle} alt=''
                   onClick={this.props.insertEmptyItem}/>
              : null
          }

        </div>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            {
              this.props.edit || this.props.createNew
                ?
                <th></th>
                :
                null
            }
          </tr>
          </thead>
          <tbody>
          {this.state.recipe.recipeItems.map((item, i) => (
            <RecipeItem
              key={item.id}
              index={i + 1} item={item} edit={this.props.edit} createNew={this.props.createNew}
              removeItem={() => this.props.removeItem(item.id)}
              itemsList={this.props.itemsList}/>
          ))}
          </tbody>
        </Table>

      </div>
    )
  }
}

export default RecipeDetails;