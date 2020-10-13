const mongoose = require('mongoose');

const  shoppingListSchema =  mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        max: 24,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    creationDate:{
        type: Date,
        default: Date.now(),
    },
    editDate: {
        type: Date,
    }

});
module.exports = mongoose.model('ShoppingList', shoppingListSchema);