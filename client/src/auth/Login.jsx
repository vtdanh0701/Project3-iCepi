import React from 'react';
import axios from 'axios';
import {
    Redirect,
    withRouter
  } from 'react-router-dom';
import Signup from './Signup';
  

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            redirect: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if(res.data.type === 'error'){
             this.setState({
                 message: res.data.message
             })   
            } else {
                localStorage.setItem('mernToken', res.data.token);
                this.props.liftToken(res.data);
                this.setState({
                    redirect: true
                })
                this.props.history.push('/')
                console.log('loggin'+this.state.redirect)
            }
        }).catch(err => {
            this.setState({
                message: 'Maximum login attempts exceeded. Please try again later'
            })
        })
    }
    render(){
        return(
            <div className='login'>
                <h3>Log into your account:</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" onChange={this.handleEmailChange} 
                                       value={this.state.email}
                                       name='email'
                                       placeholder='Enter your email...'/> <br/>
                    <input type="password" onChange={this.handlePasswordChange} 
                                       value={this.state.password}
                                       name='password'
                                       placeholder='Enter your password...'/> <br/>
                    <input type="submit" value='Login'/>
                </form>
                <a href="/signup">Don't have an account? Sign up here !!</a>
            </div>
        );
    }
}

export default withRouter(Login);
