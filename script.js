// TODO: create a create a object constructor to get the added book
// TODO: create a card to display in the container

const bookContainer = document.querySelector('.books-container');
const addBook = document.getElementById('add-submit')

let library = []
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
            this.isRead = isRead
    }
}

const getBookDetails = () => {
    const book_title = document.getElementById('form_title').value
    const book_author = document.getElementById('form_author').value
    const book_page = document.getElementById('form_page').value
    const book_isRead = document.getElementById('form_read').checked
    return new Book(book_title, book_author, book_page, book_isRead)
}

const updateBook = () => {
    let newBook = getBookDetails()
    library.push(newBook)
    setData()
    render()
    clearInputFields()
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
    let bookNumber = document.createElement('p');
    let bookPage = document.createElement('p');
    let cardHeader = document.createElement('div');

    bookNumber.setAttribute('id', 'book-number')
    bookPage.setAttribute('id', 'page')

    cardHeader.className = 'card-header'

    bookPage.innerHTML = `${book.page} <span>pages</span>`

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
    removeCard.className = 'btn btn-sm btn-danger m-2'
    cardBody.className = 'card-body text-center'

    cardTitle.textContent = book.title
    cardAuthor.textContent = book.author
    removeCard.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    if (book.isRead) {
        cardRead.textContent = 'Read'
        cardRead.style.background = '#A8DF8E'
        cardHeader.style.background = '#A8DF8E'
    } else {
        cardRead.textContent = 'Not read'
        cardRead.style.background = '#FF6969'
        cardHeader.style.background = '#FF6969'
    }

    cardRead.addEventListener('click', () => {
        if (cardRead.textContent === 'Read') {
            cardRead.textContent = 'Not read';
            cardRead.style.background = '#FF6969'
            cardHeader.style.background = '#FF6969'
        } else {
            cardRead.textContent = 'Read';
            cardRead.style.background = '#A8DF8E'
            cardHeader.style.background = '#A8DF8E'
        }
    });

    cardBody.append(cardTitle)
    cardBody.append(cardAuthor)
    cardBody.append(cardRead)
    cardBody.append(removeCard)

    // * card

    let card = document.createElement('div');
    card.className = 'card book-item'

    card.append(cardHeader)
    card.append(cardBody)

    bookContainer.append(card)

    // ! The cardNumber is not yet adjusting to its index/length when some card is removed

    bookNumber.textContent = `# ${library.indexOf(book) + 1}`;

    removeCard.addEventListener('click', () => {
        library.splice(card, 1)
        setData()
        render()
    })
}

// Clear input fields after adding a book
const clearInputFields = () => {
    document.getElementById('form_title').value = '';
    document.getElementById('form_author').value = '';
    document.getElementById('form_page').value = '';
    document.getElementById('form_read').checked = false;
}

addBook.addEventListener('click', updateBook)

function setData() {
    localStorage.setItem(`library`, JSON.stringify(library));
}

function restore() {
    if (!localStorage.library) {
        render();
    } else {
        let objects = localStorage.getItem('library')
        objects = JSON.parse(objects);
        library = objects;
        render();
    }
}

restore();