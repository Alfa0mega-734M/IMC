const form = document.querySelector('form#form');
const submit = form.querySelector('input#submit');

const inputWeight = document.querySelector('input#peso');
const inputHeight = document.querySelector('input#altura');
const card = document.querySelector('div.card');


form.addEventListener('submit', handleSubmit);
submit.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const weight = inputWeight.value;
  const height = inputHeight.value;

  imcScore = calculateIMC(weight, height);
  setResults(imcScore);
}

function calculateIMC(weight, height) {
  if (weight <= 0) {
    return 'Incorrecto';
  }
  if (height <= 0) {
    return 'Incorrecto';
  }

  heightInMeters = height / 100;
  imcValue = weight / (heightInMeters**2);
  imcValue = imcValue.toFixed(1);

  
  return imcValue;
}

const status = {
  underWeight: 'Bajo peso',
  normal: 'Peso normal',
  overweight: 'Sobrepeso',
  obesity: 'Obeso',
  invalidWeight: 'Peso inválido',
  invalidHeight: 'Altura Inválida'
}

function setResults(imc) {
  var cardScore = card.querySelector('span.score');
  var cardStatus = card.querySelector('span.status');

  cardScore.innerText = imc;

  var [statusText, color] = getStatus(imc);
  cardStatus.innerText = statusText;
  setCardColor(color);
  document.activeElement && document.activeElement.blur();
}

function getStatus(imc) {
  if (imc == -1) {
    return [status.invalidWeight, '']
  }
  if (imc == -2)  {
    return [status.invalidHeight, '']
  }
  if(imc < 18.5) {
    return [status.underWeight, 'yellow'];
  }
  if (imc >= 18.5 && imc <= 24.9) {
    return [status.normal, 'green'];
  }
  if (imc >= 25 && imc <= 29.9) {
    return [status.overweight, 'yellow'];
  }
  if (imc > 30) {
    return [status.obesity, 'red'];
  }
}

function setCardColor(color) {
  if (color) {
    card.className = `card ${color}`;
  }
  else {
    card.className = 'card default'
  }
}