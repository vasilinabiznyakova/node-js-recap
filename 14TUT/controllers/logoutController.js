const User = require('../model/User');

const handleLogout = async (req, res) => {

  //on client also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //Is refresh token in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  console.log(foundUser);

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  //Delete refreshToken in db
  foundUser.refreshToken = '';
  const result = await foundUser.save(); //it will save our changes to mongodb
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 100 }); // in prod we would add flag secure: true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
