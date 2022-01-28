console.log('test JS');

// call to jQuery
$(document).ready(readyNow);

// initializes 'employeeInformation' array
let employeeDatabase = [];

// purpose of function: take in employee information and store information provided
function submitEmployee (firstName, lastName, idNumber, jobTitle, annualSalary) {
    console.log('in submitEmployee');
    
    // creates object to take in input parameter values
    let object = {
        firstName,
        lastName,
        idNumber,
        jobTitle,
        annualSalary
    }

    // adds object to 'employeeInformation' array
    employeeDatabase.push(object);

    // returns 'employeeInformation' array
    return employeeDatabase;
} // end submitEmployee

submitEmployee('Dan', 'Fenske', 32432, 'Marketing & Sales Coordinator', 47500); // functions correctly
submitEmployee('Carl', 'Hancock', 32432, 'Autographer', 24000); // functions correctly
submitEmployee('Marlin', 'Fish', 32432, 'Professional Fisherwoman', 200000); // functions correctly
console.log('Employee database: ', submitEmployee('Rock', 'Roll', 32432, 'Rockstar', 55250)); // functions correctly


let totalMonthlyCost = 0;

// purpose of function: calculate total monthly cost of employees within 'employeeDatabase' array
function calculateTotalMonthlyCost (array) {
    console.log('in totalMonthlyCost');
    
    // uses for loop to access 'annualSalary' within each object of 'employeeDatabase'
    for (let i=0; i<array.length; i++) {
        console.log('in for loop');

        totalMonthlyCost += array[i].annualSalary;
    }

    totalMonthlyCost = totalMonthlyCost / 12;

    return totalMonthlyCost;
} // end calculateTotalMonthlyCost

console.log('Total monthly cost: ', calculateTotalMonthlyCost(employeeDatabase)); // functions correctly. Current value: ~$27229.17

function readyNow(){
    console.log('test JQ');
    
} // end readyNow