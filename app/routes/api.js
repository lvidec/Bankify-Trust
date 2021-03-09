

module.exports=function(app, express, db, jwt, secret, bcrypt) {

  let ObjectId = require('mongodb').ObjectId;
  const apiRouter = express.Router();

  apiRouter.get('/', function(req, res) {
    res.json({message: 'Dobro dosli na nas API!'});
  });

  apiRouter.route('/users').post(async function(req, res) {

    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      balance: 100,
      level: 1
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    try {
      let data = await db.collection('users').insertOne(user);
      res.json({status: 'OK', insertId: data.insertedId, user: user});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }

  });

    apiRouter.use(function(req, res, next){

    const token = req.body.token || req.params.token || req.headers['token'] || req.query.token;

    // console.log("\nparams", req.params);
    // console.log("\nheaders", req.headers);
    // console.log("\nquery", req.query);
    //
    // console.log("\n\ntoken", token);

    if (token){

      jwt.verify(token, secret, function (err, decoded){

        if (err){

          return res.status(403).send({
            success:false,
            message:'Wrong token'
          });

        } else {
          req.decoded=decoded;
          next();
        }

      });

    } else {

      return res.status(403).send({
        success:false,
        message:'No token'
      });

    }

  });


  apiRouter.route('/users').get(async function(req, res) {


    try {

      let rows = await db.collection('users').find({}).toArray();
      res.json({status: 'OK', users: rows});
    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  });

  apiRouter.route('/users/:id').get(async function(req, res) {


    try {

      let rows = await db.collection('users').find({_id: ObjectId(req.params.id)}).toArray();
      res.json({status: 'OK', users: rows});
    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  }).delete(async function(req, res) {

    try {

      let data = await db.collection('users').removeOne({
        _id: ObjectId(req.params.id)
      });

      res.json({status: 'OK', affectedRows: data});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }

  }).put(async function(req, res) {

    let user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      balance: req.body.balance,
      level: req.body.level

    };

    try {
      let data = await db.collection('users').updateOne({
        _id: ObjectId(req.params.id)
      }, {
        $set: user
      });

      res.json({status: 'OK', changedRows: data.nModified});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  });

//################################################################################################################################
//################################################################################################################################
//################################################################################################################################
//################################################################################################################################
//################################################################################################################################

  apiRouter.route('/payments').get(async function(req, res) {


    try {

      let rows = await db.collection('payments').find({}).toArray();
      let formattedRows = [];

      for(let payment of rows){
        let userFrom = await db.collection('users').findOne({_id: ObjectId(payment.userIdFrom)});
        let userTo = await db.collection('users').findOne({_id: ObjectId(payment.userIdTo)});
        // console.log('USEEEEEEEEEEEEEEEEEEEEEEEEER', userTo);
        formattedRows.push({
          _id: payment['_id'],
          date: payment.date,
          amount: payment.amount,
          userFrom: userFrom,
          userTo: userTo
          // username: userTo.username
        })
      }

      res.json({status: 'OK', payments: formattedRows});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  }).post(async function(req, res) {

    try {

      let payment = {
        userIdFrom: req.body.userIdFrom,
        userIdTo: req.body.userIdTo,
        date: new Date(),
        amount: req.body.amount
      };

      let data = await db.collection('payments').insertOne(payment);

      let userFrom = await db.collection('users').findOne({_id: ObjectId(req.body.userIdFrom)});
      let userTo = await db.collection('users').findOne({_id: ObjectId(req.body.userIdTo)});

      let returnedPayment = {
        _id: data._id,
        userFrom: userFrom,
        userTo: userTo,
        date: new Date(),
        amount: req.body.amount
      };

      res.json({status: 'OK', insertId: data.insertedId, payment: returnedPayment});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }

  })

  apiRouter.route('/payments/:id').get(async function(req, res) {


    try {

      let rows = await db.collection('payments').find({_id: ObjectId(req.params.id)}).toArray();
      res.json({status: 'OK', payments: rows});
    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  }).delete(async function(req, res) {

    try {

      let data = await db.collection('payments').removeOne({
        _id: ObjectId(req.params.id)
      });

      res.json({status: 'OK', affectedRows: data});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  }).put(async function(req, res) {

    let payment = {
      userIdFrom: req.body.userIdFrom,
      userIdTo: req.body.userIdTo,
      date: new Date(),
      amount: req.body.amount
    };

    try {
      let data = await db.collection('payments').updateOne({_id: ObjectId(req.params.id)}
      , {$set: payment});

      res.json({status: 'OK', changedRows: data.nModified});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }


  });

  apiRouter.route('/deletePayments/:userId').delete(async function(req, res){

    try {

      console.log("params", req.params);


      let data = await db.collection('payments').remove({
        $or: [
          {userIdFrom: req.params.userId},
          {userIdTo: req.params.userId},
        ]
      });

      res.json({status: 'OK', affectedRows: data});

    } catch (e) {
      res.json({status: 'NOT OK'});
    }
  });

  apiRouter.get('/me', function (req, res){

    res.send({status:200, user:req.decoded});

  });


  return apiRouter;


}


