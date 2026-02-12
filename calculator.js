// Array to store all valid calculations for statistics
let calculations = [];

function calculate() {
    // Get input values
    let x = document.getElementById('num1').value.trim();
    let op = document.getElementById('operator').value;
    let y = document.getElementById('num2').value.trim();
    
    let result;
    let isValid = true;
    
    // Convert to numbers
    let num1 = parseFloat(x);
    let num2 = parseFloat(y);
    
    // Validate inputs
    if (x === '' || y === '') {
        result = 'wrong input number';
        isValid = false;
        showMessage('Please enter both numbers', 'error');
    } else if (isNaN(num1) || isNaN(num2)) {
        result = 'wrong input number';
        isValid = false;
        showMessage('Invalid number format', 'error');
    } else {
        // Perform calculation
        switch (op) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    result = 'computation error';
                    isValid = false;
                    showMessage('Division by zero is not allowed', 'error');
                } else {
                    result = num1 / num2;
                }
                break;
            case '%':
                if (num2 === 0) {
                    result = 'computation error';
                    isValid = false;
                    showMessage('Modulus by zero is not allowed', 'error');
                } else {
                    result = num1 % num2;
                }
                break;
            default:
                result = 'wrong input number';
                isValid = false;
                showMessage('Invalid operator', 'error');
        }
        
        if (isValid) {
            showMessage('Calculation successful!', 'success');
        }
    }
    
    // Add row to table
    addRowToTable(x, op, y, result, isValid);
    
    // Store valid calculations for statistics
    if (isValid && typeof result === 'number') {
        calculations.push(result);
        updateStatistics();
    }
    
    // Clear inputs for next calculation
    clearInputs();
}

function addRowToTable(x, op, y, result, isValid) {
    let tableBody = document.getElementById('tableBody');
    let row = tableBody.insertRow();
    
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    cell1.textContent = x;
    cell2.textContent = op;
    cell3.textContent = y;
    
    if (isValid && typeof result === 'number') {
        // Round to 2 decimal places if necessary
        cell4.textContent = Math.round(result * 100) / 100;
    } else {
        cell4.innerHTML = '<span class="error">' + result + '</span>';
    }
}

function updateStatistics() {
    if (calculations.length === 0) {
        document.getElementById('statsFooter').innerHTML = '';
        return;
    }
    
    // Calculate statistics
    let min = Math.min(...calculations);
    let max = Math.max(...calculations);
    let total = calculations.reduce((sum, val) => sum + val, 0);
    let average = total / calculations.length;
    
    // Round to 2 decimal places
    average = Math.round(average * 100) / 100;
    total = Math.round(total * 100) / 100;
    min = Math.round(min * 100) / 100;
    max = Math.round(max * 100) / 100;
    
    // Update footer
    let statsFooter = document.getElementById('statsFooter');
    statsFooter.innerHTML = `
        <tr class="stats-row">
            <th>Min</th>
            <th>Max</th>
            <th>Average</th>
            <th>Total</th>
        </tr>
        <tr>
            <td>${min}</td>
            <td>${max}</td>
            <td>${average}</td>
            <td>${total}</td>
        </tr>
    `;
}

function showMessage(text, type) {
    let messageDiv = document.getElementById('message');
    messageDiv.className = 'result-message ' + type;
    messageDiv.textContent = text;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 3000);
}

function clearInputs() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('num1').focus();
}



// Event listeners for Enter key functionality
function setupEventListeners() {
    document.getElementById('num1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    document.getElementById('num2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
}

// Initialize on page load
window.onload = function() {
    setupEventListeners();
    document.getElementById('num1').focus();
};