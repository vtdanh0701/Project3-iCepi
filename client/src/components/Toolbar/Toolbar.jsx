import React from 'react';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';


const Toolbar = props => (
    
    <header  className='toolbar'>
        <nav className='toolbar__navigation'>
            <div>
                <DrawerToggleButton click={props.drawerToggleClickHandler}/>
            </div>
            <div className='spacer__logo'></div>
            <div className='toolbar__logo'><a  href="/">ThE LOGO</a></div>
            <div className='spacer'></div>
            <div className='toolbar__navigation-items'>
                <ul>
                    <li><a href="/">Products</a></li>
                    <li><a href="/">User</a></li>
                </ul>
            </div>
        </nav>
    </header>
    )


export default Toolbar;