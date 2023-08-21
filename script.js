// TODO: create a create a object constructor to get the added book
// TODO: create a card to display in the container

const bookContainer = document.querySelector('.books-container')
const addBook = document.getElementById('add-submit')
const bookForm = document.getElementById('book-form')

let library = []
class Book {
    constructor(
        title,
        author,
        page,
        isRead
    ) {
        this.title = title,
            this.author = author,
            this.page = page,
            this.isRead = isRead
    }
}

const getBookDetails = () => {
    const book_title = document.getElementById('form_title').value || 'Unknown'
    const book_author = document.getElementById('form_author').value || 'Unknown'
    const book_page = document.getElementById('form_page').value || 0
    const book_isRead = document.getElementById('form_read').checked
    return new Book(book_title, book_author, book_page, book_isRead)
}

const updateBook = () => {
    let newBook = getBookDetails()
    library.push(newBook)
    setData()
    render()
    bookForm.reset()
}

function render() {
    const books = document.querySelectorAll('.book-item');
    books.forEach(book => bookContainer.removeChild(book));

    for (let i = 0; i < library.length; i++) {
        createBookCard(library[i]);
    }
}

const createBookCard = (book) => {

    // * card header

    let bookNumber = document.createElement('p')
    let bookPage = document.createElement('p')
    let cardHeader = document.createElement('div')

    bookNumber.setAttribute('id', 'book-number')
    bookPage.setAttribute('id', 'page')

    cardHeader.className = 'card-header'

    bookPage.innerHTML = `${book.page.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span>pages</span>`

    cardHeader.append(bookNumber)
    cardHeader.append(bookPage)

    // * card body

    let cardTitle = document.createElement('h5');
    let cardAuthor = document.createElement('p');
    let cardRead = document.createElement('a');
    let removeCard = document.createElement('a');
    let cardBody = document.createElement('div');

    cardTitle.setAttribute('id', 'title')
    cardAuthor.setAttribute('id', 'author')
    cardRead.setAttribute('id', 'read-btn')
    removeCard.setAttribute('id', 'remove-btn')

    cardTitle.className = 'card-title'
    cardAuthor.className = 'card-subtitle fw-light mb-1'
    cardRead.className = 'btn btn-sm'
    removeCard.className = 'btn btn-sm m-2 text-light'
    cardBody.className = 'card-body text-center'
    removeCard.style.background = '#FF6969'

    cardTitle.textContent = book.title
    cardAuthor.textContent = book.author
    removeCard.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    const bookRead = (book) => {
        book.isRead = true;
        cardRead.textContent = 'Completed'
        cardRead.style.background = '#A8DF8E'
        cardHeader.style.background = '#A8DF8E'
        setData()
    }

    const bookNotRead = (book) => {
        book.isRead = false
        cardRead.textContent = 'Incomplete'
        cardRead.style.background = '#96B6C5'
        cardHeader.style.background = '#96B6C5'
        setData()
    }

    if (book.isRead) {
        bookRead(book)
    } else {
        bookNotRead(book)
    }

    cardRead.addEventListener('click', () => {
        if (cardRead.textContent === 'Completed') {
            bookNotRead(book)
        } else {
            bookRead(book)
        }
    })

    cardBody.append(cardTitle)
    cardBody.append(cardAuthor)
    cardBody.append(cardRead)
    cardBody.append(removeCard)

    let card = document.createElement('div')
    card.className = 'card book-item'

    card.append(cardHeader)
    card.append(cardBody)

    bookContainer.append(card)

    bookNumber.textContent = `# ${library.indexOf(book) + 1}`

    removeCard.addEventListener('click', () => {
        library.splice(library.indexOf(book), 1)
        setData()
        render()
    })
}

function setData() {
    localStorage.setItem(`library`, JSON.stringify(library))
}

function restore() {
    if (!localStorage.library) {
        render()
    } else {
        let objects = localStorage.getItem('library')
        objects = JSON.parse(objects);
        library = objects;
        render();
    }
}

addBook.addEventListener('click', updateBook)

restore();