import React,{Component} from 'react';
import {HashRouter,Route} from "react-router-dom";

import './App.css';

import ScrollToTop from './ScrollToTop';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import MyShop from './MyShop';
import OrderHistory from './OrderHistory';
import ChoiceCategory from './choiceCategory';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HashRouter basename = {process.env.PUBLIC_URL}>
        <ScrollToTop>
          <div className = "App">
              <Route exact path = "/" component={Home} />
              <Route exact path = "/signup" component={SignUp} />
              <Route exact path = "/login" component={Login} />
              <Route exact path = "/myshop" component={MyShop} />
              <Route exact path = "/orderHistory" component={OrderHistory} />
              <Route exact path = "/choiceCategory" component={ChoiceCategory} />


          </div>
        </ScrollToTop>
      </HashRouter>
    );

  }
}

export default App;
