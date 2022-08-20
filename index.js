const myName = 'Markus';

function changeText(div) {
  div.innerText = `Hello ${myName}!`;
}

function buttonClicked() {
  const currentTime = new Date();
  const newElement = document.createElement('div');
  newElement.innerText = `Created at ${currentTime}`;
  document.body.appendChild(newElement);
}

setTimeout(function() {
  const div = document.getElementById('nameDiv');
  changeText(div);
}, 5000);
