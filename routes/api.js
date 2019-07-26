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
                        recipeId: req.body.recipeId,
                        imgUrl: req.body.imgUrl
                    })
                    newFav.save((err, fav) =>{
                        user.favList.push(fav);
                        user.save((err, user) =>{
                            res.json(fav)         
                        })
                    })
                })})
router.delete('/user/:id/favList/:favListId', (req, res) =>{
    FavList.findByIdAndDelete(req.params.favListId, function(err,favItem){
        User.findById(req.params.id, function(err, user){
            user.favList.pull(favItem)
            user.save(function(err, user){
                if(err) res.json(err)
                res.json(user.favList)
            })
        })
    })
})

router.get('/user/:id/favList', (req,res) => {
    User.findById(req.params.id).populate('favList').exec((err,user) => {
        res.status(200).json(user.favList)
    })
})

module.exports = router;