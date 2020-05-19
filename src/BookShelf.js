import React, {Component} from 'react'
import Book from './Book.js'
import {Link} from 'react-router-dom'

class BookShelf extends Component{


handleUpdateBook=(book,shelf)=>{
    this.props.onUpdateBook(book,shelf);
}


render(){
  const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read']
  }
	return(
  	<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
      			{
      				Object.keys(shelves).map((key, index)=>(
    					<div key={index} className="bookshelf">
  						<h2 className="bookshelf-title">{shelves[key][0]}</h2>

					 	<div className="bookshelf-books">
                			<ol className="books-grid">
                  			{
                    		this.props.books.map((book, index)=> book.shelf ===shelves[key][1] &&(
                        		<li key={index}>
                         		<Book bookRead={book} onAddBook={this.handleUpdateBook}/>
                        		</li>
                    		))
                  			}
                			</ol>
              			</div>
              			</div>
    				))
				}
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