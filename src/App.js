import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Books from './components/Books';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import BookDisplay from './components/BookDisplay';

function App() {



  const [books, setBooks] = useState([]);
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [currentBook, setCurrentBook] = useState({})
  const [showCurrentBook, setShowCurrentBook] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  function HandleDisplay(clickedBook) {
    setCurrentBook(clickedBook)
    setShowCurrentBook((showCurrentBook) => !showCurrentBook)
  }

  useEffect(() => {
    fetch("http://localhost:9292/all")
      .then(r => r.json())
      .then(bookArr => setBooks(bookArr))
  }, [])

  const displayedBooks = books.filter((book) => {
    return book.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <NavBar
        userAuthorized={userAuthorized}
        setUserAuthorized={setUserAuthorized}
        adminAuthorized={adminAuthorized}
        setAdminAuthorized={setAdminAuthorized}
        setShowCurrentBook={setShowCurrentBook}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm}

      />
      <div id="nav">
        <Switch>
          <Route exact path="/">
            {showCurrentBook ?
              <BookDisplay book={currentBook} /> :
              <Home onHandleDisplay={HandleDisplay} userAuthorized={userAuthorized} />}
          </Route>
          <Route exact path="/admin">
            <Admin books={displayedBooks} setBooks={setBooks} adminAuthorized={adminAuthorized} />
          </Route>
          <Route exact path="/books">
            {showCurrentBook ?
              <BookDisplay book={currentBook} /> :
              <Books userAuthorized={userAuthorized} onHandleDisplay={HandleDisplay} />}
          </Route>

          <Route exact path="/login">
            <Login userAuthorized={userAuthorized} setUserAuthorized={setUserAuthorized} setAdminAuthorized={setAdminAuthorized} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>

      </div>
    </div>
  );
}

export default App;
