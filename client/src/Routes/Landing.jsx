import React from 'react'
import {Router,Link, Route} from 'react-router-dom'

const Landing = props => (
    <div>
    <Link to='/login'><button>Login</button></Link>
    <Link to='/signup'><button>Join</button></Link>
    </div>
)

export default Landing;