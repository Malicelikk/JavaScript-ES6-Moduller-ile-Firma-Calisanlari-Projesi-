import {Request} from "./requests"; 
import {UI} from "./ui";

const form=document.getElementById("employee-form");
const nameInput=document.getElementById("name");
const departmentInput=document.getElementById("department");
const salaryInput=document.getElementById("salary");
const employeesList=document.getElementById("employees");
const updateEmployeeButton=document.getElementById("update");

const request= new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees); // DOM Yuklenince fonksiyonu çağir
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click",UpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
}


function getAllEmployees(){

    request.get()
    .then(employees => {
        ui.addAllEmployeeToUı(employees);
    })
    .catch(err => console.log(err));

    
}

function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartment === "" || employeeSalary === "" ){
        alert("Tüm alanları doldurunuz");
    }
    else {

        request.post({name:employeeName , department:employeeDepartment , salary:Number(employeeSalary)})
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err));

    }


    ui.clearInputs();
    e.preventDefault();
}

function UpdateOrDelete(e){

 //   console.log(e.target.id);

    if (e.target.id === "delete-employee") {

        deleteEmployee(e.target);
    }
    else if (e.target.id === "update-employee"){

        updateEmployeeController(e.target.parentElement.parentElement);// tıklanan satırı gönderdik
    }
}

function deleteEmployee(targetButton){
    const id=targetButton.parentElement.previousElementSibling.previousElementSibling.textContent; // id yi aldık

    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetButton.parentElement.parentElement);
    })
    .catch(err => console.log(err));
}

function updateEmployeeController(satır){ // satırı gönderdik
    ui.toggleUpdateButton(satır);

    if (updateState === null){
        updateState = {
            updateId:satır.children[3].textContent,
            updateParent:satır
        }
    }else {
        updateState=null;
    }

}


function updateEmployee(){

    if(updateState){

        const data = {name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())};

        request.put(updateState.updateId,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);// güncellenmiş employee i ui a gönderdik
        })
        .catch(err => console.log(err));
        ui.clearInputs();
    }
}











request.get()
.then(employees => console.log(employees))
.catch(err => console.log(err));

/*
request.post({ name: "Ali Çelik",department: "Software",salary: 6000})
.then(employee => console.log(employee))
.catch(err =>console.log(err)); */

/*
request.put(3,{ name: "Demet Çelik",department: "Turizm",salary: 3000})
.then(employee => console.log(employee))
.catch(err =>console.log(err)); 

request.delete(5)
.then(message => console.log(message))
.catch(err =>console.log(err));*/
