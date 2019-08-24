import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import './Form.css'
import '../Animate.css'
class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            message: '',
            address: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post('/auth/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address
        }).then( res => {
            if (res.data.type === 'error'){
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    message: res.data.message
                })
            } else {
                localStorage.setItem('mernToken', res.data.token)
                this.props.liftToken(res.data)
                this.props.history.push('/')
            }
        }).catch(err => {
            this.setState({
                message: "Maximun accounts exceeded. Please try again later"
            })
        })
    }

    render(){
        let message = <p className='animated flash'>{this.state.message}</p>
        return(
            <body>
                <div className='box'>
                    <h2>Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className='inputbox'>
                            <input onChange={this.handleInputChange} 
                                   type="text" name='name' 
                                   value={this.state.name} required=" "/>
                            <label>Name</label>
                        </div>
                        <div className='inputbox'>
                            <input onChange={this.handleInputChange} 
                                   type="email" name='email' 
                                   value={this.state.email} required=" "/>
                            <label>Email</label>
                        </div>
                        <div className='inputbox'>
                            <input onChange={this.handleInputChange} 
                                   type="password" name='password' 
                                   value={this.state.password} required=" "/>
                            <label>Password</label>
                        </div>
                        <div className='inputbox'>
                            <input onChange={this.handleInputChange} 
                                   type="text" name='address' 
                                   value={this.state.address} required=" "/>
                            <label>Address</label>
                        </div>
                        <input type="submit" value="Sign Up"/>
                        {message}
                    </form>
                </div>
            </body>
        );
    }
}

export default withRouter(Signup);