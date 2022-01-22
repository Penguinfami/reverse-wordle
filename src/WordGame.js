class WordGame {

    constructor(words = []){
        this.possibleWords = words;
    }

    setPossibleWords(words){
        this.possibleWords = words;
    }

    generateRandomWord(){
        let randomIndex = Math.floor(Math.random() * words.length);
        return this.possibleWords[randomIndex];
    }

}