
let selectedIconClass = null;

document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.trackMoneyButton');
    if (button) {
        button.addEventListener('click', () => {
            window.location.href = 'spent.html';
        });
    }
});

function saveTransaction(type, name, amount, iconClass) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({
        type,
        name,
        amount: parseFloat(amount),
        icon: iconClass || '',
        date: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

function calculateTotals() {
    const transactions = getTransactions();
    let earnings = 0, spent = 0;

    transactions.forEach(t => {
        if (t.type === 'income') earnings += t.amount;
        else if (t.type === 'spent') spent += t.amount;
    });

    return {
        earnings: earnings.toFixed(2),
        spent: spent.toFixed(2),
        total: (earnings - spent).toFixed(2)
    };
}




