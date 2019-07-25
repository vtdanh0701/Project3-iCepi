const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const FavList = require('../models/FavList')

router.get('/', (req, res) => {
    res.json({type: 'Success', message: "You access the protected API routes"})
})

router.post('/user/:id/favList', (req,res) =>{
    User.findById(req.params.id, (err,user)=>{
        let newFav = new FavList({
            title: req.body.title,
            recipeId: req.body.id,
            imgUrl: req.body.url
        })
        newFav.save((err, fav) =>{
            user.favList.push(fav);
            user.save((err, user) =>{
                res.json(user)         
            })
        })
    })
})
module.exports = router;