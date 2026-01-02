const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and passwrod are required' });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    //create JWTs(normal and refresh)
    // 1st arg = payload
    //Payload is the actual data being transmitted inside a request, message, or token. In JWT, the payload contains claims such as user identity and token metadata, and it is Base64-encoded but not encrypted.
    // no need to send the role is refresh token, only access token is ok to save this, frontend should take care of saving the role
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' } // TODO change for prod to 5 - 15 min
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // await User.findByIdAndUpdate(foundUser._id, { refreshToken });
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie('jwt', refreshToken, {
      // httpOnly cookie are not acessed by js, its not 100% secure but its much secure
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
