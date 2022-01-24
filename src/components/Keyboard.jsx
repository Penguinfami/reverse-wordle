import { useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackspace } from "@fortawesome/free-solid-svg-icons"
const Keyboard = (props) => {

  const handleKeyDown = useCallback((e) => {
      e.preventDefault();
      let key =  `${e.key.toLowerCase()}`;
      if (key >= 'a' && key <= 'z' && key.length === 1){
        props.onType(key)
      } else if (key === 'enter'){
        props.onEnter()
      } else if (key === 'backspace'){
        props.onBack();
      } 
  },[props.onEnter, props.onType, props.onBack]);

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  },[handleKeyDown])

  return (
    <div className="keyboard d-flex flex-column align-items-stretch">
        { props.keys.map((row, rowNumber) => 
        <div key={rowNumber}
          className="keyboardRow d-flex flex-row justify-content-center">
            {rowNumber === props.keys.length - 1 ? <button style={{color: props.darkMode ? '#d6d6d6' : 'black'}} className={`${props.darkMode ? 'bg-secondary' : ''} border-1 px-2 rounded keyboardKey`} onClick={() => {props.onEnter()}}>ENTER</button> : null}
            {row.map(
                (symbol) => 
                    <button key={symbol} style={{color: props.darkMode ? '#d6d6d6' : 'black'}} className={`${props.darkMode ? 'bg-secondary' : ''} keyboardKey border-1 rounded keyboardLetter text-capitalize`} onClick={() =>  props.onType(symbol)}>{symbol}</button>
                )}
            {rowNumber === props.keys.length - 1 ? 
              <button style={{color: props.darkMode ? '#d6d6d6' : 'black'}} className={`keyboardKey ps-2 pe-3 fs-4 border-1 rounded ${props.darkMode ? 'bg-secondary' : ''}`} onClick={() => props.onBack()}>
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
