console.log('test JS');

// call to jQuery
$(document).ready(readyNow);

// initializes 'employeeInformation' array
let employeeDatabase = [];

// declare maxTotalMonthlyCost
const maxTotalMonthlyCost = 20000;

// purpose of function: take in employee information and store information provided
function addEmployee () {
    console.log('in addEmployee');
    
    // function will not run if all input fields are not filled in
    if (($('#firstName').val() === '') || ($('#lastName').val() === '') || ($('#idNumber').val() === '') || ($('#jobTitle').val() === '') || ($('#annualSalary').val() === '') ) {
        alert('Please fill out all form fields')
    } else {
        // initialize newEmployee object and gets values of object from input 
        let newEmployee = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            idNumber: Number($('#idNumber').val()),
            jobTitle: $('#jobTitle').val(),
            annualSalary: Number($('#annualSalary').val())
    }

        // adds object to 'employeeInformation' array
        employeeDatabase.push(newEmployee);

        // empty input values
        $('input').val('');

        // display new employee to DOM 
        displayNewEmployee();

        // ready to execute calculateTotalMonthlyCost
        calculateTotalMonthlyCost ();
    }

} // end addEmployee

// addEmployee('Dan', 'Fenske', 32432, 'Marketing & Sales Coordinator', 47500); // functions correctly
// addEmployee('Carl', 'Hancock', 32432, 'Autographer', 24000); // functions correctly
// addEmployee('Marlin', 'Fish', 32432, 'Professional Fisherwoman', 200000); // functions correctly
// console.log('Employee database: ', addEmployee('Rock', 'Roll', 32432, 'Rockstar', 55250)); // functions correctly

// purpose of function: take in employee information and append to table on DOM
function displayNewEmployee() {
    $('#employeeRows').empty();
    for (let i=0; i<employeeDatabase.length; i++) {
        let el = $(`<tr class="employee">
                        <td>${employeeDatabase[i].firstName}</td>
                        <td>${employeeDatabase[i].lastName}</td>
                        <td>${employeeDatabase[i].idNumber}</td>
                        <td>${employeeDatabase[i].jobTitle}</td>
                        <td>${formatNumberAsMoney(employeeDatabase[i].annualSalary)}</td>
                        <td><button data-id=${[i]} class="remove">REMOVE</button></td></tr>`);
        $('#employeeRows').append(el);
        $('#tableHeader th:last-child').show();
    }   

    if (employeeDatabase.length === 0) {
        $('#tableHeader th:last-child').hide();
    }
}

// purpose of function: calculate total monthly cost of employees within 'employeeDatabase' array
function calculateTotalMonthlyCost () {
    console.log('in calculateTotalMonthlyCost');

    // initializes totalMonthlyCost
    let totalMonthlyCost = 0;
    
    // uses for loop to access 'annualSalary' within each object of 'employeeDatabase'
    for (let i=0; i<employeeDatabase.length; i++) {
        console.log('in for loop');
        
        // calculate total monthly cost by taking each employee salary within array, adding them together, and dividing by 12
        totalMonthlyCost += (employeeDatabase[i].annualSalary / 12);
    }

    // round totalMonthlyCost to nearest cent
    let roundedTotalMonthlyCost = Math.round(totalMonthlyCost*100)/100;

    let formattedTotalMonthlyCost = formatNumberAsMoney(roundedTotalMonthlyCost);

    // display monthly total cost
    let el = $('#monthlyCostOutput');
    el.empty();
    el.append(`${formattedTotalMonthlyCost}`);

    // turn totalMonthlyCost block to red if total monthly cost is greater than max ($20,000)
    if (roundedTotalMonthlyCost > maxTotalMonthlyCost) {
        $('#monthlyCostBlock').css('background-color', '#8b0000');
        $('#monthlyCostOutput').css('color', '#8b0000')
    }

} // end calculateTotalMonthlyCost

// console.log('Total monthly cost: ', calculateTotalMonthlyCost(employeeDatabase)); // functions correctly. Current value: ~$27229.17

// purpose of function: to remove selected employee from table row on DOM when 'remove' button is selected
function removeEmployee() {
    console.log('in removeEmployee');

    // learned this code from @sluther on stackoverflow
    // $(this).parent().parent().remove();

    let removedEmployee = $(this).data('id');
    employeeDatabase.splice(removedEmployee, 1);

    displayNewEmployee();
    calculateTotalMonthlyCost();

} // end removeEmployee

function formatNumberAsMoney(number){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    return formatter.format(number);
}

function readyNow(){
    console.log('test JQ');

    $('#tableHeader th:last-child').hide();

    $('#submit').on('click', addEmployee);
    
    $('#employeeTable').on('click', '.remove', removeEmployee);
    
} // end readyNow

