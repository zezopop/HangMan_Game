const keyBoardDiv = document.querySelector('.keyboard');

const wordDisplay = document.querySelector('.word-display');

const hintText = document.querySelector('.hint-text b');

const HangmanImage = document.querySelector('.hangman-box img');

const gussesAttemps = document.querySelector('.gusses-text b');

const gameModel = document.querySelector('.game-model');

const playAgainBtn = document.querySelector('.play-again');

    //storing the chosen word in a var and wrong Attemps
    let currentWord , correctLetters =[], wrongusses = 0;
    let maxwrongGusses = 6;
    
    //reset 
    const resetsiii = () => {
        correctLetters = [];
        wrongusses = 0;
        HangmanImage.src = `hangman-${wrongusses}.svg`
        gussesAttemps.innerText = `${wrongusses} / ${maxwrongGusses}`;
        keyBoardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false);
        wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
        gameModel.classList.remove('show');
        };
    // getting random word
    const getRandomWord = () => {
        const {word , hint} = wordList[Math.floor(Math.random()* wordList.length)];
        console.log(word);
        currentWord = word;
        hintText.innerText = hint;
        resetsiii();
        // wordDisplay.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("");
    };
    
    const gameOver = (isVictory) => {
        setTimeout( () => {
            const ModelText = isVictory ? `Your Are Brilliant` : `The word was: `;
            gameModel.querySelector('img').src = `${isVictory ? `victory` : `lost`}.gif`;
            gameModel.querySelector('h4').innerText = `${isVictory ? `GG` : `Game Over!`}`;
            gameModel.querySelector('p').innerHTML = `${ModelText} <b>${currentWord}</b>`;
            gameModel.classList.add('show');
        }, 300);
    };

// checking the clicked button and letter
const initGame = (button , clickedLetter) => {
        // checking if the word contain the clicked letter
        if (currentWord.includes(clickedLetter)){
            // turning the var into aray and make loop on the elements
            [...currentWord].forEach((letter,index) => {
                if (letter === clickedLetter){
                        correctLetters.push(letter);
                    // adding the correct letter to his list
                    wordDisplay.querySelectorAll('li')[index].innerText = letter;  
                    wordDisplay.querySelectorAll('li')[index].classList.add('guessed');  
                    
                }});
                    } else {
    
                    wrongusses++;
                    HangmanImage.src = `hangman-${wrongusses}.svg`
                }
    
                button.disabled = true;
                gussesAttemps.innerText = `${wrongusses} / ${maxwrongGusses}`;
                
                // lose or win popup
                if (wrongusses === maxwrongGusses) return gameOver(false);
                if (correctLetters.length === currentWord.length) return gameOver(true);                
            };
            
            // creating buttons dynamiclly
            for (let i = 97; i <= 122 ; i++){
                const button = document.createElement('button');
                button.innerText = String.fromCharCode(i);
                keyBoardDiv.appendChild(button);
                // adding event on the clicked button
                button.addEventListener('click', e => initGame(e.target , String.fromCharCode(i)));
};


// calling to get a random word

playAgainBtn.addEventListener("click", getRandomWord);

getRandomWord();
