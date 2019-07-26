import React from 'react';
import axios from 'axios';
import {
    Redirect,
    withRouter
  } from 'react-router-dom';
import './Login.css'
  

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
                
                <form className='loginbox' onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                    <div className='textbox'>
                        <i className="fas fa-user"></i>
                        <input type="email" onChange={this.handleEmailChange} 
                                       value={this.state.email}
                                       name='email'
                                       placeholder='Enter your email...'/>
                    </div>
                    <div className='textbox'>
                        <input type="password" onChange={this.handlePasswordChange} 
                                       value={this.state.password}
                                       name='password'
                                       placeholder='Enter your password...'/>
                    </div>
                    <div className='btn'>
                         <input type="submit" value='Login'/>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
