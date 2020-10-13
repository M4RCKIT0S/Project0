const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/user");
const env = require('dotenv'); 
env.config();

//Get all users
function getUsers(req, res) {
  User.find({}, (error, users) => {
    if (error) return res.status(500).send({ error });
    return res.status(200).send(users);
  });
}
// Get a user who match the name
function getUserUsername(req,res){
  const {username} = req.body;
  User.findOne({username}, (err, user)=>{
    if(err) return res.status(404).send({ err});
    return res.status(200).send(user);
  });
}
//Get one user by id
function getUserId(req, res) {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err || user === null)
      return res.status(404).send({ message: `No user found ${err}` });
    return res.status(200).send(user);
  });
}
//Register function
function register(req, res) {
  const { password } = req.body;
  const salRrounds = 10;
  if (password.length) {
    bcrypt.genSalt(salRrounds, (err, salt) => {
      if (err) {
        return console.log(`Error creating salt ${err}`);
      } else {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) return res.status(500).json.error({ message: error });
          const user = new User({
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hash,
          });

          user.save((wrong, newUser) => {
            if (wrong)
              return res.status(500).send({ message: `Error saving use ${wrong}` });
            return res.status(200).send({ message: `Saved user ${newUser}` });
          });
        });
      }
    });
  } else {
    return res.status(404).send({ message: "Invalid fields" });
  }
}
//Delete user from the data base
function deleteUser(req, res){
    const { userId } = req.params;
    User.findByIdAndDelete(userId, (err, user) =>{
        if(err) return res.status(500).send({err});
        return res.status(200).send({message: `User deleted succesfully ${user}`});
    });
}
function login(req,res){
    const { email } = req.body;
    const { password } = req.body;

    User.findOne({ email}, (err, user)=>{
        if(err) return res.status(500).send({ err });
        if(!user) return res.status(404).send({ message: 'We couldn´t find that user'});
        bcrypt.compare(password, user.password, (error,result) =>{ 
            if(error) return res.status(401).json({message: `Authentification failed, try again ${error}`});
            if(result){
                const token = jwt.sign({email, userId: user.id}, process.env.token,{expiresIn:'1h'});
                return res.status(200).send({message:'Auth succesful', token});
            }
        });
    });
}
function editUser(req, res) {
  const { userId } = req.params;
  const { password } = req.body;
  const { username } = req.body;
  const { name } = req.body;
  const { surname } = req.body;
  const { email } = req.body;
  const saltRounds = 10;
  if (!password || !username || !name || !surname || !email) {
    return res.status(500).send({message:'Invalid fields'});
  } else {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return console.log(`Error creating salt ${err}`);
      } else {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) return res.status(500).json.error({ message: error });
          const passwordHashed = hash;
          const user = {
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: passwordHashed,
          };
          User.findByIdAndUpdate(
            userId,
            user,
            { new: true },
            (error, userUpdated) => {
              if (error) return res.status(500).send(error);
              return res
                .status(200)
                .send({ message: "User updated succesfully", userUpdated });
            }
          );
        });
      }
    });
  }
}

module.exports = {
  getUsers,
  getUserUsername,
  getUserId,
  register,
  deleteUser,
  login,
  editUser,
};
