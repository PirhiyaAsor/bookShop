'use strict'
function init() {
    renderBooks()
    renderCategories()
}

function renderCategories() {
    const categories = getCategories()
    const strHTMLs = categories.map((category) => `<option>${category}</option>`)

    const elCategories = document.querySelector('.filter-category-select')

    elCategories.innerHTML += strHTMLs.join('')
}

function renderBooks() {
    var books = getBooks()
    // console.log(books);
    var strHtmls = ''
    strHtmls += books.map((book) => `<tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}</td>
    <td button class="action-btn" onclick="onReadBook('${book.id}')><i class="fa fa-book"></i>Read</button></td>
    <td button class="action-btn" onclick="onUpdateBook('${book.id}')><i class="fa fa-refresh"></i>Update</button></td>
    <td button class="action-btn" onclick="onDeleteBook('${book.id}')><i class="fa fa-trash"></i>Delete</button></td>
    </tr>
    `
    )
    var elTable = document.querySelector('tbody')
    elTable.innerHTML = strHtmls.join('')
}


function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    // const queryStringParams = `?vendor=${filterBy.vendor}&minSpeed=${filterBy.minSpeed}`
    // const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    // window.history.pushState({ path: newUrl }, '', newUrl)
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.category
    elModal.querySelector('h4 span').innerText = book.maxPrice
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
}

function onAddBook() {
    var name = prompt('Book Name?')
    var price = prompt('Book Price?')
    if (name, price) {
        const book = addBook(name,price)
        renderBooks()
        flashMsg(`Book Added (id: ${book.id})`)
    }
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('Price?', book.maxPrice)
    if (newPrice && book.maxPrice !== newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
        flashMsg(`Price updated to: ${book.maxPrice}`)
    }
}


// function onSetSortBy() {
//     const prop = document.querySelector('.sort-by').value
//     const isDesc = document.querySelector('.sort-desc').checked
  
//     const sortBy = {}
//     sortBy[prop] = isDesc ? -1 : 1
  
//     // Shorter Syntax:
//     // const sortBy = {
//     //     [prop] : (isDesc)? -1 : 1
//     // }
  
//     setBookSort(sortBy)
//     renderBooks()
//   }
  
  function onNextPage() {
    nextPage()
    renderCars
  }