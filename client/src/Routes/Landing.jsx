import React from 'react'
import {Router,Link, Route} from 'react-router-dom'
import './Landing.css'

const Landing = props => (
    <div className='landingbody'>
        <div className='wrapper'>
            <div className='slogan'>
                <h3>
                    All Your Recipes. One Place !!
                </h3>
            </div>
            <Link className='btn' to='/signup'><button className='loginbtn'>Join Us Now !<br/><span>Yup! It's Free !!!</span></button></Link>
        </div>
       
    </div>
)

export default Landing;