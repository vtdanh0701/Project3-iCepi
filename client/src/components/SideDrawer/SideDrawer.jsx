import React from 'react'
import './SideDrawer.css'
import {Link} from 'react-router-dom'

const SideDrawer = props => {
    var url = props.user ? `/user/${props.user._id}/profile` : ''
    let drawerClass = ['side-drawer']
    var user = props.user
    var content;
    if(user){
        content =(
            <ul>
                    <a onClick={props.handleLogOut}>Log Out</a>
                    <div className= 'crossline'><hr/></div> 

                    <li><Link to={url}>Profile</Link></li> 
                    <div className= 'crossline'><hr/></div> 
            </ul>
        )
    } else{
        content = (
            <ul>
                <li><Link to='/signup'>Sign Up</Link></li> 
                <div className= 'crossline'><hr/></div> 
                <li><Link to='/login'>Login</Link></li>
                <div className= 'crossline'><hr/></div> 
            </ul>
        )
    }
    if(props.show){
        drawerClass=['side-drawer', 'open']
    }
    return(
        <nav className={drawerClass.join(' ')}>
            <ul>
                {content}
            </ul>
        </nav>
    )
}
export default SideDrawer