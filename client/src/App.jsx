import React, {Component} from 'react';
import axios from 'axios';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './Routes/Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Landing from './Routes/Landing'
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/BackDrop/BackDrop';
import RecipeDetails from './components/RecipeDetails'
import Profile from './auth/Profile'
import UserFavList from './auth/UserFavList'
import './App.css'

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
    console.log('loggout')
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
    var contents = (
      <div >
        <Redirect to='/'/>
        <Route exact path='/' render={()=><Landing liftToken={this.liftToken}/>}/>
      </div>
    )
    var backdrop;
    if(user){
      contents = (
        <>
        <Route exact path='/' render={()=> <Home liftToken={this.liftToken} user={user}/>}/>
        <Route exact path='/recipes/:id/details' render={(props)=><RecipeDetails {...props} checkForLocalToken={this.checkForLocalToken} token={this.state.token} user={this.state.user} />}/>
        <Route exact path='/user/:id/profile' render={(props) => <Profile {...props} liftToken={this.liftToken} user={user} checkForLocalToken={this.checkForLocalToken} token={this.state.token}/>}/>
        <Route exact path='/user/:id/favlist' render={(props) => <UserFavList {...props}/>}/>
        </>
      );
    } 
    if(this.state.sideDrawerOpen){
      backdrop= <BackDrop click={this.backdropClickHandler}/>
    }
    return(
      <Router>
        <div>
          <div style={{height: '100%'}}>
            <Toolbar user={this.state.user} handleLogOut={this.handleLogOut} liftToken={this.liftToken} drawerToggleClickHandler={this.drawerToggleClickHandler}/>
            <SideDrawer user={this.state.user} show={this.state.sideDrawerOpen}/>
            {backdrop}
            <main style={{marginTop: '55px'}}>
            </main>
          </div>
        </div>
        <Route exact path='/login' render={()=><Login user={this.state.user} token={this.state.token} liftToken={this.liftToken}/>}></Route>
        <Route exact path='/signup' render={()=><Signup liftToken={this.liftToken}/>}></Route>
        
        {contents}   
       
      </Router>
    );
  }
}


export default App;