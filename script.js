// TODO: create a create a object constructor to get the added book
// TODO: create a card to display in the container

const bookContainer = document.querySelector('.books-container');
const addBook = document.getElementById('add-submit')

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        page = '0',
        isRead = false
    ) {
        this.title = title,
            this.author = author,
            this.page = page,
            this.isread = isRead
    }
}

const getBookDetails = () => {
    const book_title = document.getElementById('title').value
    const book_author = document.getElementById('author').value
    const book_page = document.getElementById('page').value
    const book_isRead = document.getElementById('read').checked
    return new Book(book_title, book_author, book_page, book_isRead)
}

const updateBook = () => {
    let newBook = getBookDetails()
    createBookCard(newBook)
}

const createBookCard = (book) => {
    // * card header
    let bookNumber = document.createElement('p');
    let bookPage = document.createElement('p');
    let cardHeader = document.createElement('div');

    bookNumber.setAttribute('id', 'book-number')
    bookPage.setAttribute('id', 'page')

    cardHeader.className = 'card-header'

    let i = 1
    bookNumber.textContent = `# ${i++}`
    bookPage.textContent = `${book.page} pages`

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
    cardAuthor.className = 'card-subtitle fw-light mb-3'
    cardRead.className = 'btn btn-sm'
    removeCard.className = 'btn btn-sm btn-danger'
    cardBody.className = 'card-body text-center'

    cardTitle.textContent = `${book.title}`
    cardAuthor.textContent = `${book.author}`
    removeCard.textContent = 'Remove'

    if (book.isRead) {
        cardRead.textContent = 'Read'
        cardRead.classList.add('btn-success')
    } else {
        cardRead.textContent = 'Not read'
        cardRead.classList.add('btn-danger')
    }

    cardBody.append(cardTitle)
    cardBody.append(cardAuthor)
    cardBody.append(cardRead)
    cardBody.append(removeCard)

    // * card

    let card = document.createElement('div');
    card.className = 'card'

    card.append(cardHeader)
    card.append(cardBody)

    bookContainer.append(card)
}

addBook.addEventListener('click', updateBook);