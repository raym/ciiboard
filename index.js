var
  typedString = '',
  paper = document.getElementById('paper'),
  waitForPause = null,
  numberToPrint = 0,
  addNumber = function(number) {
    numberToPrint = numberToPrint * 10 + number;
  },
  printCharacter = function() {
    typedString += String.fromCharCode(numberToPrint);
    paper.innerHTML = typedString;
    numberToPrint = 0;
    waitForPause = null;
  },
  backspace = function() {
    typedString = typedString.substr(0, typedString.length - 1);
    paper.innerHTML = typedString;
  }
;

document.addEventListener('keyup', function(e) {
  if (e.keyCode === 8) {
    backspace();
  }
  if (e.keyCode < 48 || e.keyCode > 57) {
    return;
  }
  addNumber(e.keyCode - 48);
  if (waitForPause) {
    clearTimeout(waitForPause);
  }
  waitForPause = setTimeout(printCharacter, 500);
});
