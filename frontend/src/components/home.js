import React , {Component} from 'react';
import classnames from 'classnames';
import AddCategoryForm from "./addCategory";
import AddBookForm from "./addBook";
import Cookies from 'universal-cookie';
import '../assets/css/adminDashboard.css';
import { useState } from 'react';
import MyNavbar from "./navbar"
import { 
  ListGroup, 
  ListGroupItem,
  Table } from 'reactstrap';

function isAuthonticated(){
  let cookies = new Cookies();
  if (!cookies.get('token')) {
      window.location = "http://localhost:3000/";
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      isLoading: false,
      isError: false
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:5000/books/')
    if (response.ok) {
      const books = await response.json()
      this.setState({ books, isLoading: false })
      console.log("--------------------------------------------ok-------------------------------------");
    } else {
      this.setState({ isError: true, isLoading: false })
      console.log(response.body);
    }
  }
  
  renderTableHeader = () => {
    return Object.keys(this.state.books[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }

  renderTableRows = () => {
    return this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.photo}</td>
          <td>{book.name}</td>
          <td>{book.authorId}</td>
          <td>{book.categoryId}</td>
        </tr>
      )
    })
  }

  render() {

    isAuthonticated()
    
    const { books, isLoading, isError } = this.state
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div>Error</div>
    }
  
    return books.length > 0
      ? (
        <div>
          <MyNavbar />
          <div id="home_side">
            <ListGroup>
              <ListGroupItem active tag="button" action>All</ListGroupItem>
              <ListGroupItem tag="button" action>Read</ListGroupItem>
              <ListGroupItem tag="button" action>Currently reading</ListGroupItem>
              <ListGroupItem tag="button" action>Want to read</ListGroupItem>
            </ListGroup>
          </div>
          <div id="home_table">
            <Table>
              <thead>
                <tr>
                  {this.renderTableHeader()}
                </tr>
              </thead>
              <tbody>
                {this.renderTableRows()}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div>
          No books.
      </div>
      )
  }
}

export default Home;