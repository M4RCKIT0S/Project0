const ShoppingList = require("../Models/shoppingList");
const User = require("../Models/user");

// Create a shopping list
function createShoppinglist(req,res){
    const shoppingList = new ShoppingList({
        userId: req.params.userId,
        title: req.body.title,
        description: req.body.description,
    });
    shoppingList.save((err, result) =>{
        if(err) return res.status(500).send(err);
        return res.status(200).send({message: 'Shopping List saved succesfully', result});
    });

}
// Get all lists
function getLists(req,res){
    ShoppingList.find({},(err,list)=>{
        if(err) return res.status(404).send(err);
        return res.status(200).send(list);
    });
}
// Get Shopping lists of a user
function getShoppingListUser(req,res){
    const { userId } = req.params;
    ShoppingList.find({userId}, (error,result) =>{
        if(!result) return res.status(500).send('List not found');
        if(error) return res.status(404).send(error);
        return res.status(200).send({ result });
    });
}
// Delete a list from the data base
function deleteList(req,res){
    const { listId } = req.params;
    ShoppingList.findByIdAndDelete(listId, (err, list) => {
        if(err) return res.status(500).send(err);
        return res.status(202).send(list)
    });
}
// Edit a list from the data base, not checked
function editList(req,res){
    const { listTitle } = req.body;
    const { listDescription } = req.body;
    if(!listTitle || !listDescription){
        return res.status(500).send({message: 'Invalid fields'});
    }else{
        const shoppingList = {
            title: listTitle,
            description: listDescription,
            editDate: Date.now(),
        };
        ShoppingList.findByIdAndUpdate(req.params.listId, shoppingList,{ new: true},(err, list) => {
            if(err) return res.status(500).send(err);
            return res.status(200).send({message:'List updated succesfully', list });
        });
    }
}
// Add a list authorization to a user, needs to be tested
function addUserToList(req,res){
    const { username } = req.body;
        User.findOneAndUpdate({username},{ $addToSet:{authorizedLists: req.params.listId} },{new : true},(error,newUser )=>{
            if(error || !newUser) return res.status(404).send(error);
            return res.status(200).send({message:'User has been authorized', newUser});
        });

}
// Deletes a list from athLists
function deleteAuthList(req, res){
    const { listId } = req.params;
    const { username } = req.body;
    User.findByOneAndUpdate({username},{$pull: {authorizedLists: listId}},{new: true},(err, newUser)=>{
        if(err || !newUser) return res.status(404).send(err);
        return res.status(200).send({message: 'User updated', newUser});
    });
}
// Get lists a user is auth in 
async function getUserAuthLists(req, res){
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).exec();
        const list = await ShoppingList.find({
            _id: {
                $in: user.authorizedLists
            }
        }).exec();
        return  res.status(202).send(list);
    } catch (err) {
        return res.status(404).send(err);
    }
}

module.exports = {
    createShoppinglist,
    getLists,
    getShoppingListUser,
    deleteList,
    editList,
    addUserToList,
    deleteAuthList,
    getUserAuthLists,
}