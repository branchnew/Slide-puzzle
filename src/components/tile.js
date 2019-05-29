import React, { Component } from 'react';

class Tile extends Component {

    render() {
        let value = this.props.value;
        if(this.props.value === 0) {
            value = '';
        }
        return (
            <th className={'case'} onClick={this.props.move(value)}>
                { value }
            </th>
        );
    }
}

export default Tile;