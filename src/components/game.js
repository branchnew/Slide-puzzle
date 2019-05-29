import React, { Component } from 'react';
import Tile from './tile';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ],
            empty: [3, 2]
        };
    }


    find = (number, array) => {
        let pos = [0, 0];
        array.forEach((element, row) => {
            const column = element.findIndex(value => value === number);
            if(column > -1) {
                pos = [row, column];
            }
        });
        return pos;
    };

    replace = (number, pos) => {
        const empty = this.state.empty;
        if ((pos[0] === empty[0] && (pos[1] === empty[1]+1 || pos[1] === empty[1]-1))
            || (pos[1] === empty[1] && (pos[0] === empty[0]+1 || pos[0] === empty[0]-1))) {
            const numbers = this.state.numbers;
            numbers[pos[0]][pos[1]] = 0;
            numbers[empty[0]][empty[1]] = number;
            this.setState({
                numbers,
                empty: pos
            })
        }
    };

    move = (number) => () => {
        if(!number) return;
        const pos = this.find(number, this.state.numbers);
        this.replace(number, pos);
    };

    shuffle = () => {
        const numbers = this.state.numbers;
        const monoArr = numbers.reduce((acc, elem) => acc.push(...elem) && acc, []);
        for (let i = monoArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [monoArr[i], monoArr[j]] = [monoArr[j], monoArr[i]];
        }

        const arr = Array.from(Array(this.state.numbers.length).keys())
            .map(() => monoArr.splice(0, this.state.numbers.length));

        this.setState({
            numbers: arr,
            empty: this.find(0, arr)
        });
    };

    win = () => {
        const numbers = this.state.numbers;
        const result = numbers.reduce((acc, elem) => acc.push(...elem) && acc, [])
            .splice(0, Math.pow(numbers.length, 2)-1)
            .reduce((acc, elem) => acc && elem >= acc && elem, true);
        console.log(result);
        if(result) return("You win!");
    };

    render() {
        const rows = this.state.numbers.map(row => {
            const columns = row.map( (number, idx) => <Tile key={ idx } value={number} move={this.move}/>);

            return (
                <div>
                    <tr key={ row }>
                        { columns }
                    </tr>
                </div>
            );
        });
        return (
            <div className={'table_wrapper'}>
                <table className={'table is-fullwidth'}>
                    <thead className={'win_btn'}>
                        { this.win() }
                    </thead>
                    <tbody className={'puzzle'}>
                        { rows }
                    </tbody>
                    <tfoot className={'btn'}>
                        <button className={'button is-primary'} onClick={ this.shuffle }>
                            shuffle
                        </button>
                    </tfoot>
                </table>
            </div>
        );
    }
}


export default Game;