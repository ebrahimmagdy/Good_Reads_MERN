import React , {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Modal} from "reactstrap"
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import '../assets/css/adminDashboard.css';



function AddAuthor(data) {
  return fetch('http://localhost:5000/authors/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error while adding adding Category');
  })
}



function DeleteAuthor(id) {
  return fetch('http://localhost:5000/authors/'+id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ new Cookies().get('token'),
    },
  }).then(response =>response.json()
  ).catch(error => {console.log('error while deleting author');})
}

function GetAuthors() {
  return fetch('http://localhost:5000/authors/', {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ new Cookies().get('token'),
        },
  }).then(response => response.json())
}


function EditAuthor(data) {
  return fetch('http://localhost:5000/authors/update/'+data._id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error while editing category');
  })
}


  /****************************************************************** */
class AddAuthorForm extends Component {

    constructor(props) {
        super(props);
        this.state={
          modalIsOpen: false,
          authors: [],
          newAuthor: "",
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }
   
   /*
    * Controlling opening / closing the modal
    */
    handle_modal() {
        this.setState(prevState => ({ modal: !prevState.modal}));
    }

    handling_modal(event) {
      this.handle_updateAuthor(event);
        this.setState(prevState => ({ EditModal: !prevState.EditModal}));
    }

    /*
    * Getting all authors
    */
    componentDidMount(){
      GetAuthors()
      .then(data => {
        this.setState({
            authors: data,
        })
      });
    }

    /*
    * Handling update author
    */
    handle_updateAuthor =(event)=>{
      if(event.target.name === "edit")
          this.setState({ newAuthor: JSON.parse(event.target.value),});
      if(event.target.name === "firstname") 
          this.setState({ newAuthor: {...this.state.newAuthor, firstName: event.target.value,} });
      else if(event.target.name === "lastname") 
          this.setState({ newAuthor: {...this.state.newAuthor, lastName: event.target.value,} });
      else if(event.target.name === "dateofbirth")
          this.setState({ newAuthor: {...this.state.newAuthor, dateOfBirth: event.target.value,} });
      else if(event.target.name === "authorImage") 
          this.setState({ newAuthor: {...this.state.newAuthor, photo: event.target.files[0],}});
      else if(event.target.name === "desc") 
          this.setState({ newAuthor: {...this.state.newAuthor, description: event.target.value,}});
        }
        
    /*
    * Handling adding author
    */
    
    handle_addAuthor =()=>{
        if(!this.state.newAuthor.lastName || (/^ *$/.test(this.state.newAuthor.lastName)) ||
            (/^$/.test(this.state.newAuthor.lastName)) ||!this.state.newAuthor.firstName ||
            (/^ *$/.test(this.state.newAuthor.firstName)) ||(/^$/.test(this.state.newAuthor.firstName))) {        
            swal({
            title: "Invalid Data !", 
            text : "Please Enter a valid Author name !", 
            icon : "error",
            showLoaderOnConfirm: true,
            }).then(function(){console.log("fail to add Author!")})

        }
        else {
          console.log(this.state.newAuthor);
          AddAuthor(this.state.newAuthor).then(data => {
            console.log(data);
            GetAuthors().then(data => {
                this.setState({
                  authors: data,
                  newAuthor: "",
                });                  
                swal({
                  title: "~~ Information ~~", 
                  text : "Your Author was added successfully !", 
                  icon : "success",
                  showLoaderOnConfirm: true,
                  }).then(function(){console.log("added author!")})
                });
          });
        }
    this.setState(prevState => ({modal: !prevState.modal}));
    }

    /*
    * Handling editing author
    */
    handle_EditAuthor =()=>{
        console.log(this.state.newAuthor);
        EditAuthor(this.state.newAuthor).then(data => {
          console.log(data);
            GetAuthors()
            .then(data => {
                this.setState({
                    authors: data,
                    newAuthor : "",
                });
            });
        });
    
    this.setState(prevState => ({EditModal: !prevState.EditModal}));

    }
    /*
    * Handling deleting author
    */
    handle_deletingAuthor = (index) =>{
        const authors = [...this.state.authors];
        DeleteAuthor(authors[index.target.value]._id).then((data) => {
        GetAuthors().then(data => {
        this.setState({
          authors: data,
          newAuthor : "",
          });
        });
        });
    }
    render() {
        return (
      <div>           
        <button onClick={this.handle_modal} className='offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 adding_btn add_category'>{this.props.title} </button>
        <Modal isOpen={this.state.modal} toggle={this.handle_modal} className={this.props.className}>
            <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="name">{this.props.first}</Label>
                        <Input type="name" name="firstname" id="fname"
                        onChange={this.handle_updateAuthor}
                               placeholder="First Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">{this.props.second}</Label>
                        <Input type="name" name="lastname" id="lname"
                        onChange={this.handle_updateAuthor}
                               placeholder="Last Name" />
                    </FormGroup>
                    <FormGroup>
                        <input type="date" name="dateofbirth" id="dateofbirth"
                        onChange={this.handle_updateAuthor}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Upload Image</Label>
                        <Input type="file" name="authorImage" id="exampleFile"
                        onChange={this.handle_updateAuthor}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="text">Description</Label>
                        <Input type="text" name="desc" id="authorDesc"
                        onChange={this.handle_updateAuthor} placeholder="description"/>
                    </FormGroup>

                </Form>

                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" 
                              onClick={this.handle_addAuthor} >{this.props.title}</Button>{' '}
                      <Button color="secondary" onClick={this.handle_modal}>{this.props.cancel}</Button>
                  </ModalFooter>
              </Modal>
              <Modal isOpen={this.state.EditModal} toggle={this.handling_modal} className={this.props.className}>
                  <ModalHeader toggle={this.handling_modal}>Edit Author</ModalHeader>
                  <ModalBody>
                      <FormGroup>
                          <Input type="name" name="firstname" id="name"
                                 placeholder="First Name"
                                 value={this.state.newAuthor.firstName}
                                 onChange={this.handle_updateAuthor}/>
                      </FormGroup>
                     <FormGroup>
                          <Input type="name" name="lastname" id="name"
                                 placeholder="Last Name"
                                 value={this.state.newAuthor.lastName}
                                 onChange={this.handle_updateAuthor}/>
                      </FormGroup>
                    <FormGroup>
                              <input type="date" name="dateofbirth" id="dateofbirth"
                                     value={this.state.newAuthor.dateOfBirth}
                              onChange={this.handle_updateAuthor}/>
                          </FormGroup>
                     <FormGroup>
                              <Label for="exampleFile">Upload Image</Label>
                              <Input type="file" name="authorImage" id="exampleFile"
                              onChange={this.handle_updateAuthor}/>
                          </FormGroup>
                          <FormGroup>
                              <Label for="text">Description</Label>
                              <Input type="text" name="desc" id="authorDesc"
                              onChange={this.handle_updateAuthor} placeholder="description"/>
                          </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                      <Button onClick={this.handle_EditAuthor} color="primary"
                               >Edit</Button>{' '}
                      <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
                  </ModalFooter>
              </Modal>

              <Table>
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Photo</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Date of Birth</th>
                      <th>Actions</th>

                  </tr>
                  </thead>
                  <thead>
                  {this.state.authors.map((author , index) =>
                      <tr>
                          <th>{index+1}</th>
                          <th key={index}>         
                              <img src={"http://localhost:5000/"+author.photo}
                                   width="65" height="65" alt="Author Image"/>
                          </th>
                          <th>
                              {author.firstName}
                          </th>
                          <th>
                              {author.lastName}
                          </th>
                          <th>
                              {author.dateOfBirth.substr(0, 10)}
                          </th>
                          <th>
                            <button value={JSON.stringify(author)} type="button"
                              className="btn btn-info" name="edit" onClick={this.handling_modal}>Edit</button> {" "}
                              <button value= {index} onClick={this.handle_deletingAuthor.bind(this)}
                                  type="button" className="btn btn-danger">Delete</button>
                          </th>
                      </tr>)}
                  </thead>
              </Table>
          </div>);
    }
}
export default AddAuthorForm;