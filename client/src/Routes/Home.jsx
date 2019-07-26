import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import RecipesList from '../components/RecipesList';
import dotenv from 'dotenv';
dotenv.config()

class Home extends React.Component { //component use state
    constructor(props) {
        super(props);
        this.state = {
            recipes: '',
            search: '',
            content: '',
            display: '',
            offset: 20,
            page: '',
            pageCount: 1
        }
        // this.onNavigateSearch = this.onNavigateSearch.bind(this);
        this.searchInputBox = this.searchInputBox.bind(this);
        this.searchRecipeClick = this.searchRecipeClick.bind(this);
        this.searchVideoClick = this.searchVideoClick.bind(this);
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
    }

    // onNavigateSearch() {
    //     browserHistory.push('/search');
    // }

    searchRecipeClick(e) {
        var api_key = process.env.REACT_APP_ICEPI_API_KEY
        const config = {
            headers: {
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": api_key
            }
        }
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=100&ranking=1&ignorePantry=false&ingredients=${this.state.search}`
        axios.get(url, config).then(result => {

            this.setState({
                recipes: result.data,
                page: Math.round(result.data.length / 20),
                offset: 20,
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
                display: this.state.recipes.slice(0,20)
            })
        })
        console.log('Search clicked')
    }

    handleNext(e){
        var offset = this.state.offset
        var recipeLength = this.state.recipes.length
        this.setState({
            display: this.state.recipes.slice(offset,offset + 20),
            offset : this.state.offset + 20,
            pageCount: this.state.pageCount + 1
        })
        if(offset >= recipeLength){
            this.setState({
                display: this.state.recipes.slice(recipeLength-20,recipeLength),
                offset: recipeLength-20,
                pageCount: this.state.page
            })
        }
        console.log(offset, this.state.page, this.state.pageCount)
    }
    handlePrevious(e){
        var recipeLength = this.state.recipes.length
        var offset = this.state.offset
        this.setState({
            display: this.state.recipes.slice(offset-40,offset-20),
            offset: this.state.offset-20
        })
        if(offset <= 40){
            this.setState({
                offset: 20,
                display: this.state.recipes.slice(0,20)
            })
            console.log(offset)
        }
        
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
        var url = `/user/${this.props.user._id}/profile`
        return (
            <>
            <div className='middle'>
                <div className='search-elements'>
                    <input onChange={this.searchInputBox} type="text" className='search-bar' placeholder='Enter a search keyword...'/>
                </div>

                <div>
                    <button onClick={this.searchRecipeClick} className='submit-button'>Submit</button>
                </div>
                <Link to={url}>Profile</Link>
                <RecipesList user={this.props.user} handlePrevious={this.handlePrevious} handleNext={this.handleNext} display={this.state.display}/>
            </div>
            </>
        );
    }
}

export default Home;