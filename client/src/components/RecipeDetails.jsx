import React from 'react';
import axios from 'axios';
import './RecipeDetails.css'

class RecipeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            result: '',
            ingredients: '',
            favBtn: <i class="far fa-heart"></i>,
            message: 'Save to Recipe List'
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
                result: result.data,
                ingredients: result.data.extendedIngredients
            })
            console.log(result.data.extendedIngredients)
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
        }).then(
            this.setState({
            favBtn: <i class="fas fa-check"></i>,
            message:  'Saved to Your List'
        }))
        console.log('Added' + userId)
    } 
    
    render(){
        var ingredients = this.state.ingredients;
        var ingredientsList = []
        
        for(var i=0; i < ingredients.length; i++){
            var url = `https://spoonacular.com/cdn/ingredients_100x100/${ingredients[i].image}`
            ingredientsList.push(
                <div className='ingredient-detail'>
                    <div className='ingredient-image'>
                        <img src={url} alt=""/>
                    </div>
                    <div className='ingredient-amount'>{ingredients[i].amount} {ingredients[i].unit}</div>
                    <div className='ingredient-name'>{ingredients[i].name}</div>
                </div>
                
            )
        }
        return(
            <div className='detail-container'>
                
                <div className='fav-btn'>
                    <button onClick={this.addToFav}>{this.state.favBtn}</button>
                    <div>
                        {this.state.message}
                    </div>
                </div>


                <div className='header'>
                    <h2>{this.state.result.title}</h2>
                </div>

                <div className='image-container'>
                    <img className='image-detail' src={this.state.result.image} alt=""/>
                </div>

                <div className='info-container'>
                    <div className='info'>
                        <div className='icon-container'>
                            <i class="fas fa-dollar-sign"></i> <br/>
                        </div>
                        <div>
                            ${this.state.result.pricePerServing / 10} per serving
                        </div>
                    </div>
                    
                    <div className='spacer-detail'>   
                    </div>
                    
                    <div className='info'>
                        <div className='icon-container'>
                            <i class="far fa-clock"></i> <br/>
                        </div>
                        <div>
                            Ready in {this.state.result.readyInMinutes} minutes
                        </div>
                    </div>
                    
                </div>

                <div className='instruction'>
                    <div className='instruction-header'>
                        Instruction
                    </div>
                    <div className='instruction-detail'>
                        {this.state.result.instructions}    
                    </div>
                </div>

                <div className='ingredients'>
                    <div className='ingredient-header'>
                        Ingredients
                    </div>
                    {ingredientsList}
                </div>


            </div>
        )
    }
}


export default RecipeDetails