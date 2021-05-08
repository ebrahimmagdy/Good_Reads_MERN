import React from 'react';
import {Route ,BrowserRouter} from "react-router-dom";
import AdminLogin from "./components/adminLogin"



class App extends React.Component {

  render() {

    return (
        <BrowserRouter >
          <div className='App'>
            {
            <Route path="/Admin" exact component={AdminLogin} />
            }
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
