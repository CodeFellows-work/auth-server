'use strict';


const base64 = require('base-64');
const { user } = require('../models/index.js')


module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ');
  let [username, password] = base64.decode(basic[1]).split(':');

  try {
    req.user = await user.authenticateBasic(username, password)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

//   let basic = req.headers.authorization.split(' ');
//   let encodedString = basic.pop();
//   let decodedString = base64.decode(encodedString);
//   let [username, password] = decodedString.split(':');

//   try {
//     const users = await user.findOne({where: {username: username } });
//     const valid = await bcrypt.compare(password, user.password);
//     // req.user = await user.authenticateBasic(username, pass)
//     if(valid){
//       req.user = users;
//       next();
//     }else {
//       throw new Error('Invalid User')
//     }
//   } catch (e) {
//     res.status(403).send('Invalid Login');
//   }
// }