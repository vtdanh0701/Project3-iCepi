import React from 'react'
import './SideDrawer.css'

const SideDrawer = props => {
    let drawerClass = ['side-drawer']
    if(props.show){
        drawerClass=['side-drawer', 'open']
    }
    return(
        <nav className={drawerClass.join(' ')}>
            <ul>
                <li><a href="/">Products</a><hr/></li>
                <li><a href="/">User</a><hr/></li>
            </ul>
        </nav>
    )
}
export default SideDrawer