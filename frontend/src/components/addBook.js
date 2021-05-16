import React , {Component} from 'react';
import Cookies from "universal-cookie";
import {Button, Form, FormGroup, Input, Label, Modal,
        ModalBody, ModalFooter,ModalHeader, Table } from "reactstrap";
import swal from 'sweetalert';
import '../assets/css/adminDashboard.css';


function GetBooks() {
    return fetch('http://localhost:4000/books/')
    .then(response => response.json())
}
  
function GetAuthors() {
    return fetch('http://localhost:4000/authors/')
    .then(response => response.json())
}

function GetCategories() {
    return fetch('http://localhost:4000/categories/')
    .then(response => response.json())
  }

function AddBook(data)
{
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('categoryId', data.categoryId);
    formData.append('authorId', data.authorId);
    formData.append('photo', data.photo);

  return fetch('http://localhost:4000/books/', {
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": new Cookies().get('token'),
    },
  }).then(response => response.json()
   ).catch(error => {console.log('Error while adding book!');})
}

function EditBook(data) 
{
  const formData = new FormData();
  formData.append('name', data.name);
  if(data.categoryId._id) 
    data.categoryId = data.categoryId._id;
  
  if(data.authorId._id) 
    data.authorId = data.authorId._id;
  
  formData.append('categoryId', data.categoryId);
  formData.append('authorId', data.authorId);
  formData.append('photo', data.photo);

  return fetch('http://localhost:4000/books/'+data._id, {
    method: 'PUT',
    body: formData,
    headers: { "Authorization": new Cookies().get('token'),
},
  }).then(response => response.json()
  ).catch(error => { console.log('Error while getting books !');})
}

  
function DeleteBook(id)
{
    return fetch('http://localhost:4000/books/'+id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": new Cookies().get('token'),
      },
    }).then(response => response.json()
    ).catch(error => {console.log('Error while deleting the book!');})
} 

/**************************************************************** */
class AddBookForm extends Component{

    constructor(props) {
        super(props);
        this.state={
            modalIsOpen: false,
            books: [],
            authors: [],
            newBook: {},
            categories: [],
        };
        this.handle_gettingBooks = this.handle_gettingBooks.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }

    /*
    * Handle getting all caterories
    */
    handle_gettingBooks() {
        GetCategories()
          .then(data => {
            this.setState({
                categories: data,
                newBook: {...this.state.newBook, categoryId: data[0]._id},
            });
          }).then(() => {
              GetAuthors()
              .then(data => {
                this.setState({
                    authors: data,
                    newBook: {...this.state.newBook, authorId: data[0]._id},
                })
              }).then(() => {
                  this.setState(prevState => ({
                    modal: !prevState.modal
                  }));
              });
        });
    
    }

    /*
    * Handle updating a book
    */
    handle_updateBook =(event)=>{
        console.log(event.target.name,event.target.value);
        if(event.target.name === "edit") 
            this.setState({ newBook: JSON.parse(event.target.value), });
        else if(event.target.name === "name") 
            this.setState({ newBook: {...this.state.newBook, name: event.target.value,} });
        else if(event.target.name === "category") 
            this.setState({ newBook: {...this.state.newBook, categoryId: event.target.value,} });
        else if(event.target.name === "author") 
            this.setState({ newBook: {...this.state.newBook, authorId: event.target.value,} });
        else if(event.target.name === "coverImage") 
            this.setState({ newBook: {...this.state.newBook, photo: event.target.files[0],}});  
    }

    /*
    * Controlling opening / closing the modal
    */
    handling_modal(event) {
        this.handle_updateBook(event);
        this.setState(prevState => ({ EditModal: !prevState.EditModal}));
    }
    
    /*
    * Handle adding new book
    */
    handle_addBook =()=>{
        if(!this.state.newBook.name ||(/^ *$/.test(this.state.newBook.name)) || (/^$/.test(this.state.newBook.name))) {
        swal({
        title: "Invalid Data !", 
        text : "Please Enter a valid Book name !", 
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){console.log("fail to add Author!")})
        }
        else {
            AddBook(this.state.newBook).then(data => {
            GetBooks().then((data) => {
                this.setState({
                    books: data,
                    newBook: '',
                });
                swal({
                title: "~~ Information ~~", 
                text : "Your Book was added successfully !", 
                icon : "success",
                showLoaderOnConfirm: true,
                }).then(function(){console.log("added book!")})
            })
        });
        }
       this.setState(prevState => ({modal: !prevState.modal}));
    }	

