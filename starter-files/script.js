class Expense {
  constructor(description, amount, date, category) {
    this.description = description;
    this.amount = parseFloat(amount);
    this.date = date;
    this.category = category;
  }
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addOrUpdateExpense() {
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const editIndex = document.getElementById("editIndex").value;

  if (!description || !amount || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const expense = new Expense(description, amount, date, category);

  if (editIndex) {
    expenses[editIndex] = expense;
  } else {
    expenses.push(expense);
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  clearFields();
  displayExpenses();
}

function clearFields() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").value = "Food";
  document.getElementById("editIndex").value = "";
}

function displayExpenses() {
  const expensesList = document.getElementById("expensesList");
  expensesList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const row = `<tr>
            <td>${expense.description}</td>
            <td>$${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>
                <button onclick="editExpense(${index})" class="btn btn-info btn-sm">Edit</button>
                <button onclick="deleteExpense(${index})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    expensesList.innerHTML += row;
  });
}

function editExpense(index) {
  const expense = expenses[index];
  document.getElementById("description").value = expense.description;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("date").value = expense.date;
  document.getElementById("category").value = expense.category;
  document.getElementById("editIndex").value = index;
}

function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
  }
}

function sortExpenses(property, order) {
  expenses.sort((a, b) => {
    if (order === "asc") {
      return a[property] - b[property];
    } else {
      return b[property] - a[property];
    }
  });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

displayExpenses();
