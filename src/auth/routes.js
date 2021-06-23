
'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res) => {
  const user = await users.findAll({});
  const list = user.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;

// 'use strict';

// const express = require('express');
// const authRouter = express.Router();

// const { users } = require('./models/index.js');
// const basicAuth = require('./middleware/basic.js')
// const bearerAuth = require('./middleware/bearer.js')


// authRouter.post('/signup', async (req, res) => {
//   try {
//       // req.body.password = await bcrypt.hash(req.body.password, 10);
//       const record = await users.create(req.body);
//       res.status(200).json(record);
//   } catch (e) { 
//       res.status(403).send("Error Creating User"); 
//   }
// });

// // authRouter.post('/signup', async (req, res, next) => {
// //   try {
// //     let userRecord = await users.create(req.body);
// //     // const output = {
// //     //   user: userRecord,
// //     //   token: userRecord.token
// //     // };
// //     res.status(200).json(userRecord);
// //   } catch (e) {
// //     next(e.message);
// //   }
// // });

// authRouter.post('/signin', basicAuth, async (req, res) => {
//   // const user = {
//   //   user: req.user,
//   //   token: req.user.token
//   // };
//   res.status(200).json(req.user);
// });

// authRouter.get('/users', bearerAuth, async (req, res) => {
//   const users = await users.findAll({});
//   const list = users.map(user => user.username);
//   console.log(req.users);
//   res.status(200).json(list);
// });

// authRouter.get('/secret', bearerAuth, async (req, res) => {
//   res.status(200).send("Welcome to the secret area!")
// });


// module.exports = authRouter;