import React from 'react';
import axios from 'axios';
import {
    Redirect,
    withRouter
  } from 'react-router-dom';
import './Form.css'

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
            <body>
                <div className='box'>
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className='inputbox'>
                            <input onChange={this.handleEmailChange} 
                                   type="text" name='email' 
                                   value={this.state.email} required=" "/>
                            <label>Email</label>
                        </div>
                        <div className='inputbox'>
                            <input onChange={this.handlePasswordChange} 
                                   type="password" name='password' 
                                   value={this.state.password} required=" "/>
                            <label>Password</label>
                        </div>
                        <input type="submit" value="Login"/>
                        <p className='animated flash'>{this.state.message}</p>
                    </form>
                </div>
            </body>
                
        );
    }
}

export default withRouter(Login);
