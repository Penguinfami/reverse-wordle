import LetterTile from './LetterTile';
const Info = (props) => {
  return (
    <div style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3E3E3E' : 'white'}}
        className="d-flex px-2 py-4 flex-column align-items-center">
        <h1>How To Play</h1>
        
        <div className="text-start p-2 d-flex flex-column">
            <span>A spin on the hit game WORDLE.</span>
            <span>
                In this version, the final word is already given. Fill in <em>5 possible guesses</em> that match the color of the tiles in each row. 
            </span>
            <span>Each guess must be a valid 5 letter word. Hit the enter button to submit.</span>
        </div>

        <div className="examples p-2 text-center">
            <h3>Examples</h3>

            <h5>The word is ALONE</h5>
            <div className="d-flex flex-row mb-3">
                <LetterTile key="1" status="bg-success" symbol="A"/>
                <LetterTile key="2" status="bg-success" symbol="L"/>
                <LetterTile key="3" status="bg-success" symbol="O"/>
                <LetterTile key="4" status="bg-success" symbol="N"/>
                <LetterTile key="5" status="bg-success" symbol="E"/>
            </div>
            <h5>Given these tiles</h5>
            <div className="d-flex flex-row mb-3">
                <LetterTile key="1" status="bg-warning" symbol=""/>
                <LetterTile key="2" status="bg-warning" symbol=""/>
                <LetterTile key="3" status="bg-warning" symbol=""/>
                <LetterTile key="4" status="bg-success" symbol=""/>
                <LetterTile key="5" status="bg-secondary" symbol=""/>
            </div>
            <h5>One possible guess would be LOANS</h5>
            <div className="d-flex flex-row mb-3">
                <LetterTile key="1" status="bg-warning" symbol="L"/>
                <LetterTile key="2" status="bg-warning" symbol="O"/>
                <LetterTile key="3" status="bg-warning" symbol="A"/>
                <LetterTile key="4" status="bg-success" symbol="N"/>
                <LetterTile key="5" status="bg-secondary" symbol="S"/>
            </div>
        </div>
    </div>
  );
};

export default Info;
