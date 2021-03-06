import LetterTile from './LetterTile'

const RevealAnswers = (props) => {
const toTile = (status, symbol, id) => {
    switch(status){
        case props.statuses.green:
            return<LetterTile key={id} id={`${id}`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-success"/>
        case props.statuses.yellow:
            return<LetterTile key={id} id={`${id}`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-warning"/>
        case props.statuses.grey:
            return<LetterTile key={id} id={`${id}`} symbol={symbol} cols={props.setup.originalWord.length} status="bg-secondary"/>
    }
        
}
  return (
    <div className="text-center p-2 h-100" 
        style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3E3E3E' : 'white'}}
    >
        <h2 className="mb-0">EXAMPLE ANSWERS FOR `{props.gameWord}`</h2>
        <div className="pb-5" >
            {props.combinations.map(
                (row) => 
                <div key={row.combo} className="mt-3">
                    <div
                        className={`wordRow justify-content-center border-2 d-flex flex-row `}>{row.combo.split('').map((tile, index) => toTile(tile, '', `${index}${row.combo}`))}
                    </div>
                    <div className="text-center lh-1">                       
                        {row.answers.length < 10 ?
                            row.answers.map((answer, index) => 
                                `${answer}${index < row.answers.length - 1 ? ', ' : ''}`)
                        :
                            row.answers.map((answer, index) => index < 10 ?
                            `${answer}${index < 9 ? ', ' : ''}`
                            : '')
                        }
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default RevealAnswers;
