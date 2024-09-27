const secretPhrases = ["never", "you", "bullet", "break"];

// the random word will set in randomItem variable and because we need it in other function so define it global

let randomItem = "";

// we must define a global array which name is clicked in order to store the letters that has used by user  to avoid repetition

let clicked = [];

//it changes often regurally beacuse this variable include the amount of underscores and trueletter

let result = "";

// count mistakes

let mistakes = 0;

// the first function will execute

function selectRandomNumber() {
  // we want select random word from secretPhrases so we produce index to acess the word at secretPhrases array

  randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
  console.log(randomItem);

  // selectRandomItem is the first function which has called and at the first  we need to handle if user uses its mouse or keyboard inorder to put the letter on underscores what happen (The event handler function will be call)

  document.getElementById("letters").addEventListener("click", buttonHandler);

  //we want apply key down in all of our page
  window.addEventListener("keydown", keyHandler);
}

function buttonHandler(event) {
  letterHandler(event.target.id);
}
function keyHandler(event) {
  letterHandler(event.key);
}

// we want to set dinamic underscore!

function setUnderScores() {
  // the result of bellow line is array

  const splitedWord = randomItem.split("");

  // if the letter had used by user it would be in both clicked and splitedWord (clicked is our letter storage and splitedword is true letter - that mean user chose correct letter) we should return that letter and unless we should return _

  let mappedWord = splitedWord.map((letter) =>
    clicked.indexOf(letter) >= 0 ? letter : "_"
  );

  // mappedWord array (include single letter) to string

  result = mappedWord.join("");

  // we put result instead (result in bad situation include _ and in good situation include some or all of true letter that user guess)

  document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

// we want to handle won state - if all of letter be same the choosen word we call it won!

function cheackWon() {
  // if the result string ,will be the same with randomItem the user won

  if (randomItem === result) {
    // if the user won we show game is over and show proper picture

    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById("image").querySelector("img").src =
      "images/winner.png";
    happenAfterWon();
  }
}

// we want to handle lose state

function checkIfLost() {
  if (mistakes === 6) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById(
      "clue"
    ).innerHTML = `<p>Randomword is ${randomItem}</p>`;
  }
}

// handle image when choose wrong letter - the amount of mistakes is the index of image

function updateHangmanPicture() {
  let image = document.getElementById("image").querySelector("img");
  happenAfterLost();
  image.src = `images/hangman${mistakes}.png`;
  console.log(mistakes);
}
// we should handle letters - intrance of this function is the letter that user choose it in two way (keyboard or mouse )-we handle this two way with one function because letter is letter in both way!common thing!

function letterHandler(letter) {
  letter = letter.toLowerCase();

  // we should cheacked if a letter isn't exist in the clicked ,we will push it to array

  clicked.indexOf(letter) == -1 ? clicked.push(letter) : null;

  //when user use a letter we changed that style to user can understand that letter used

  document.getElementById(letter.toUpperCase()).className = "used";

  // if the a letter was true
 
  if (randomItem.indexOf(letter) >= 0) {
    setUnderScores();
    cheackWon();

    // if the letter was false
  } else if (randomItem.indexOf(letter) === -1) {
    mistakes++;
    checkIfLost();
    updateHangmanPicture();
  }
}

// show this after won

function happenAfterWon() {
  document.getElementById("letters").style.display = "none";
  document.querySelector("h1").innerText = "For next round Refresh the page.";
}

// show this after Lost

function happenAfterLost(params) {
  if (mistakes >= 7) {
    alert("The next round will be start");
    if (true) {
      setTimeout(window.location.reload(), 1000);
    }
  }
}

selectRandomNumber();
setUnderScores();
