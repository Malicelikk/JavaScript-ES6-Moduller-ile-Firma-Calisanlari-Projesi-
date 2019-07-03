export class UI {
    constructor() {
        this.employeesList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.salaryInput = document.getElementById("salary");
        this.deparmentInput = document.getElementById("department");
    }

    addAllEmployeeToUı(employees) {

        let result="";

        employees.forEach(employee => {  // her obje için result a ekle

            result +=  `
            
             <tr>
                                              
                            <td>${employee.name}</td>
                            <td>${employee.department}</td>
                            <td>${employee.salary}</td>
                            <td>${employee.id}</td>
                            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                            <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
             </tr>
          
            `

        });

        this.employeesList.innerHTML = result;
    }

    clearInputs(){

        this.nameInput.value = "";
        this.deparmentInput.value = "";
        this.salaryInput.value = "";

    }

    addEmployeeToUI(employee){

        this.employeesList.innerHTML +=  `
            
        <tr>
                                         
                       <td>${employee.name}</td>
                       <td>${employee.department}</td>
                       <td>${employee.salary}</td>
                       <td>${employee.id}</td>
                       <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                       <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
     
       `;

    }


    deleteEmployeeFromUI(tablosatır){
        tablosatır.remove();
    }

    toggleUpdateButton(target){
        if(this.updateButton.style.display==="none"){
            this.updateButton.style.display="block";
            this.addEmployeeInfoToInputs(target); // satırı gönderdik
        }
        else {
            this.updateButton.style.display="none";
            this.clearInputs();
        }
    }


    addEmployeeInfoToInputs(target){  // satırı aldık
        const children = target.children;  // satırın çocukları

        this.nameInput.value=children[0].textContent;  
        this.deparmentInput.value=children[1].textContent;
        this.salaryInput.value=children[2].textContent;

    }

    updateEmployeeOnUI(employee,parent){
        parent.innerHTML = `
        <tr>
                                         
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
</tr>
        `;
    }


}