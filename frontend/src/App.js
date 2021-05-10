import React from 'react';
import {Route ,BrowserRouter} from "react-router-dom";
import AdminLogin from "./components/adminLogin"
import UsrLogin from "./components/userLogin";
import UsrSignUp from "./components/signup";
import './assets/css/users.css';


class App extends React.Component {

  render() {

    return (
        <BrowserRouter >
          <div className='App'>
            <Route path="/Admin" exact component={AdminLogin} />
            <Route path='/' exact component={UsrLogin}/>
            <Route path='/' exact component={UsrSignUp}/>            
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
