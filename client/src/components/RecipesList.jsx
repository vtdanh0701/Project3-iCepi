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
                    <Link className='recipe-link' to={url}>
                    {display[i].title} <br/>
                    <img className='image' src= {display[i].image} alt="Recipe Photo"/>
                    </Link>
                 </div>
            
        
        )
    }
    return(
    <div className='listing-container'>
        <div className='listing-backdrop'>
            <div className='new-search-box'>
                            <input onChange={props.searchInputBox} className='new-search-input' type="text" name='' required=' ' placeholder="Search for another recipe...(try pizza,zucchini,pasta...)"/>
                            <a onClick={props.searchRecipeClick} className='new-search-btn' href='#'>
                                <i className='fas fa-search'></i>
                            </a>    
                </div>
            <div className='navigate__btn'>
                <button onClick={props.handlePrevious}><i className="fas fa-chevron-left"></i></button>
                <div className='spacer'>

                </div>
                <button onClick={props.handleNext}><i className="fas fa-chevron-right"></i></button>
            </div>
            <div className='recipe__container'>
                {show}
            </div>
        </div>
    </div>
    );
}

export default RecipesList;
