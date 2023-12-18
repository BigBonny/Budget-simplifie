const budgetAmount = document.getElementById('income');
const expensesAmount = document.getElementById('expense-amount');
const expenseName = document.getElementById('expense-name');
const income = document.getElementById('income-amount');
const expenses = document.getElementById('expense-amount-display');
const balance = document.getElementById('balance-amount');
const addButton = document.getElementById('add-expense-button');
const expensesPanel = document.querySelector('.expenses-panel');

// Create an array to store the expenses
const expensesArray = [];

budgetAmount.addEventListener('input', () => {
  updateIncome();
});

expensesAmount.addEventListener('input', () => {
  updateExpenses();
});

function updateIncome() {
  const numericValue = budgetAmount.value.replace(/[^0-9.]/g, '');
  const formattedValue = formatCurrency(numericValue);
  income.textContent = formattedValue;
  updateBalance();
}

function updateExpenses() {
  // Calculate total expenses by summing up values in the expensesArray
  const totalExpenses = expensesArray.reduce((acc, curr) => acc + curr, 0);

  const formattedValue = formatCurrency(totalExpenses);
  expenses.textContent = formattedValue;
  updateBalance();
}

function formatCurrency(value) {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function updateBalance() {
  const budgetValue = parseFloat(budgetAmount.value.replace(/[^0-9.]/g, ''));
  const totalExpenses = expensesArray.reduce((acc, curr) => acc + curr, 0);
  const balanceValue = budgetValue - totalExpenses;
  const formattedValue = formatCurrency(balanceValue);
  balance.textContent = formattedValue;

  // Update the text color based on the balance
  balance.style.color = balanceValue >= 0 ? 'green' : 'red';
}

addButton.addEventListener('click', () => {
  addExpense();
});

function addExpense() {
  const name = expenseName.value;
  const amount = expensesAmount.value;
  if (name && amount) {
    // Push the numerical value of the expense into the expensesArray
    expensesArray.push(parseFloat(amount));
    createExpenseEntry(name, amount);
    clearExpenseInputs();
    updateExpenses();
  }
}

function createExpenseEntry(name, amount) {
  const expenseDiv = document.createElement('div');
  expenseDiv.className = 'expenses-table';

  const nameDiv = document.createElement('div');
  nameDiv.textContent = name;

  const priceDiv = document.createElement('div');
  priceDiv.className = "priceDiv";
  priceDiv.textContent = formatCurrency(amount);

  const deleteDiv = document.createElement('div');
  deleteDiv.className = 'delete';

  const deleteButton = document.createElement('button');
  deleteButton.name = 'delete-expense';
  deleteButton.className = 'delete-expense';

  const deleteImage = document.createElement('img');
  deleteImage.src = './images/trash.svg';
  deleteImage.alt = 'Trash';

  deleteButton.appendChild(deleteImage);
  deleteDiv.appendChild(deleteButton);

  expenseDiv.appendChild(nameDiv);
  expenseDiv.appendChild(priceDiv);
  expenseDiv.appendChild(deleteDiv);

  expensesPanel.appendChild(expenseDiv);
  deleteButton.addEventListener('click', () => {
    // Remove the expense value from expensesArray when an entry is deleted
    const index = expensesArray.indexOf(parseFloat(amount));
    if (index !== -1) {
      expensesArray.splice(index, 1);
    }
    expenseDiv.remove();
    updateExpenses();
  });
}

function clearExpenseInputs() {
  expenseName.value = '';
  expensesAmount.value = '';
}