let selectedIconClass = null;

function saveTransaction(type, name, amount, iconClass) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        type: type,
        name: name,
        amount: parseFloat(amount),
        icon: iconClass || null,
        date: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

function calculateTotals() {
    const transactions = getTransactions();
    let earnings = 0;
    let spent = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            earnings += transaction.amount;
        } else if (transaction.type === 'spent') {
            spent += transaction.amount;
        }
    });

    return {
        earnings: earnings.toFixed(2),
        spent: spent.toFixed(2),
        total: (earnings - spent).toFixed(2)
    };
}

function displayTransactions() {
    const transactions = getTransactions();
    const transactionList = document.querySelector('.transaction-box ul');

    if (transactionList) {
        transactionList.innerHTML = '';
        transactions.slice().reverse().forEach(transaction => {
            const li = document.createElement('li');
            li.className = transaction.type;

            let iconClass = transaction.icon || 'fas fa-question';

            li.innerHTML = `
                <i class="${iconClass}"></i>
                <span>${transaction.name}</span>
                <span>€${transaction.amount.toFixed(2)}</span>
            `;
            transactionList.appendChild(li);
        });
    }

    const totals = calculateTotals();
    const earningsElement = document.querySelector('.earnings span:first-child');
    const spentElement = document.querySelector('.spent span:first-child');
    const totalElement = document.querySelector('.total span:first-child');

    if (earningsElement) earningsElement.textContent = `€${totals.earnings}`;
    if (spentElement) spentElement.textContent = `€${totals.spent}`;
    if (totalElement) totalElement.textContent = `€${totals.total}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const trackMoneyButton = document.querySelector('.trackMoneyButton');
    if (trackMoneyButton) {
        trackMoneyButton.addEventListener('click', () => {
            window.location.href = 'spent.html';
        });
    }

    // Spent toevoegen
    const addSpentButton = document.getElementById('addChangesButton');
    if (addSpentButton && !addSpentButton.classList.contains('big-green-button')) {
        addSpentButton.addEventListener('click', () => {
            const name = document.getElementById('spent-name').value;
            const amount = document.getElementById('spent-amount').value;
            if (name && amount) {
                saveTransaction('spent', name, amount, selectedIconClass || 'fa-solid fa-gas-pump');
                window.location.href = 'index.html';
            } else {
                alert('Vul naam en bedrag in!');
            }
        });
    }

 
    const addEarningsButton = document.getElementById('addChangesButton');
    if (addEarningsButton && addEarningsButton.classList.contains('big-green-button')) {
        addEarningsButton.addEventListener('click', () => {
            const name = document.getElementById('earnings-name').value;
            const amount = document.getElementById('earnings-amount').value;
            if (name && amount) {
                saveTransaction('income', name, amount, selectedIconClass || 'fas fa-user');
                window.location.href = 'index.html';
            } else {
                alert('Vul naam en bedrag in!');
            }
        });
    }

    
    const switchButtons = document.querySelectorAll('.switch-button');
    switchButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('red-button')) {
                window.location.href = 'spent.html';
            } else {
                window.location.href = 'earnings.html';
            }
        });
    });

  
    const icons = document.querySelectorAll('.icon-container i');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
           
            icons.forEach(i => i.classList.remove('active-icon'));
            
            icon.classList.add('active-icon');
            
            selectedIconClass = icon.getAttribute('data-icon');
        });
    });

    
    displayTransactions();
});