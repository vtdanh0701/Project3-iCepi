import React from 'react';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import {Link} from 'react-router-dom'


const Toolbar = (props) => {
    
    var url = props.user ? `/user/${props.user._id}/profile` : ''
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
                <ul>
                    <li><a href="/">Products</a></li>
                    <li><Link to={url}>Profile</Link></li>
                </ul>
            </div>
            <button onClick={props.handleLogOut}>Log Out</button>
        </nav>
    </header>
    )}


export default Toolbar;