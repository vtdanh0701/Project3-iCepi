// Lists all RECIPES on SEARCH PAGE
import React from 'react';
import Axios from 'axios';
import './RecipesList.css'
import {Link} from 'react-router-dom'

const RecipesList = (props) => {
    var display = props.display;
    var show = [];
    var url
    for(var i = 0; i < display.length; i++) {
        url = `/recipes/${display[i].id}/details`
        show.push(
            
                <div className='recipes__items'>
                    <Link to={url}><div className='recipe-title'>{display[i].title}</div></Link>
                    <img src= {display[i].image} alt="Recipe Photo"/>
                 </div>
            
        
        )
    }
    return(
    <div >
        <div className='recipes'>
            {show}
        </div>
    </div>
    );
}

export default RecipesList;
