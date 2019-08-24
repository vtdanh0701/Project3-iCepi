import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import UserFavList from './UserFavList';
import './Profile.css';
import '../Animate.css';


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: this.props.user.name,
            email: this.props.user.email,
            address: this.props.user.address,
            display: 'none',
            filter: 'about',
            message: '',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    message: <i class="fas fa-check"> <span>Successfully Updated !</span></i> 
                })
                console.log(res.data.name)
            })
        })
    }
    handleFilter(filter){
        console.log('Setting filter to: ', filter)
        this.setState({
            filter,
            message: ''
        })
    }

    render(){
        var url = `/user/${this.props.user._id}/favlist`
        var display = {
            display: this.state.display
        }
        var content;
        if(this.state.filter === 'about'){
            content = 
            <div className='profile-about animated fadeInLeft' >
                <h1>Hello, {this.state.name}</h1>
                <div className='node'>
                    <h3>Name</h3>
                    <div>{this.state.name}</div>
                </div>
                <div className='node'>
                    <h3>Email</h3>
                    <div>{this.state.email}</div>
                </div>
                <div className='node'>
                    <h3>Address</h3>
                    <div>{this.state.address}</div>
                </div>
            </div>
        } else if(this.state.filter === 'edit'){
            content =
            
            <div className='profile-edit animated fadeInLeft2 fast' >
                    <h1>Edit Your Profile</h1>
                    {this.state.message}
                    <form onSubmit={this.handleSubmit}>
                        <div className='inputbox'>
                            <label><h3>Name</h3></label>
                            <input onChange={this.handleNameChange} 
                                   type="text" name='name' 
                                   value={this.state.name} required=" "/>
                        </div>
                        <div className='inputbox'>
                            <label><h3>Email</h3></label>
                            <input onChange={this.handleEmailChange} 
                                   type="email" name='email' 
                                   value={this.state.email} required=" "/>
                        </div>
                        <div className='inputbox'>
                            <label><h3>Address</h3></label>
                            <input onChange={this.handleAddressChange} 
                                   type="text" name='address' 
                                   value={this.state.address} required=" "/>
                        </div>
                        <input className='profile-btn' type="submit" value="Update your Profile"/>
                        
                    </form>
                </div>
            
        } else {
            content = <div className='profile-fave animated fadeInLeftBig' ><UserFavList userId={this.props.match.params.id} user={this.props.user}/></div> 
        }
        return( 
             <div className='profile-container'>
                 <nav>
                     <a className={this.state.filter === 'about' ? 'nav-link-active' :'nav-link'}  onClick={() => this.handleFilter('about')}>About</a>  
                 
                    <a className={this.state.filter === 'edit' ? 'nav-link-active':'nav-link'} onClick={() => this.handleFilter('edit')}>Edit</a> 
                 
                    <a className={this.state.filter === 'fave' ? 'nav-link-active':'nav-link'} onClick={() => this.handleFilter('fave')}>Your Recipes</a>
                 </nav>
                 {content}   
             </div>
        )}
}
export default Profile