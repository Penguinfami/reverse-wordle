import './App.css';
import { useState, useEffect } from 'react';
import WordBoard from './components/WordBoard';
import Keyboard from './components/Keyboard';
import HeaderOptions from './components/HeaderOptions';
import Settings from './components/Settings';
import Info from './components/Info';
import RevealAnswers from './components/RevealAnswers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import modals from './data/modals';
function App() {

  const wordData = require('./data/PossibleAnswers.json');
  const gameData = require('./data/GameData.json');  
  const possibleWords = wordData.words;
   
  const [gameWord, setGameWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [roundWordsUsed, setRoundWordsUsed] = useState([]);
  const [roundCombinations, setRoundCombinations] = useState([]);
  const [boardSetup, setBoardSetup] = useState([{}]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [allCombinations, setAllCombinations] = useState([]);
  const [textModals, toggleModals] = useState(modals);
  const [settingsOpen, toggleSettings] = useState(false);
  const [answersOpen, toggleAnswers] = useState(false);
  const [infoOpen, toggleInfo] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [currentRow, setCurrentRow] = useState(-1);
  const [darkMode, toggleDarkMode] = useState(false);

  function generateCombinations (){
    let arr = []
    generateCombinationsAdd("", arr);
    setAllCombinations(arr);
  }

  function generateCombinationsAdd(current = "", arr){
    if (current.length === gameData.wordLength){
      arr.push(current);
    } else {
      generateCombinationsAdd(`${current}${gameData.symbols.green}`, arr);
      generateCombinationsAdd(`${current}${gameData.symbols.yellow}`, arr);
      generateCombinationsAdd(`${current}${gameData.symbols.grey}`, arr);
    }
  }
  
  const newGame = () => {
    let randomIndex = Math.floor(Math.random() * possibleWords.length);
    setGameWord(possibleWords[randomIndex]);
    setRoundWordsUsed([]);
    setTypedWord('');
  }

  const checkWordValidity = () => {
    if (typedWord.length !== gameData.wordLength) return false;
    if (possibleWords.indexOf(typedWord) === -1) {
      openModal("invalidWord");
      return false;
    }
    if (roundWordsUsed.indexOf(typedWord) !== -1) return false;
    if (roundCombinations[currentRow].answers.indexOf(typedWord) !== -1){
      setRoundWordsUsed([...roundWordsUsed, typedWord]);
      setCurrentRow(currentRow + 1);
      setTypedWord('');
    } else {
      openModal("incorrectWord");
    }

  }

  const getPossibleComboAnswers = (combo) =>{
    let exact = '';
    for (let i = 0; i < gameData.wordLength; i++){
      exact += `${gameData.symbols.green}`;
    }

    if (combo.length !== gameData.wordLength) return false;
    if (combo === exact) return false;
    
    let listOfMatches = possibleWords.filter((word) => matchWordCombo(combo, word));
    return listOfMatches;
    
  }

  const matchWordCombo = (combo, word) =>{

    // Need to completely redo this
    /**let charToSymbol = {};
    for (let ch = 0; ch < word.length; ch++){
      if (charToSymbol[word[ch]]){
        charToSymbol[word[ch]].push(ch);
      } else {
        charToSymbol[word[ch]] = [ch];
      }
    }**/
    let indexesWord;
    let indexesGameWord;
    for (let ch = 0; ch < word.length; ch++){
      
      switch(combo[ch]){
        case gameData.symbols.green:
          if (word[ch] !== gameWord[ch]) return false;
          break;
        case gameData.symbols.yellow:
          if (word[ch] === gameWord[ch]) return false;
          indexesWord = [];
          indexesGameWord = [];
          for (let i = 0; i < word.length; i++){ // all instances of the letter in word
            if (word[i] === word[ch]) indexesWord.push(i);
          }
          for (let i = 0; i < word.length; i++){
            if (gameWord[i] === word[ch]) indexesGameWord.push(i); // all instances of the letter in gameword
          }
          indexesWord = indexesWord.filter(( index) => !(combo[index] === gameData.symbols.green)) // if the other occurances of this letter are paired with a green symbol or not
          indexesGameWord = indexesGameWord.filter((index) => !(combo[index] === gameData.symbols.green))

          if (indexesWord.length === 0) return false; 
          if (indexesWord.indexOf(ch) >= indexesGameWord.length) return false;
          break;
        case gameData.symbols.grey:
          indexesWord = [];
          indexesGameWord = [];
          for (let i = 0; i < word.length; i++){
            if (word[ch] === word[i]) indexesWord.push(i);
          }
          for (let i = 0; i < word.length; i++){
            if (gameWord[i] === word[ch]) indexesGameWord.push(i);
          }
          indexesWord = indexesWord.filter(( index) => !(combo[index] === gameData.symbols.green))
          indexesGameWord = indexesGameWord.filter((index) => !(combo[index] === gameData.symbols.green))

          if (indexesWord.length !== 0 && indexesWord.indexOf(ch) < indexesGameWord.length) return false;
          if (gameWord[ch] === word[ch]) return false;
          break;
      }
    } 
    return true;
  }


  const getValidCombinations = () =>{
    let validCombinations = [];

    for (let i = 0; i < allCombinations.length; i++){ // guarantee at least 7 possible answers to not make it too difficult
      let possibleAnswers = getPossibleComboAnswers(allCombinations[i]);
      if (possibleAnswers.length > 6) validCombinations.push({combo: allCombinations[i], answers: possibleAnswers});
    }

    let validCombosLength = validCombinations.length;
    for (let i = 0; i < (validCombosLength - 5); i++){
      let randomIndex = Math.floor(Math.random() * validCombinations.length);
      validCombinations.splice(randomIndex, 1);
    }

    setRoundCombinations(validCombinations);
    let setup = {originalWord: gameWord, rows : []};
    for (let i = 0; i < validCombinations.length; i++){
      //console.log(validCombinations[i]);
      setup.rows.push({
        combination: validCombinations[i].combo,
        rowNumber: i,
        key: i,
        word: "",
      }) 
    }
    setBoardSetup(setup);
  }

  const onType = (key) => {
    let newWord = typedWord + key;
    if (newWord.length <= gameData.wordLength){
      setTypedWord(newWord)
    }
  }


  const onBackspace = () => {
    if (typedWord.length > 0){
      setTypedWord(typedWord.slice(0, typedWord.length - 1));
    }
  }

  useEffect(()=>{
    if (!gameStarted) return;
    setBoardSetup({...boardSetup, rows : boardSetup.rows.map((row) => row.rowNumber === currentRow ? {...row, word: typedWord} : row)})
  }, [typedWord])

  useEffect(()=>{

    if (currentRow >= roundCombinations.length && currentRow > 0){
      toggleModals(modals.map((modal) => modal.role === 'success' ? {...modal, visible: true} : modal));
      setGameOver(true);
    }
  }, [currentRow])

  useEffect(()=>{
    generateCombinations();
    newGame();
  }, []);

  useEffect(() => {
    if (gameWord.length === 0) return;
    getValidCombinations();
    setCurrentRow(0);
    setGameStarted(true);
    setGameOver(false);
  }, [gameWord]);

  const openModal = (role) => {
    let newModals = textModals.map((modal) => modal.role === role ? {...modal, visible: true} : modal );
    //console.log(newModals);
    toggleModals(newModals); 
  }

  const closeModal = () => {
    let newModals = textModals.map((modal) => modal.visible ? {...modal, visible: false} : modal );
    toggleModals(newModals);      

  }

  const giveUp = () => {
    toggleAnswers(true);
    setGameOver(true);
  }


  return (
    <div style={{color: darkMode ? '#d6d6d6' : 'black', backgroundColor: darkMode ? '#3E3E3E' : 'white'}} 
    className={`App pt-2 mb-4 `}>
      {textModals.map(
        (modal) => 
          <Modal isOpen={modal.visible} ariaHideApp={false}
            style={{
              overlay: {
                background: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderColor: "none"
              },
              content: {
                background: darkMode ? '#676767' : 'white',
                color: darkMode ? '#dadada' : 'black',
                height: "10rem",
                width: "80%",
                maxWidth: "17rem",
                margin: "8rem auto",
                alignSelf: "center"
              }
            }} >
            <h4 className="text-center px-1 mt-3">{modal.title}</h4>
            <button style={{color: darkMode ? '#dadada' : 'black'}} className="modalClose headerButton border-0 fs-2" onClick={() => closeModal()}><i class="far fa-times-circle"></i></button>
            <h6 className="px-1 text-center">{modal.content}</h6>  
          </Modal>
        )
      }
      <Modal className="headerModal" isOpen={settingsOpen} ariaHideApp={false}
        style={{
          overlay: {
            background: `${darkMode ? '#3E3E3E' : 'white'}`
          },
          content: {
            background: `${darkMode ? '#3E3E3E' : 'white'}`,
            marginTop: "3rem",
            minHeight: "75vh"
          }
        }}
      >
        <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <button style={{color: darkMode ? '#d6d6d6' : 'black'}} className="modalClose headerButton border-0 fs-1" onClick={() => toggleSettings(false)}><i class="far fa-times-circle"></i></button>
      </Modal>
      
      <Modal className="headerModal" isOpen={infoOpen} ariaHideApp={false}
        style={{
          overlay: {
            background: `${darkMode ? '#3E3E3E' : 'white'}`
          },
          content: {
            background: `${darkMode ? '#3E3E3E' : 'white'}`
          }
        }}
      >
        <Info darkMode={darkMode}/>
        <button style={{color: darkMode ? '#d6d6d6' : 'black'}} className="modalClose headerButton border-0 fs-1" onClick={() => toggleInfo(false)}><i class="far fa-times-circle"></i></button>
        </Modal>

      <Modal className="headerModal" isOpen={answersOpen} ariaHideApp={false}
        style={{
          overlay: {
            background: `${darkMode ? '#3E3E3E' : 'white'}`,
            marginBottom: "2rem"
          },
          content: {
            background: `${darkMode ? '#3E3E3E' : 'white'}`,
            marginTop: "3rem",
            minHeight: "100vh",
            height: "100%"
          }
        }}
      >
        <RevealAnswers gameWord={gameWord} darkMode={darkMode} combinations={roundCombinations} setup={boardSetup} currentRow={currentRow} statuses={gameData.symbols}/>
        <button style={{color: darkMode ? '#d6d6d6' : 'black'}} className="modalClose headerButton border-0 fs-1" onClick={() => toggleAnswers(false)}><i class="far fa-times-circle"></i></button>
      </Modal>

      { gameStarted ? 
      <HeaderOptions darkMode={darkMode} toggleSettings={toggleSettings} toggleInfo={toggleInfo} /> : null}

      { gameStarted ? <WordBoard giveUp={giveUp} gameOver={gameOver} gameStarted={gameStarted} darkMode={darkMode} setup={boardSetup} currentRow={currentRow} typedWord={typedWord} statuses={gameData.symbols}/> : null}
      {gameStarted ? gameOver ?
      <button 
          className="rounded-pill border-3 px-4 py-3 my-3" 
          onClick={() => newGame()}
          style={{color: darkMode ? '#d6d6d6' : 'black', backgroundColor: darkMode ? '#3A3A3E' : 'white'}}>   
            NEW GAME
      </button> 
      : <div className="userInputs d-flex justify-content-center">
          <Keyboard darkMode={darkMode} onBack={onBackspace} onEnter={checkWordValidity} onType={onType} keys={gameData.keys}/>
        </div>
      : null
      }

    </div>

  );
}

export default App;
