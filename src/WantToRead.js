import React, {Component} from 'react'
import ListSearchBooks from './ListSearchBooks.js'


class WantToRead extends Component{
	
onAddBook=(book,section)=>{
	this.props.onAddBook(book,section);
}


render(){
	return (
  <div className="bookshelf">
  <h2 className="bookshelf-title">Want to Read</h2>
   
     <div className="bookshelf-books">
         <ol className="books-grid">
   {(this.props.books.length>0) ? (<ListSearchBooks books={this.props.books} onAddBook={this.props.onAddBook} selected="wantToRead"/>)
		: (<div>There's not books</div>)
     }
            
      </ol>
  </div>
  </div>
  
  
  )

}

}

export default WantToRead;