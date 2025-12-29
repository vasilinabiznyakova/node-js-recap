const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
//bcrypt help us to hash and salt the password so that we could store them in db, there is a native module crypto in nodejs but hystorically bcrypt is more reliable for passwrods, its being used more than 20 years
//It’s intentionally slow, manages salts internally, and reduces the risk of implementation mistakes. Native options like scrypt are also valid, but bcrypt remains a common and safe default.

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and passwrod are required' });
  //check for duplicate usernames in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  //res.status() only sets the HTTP status code and allows chaining, while res.sendStatus() sets the status and immediately sends the response with a default message. sendStatus is useful for simple responses and early exits.
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
