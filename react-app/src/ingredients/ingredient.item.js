import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HttpService from './../services/http.service';

class IngredientItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const actionImgStyle = {
      width: 15,
      height: 15,
      margin: 'auto 15px',
      cursor: 'pointer'
    }

    return (
      <tr>
        <td>{this.props.index}</td>
        <td style={{ width: '40%' }}>{this.props.item.name}</td>
        <td>
          <div className='text-right'>
            <Link to={`/ingredient/${this.props.item.id}/details`}>
              <img src='/public/details.png' style={actionImgStyle} alt=''/>
            </Link>
            <Link to={`/ingredient/${this.props.item.id}/edit`}>
              <img src='/public/edit.png' style={actionImgStyle} alt=''/>
            </Link>
            <img src='/public/delete.png' style={actionImgStyle}
                 onClick={() => this.props.removeIngredient(this.props.item.id)} alt=''/>
          </div>
        </td>
      </tr>
    )
  }
}

export default IngredientItem;