import React, { useState, useEffect } from 'react'
import BookCard from './BookCard'


function Home({ onHandleDisplay }) {
    const [newBooks, setNewBooks] = useState([])
    const [popularBooks, setPopularBooks] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/books/newest_books")
            .then(r => r.json())
            .then(bookArr => setNewBooks(bookArr))
    }, [])

    useEffect(() => {
        fetch("http://localhost:9292/books/popular_books")
            .then(r => r.json())
            .then(bookArr => setPopularBooks(bookArr))
    }, [])

    const newBookCard = newBooks.map((book) => {
        return (
            <BookCard book={book} key={`newBook${book.id}`} onHandleDisplay={onHandleDisplay} />
        )
    })

    const popularBookCard = popularBooks.map((book) => {
        return (
            <BookCard book={book} key={`popularBook${book.id}`} onHandleDisplay={onHandleDisplay} />
        )
    })

    return (
        <div>
            <div id="title-box">
                <div id="title-container">
                    <h1 id="book-store-name">FLATTY'S BOOKS</h1>
                </div>
            </div>
            <h2 className="home-page-label"><em>Popular Books</em></h2>
            <div className="books-card-box">
                <div className="book-card-container">
                    {popularBookCard}
                </div>
            </div>
            <h2 className="home-page-label"><em>Newest Books</em></h2>
            <div className="books-card-box">
                <div className="book-card-container">
                    {newBookCard}
                </div>
            </div>
        </div>
    )
}

export default Home