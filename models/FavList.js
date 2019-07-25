const mongoose = require('mongoose');

const FavListSchema = new mongoose.Schema({
    title: String,
    recipeId: Number,
    imgUrl: String
})

module.exports = mongoose.model('FavList', FavListSchema);