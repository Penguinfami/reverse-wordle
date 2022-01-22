import React from 'react';
import LetterTile from './LetterTile';

const WordBoard = (props) => {

    const toTile = (status, symbol, id) => {
        switch(status){
            case props.statuses.green:
                return<LetterTile id={`${id}`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-success"/>
            case props.statuses.yellow:
                return<LetterTile id={`${id}`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-warning"/>
            case props.statuses.grey:
                return<LetterTile id={`${id}`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-secondary"/>
        }
         
    }

    return (
        <div className="wordBoard mx-auto d-flex flex-column">
            <div  key="originalWord" className="wordRow border-2 d-flex justify-content-center">
                { props.setup.originalWord.split('').map((letter, index) => toTile(props.statuses.green, letter, index))}
            </div>
            {
                props.setup.rows.map(
                    (row, rowNum) => <div key={row.key} className={`wordRow justify-content-center border-2 d-flex flex-row ${props.currentRow === rowNum ? 'currentRow bg-info' : '' }`}>{row.combination.split('').map((tile, index) => toTile(tile, row.word[index], index))}</div>
                )
            }
        </div>
    );
};

export default WordBoard;
