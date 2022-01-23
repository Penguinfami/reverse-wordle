import React from 'react';
import LetterTile from './LetterTile';

const WordBoard = (props) => {

    const toTile = (status, symbol, id) => {
        switch(status){
            case props.statuses.green:
                return<LetterTile key={id} id={`${id}green`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-success"/>
            case props.statuses.yellow:
                return<LetterTile key={id} id={`${id}yellow`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-warning"/>
            case props.statuses.grey:
                return<LetterTile key={id} id={`${id}grey`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-secondary"/>
        }
         
    }

    return (
        <div className="wordBoard mx-auto d-flex flex-column">
            <div key="topButtons" className="wordBoardTiles d-flex justify-content-between p-0">
                {!props.gameOver ?  
                <button 
                className="rounded-pill border-0" 
                onClick={() => props.gameStarted ? props.giveUp() : null}
                style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3A3A3E' : 'white'}}>   
                    GIVE UP
                </button>
                : props.gameStarted ? 
                <button 
                    className="rounded-pill border-0" 
                    onClick={() => props.giveUp() }
                    style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3A3A3E' : 'white'}}>   
                        VIEW EXAMPLE ANSWERS
                </button> 
                : null
                }

                {props.gameStarted ? <h6 className="lh-base mb-0">{props.currentRow + 1}/6</h6> : null}             
            </div>
            <div  key="originalWord" className="wordRow border-2 d-flex justify-content-center">
                { props.setup.originalWord.split('').map((letter, index) => toTile(props.statuses.green, letter, `${index}origin`))}
            </div>
            {
                props.setup.rows.map(
                    (row, rowNum) => 
                    <div key={`row${row.key}${rowNum}`}
                        className={`wordRow justify-content-center border-2 d-flex flex-row ${props.currentRow === rowNum ? `currentRow ${props.darkMode ? 'border-white' : 'border-dark'}` : '' }`}>{row.combination.split('').map((tile, index) => toTile(tile, row.word[index], `word${index}${rowNum}`))}
                    </div>
                )
            }
        </div>
    );
};

export default WordBoard;
