'use strict'

const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 8
var gPageIdx = 0

var gBooks
const gNames = ['Room on the Broom', 'The Wonky Donkey', 'The Gruffalos Child', 'The Snail and the Whale',]
const gCategory = ['Children', 'Adults', 'Food', 'Nature']
var gFilterBy = { price: 0, category: '' }

_createBooks()

function _createBook(name, category) {
    return {
        id: makeId(),
        name,
        price: getRandomIntInclusive(10, 85) + '$',
        desc: makeLorem(),
        rate: 0,
        category,
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 32; i++) {
            var name = gNames[getRandomIntInclusive(0, gNames.length - 1)]
            var category = gCategory[getRandomIntInclusive(0, gCategory.length - 1)]
            books.push(_createBook(name,category))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function getCategories() {
    return gCategory
}

function getBooks() {
    var books = gBooks.filter(
        (book) =>
            book.category.includes(gFilterBy.category) //&&
            // book.minPrice >= gFilterBy.maxPrice
            // console.log(books);
    )
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
} 

function setBookFilter(filterBy = {}) {
    if (filterBy.category !== undefined) gFilterBy.category = filterBy.category
    if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
    return gFilterBy
  }

  function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id)
    return book
  }

  
  function addBook(category) {
    const book = _createBook(category)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
  }
  
  function updateBook(bookId, newName, newPrice) {
    const book = gBooks.find((book) => book.id === bookId)
    book.name = newName
    book.maxPrice = newPrice
    _saveBooksToStorage()
    return book
  }

  function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
  }

  function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
  }
  