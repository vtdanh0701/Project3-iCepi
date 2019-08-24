import React from 'react';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import {NavLink, Link} from 'react-router-dom'



const Toolbar = (props) => {
    
    var url = props.user ? `/user/${props.user._id}/profile` : ''
    var user = props.user
    var content;
    if(user){
        content =(
            <ul>
                    <a onClick={props.handleLogOut}>Log Out</a>
                    <li><NavLink className='link' to={url}>Profile</NavLink></li>
            </ul>
        )
    } else{
        content = (
            <ul>
                <li><NavLink className='link' activeClassName='link-active' exact to='/signup'>Sign Up</NavLink></li>
                <li><NavLink className='link' activeClassName='link-active' exact to='/login'>Login</NavLink></li>
            </ul>
        )
    }
    return(
    <header  className='toolbar'>
        <nav className='toolbar__navigation'>
            <div>
                <DrawerToggleButton click={props.drawerToggleClickHandler}/>
            </div>
            <div className='spacer__logo'></div>
            <div className='toolbar__logo'><Link to='/'>iCePi</Link></div>
            <div className='spacer'></div>
            <div className='toolbar__navigation-items'>
                {content}
            </div>
        </nav>
    </header>
    )}


export default Toolbar;