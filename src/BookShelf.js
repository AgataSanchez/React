import React, {Component} from 'react'
import Book from './Book.js'
import {Link} from 'react-router-dom'

class BookShelf extends Component{


handleUpdateBook=(book,shelf)=>{
    this.props.onUpdateBook(book,shelf);
}


render(){
	return(
  	<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                
                 <div className="bookshelf">
  				<h2 className="bookshelf-title">Currently Reading</h2>
   
                 <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.props.books.map((book, index)=> book.shelf ==='currentlyReading' &&(
                        <li key={index}>
                         <Book bookRead={book} onAddBook={this.handleUpdateBook}/>
                        </li>
                    ))

                  }
                </ol>
              </div>
              </div>
          		<div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>

                 <div className="bookshelf-books">
                     <ol className="books-grid">
                  {
                   this.props.books.map((book, index)=>book.shelf ==='wantToRead' &&(
                        <li key={index}>
                         <Book bookRead={book} onAddBook={this.handleUpdateBook}/>
                        </li>
                    ))

                  }
                </ol>
              </div>
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>

                 <div className="bookshelf-books">
                    <ol className="books-grid">
                  {
                    this.props.books.map((book, index)=>book.shelf ==='read' &&(
                        <li key={index}>
                         <Book bookRead={book} onAddBook={this.handleUpdateBook}/>
                        </li>
                    ))

                  }
                </ol>
              </div>
              </div>
                </div>
                
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
       </div>
  
  )



}

}

export default BookShelf;