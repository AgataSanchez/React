import React,  {Component} from 'react'
import ListSearchBooks from './ListSearchBooks.js'

class CurrentlyReading extends Component{

onAddBook=(book,section)=>{
	this.props.onAddBook(book,section);
}

render(){
	return(
  <div className="bookshelf">
  <h2 className="bookshelf-title">Currently Reading</h2>
   
     <div className="bookshelf-books">
   {(this.props.books.length>0) ? (<ListSearchBooks books={this.props.books} onAddBook={this.props.onAddBook} selected="currentlyReading"/>)
		: (<div>There's not books</div>)
     }
  </div>
  </div>
  
  )
}

}

export default CurrentlyReading;