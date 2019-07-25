// Lists all VIDEOS on SEARCH PAGE
import React from 'react';
import Axios from 'axios';

const VideosList = (props) => {
    var recipes = props.recipes;
    var display = [];
    for(var i = 0; i < recipes.length; i++) {
        display.push(
        <div className='video-list'>
            <div className='video-title'>{recipes[i].title}</div>
            <img src= {recipes[i].image} alt="video Photo"/>
        </div>
        )
    }
    return(
    <div className='videos-list'> 
        <div className='video-individual'>
            {/* <h1>{props.videos.title}</h1> */}
            {/* <img src={props.videos.thumbnail} alt="Video Image"/> */}
            {display}
        </div>
    </div>
    );
}

export default VideosList;
