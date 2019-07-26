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
        const config = {
            headers: {
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "8f5d4587b1msh929affc205b66f5p1690eajsn82dbdafc9d86"
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
            <h1>hello from details</h1>
            <h1>{this.props.match.params.id}</h1>
            <button onClick={this.testMatch}>Test test</button>
            {this.state.result.title}<br/>
            {this.state.result.instructions}
            {this.state.result.id}
            {this.state.result.image}
            <img src={this.state.result.image} alt=""/> <br/>
            <button onClick={this.addToFav}>Add this to fave</button>
            
            </>
        )
    }
}


export default RecipeDetails