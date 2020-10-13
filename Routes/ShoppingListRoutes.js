const express = require('express');
const checkAuth = require('../Middlewares/check-auth');
const shoppingListControllers = require('../Controllers/shoppingListController');
const router = express.Router();

router.post('/createShoppingList/:userId', checkAuth, shoppingListControllers.createShoppinglist);
router.get('/getLists', shoppingListControllers.getLists);
router.get('/getUserShoppingList/:userId', checkAuth, shoppingListControllers.getShoppingListUser);
router.delete('deleteList/:listId', checkAuth, shoppingListControllers.deleteList);
router.put('/editList/:listId', checkAuth, shoppingListControllers.editList);
router.patch('/authUser/:listId',checkAuth, shoppingListControllers.addUserToList);
router.patch('/deleAuthUser/:listId', checkAuth, shoppingListControllers.deleteAuthList);
router.get('/getAuthLists/:userId', checkAuth, shoppingListControllers.getUserAuthLists);

module.exports = router;