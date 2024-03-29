import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
//This part takes the return value from selectBook then make sure flows all the different reducers 
import { bindActionCreators } from 'redux'; 

class BookList extends Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li 
					key={book.title} 
					onClick={() => this.props.selectBook(book)}
					className="list-group-item">
					{book.title}
				</li>
			);
		});
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		);
	}
}


function mapStateToProps(state) { 
	//Whatever is returned will show up as props
	//inside of Booklist 
	return {
		books: state.books 
	};
}

//Anything returned from this function will end up as props on the BookList container
function mapDispatchToProps(dispatch) { 
	//Whenever selectBook is called, result should be passed to all of our reducers
	return bindActionCreators({ selectBook: selectBook}, dispatch);
}

//Connect takes function and component then produces container
//container is a component that is where is the state contained by redux
//Promote BookList from a component to a container - it needs to know	
//about this new dispatch method, selectBook. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps) (BookList);