    /*
    * Handle editing a book
    */
    handle_EditBook =()=>{
        EditBook(this.state.newBook).then(data => {
            GetBooks().then((data) => {
                this.setState({
                    books: data,
                    newBook :'',
                });
            })
        });
    this.setState(prevState => ({ EditModal: !prevState.EditModal }));
    }

    /*
    * Handle deleting a book
    */
    handle_deletingBook = (index) =>{
        const books = [...this.state.books];
        DeleteBook(books[index.target.value]._id).then((data) => {
        GetBooks().then(data => {
            this.setState({
                books: data,
                newBook: "",
                });
            });
        });
    }

    componentDidMount(){
        GetBooks().then(data => {
        this.setState({books: data,})
      });
    
      GetCategories().then(data => {
        this.setState({
            categories: data,
            newBook: {...this.state.newBook, categoryId: data[0]._id},
        });
      });
      
      GetAuthors().then(data => {
        this.setState({
            authors: data,
            newBook: {...this.state.newBook, authorId: data[0]._id},
        })
      });
    }

   render() {
        return (
            <div>
                <button onClick={this.handle_gettingBooks} className='offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 adding_btn add_category'>{this.props.title}</button>
                <Modal isOpen={this.state.modal} toggle={this.handle_gettingBooks} className={this.props.className}>
                    <ModalHeader toggle={this.handle_gettingBooks}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Book name</Label>
                                <Input type="name" name="name" id="name"
                                       placeholder="Book name" value={this.state.newBook.name}
                                       onChange={this.handle_updateBook}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Select Category</Label>
                                <Input type="select" name="category" id="exampleSelect"
                                       onChange={this.handle_updateBook}>
                                    {this.state.categories.map((category, index) =>
                                        <option value={category._id}>{category.name}</option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Select Author</Label>
                                <Input type="select" name="author" id="exampleSelect"

                                       onChange={this.handle_updateBook}>
                                    {this.state.authors.map((author, index) =>
                                        <option value={author._id}>
                                            {author.firstName +" "+ author.lastName}
                                        </option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Upload Image</Label>
                                <Input type="file" name="coverImage" id="exampleFile"
                                       onChange={this.handle_updateBook}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handle_gettingBooks}
                        onClick={this.handle_addBook}>{this.props.title}</Button>{' '}
                        <Button color="secondary" onClick={this.handle_gettingBooks}>
                            {this.props.cancel}</Button>
                    </ModalFooter>

                </Modal>

                <Modal isOpen={this.state.EditModal} toggle={this.handling_modal}
                       className={this.props.className}>
                    <ModalHeader toggle={this.handling_modal}>Edit Book</ModalHeader>
                    <ModalBody>
                         <Form>
                            <FormGroup>
                                <Label for="name">Edit Book name</Label>
                                <Input type="name" name="name" id="name"
                                       placeholder="Edit Book name"
                                       value={this.state.newBook.name}
                                       onChange={this.handle_updateBook}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Edit Category</Label>
                                <Input value={this.state.newBook.categoryId} type="select" name="category" id="exampleSelect"
                                    onChange={this.handle_updateBook}>
                                    {this.state.categories.map((category, index) =>
                                        <option value={category._id}>{category.name}</option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Edit Author</Label>
                                <Input type="select" name="author" id="exampleSelect"
                                       value={this.state.newBook.authorId}
                                       onChange={this.handle_updateBook}>
                                       {this.state.authors.map((author, index) =>
                                        <option value={author._id}>
                                            {author.firstName +" "+ author.lastName}
                                        </option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Edit Image</Label>
                                <Input type="file" name="coverImage" id="exampleFile"
                                       onChange={this.handle_updateBook}
                                />
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"  onClick={this.handle_EditBook}>
                            Edit
                        </Button>
                        {' '}
                        <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <thead>
                    {this.state.books.map((book , index) =>
                        <tr>
                            <th>{index+1}</th>
                            <th key={index}>
                                <img src={"http://localhost:4000/"+book.photo}
                                     width="65" height="65" alt="book Image"/>
                            </th>
                            <th>{book.name}</th>
                            <th>{book.categoryId.name}</th>
                            <th>{book.authorId.firstName +" "+book.authorId.lastName}</th>
                            <th>
                                <button value={JSON.stringify(book)} type="button"
                                        className="btn btn-info"
                                        name="edit"
                                        onClick={this.handling_modal}>Edit</button> {" "}
                                <button value= {index} onClick={this.handle_deletingBook.bind(this)}
                                    type="button" className="btn btn-danger">Delete</button> </th>
                        </tr>)}

                    </thead>
                </Table>
            </div>);
    }
}

export default AddBookForm;
