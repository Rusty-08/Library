// TODO: create a create a object constructor to get the added book
// TODO: create a card to display in the container

const bookContainer = document.getElementById('books-container');

function Book() {
    this.title = title,
        this.author = author,
        this.page = page,
        this.read = function () {
            return
        }
}

const createBookCard = () => {

    let cardHeader = createCardHeader()
    let cardBody = createCardBody()

    let card = document.createElement('div');
    card.className = 'card'

    card.appendChild(cardHeader)
    card.appendChild(cardBody)
}

const createCardHeader = () => {
    let bookNumber = document.createElement('p');
    let bookPage = document.createElement('p');
    let cardHeader = document.createElement('div');

    bookNumber.setAttribute('id', 'book-number')
    bookPage.setAttribute('id', 'page')

    cardHeader.className = 'card-header'

    cardHeader.appendChild(bookPage)
    cardHeader.appendChild(bookNumber)
}

const createCardBody = () => {
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
    cardRead.className = 'btn btn-success btn-sm'
    removeCard.className = 'btn btn-danger btn-sm'
    cardBody.className = 'card-body text-center'

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardAuthor)
    cardBody.appendChild(cardRead)
    cardBody.appendChild(removeCard)
}