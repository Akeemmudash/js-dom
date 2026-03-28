const employeeNameInput = document.getElementById("employee-name");
const employeeDeptInput = document.getElementById("employee-department");
const employeeSalaryInput = document.getElementById("employee-salary");

const addEmployeeBtn = document.getElementById("add-employee-btn");
const tableBody = document.getElementById("employee-table-body");
const employeeCount = document.getElementById("total-employees");

let employees = getPersistedEmployees() || [];
let id = 1;

employeeCount.innerText = 0;
function disableInputFields() {
  addEmployeeBtn.disabled = "true";
}

const inputFields = document.querySelectorAll("input");
const inputFieldsArrays = Array.from(inputFields);

inputFieldsArrays.forEach(
  (field) =>
    (field.oninput = (e) => {
      if (
        inputFieldsArrays.every((inputField) => {
          if (inputField.value.trim()) return true;
        })
      ) {
        addEmployeeBtn.removeAttribute("disabled");
      } else {
        disableInputFields();
      }
    }),
);
renderEmployees(employees);
function addEmployee() {
  const nameValue = employeeNameInput.value;
  const deptValue = employeeDeptInput.value;
  const salaryValue = employeeSalaryInput.value;

  if (!nameValue || !deptValue || !salaryValue) return;

  const employeeObject = {
    name: nameValue,
    dept: deptValue,
    salary: salaryValue,
    id: id,
  };
  employees.push(employeeObject);
  id++;
  persistEmployees(employees);
  renderEmployees(employees);
  employeeNameInput.value = "";
  employeeDeptInput.value = "";
  employeeSalaryInput.value = "";
  disableInputFields();
  employeeCount.innerText = employees.length;
}

function removeEmployee(employeeId) {
  console.log("employeeId", employeeId);
  const newEmployees = employees.filter(
    (employee) => employee.id !== employeeId,
  );
  employees = newEmployees;
  console.log("newEmployees", newEmployees);
  //   persistEmployees(newEmployees);
  renderEmployees(newEmployees);
  employeeCount.innerText = employees.length;
}
addEmployeeBtn.onclick = addEmployee;

//generate a new array from the employeeArr with exception of the Element with an id of 2

function renderEmployees(employeeArray) {
  const tableRowEl = document.createElement("tr");
  if (employeeArray.length === 0) {
    tableBody.innerHTML = null;
    const tableDataEl = document.createElement("td");
    tableDataEl.colSpan = 4;
    tableDataEl.innerText = "No employees have been added";
    tableDataEl.classList.add("text-center");
    tableRowEl.append(tableDataEl);
    tableBody.append(tableRowEl);
  } else {
    tableBody.innerHTML = null;
    employeeArray.forEach((employee) => {
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
      actionBtnEl.onclick = () => removeEmployee(employee.id);
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
}

function persistEmployees(employee) {
  const employeeJSONString = JSON.stringify(employee);
  localStorage.setItem("employee-data", employeeJSONString);
}

function getPersistedEmployees(employee) {
  const employeeJSONString = localStorage.getItem("employee-data");
  return JSON.parse(employeeJSONString);
}
