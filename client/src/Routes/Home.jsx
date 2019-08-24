import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import RecipesList from '../components/RecipesList';
import dotenv from 'dotenv';
import './Home.css'
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
            pageCount: 1,
            resultDisplay: 'none',
            searchBarDisplay: 'block'
        }
        // this.onNavigateSearch = this.onNavigateSearch.bind(this);
        this.searchInputBox = this.searchInputBox.bind(this);
        this.searchRecipeClick = this.searchRecipeClick.bind(this);
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
                resultDisplay: 'block',
                searchBarDisplay: 'none'
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

    searchInputBox(e) {
        this.setState({
                search: e.target.value
        }) 
    }


    render() {
        var url = `/user/${this.props.user._id}/profile`;
        const resultStyle={
            display: this.state.resultDisplay
        }
        const searchBarStyle={
            display: this.state.searchBarDisplay
        }
        return (
            <body>
                <div className='container' style={searchBarStyle}>
                    <h3>Click here to search for your recipe</h3>
                    <div className='search-box'>
                        <input onChange={this.searchInputBox} className='search-input' type="text" name='' required=' ' placeholder="Type to search...(e.g: pizza, zucchini, pizza...)"/>
                        <a onClick={this.searchRecipeClick} className='search-btn' href='#'>
                            <i className='fas fa-search'></i>
                        </a>    
                    </div>
                </div>
                <div style={resultStyle}>
                    <RecipesList user={this.props.user}
                                 handlePrevious={this.handlePrevious}
                                 searchRecipeClick={this.searchRecipeClick} 
                                 handleNext={this.handleNext} 
                                 display={this.state.display}
                                 searchInputBox={this.searchInputBox}/>
                </div>

            </body>
        );
    }
}

export default Home;