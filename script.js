const employeeNameInput = document.getElementById("employee-name");
const employeeDeptInput = document.getElementById("employee-department");
const employeeSalaryInput = document.getElementById("employee-salary");

const addEmployeeBtn = document.getElementById("add-employee-btn");
const tableBody = document.getElementById("employee-table-body");
const employeeCount = document.getElementById("total-employees");

const employees = [];
let id = 1;

function addEmployee() {
  const nameValue = employeeNameInput.value;
  const deptValue = employeeDeptInput.value;
  const salaryValue = employeeSalaryInput.value;

  console.log(nameValue, deptValue, salaryValue);
  const employeeObject = {
    name: nameValue,
    dept: deptValue,
    salary: salaryValue,
    id: id,
  };
  console.log("employeeObject", employeeObject);
  employees.push(employeeObject);

  id++;

  tableBody.innerHTML = null;

  employees.forEach((employee) => {
    const tableRowEl = document.createElement("tr");
    const employeeNameEl = document.createElement("td");
    const employeeDeptEl = document.createElement("td");
    const employeeSalaryEl = document.createElement("td");
    const actionBtnWrapperEl = document.createElement("td");
    const actionBtnEl = document.createElement("button");
    employeeNameEl.innerText = employee.name;
    employeeDeptEl.innerText = employee.dept;
    employeeSalaryEl.innerText = employee.salary;

    actionBtnEl.classList.add(
      "btn",
      "btn-danger",
      "btn-sm",
      "delete-employee-btn",
    );
    actionBtnEl.innerText = "Remove";
    actionBtnEl.onclick = () => remove(employee.id);
    actionBtnWrapperEl.append(actionBtnEl);
    tableRowEl.append(
      employeeNameEl,
      employeeDeptEl,
      employeeSalaryEl,
      actionBtnWrapperEl,
    );

    tableBody.append(tableRowEl);
  });
}

function remove(employeeId) {
  //generate an array of employee elements with exception to the employee with an id of 1 from the employee array
  // and log the new array to the console.
}
addEmployeeBtn.onclick = addEmployee;
const employeeArr = [
  { name: "John", dept: "Accounting", salary: "400000", id: 1 },
  { name: "Steven", dept: "IT", salary: "400000", id: 2 },
  { name: "Sadiq", dept: "Business", salary: "700000", id: 3 },
];

//generate a new array from the employeeArr with exception of the Element with an id of 2
