import React from 'react';
import axios from 'axios';
import Link from 'react-router';
import browserHistory from 'react-router';
import RecipesList from './RecipesList';

class Home extends React.Component { //component use state
    constructor(props) {
        super(props);
        this.state = {
            recipes: '',
            search: '',
            content: ''
        }
        // this.onNavigateSearch = this.onNavigateSearch.bind(this);
        this.searchInputBox = this.searchInputBox.bind(this);
        this.searchRecipeClick = this.searchRecipeClick.bind(this);
        this.searchVideoClick = this.searchVideoClick.bind(this);

    }

    // onNavigateSearch() {
    //     browserHistory.push('/search');
    // }

    searchRecipeClick(e) {
        const config = {
            headers: {
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "c0ab770b89mshba6e00c259bd657p1c5ce0jsn80d88c4698aa"
            }
        }
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=100&ranking=1&ignorePantry=false&ingredients=${this.state.search}`
        axios.get(url, config).then(result => {

            this.setState({
                recipes: result.data,
            })

        }).then(recipes => {
            var recipes = this.state.recipes
            var content = []
            recipes.forEach(recipe => {
                content.push(
                    <div>
                        <div>{recipe.title}</div>
                        <div>{recipe.image}</div>
                    </div>
                )
            })
            this.setState({
                content: this.state.recipes[0].title
            })
            console.log(content)
        })
    }
    
    searchVideoClick(e) {
        const config = {
            headers: {
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "c0ab770b89mshba6e00c259bd657p1c5ce0jsn80d88c4698aa"
            }
        }
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/videos/search?query=${e.target.value}&minLength=0&maxLength=999&offset=0&number=100`
        axios.get(url, config).then(result => {
                this.setState({
                    videos: result.data
                })

            }).then(recipes => {
                var recipes = this.state.recipes
                var content = []
                recipes.forEach(recipe => {
                    content.push(
                        <div>
                            <div>{recipe.videos.title}</div>
                            <div>{recipe.videos.thumbnail}</div>
                        </div>
                    )
                })
                this.setState({
                    content: this.state.recipes[0].title
                })
                console.log(content)
        })
    }

    searchInputBox(e) {
        this.setState({
                search: e.target.value
        }) 
    }


    render() {
        return (
            <>
            <div className='middle'>
                <div className='search-elements'>
                    <input onChange={this.searchInputBox} type="text" className='search-bar' placeholder='Enter a search keyword...'/>
                </div>

                <div>
                    <button onClick={this.searchRecipeClick} className='submit-button'>Submit</button>
                </div>
                <RecipesList recipes={this.state.recipes}/>
            </div>
            </>
        );
    }
}

export default Home;