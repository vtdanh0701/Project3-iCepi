import React, {Component} from 'react';
import axios from 'axios';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/BackDrop/BackDrop';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null,
      sideDrawerOpen: false
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.liftToken = this.liftToken.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }
  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined'){
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', {token})
        .then(res => {
          if(res.data.type === 'error'){
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            })
          }
        })
    }
  }

  liftToken(data){
    this.setState({
      token: data.token,
      user: data.user
    })
  }
  componentDidMount(){
    this.checkForLocalToken();
  }

  handleLogOut(e){
    this.setState({
      token: '',
      user: null
    })
    localStorage.removeItem('mernToken');
  }

  drawerToggleClickHandler = ()=>{
      this.setState((prevState) => {
        return {sideDrawerOpen: !prevState.sideDrawerOpen}
      })
      console.log('Click click')
  }

  backdropClickHandler =() =>{
    this.setState({
      sideDrawerOpen: false
    })
  }

  render(){
    var user = this.state.user;
    var contents 
    var backdrop;
    if(user){
      contents = (
        <>
        <p>Hello, {user.name}</p> <br/>
        <button onClick={this.handleLogOut}>Log Out</button>
        </>
      );
    } else {
      contents = (
        <>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/signup'><button>Signup</button></Link>
        </>
      )
    }
    if(this.state.sideDrawerOpen){
      backdrop= <BackDrop click={this.backdropClickHandler}/>
    }
    return(
      <Router>
        <Route exact path='/login' render={()=><Login liftToken={this.liftToken}/>}/>
        <Route exact path='/signup' render={()=><Signup liftToken={this.liftToken}/>}/>
        <div style={{height: '100%'}}>
          <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler}/>
          <SideDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}
          <main style={{marginTop: '64px'}}>
          {contents}
          </main>
        </div>
      </Router>
    );
  }
}


export default App;