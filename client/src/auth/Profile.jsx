import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: this.props.user.name,
            email: this.props.user.email,
            address: this.props.user.address
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }
    handleNameChange(e){
        this.setState({
            name: e.target.value
        })
    }
    handleAddressChange(e){
        this.setState({
            address: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        let url = `/auth/user/${this.props.match.params.id}/profile`
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
        axios.put(url, {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address
        }).then(res =>{
            axios.get(url).then(res=>{
                this.setState({
                    name: res.data.name,
                    address: res.data.address,
                    email: res.data.email
                })
                console.log(res.data.name)
            })
        })
    }

    render(){
        var url = `/user/${this.props.user._id}/favlist`
        return(
            <>
             <h1>Hello from profile</h1>
             <h1>{this.props.user._id}</h1>
             <Link to={url}>View your fave list</Link>
             <h1>{this.props.user.name}</h1>
             <h1>{this.props.user.email}</h1>
             <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleNameChange} 
                                       value={this.state.name}
                                       name='name'
                                       placeholder={this.state.name}/> <br/>
                    <input type="email" onChange={this.handleEmailChange} 
                                        value={this.state.email}
                                        name='email'
                                        placeholder={this.state.email}/> <br/>
                    <input type="text" onChange={this.handleAddressChange} 
                                       value={this.state.address}
                                       name='address'
                                       placeholder={this.state.address}/> <br/>
                    
                    
                    <input type="submit" value='Update'/>
                </form>
        </>
        )}
}
export default Profile