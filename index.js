let LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMITE = "Всё хорошо";
const STATUS_OUT_OF_LIMITE = "Всё плохо";
const STATUS_OUT_OF_LIMITE_CLASSNAME = "status-red";

const inputNode = document.querySelector(".js-input");
const buttonNode = document.querySelector(".js-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-total");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");

const expenses = [];

init(expenses);

buttonNode.addEventListener("click", function () {
  const expense = getExpanseFromUser();

  if (!expense) {
    return;
  }

  trackExpanse(expense);

  render(expenses);
});

function init(expenses) {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMITE;
  sumNode.innerText = calculateExpanses(expenses);
}

function trackExpanse(expense) {
  expenses.push(expense);
}

function getExpanseFromUser() {
  if (!inputNode.value) {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearInput();

  return expense;
}

function clearInput() {
  inputNode.value = "";
}

function calculateExpanses(expenses) {
  let sum = 0;

  expenses.forEach(element   => {
    sum += element;
  });
  return sum;
}

function render(expenses) {
  const sum = calculateExpanses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory(expenses) {
  let elementListHTML = "";

  expenses.forEach(element => {
    elementListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  historyNode.innerHTML = `<ol> ${elementListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

function renderStatus(sum) {
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMITE;
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMITE;
    statusNode.classList.add(STATUS_OUT_OF_LIMITE_CLASSNAME);
  }
}
