import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading.js'
import WantToRead from './WantToRead.js'
import Read from './Read.js'
import ListSearchBooks from './ListSearchBooks'
import Route from 'react-router-dom'
import Link from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  
    books:[],
    booksC:[],
    booksW:[],
    booksR:[]
  }

handleChange=(event)=>{
	if(event.target.value!==''){
      BooksAPI.search(event.target.value).then((result)=>{
        this.setState({books: result})
    });
    
  }else{
  	this.setState({books: []})
  }
  
}

whereIsBook=(book)=>{
 
	if(this.state.booksC.filter((b)=>(b.id===book.id)).length!==0)
      return "currentlyReading";
  	else if(this.state.booksW.filter((b)=>(b.id===book.id)).length!==0)
      return "wantToRead";
  	else if(this.state.booksR.filter((b)=>(b.id===book.id)).length!==0)
      return "read";
  	else
      return "none";
}
removeCurrentlyBook=(book)=>{
 
	let i=-1;
  this.state.booksC.forEach((element,index)=>{
          if(element.id===book.id)
            i=index;
  });
	let array = [...this.state.booksC];  
  if (i !== -1) {
    array.splice(i, 1);
    this.setState({booksC: array});
  }
}
removeWantBook=(book)=>{
  let i=-1;
  this.state.booksW.forEach((element,index)=>{
          if(element.id===book.id)
            i=index;
  });
	let array = [...this.state.booksW];  
  if (i !== -1) {
    array.splice(i, 1);
    this.setState({booksW: array});
  }
}
removeReadBook=(book)=>{
 let i=-1;
  this.state.booksR.forEach((element,index)=>{
          if(element.id===book.id)
            i=index;
  });
	let array = [...this.state.booksR];  
  if (i !== -1) {
    array.splice(i, 1);
    this.setState({booksR: array});
  }
}

handleAddBook=(book, section)=>{
	
 const sectionB= this.whereIsBook(book);
  //If this book exists in any difference list of books, first I delete it
 if(sectionB==='currentlyReading')
      this.removeCurrentlyBook(book);
 else if(sectionB==='wantToRead')
      this.removeWantBook(book);
 else if(sectionB==='read')
      this.removeReadBook(book);
  
  //Then, I add it in their section
  if(section==='currentlyReading'){
    if(sectionB!=='cuurentlyReading')
      this.setState((prevState)=>({booksC:[...prevState.booksC, book]}));
  }else if(section==='wantToRead'){
    if(sectionB!=='wantToRead')
      this.setState((prevState)=>({booksW:[...prevState.booksW, book]}));
  }else if(section==='read'){
    if(sectionB!=='read')
      this.setState((prevState)=>({booksR:[...prevState.booksR, book]}));
  }

}


  render() {
    return (
      <div className="app">
       <Route path='/search' render={()=>(
    		<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/search'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />
                
                
              </div>
            </div>
            <div className="search-books-results">
       
				<ListSearchBooks books={this.state.books} onAddBook={this.handleAddBook} onSelected={this.whereIsBook}/>
			
            </div>
          </div>
    
    	)}/>
        <Route path='/' render={()=>(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                
                <CurrentlyReading books={this.state.booksC} onAddBook={this.handleAddBook} />
          		<WantToRead books={this.state.booksW} onAddBook={this.handleAddBook} />
                <Read books={this.state.booksR} onAddBook={this.handleAddBook} />
                </div>
                
            </div>
            <div className="open-search">
              <a to='/'>Add a book</a>
            </div>
          </div>       
        
        )}/>

      </div>
    )
  }
}

export default BooksApp
