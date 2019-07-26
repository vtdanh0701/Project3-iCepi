import React from 'react';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import {Link} from 'react-router-dom'
import UserFavList from '../../auth/UserFavList';


const Toolbar = (props) => {
    
    var url = props.user ? `/user/${props.user._id}/profile` : ''
    var user = props.user
    var content;
    if(user){
        content =(
            <ul>
                    <a onClick={props.handleLogOut}>Log Out</a>
                    {/* <button onClick={props.handleLogOut}>Log Out</button> */}
                    <li><Link to={url}>Profile</Link></li>
            </ul>
        )
    } else{
        content = (
            <ul>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Login</Link></li>
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