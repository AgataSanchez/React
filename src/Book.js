import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI.js'


class Book extends Component{
  
	state={
    	value:this.props.selected
    }
  

handleAddBook=(event)=>{
  
 const value=event.target.value;
 
    BooksAPI.get(event.target.id).then((result)=>{
      this.props.onAddBook(result,value);
    });
 this.setState({value:value});
}

render(){
  
  return(
    (this.props.bookRead!==undefined) &&(
  	
    		   <div className="book">
               <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (this.props.bookRead.imageLinks!==undefined) ? ('url('+this.props.bookRead.imageLinks.smallThumbnail+')'): ('url('+this.props.bookRead.imageLinks+')')}}>					</div>
            <div className="book-shelf-changer">
                <select className="select" id={this.props.bookRead.id}  onChange={this.handleAddBook} value={this.state.value} >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read" >Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{this.props.bookRead.title}</div>
            <div className="book-authors">{(this.props.bookRead.authors !==undefined) && this.props.bookRead.authors.map((a)=>(a))}</div>
            </div>
     
	)
  )
}
}


export default Book;