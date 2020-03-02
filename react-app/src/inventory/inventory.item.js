import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HttpService from './../services/http.service';
import Unit from './../services/unit';

class InventoryItem extends Component {

  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  async removeItem() {
    try {
      await HttpService.call(`/inventory/${this.props.item.id}`, 'DELETE');      this.props.onInventoryRemove(this.props.item.id);

    } catch (e) {
      console.log(e);
    }
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
        <td>{this.props.item.price}</td>
        <td>{Unit.getUnitName(this.props.item.unit)}</td>
        <td>
          <div className='text-right'>
            <Link to={`/inventory/${this.props.item.id}/edit`}>
              <img src='/public/edit.png' style={actionImgStyle} alt=''/>
            </Link>
            <img src='/public/delete.png' style={actionImgStyle} alt='' onClick={this.removeItem}/>
          </div>
        </td>
      </tr>
    )
  }
}

export default InventoryItem;