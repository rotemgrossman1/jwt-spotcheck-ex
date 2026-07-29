const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)
const users = [
    {
      id: 1,
      username: 'ameerj',
      password: 'meowmeow', // hashed password: 'password'
      animal:"cat"
    },
    {
      id: 2,
      username: 'lotemh',
      password: "natureisamazing!",// hashed password: '123456'
      animal:"owl"
    }
  ];
users.forEach(user =>{
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;
});
module.exports = users;
  