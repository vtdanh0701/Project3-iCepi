import React from 'react';
import axios from 'axios';

class RecipeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            result: ''
        }
        this.getRecipeDetails = this.getRecipeDetails.bind(this)
        this.addToFav = this.addToFav.bind(this)
    }
    componentDidMount(){
        this.props.checkForLocalToken()
        this.getRecipeDetails()
    }

    

    getRecipeDetails(e) {
        var api_key = process.env.REACT_APP_ICEPI_API_KEY
        const config = {
            headers: {
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": api_key
            }
        }
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.props.match.params.id}/information`
        axios.get(url, config).then(result => {
            this.setState({
                result: result.data
            })
        })
    }
    addToFav(e){
        e.preventDefault();
        const userId = this.props.user._id
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
        axios.post(`/api/user/${userId}/favList`, {
            title: this.state.result.title,
            recipeId: parseInt(this.state.result.id),
            imgUrl: this.state.result.image
        })
        console.log('Added' + userId)
    } 
    
    render(){
        
        return(
            <>
            {this.state.result.image}
            {this.state.result.title}<br/>
            {this.state.result.instructions}
            {this.state.result.id}
            <img src={this.state.result.image} alt=""/> <br/>
            <button onClick={this.addToFav}>Add this to fave</button>
            
            </>
        )
    }
}


export default RecipeDetails