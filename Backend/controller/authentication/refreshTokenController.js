import jwt from 'jsonwebtoken'
import User from '../../model/User.js'

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  if (!refreshToken) return res.sendStatus(401);
  // find user
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  //check jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        console.error(error);
        return res.sendStatus(401);
      }
      const accessToken = jwt.sign(
        { userId: foundUser._id, role: foundUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );
      res.status(200).json({
        accessToken: accessToken,
        role: foundUser.role,
        id: foundUser._id.toString(),
        firstname: foundUser.firstname,
        lastname: foundUser.lastname
      });
    }
  );
}

export default handleRefresh;
