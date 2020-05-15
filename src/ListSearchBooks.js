import React, {Component} from 'react'
//import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListSearchBooks extends Component{
 	   
 handleAddBook=(book,section)=>{
	this.props.onAddBook(book,section);
}

checkSelect=(book)=>{
 
	return this.props.onSelected(book);
}

render(){
  
	return(
     
     <ol className="books-grid">
      {
      	(this.props.books!== null && this.props.books.length>0) && this.props.books.map((book, index)=>(
    		<li key={index}>
             <Book bookRead={book} onAddBook={this.handleAddBook} selected={(this.props.selected===undefined) ? (this.checkSelect(book)) : (this.props.selected)}/>
			</li>
    	))
      	
	  }
	</ol>
	

    )

}


}

export default ListSearchBooks;