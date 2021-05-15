import React from 'react';
import { Button,Form,FormGroup,Label,Col,Row,Card,CardText,ListGroupItem,ListGroup } from 'react-bootstrap';
import Cookies from "universal-cookie";
import swal from 'sweetalert';

 function SignUpUser(data) {
  return fetch('http://localhost:5000/users/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => 
   response.json()
  ).catch(error => { console.log('Error');})
}



class UsrSignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      books: [],
      authors: [],
      categories: [],
    };
    this.hundleSignUp = this.hundleSignUp.bind(this);
  }

  componentDidMount() {

    let cookies = new Cookies();
    if (cookies.get('token')) {
        window.location = "http://localhost:3000/home";
    }
  }

  handleUpdateFirstName = (event) => {
    console.log(event.target.value);
    this.setState({
      firstName: event.target.value
    });
  }
  handleUpdateLastName = (event) => {
    console.log(event.target.value);
    this.setState({
      lastName: event.target.value
    });
  }
  handleUpdateEmail = (event) => {
    console.log(event.target.value);
    this.setState({
      email: event.target.value
    });
  }
  handleUpdatePassword = (event) => {
    console.log(event.target.value);
    this.setState({
      password: event.target.value
    });
  }

  hundleSignUp() {

    SignUpUser({
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'email': this.state.email,
      'password': this.state.password,
    }).then(data => {
      console.log(data);
      
      if(data.status == "user created"){
      swal({
            title: "~~ Information ~~", 
            text : "Your Account was created successfully !", 
            icon : "success",
            showLoaderOnConfirm: true,
            }).then(function(){console.log("added acount!")})
          }
      else{
          swal({
          title: "Invalid Data !", 
          text : "Please enter your info for registeration !",
          icon : "error",
          showLoaderOnConfirm: true,
          }).then(function(){console.log("fail to add account!")})
      }
    });
  }
     
   

  render() {
    return (
        <div className='container-fluid mt-5 pl-5'>

          <div className='row'>
            <div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 cola '>
              <Row>
                <Col sm="6">
                  <Card>
                    <Card.Header className="text-center"><h5><img src="https://image.flaticon.com/icons/png/512/73/73319.png" width="35" className="mr-3"/>Popular Authors</h5></Card.Header>
                    <Card.Body>
                      <ListGroup>
                        {this.state.authors.slice(0, 3).map((author, index) =>
                          <ListGroupItem key={index}>{author.firstName + " " + author.lastName}</ListGroupItem>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>  
                </Col>
                <Col sm="6">
                  <Card>
                    <Card.Header className="text-center"><h5><img src="https://images.vexels.com/media/users/3/139752/isolated/preview/532e26143a0435e9c6ca7f436474389f-books-icon-by-vexels.png" width="35" className="mr-3"/>Popular Books</h5></Card.Header>
                    <Card.Body className="m-0" bg="light">
                    <ListGroup>
                        {this.state.books.slice(0, 3).map((book, index) =>
                          <ListGroupItem  key={index}>{book.name}</ListGroupItem>
                        )}
                    </ListGroup>
                    </Card.Body>
                  </Card>  
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <Card className="mt-4">
                    <Card.Header className="text-center"><h5><img src="https://static.thenounproject.com/png/2426188-200.png" width="35" className="mr-3"/>Popular Categories</h5></Card.Header>
                    <Card.Body>
                      <ListGroup>
                        {this.state.categories.slice(0, 3).map((category, index) =>
                          <ListGroupItem key={index}>{category.name}</ListGroupItem>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>  
                </Col>
                

              </Row>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
            <Card>
              <Card.Header className="text-center"><h4>New here? Create a free account!</h4></Card.Header> 
                <Card.Body>
                  <Form className="mt-3">
                    <FormGroup>
                      <Form.Control type="name" name="fname" placeholder="First name"
                            value={this.state.firstName} pattern='[A-Za-z\\s]*'
                            onChange={this.handleUpdateFirstName}/>
                    </FormGroup>
                    <FormGroup className="mt-4">
                      <Form.Control className="mt-3" type="name" name="lname" placeholder="Last name"
                            value={this.state.lastName} pattern='[A-Za-z\\s]*'
                            onChange={this.handleUpdateLastName}/>
                    </FormGroup>
                    <FormGroup className="mt-4" >
                      <Form.Control type="email" name="email" placeholder="E-mail"
                            value={this.state.email}
                            onChange={this.handleUpdateEmail}/>
                    </FormGroup>
                    <FormGroup className="mt-4" >
                      <Form.Control type="password" name="password" placeholder="password"
                            value={this.state.password}
                            onChange={this.handleUpdatePassword}/> </FormGroup>

                    <Button variant="primary mt-4" size="lg" block onClick={this.hundleSignUp}> Sign up</Button>
                    {/* <Button variant="outline-primary mt-3" size="lg" block onClick={this.hundleSignUp}><img src="https://pics.freeicons.io/uploads/icons/png/2659939281579738432-512.png" width="25" className="mr-2"/> Sign up with Google</Button> */}

                  </Form>
                </Card.Body>
              </Card>
            </div>

          </div>
        </div>
    );
  }
}

export default UsrSignUp;
