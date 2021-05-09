import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import '../assets/css/fontawsome.css';
import '../assets/css/bootstrap.min.css'
require("../assets/css/adminLoginPage.css");

function sendingAdminAuth(data) {
  return fetch('http://localhost:4000/admin/', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(data),
  }).then(response => response.json()
  ).catch(error => { swal("Connection Problem !", "Error while sending admin data !", "error");})
}
/******************************************************************** */
class AdminLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.loginHandler = this.loginHandler.bind(this);
  }

  handleInsertingEmail = (event) => {
    this.setState({ email: event.target.value});
  }

  handleInsertingPassword = (event) => {
    this.setState({ password: event.target.value});
  }


  loginHandler() {
    sendingAdminAuth({
      'email': this.state.email,
      'password': this.state.password,
    }).then(data => {
      if (data.token) {
        let cookies = new Cookies();
        cookies.set('token', data.token, {path: '/'});
        window.location = "http://localhost:3000/dashboard";
      }
      else
      {
        // swal("Security Alert !", "You are not authorized to access the dashboard !", "error");      
        swal({
        title: "Security Alert !", 
        text : "You are not authorized to access the dashboard !", 
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){window.location = "http://localhost:3000/admin";})
      }
    });
  }


render() {
return (
  
<div className="container h-100 fullbg">
    <div className="d-flex justify-content-center h-100">
      <div className="user_card">
        <div className="d-flex justify-content-center">
          <div className="brand_logo_container">
            <img src="https://static1.squarespace.com/static/5b2c03761137a67a00f1f468/5b325cc3758d4612bc0336ae/5b325cc3562fa73670a5b7ff/1530027210648/admin.png" className="brand_logo" alt="Logo"/>
          </div>
        </div>
        <div className="d-flex justify-content-center form_container">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
                <input type="email" className="form-control input_user"
                 placeholder="Enter Your Email "
                 value={this.state.email}
                 onChange={this.handleInsertingEmail}/>
              </div>
            </div>
              <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-key"></i></span>
              <input type="password" className="form-control input_pass" id="exampleInputPassword1"
                 placeholder="Enter Your Password"
                 value={this.state.password}
                 onChange={this.handleInsertingPassword}/>
            </div>
         </form>
        </div>
        <div className="d-flex justify-content-center mt-3 login_container">          
          <button type="submit" className="btn login_btn" onClick={this.loginHandler}>Login</button>
        </div>
        
      </div>
    </div>
  </div>

    );
  }
}

export default AdminLogin;
