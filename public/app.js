class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class Store {
    static getBooks() {
        let books
        if (localStorage.getItem('books') === null || localStorage.getItem('books') === '') {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index,1)
                localStorage.setItem('books',JSON.stringify(books))
            }
        })
    }
}

class UI {
    static displayBooks() {
        const StoredBooks = Store.getBooks()
        const books = StoredBooks
        books.forEach((book) => UI.addBook(book))
    }

    static addBook(book) {
        const list = document.getElementById('book-list')
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <a href="#" class="btn btn-danger btn-sm delete">X</a>
            </td>
        `
        list.appendChild(row)
        UI.formAlert('Book Added','success')
    }

    static deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove()
            UI.formAlert('Book Removed','success')
        }
    }

    static formAlert(msg, className) {
        let alerts = document.querySelector('.alert')
        if (alerts !== null) {
            alerts.remove()
        }

        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(msg))
        const container = document.querySelector('.container')
        const form = document.getElementById('book-form')
        container.insertBefore(div,form)

        setTimeout(() => {
            alerts = document.querySelector('.alert')
            if (alerts !== null) {
                alerts.remove()
            }
        }, 3000)
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks)

document.getElementById('book-form').addEventListener('submit', (e)=> {
    e.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    if (title === '' || author === '' || isbn === '') {
        UI.formAlert('Please fill all fields','danger')
    } else {
        const book = new Book(title, author, isbn)
        Store.addBook(book)
        UI.addBook(book)
        e.target.reset()
    }
})

document.getElementById('book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
})
