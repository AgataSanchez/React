import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {Link} from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input'

class BookSearch extends Component{
	state={
      books:[],
      error:false
    }

handleChange=(event)=>{
  
	if(event.target.value!==''){
      BooksAPI.search(event.target.value).then((result)=>{
       if(result.length>0){
         const listBooks= result.map((bookRes)=>{
           const book= this.props.books.filter(b=> b.id===bookRes.id);
           bookRes.shelf="none";
           return book.length>0 ? (book[0]) : (bookRes);
          })
          
          this.setState({books: listBooks, error:false});
        }else
          this.setState({books:[], error:true});
        
        
    });
    
  }else{
    this.setState({books: []})
  }
}  
  
handleUpdateBook=(book,shelf)=>{
    this.props.onUpdateBook(book,shelf);
}


render(){
  
	return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
      			<DebounceInput  type="text" placeholder="Search by title or author" debounceTimeout={200} 
				onChange={this.handleChange} />
            
              </div>
            </div>
            <div className="search-books-results">
			{(!this.state.error) ? (
              	<ol className="books-grid">
                {
                  (this.state.books!== undefined && this.state.books.length>0) && this.state.books.map((book, index)=>(
                      <li key={index}>
                       <Book bookRead={book} onAddBook={this.handleUpdateBook}/>
                      </li>
                  ))

                }
				</ol>
				) : (<p> Books not found </p>)}
				
            </div>
          </div>
    )

}


}

export default BookSearch;