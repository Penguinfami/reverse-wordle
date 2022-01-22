import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackspace } from "@fortawesome/free-solid-svg-icons"
const Keyboard = (props) => {
  return (
    <div className="keyboard d-flex flex-column align-items-stretch">
        { props.keys.map((row, rowNumber) => 
        <div className="keyboardRow d-flex flex-row justify-content-center">
            {rowNumber === props.keys.length - 1 ? <button className="keyboardKey" onClick={() => props.onEnter()}>ENTER</button> : null}
            {row.map(
                (symbol) => 
                    <button key={symbol} className="keyboardKey border-1 bg-info rounded keyboardLetter text-capitalize" onClick={() => props.onType(symbol)}>{symbol}</button>
                )}
            {rowNumber === props.keys.length - 1 ? 
              <button className="keyboardKey" onClick={() => props.onBack()}>
                <FontAwesomeIcon icon={faBackspace}/>
              </button> 
              : null}

        </div>   
        )
        }

    </div>
  );
};

export default Keyboard;
