console.log('test JS');

// initializes 'employeeInformation' array
let employeeInformation = [];

// purpose of function: take in employee information and store information provided
function submitEmployee (firstName, lastName, idNumber, jobTitle, annualSalary) {
    console.log('in submitEmployee');
    
    // create object to take in input parameter values
    let object = {
        firstName,
        lastName,
        idNumber,
        jobTitle,
        annualSalary
    }

    // add object to 'employeeInformation' array
    employeeInformation.push(object);

    // returns 'employeeInformation' array
    return employeeInformation;
} // end submitEmployee

console.log(submitEmployee('Dan', 'Fenske', 32432, 'Marketing & Sales Coordinator', 47500)); // functions correctly
