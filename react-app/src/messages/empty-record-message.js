import React, { Component } from 'react';

class EmptyRecordMessage extends Component {
  render() {
    const style = {
      margin: 'auto',
      position: 'relative',
      top: '50%',
      width: 'fit-content'
    }

    return (
      <div style={{ height: 250 }}>
        <h3 style={style}>Not Record Found</h3>
      </div>
    )
  }
}

export default EmptyRecordMessage;