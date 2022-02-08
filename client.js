console.log('test JS');

// call to jQuery
$(document).ready(readyNow);

function readyNow(){
    console.log('test JQ');

    //hide expense container on page load
    $('#expenseContainer').hide();

    // hide last header for both containers for cleaner UI
    $('#tableHeader th:last-child').hide();
    $('#expenseHeader th:last-child').hide();

    // click listeners for adding employees/expenses
    $('#submit').on('click', addEmployee);
    $('#submitExpense').on('click', addExpense);
    
    // click listeners for removing employees/expenses
    $('#employeeTable').on('click', '.remove', removeEmployee);
    $('#expenseTable').on('click', '.removeExpense', removeExpense);
    
    $('#expenseTab').on('click', displayExpenseTab);
    $('#salaryTab').on('click', displaySalaryTab);
} // end readyNow

// initializes 'employeeInformation' array
let employeeDatabase = [];

// declare maxTotalMonthlyCost
const maxTotalMonthlyCost = 20000;

function displayExpenseTab() {
    $('#salaryTab').css('background-color', 'white');
    $('#salaryTab').css('color', '#001c61');

    $('#expenseTab').css('background-color', '#001c61');
    $('#expenseTab').css('color', 'white');

    $('#salaryContainer').hide();
    $('#expenseContainer').show();
}

function displaySalaryTab() {
    $('#expenseTab').css('background-color', 'white');
    $('#expenseTab').css('color', '#001c61');

    $('#salaryTab').css('background-color', '#001c61');
    $('#salaryTab').css('color', 'white');

    $('#expenseContainer').hide();
    $('#salaryContainer').show();
}

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
        $('#monthlyCostTitle').css('background-color', '#8b0000');
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
} // formatNumberAsMoney

// EXPENSE CALCULATOR FUNCTIONS ---------------------------------------------------------------------------

let expenseDatabase = [];

const maxTotalMonthlyExpenses = 30000;

function addExpense () {
    console.log('in addExpense');
    
    // function will not run if all input fields are not filled in
    if (($('#expenseName').val() === '') || ($('#expenseCategory').val() === '') || ($('#numberOfUnits').val() === '') || ($('#costPerUnit').val() === '')) {
        alert('Please fill out all form fields')
    } else {
        // initialize newExpense object and gets values of object from input 
        let newExpense = {
            expenseName: $('#expenseName').val(),
            expenseCategory: $('#expenseCategory').val(),
            costPerUnit: Number($('#costPerUnit').val()),
            numberOfUnits: Number($('#numberOfUnits').val()),
        }

        // adds object to 'expenseDatabase' array
        expenseDatabase.push(newExpense);

        // empty input values
        $('input').val('');

        // display newExpense to DOM 
        displayNewExpense();

        // ready to execute calculateTotalMonthlyCost
        calculateTotalMonthlyExpenses ();
    }

} // end addExpense

function displayNewExpense() {
    $('#expenseRows').empty();
    for (let i=0; i<expenseDatabase.length; i++) {
        let totalCost = (expenseDatabase[i].numberOfUnits) * (expenseDatabase[i].costPerUnit);
        
        let el = $(`<tr class="expense">
                        <td>${expenseDatabase[i].expenseName}</td>
                        <td>${expenseDatabase[i].expenseCategory}</td>
                        <td>${formatNumberAsMoney(expenseDatabase[i].costPerUnit)}</td>
                        <td>${expenseDatabase[i].numberOfUnits}</td>
                        <td>${formatNumberAsMoney((totalCost))}</td>
                        <td><button data-idExpense=${[i]} class="removeExpense">REMOVE</button></td></tr>`);
        $('#expenseRows').append(el);
        $('#expenseHeader th:last-child').show();
    }   

    if (expenseDatabase.length === 0) {
        $('#expenseHeader th:last-child').hide();
    }
}

// purpose of function: calculate total monthly cost of expenses within 'expenseDatabase' array
function calculateTotalMonthlyExpenses () {
    console.log('in calculateTotalMonthlyExpenses');

    // initializes totalMonthlyExpenses
    let totalMonthlyExpenses = 0;
    
    // uses for loop to access 'annualSalary' within each object of 'employeeDatabase'
    for (let i=0; i<expenseDatabase.length; i++) {

        let totalCost = (expenseDatabase[i].numberOfUnits) * (expenseDatabase[i].costPerUnit);
    
        // calculate total monthly cost by taking each employee salary within array, adding them together, and dividing by 12
        totalMonthlyExpenses += (totalCost / 12);
    }

    // round totalMonthlyCost to nearest cent
    let roundedTotalMonthlyExpenses = Math.round(totalMonthlyExpenses*100)/100;

    let formattedMonthlyExpenses = formatNumberAsMoney(roundedTotalMonthlyExpenses);

    // display monthly total cost
    let el = $('#monthlyCostExpensesOutput');
    el.empty();
    el.append(`${formattedMonthlyExpenses}`);

    // turn totalMonthlyCost block to red if total monthly cost is greater than max ($20,000)
    if (roundedTotalMonthlyExpenses > maxTotalMonthlyExpenses) {
        $('#monthlyCostExpensesTitle').css('background-color', '#8b0000');
        $('#monthlyCostExpensesOutput').css('color', '#8b0000')
    }

} // end calculateTotalMonthlyExpenses

function removeExpense() {
    console.log('in removeExpense');

    let removedExpense = $(this).data('idExpense');
    expenseDatabase.splice(removedExpense, 1);

    displayNewExpense();
    calculateTotalMonthlyExpenses();

} // end removeExpense

