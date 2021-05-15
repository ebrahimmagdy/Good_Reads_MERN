import React from 'react';
import { Button, Form, Col, Row, Card, InputGroup, FormControl, Image } from 'react-bootstrap';
import Cookies from "universal-cookie";

function LoginUser(data) {
  console.log(JSON.stringify(data));
  return fetch('http://localhost:5000/users/login', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response =>
    response.json()
  ).catch(error => {
    console.log('Error');
  })
}

class UserLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.hundleLogin = this.hundleLogin.bind(this);
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
  hundleLogin() {
    LoginUser({
      'email': this.state.email,
      'password': this.state.password,
    }).then(data => {
      console.log(data);
      if (data.token) {
        let cookies = new Cookies();
        cookies.set('token', data.token, { path: '/' });
        // cookies.set('username', data.name, { path: '/' });
        // cookies.set('currentUser', data.currentUser, { path: '/' });
        window.location = "http://localhost:3000/home";
      } else {
        alert("invalid email or password");
        window.location = "http://localhost:3000/";
      }
    });
  }


  render() {
    return (
      <Card className="mb-5 px-5">
        <Card.Body>
          <Row>
            <Col lg={7}>
             <h1> <Image src="https://images.vexels.com/media/users/3/157545/isolated/preview/057098b4a63e172134e0f04bbbcd6e8b-school-book-icon-by-vexels.png" width="60" className="mr-3"/> <t/> Welcom To <b>Good Reads</b></h1>
            </Col>
            <Col md={5}>
              <Form className="mr-2 ml-5 px-0">
                <Form.Row className="align-items-center">
                  <Col md={5} className="my-2">
                    <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control id="inlineFormInputName"
                          placeholder="Email" 
                          value={this.state.email} 
                          onChange={this.handleUpdateEmail} />
                      </InputGroup>
                  </Col>
                  <Col md={5} className="my-2">
                      <FormControl id="inlineFormInputGroupUsername" type="password" name="password"
                        placeholder="Enter your password"
                        value={this.state.password}
                        onChange={this.handleUpdatePassword}/>
                  </Col>
          
                  <Col xs="auto" className="my-2">
                    <Button onClick={this.hundleLogin}>Login</Button>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
export default UserLogin;
