const express = require('express');
const router = express.Router();
const users = require('../../fakeDB/users');
const bcrypt = require('bcryptjs');
const secretKey = 'my_secret_key';
var jwt = require('jsonwebtoken');
function authenticateUser(username, password){
  const user = users.find(u=>u.username === username);
  if(!user){
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if(!isPasswordValid){
    return null;
  }
  return {id:user.id, username: user.username}
}

function generateAccessToken(user){
  return jwt.sign(user, secretKey)
}

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(!token){
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, user) => {
    if(err){
      return res.sendStatus(401)
    }
    req.user= user;
    next();
  })
}
router.post('/login', (req, res) => {
  const{username, password} = req.body;
  const user = authenticateUser(username, password)
  if(!user){
    return res.status(401).send({message: 'Invalid username or password'})
  }
  const accessToken = generateAccessToken(user)
  res.send({ accessToken });
});
router.get('/animals', authenticateToken,(req, res) => {
  try {
    const user = findUser(req.user.id,req.user.username)
    console.log(user)
    const favAnimal = {"animal":user.animal}
    console.log(favAnimal)
    res.send(favAnimal);
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'Invalid token' });
  }
});


module.exports = router;
