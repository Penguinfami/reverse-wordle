import './App.css';
import { useState, useEffect } from 'react';
import WordBoard from './components/WordBoard';
import Keyboard from './components/Keyboard';
import HeaderOptions from './components/HeaderOptions';
import Settings from './components/Settings';
import Info from './components/Info';
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
  const [gameOver, setGameOver] = useState(true);
  const [allCombinations, setAllCombinations] = useState([]);
  const [textModals, toggleModals] = useState(modals);
  const [settingsOpen, toggleSettings] = useState(false);
  const [infoOpen, toggleInfo] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [currentRow, setCurrentRow] = useState(-1);

  function generateCombinations (){
    let arr = []
    generateCombinationsAdd("", arr);
    console.log(arr);
    setAllCombinations(arr);
  }

  function generateCombinationsAdd(current = "", arr){
    if (current.length === gameData.wordLength){
      //console.log(`${current}\n`);
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
    if (possibleWords.indexOf(typedWord) === -1) return false;
    if (roundWordsUsed.indexOf(typedWord) !== -1) return false;
    if (roundCombinations[currentRow].answers.indexOf(typedWord) !== -1){
      console.log("Next row");
      setRoundWordsUsed([...roundWordsUsed, typedWord]);
      setCurrentRow(currentRow + 1);
      setTypedWord('');
    } else {
      // stuff
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
    //console.log(combo);
    return true;
  }

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

  const getValidCombinations = () =>{
    let validCombinations = [];

    for (let i = 0; i < allCombinations.length; i++){ // guarantee at least 2 possible answers to not make it too difficult
      let possibleAnswers = getPossibleComboAnswers(allCombinations[i]);
      if (possibleAnswers.length > 1) validCombinations.push({combo: allCombinations[i], answers: possibleAnswers});
    }

    let validCombosLength = validCombinations.length;
    console.log(validCombosLength);
    for (let i = 0; i < (validCombosLength - 5); i++){
      let randomIndex = Math.floor(Math.random() * validCombinations.length);
      validCombinations.splice(randomIndex, 1);
    }

    for (let i = 0; i < validCombinations.length; i++){
      console.log(`${validCombinations[i].combo} ${validCombinations[i].answers}\n`);
    }
    setRoundCombinations(validCombinations);
    let setup = {originalWord: gameWord, rows : []};
    for (let i = 0; i < validCombinations.length; i++){
      console.log(validCombinations[i]);
      setup.rows.push({
        combination: validCombinations[i].combo,
        rowNumber: i,
        key: i,
        word: "",
      }) 
      console.log(gameWord);

    }
    setBoardSetup(setup);
  }

  const onType = (key) => {
    console.log(key)
    console.log(typedWord);
    let newWord = typedWord + key;
    if (newWord.length <= gameData.wordLength){
      setTypedWord(newWord)
      console.log(newWord)

    }
  }

  const onEnter = () => {
   
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
      console.log("SUCCESS!");
      toggleModals(modals.map((modal) => modal.role === 'success' ? {...modal, visible: true} : modal));
      setGameOver(true);
    }
  }, [currentRow])

  const closeModal = () => {
    console.log("closing");
    let newModals = textModals.map((modal) => modal.visible ? {...modal, visible: false} : modal );
    console.log(newModals);
    toggleModals(newModals);      

  }


  return (
    <div className="App p-2">
      {textModals.map(
        (modal) => modal.visible ? <Modal isOpen={modal.visible} ariaHideApp={false}><h1>{modal.title}{`${modal.visible}`}</h1><h5>{modal.content}</h5> <button onClick={() => closeModal()}>Close</button></Modal> : null)
      }
      <Modal isOpen={settingsOpen} ariaHideApp={false}>
        <Settings/>
        <button onClick={() => toggleSettings(false)}>Close</button>
      </Modal>
      
      <Modal isOpen={infoOpen} ariaHideApp={false}>
        <Info/>
        <button onClick={() => toggleInfo(false)}>Close</button>
        </Modal>

      <HeaderOptions toggleSettings={toggleSettings} toggleInfo={toggleInfo} />
      {gameStarted ? <WordBoard setup={boardSetup} currentRow={currentRow} typedWord={typedWord} statuses={gameData.symbols}/> : null}
      { gameOver ? 
      <button className="rounded-pill border-1 px-4 py-3" onClick={() => newGame()}>New Game</button> 
      : <div className="userInputs d-flex justify-content-center">
          <Keyboard onBack={onBackspace} onEnter={checkWordValidity} onType={onType} keys={gameData.keys}/>
        </div>
      }

    </div>

  );
}

export default App;
