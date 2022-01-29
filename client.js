console.log('test JS');

// call to jQuery
$(document).ready(readyNow);

// initializes 'employeeInformation' array
let employeeDatabase = [];

let newEmployee = {
    firstName: '',
    lastName: '',
    idNumber: 0,
    jobTitle: '',
    annualSalary: 0
}

// purpose of function: take in employee information and store information provided
function addEmployee () {
    console.log('in addEmployee');
    
    // creates object to take in input parameter values
    newEmployee = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        idNumber: $('#idNumber').val(),
        jobTitle: $('#jobTitle').val(),
        annualSalary: $('#annualSalary').val()
    }

    // adds object to 'employeeInformation' array
    employeeDatabase.push(newEmployee);

    // display new employee to DOM 
    displayNewEmployee();
} // end addEmployee

// addEmployee('Dan', 'Fenske', 32432, 'Marketing & Sales Coordinator', 47500); // functions correctly
// addEmployee('Carl', 'Hancock', 32432, 'Autographer', 24000); // functions correctly
// addEmployee('Marlin', 'Fish', 32432, 'Professional Fisherwoman', 200000); // functions correctly
// console.log('Employee database: ', addEmployee('Rock', 'Roll', 32432, 'Rockstar', 55250)); // functions correctly


function displayNewEmployee() {
    let el = $(`<tr><td>${newEmployee.firstName}</td><td>${newEmployee.lastName}</td><td>${newEmployee.idNumber}</td><td>${newEmployee.jobTitle}</td><td>${newEmployee.annualSalary}</td></tr>`);

    $('#employeeTable').append(el);
}



















// let totalMonthlyCost = 0;

// // purpose of function: calculate total monthly cost of employees within 'employeeDatabase' array
// function calculateTotalMonthlyCost (array) {
//     console.log('in calculateTotalMonthlyCost');
    
//     // uses for loop to access 'annualSalary' within each object of 'employeeDatabase'
//     for (let i=0; i<array.length; i++) {
//         console.log('in for loop');

//         totalMonthlyCost += array[i].annualSalary;
        
//     }

//     totalMonthlyCost = totalMonthlyCost / 12;

//     console.log('totalMonthlyCost', totalMonthlyCost);
    
//     return totalMonthlyCost;
// } // end calculateTotalMonthlyCost

// console.log('Total monthly cost: ', calculateTotalMonthlyCost(employeeDatabase)); // functions correctly. Current value: ~$27229.17


function readyNow(){
    console.log('test JQ');

    // addEmployee();
    $('#submit').on('click', addEmployee)

} // end readyNow