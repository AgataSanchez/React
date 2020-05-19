import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch.js'
import BookShelf from './BookShelf.js'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[]
  }

componentDidMount(){
  
  BooksAPI.getAll().then((result)=>{
    this.setState({books: result})
  });
	
}
updateBooks=(book, shelf)=>{
  
  BooksAPI.update(book,shelf).then(()=>{
    
  	const indexBook= this.state.books.indexOf((book));
    if(indexBook!==-1){//The book exists in some shelf, so I update the new self
    	let list= this.state.books;
      	list[indexBook].shelf=shelf;
      	this.setState({books:list})
    }else{ //The book doesn't exist in any shelf
      	book.shelf=shelf;
    	this.setState((prevState)=> ({books: [...prevState.books, book]}))
    }
  })
  
}

  render() {
    return (
      <div className="app">
       <Route exact path='/' render={()=>(
       		<BookShelf books={this.state.books} onUpdateBook={this.updateBooks}/>
       
       )} />
       <Route path='/search' render={()=>(
    		<BookSearch books={this.state.books} onUpdateBook={this.updateBooks}/>
    	)}/>
               
      </div>
    )
  }
}

export default BooksApp
