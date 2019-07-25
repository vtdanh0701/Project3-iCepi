// SEARCH TAB HEADER (change between Recipes, Videos, Products)
import React from 'react';
import Axios from 'axios';
import Link from 'react-router';
import RecipesList from './RecipesList';
import VideosList from './VideosList';

const HeaderTab = (props) => {
    return (
        <nav className='navbar-default'>
            <div className='navbar-container'>
                <ul className='navbar-list'>
                    <li><Link to={'/recipes'}>Recipes</Link></li>
                    <li><Link to={'/videos'}>Videos</Link></li>
                    <li><Link to={'/products'}>Products</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default HeaderTab;
