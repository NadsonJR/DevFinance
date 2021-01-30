const Modal = {
    open() {
        // Abrir Modal
        // Adicionando a Class Active ao modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        //Fechar modal
        //removendo a Class Active do Modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2020'
        },
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2020'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2020'
        },
        {
            description: 'App',
            amount: 50000,
            date: '23/01/2020'
        }
    ],
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index)
        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach((transaction) => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    //adiciona o objeto a tabela
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {

        //Verifica se o valor é positivo ou negativo
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formtCurrency(transaction.amount)

        //Monta o td da tabela com o objeto
        const html =
            `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="remover transação">
        </td>
        `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formtCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formtCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formtCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Utils = {
    formatAmount(value) {
            value = Number(value.replace(/\,\./g, "")) * 100
            return value
    },
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    //Formatação da numeração
    formtCurrency(value) {
        const signal = Number(value) < 0 ? " - " : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }

}

const Form = {

    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValue() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields() {
        const { description, amount, date } = Form.getValue()
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Preencha todos os campos")
        }
    },
    formatValues() {
        let { description, amount, date } = Form.getValue()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return { description, amount, date }
    },
    clearField() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()
        try {
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.clearField()
            Modal.close()
            console.log(transaction)
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {

        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },

}

App.init()

