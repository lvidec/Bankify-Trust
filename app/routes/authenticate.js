

module.exports=function(app,express,db,jwt,secret, bcrypt){


  let authRouter = express.Router();

  // authRouter.post('/', async function(req,res){
  //
  //   try {
  //
  //     console.log(req.body);
  //
  //     let rows = await db.collection('users').find({username: req.body.username}).toArray();
  //
  //     if (rows.length>0 && rows[0].password==req.body.password){
  //
  //       const token = jwt.sign({
  //         username:rows[0].username,
  //         email:rows[0].email,
  //         level: rows[0].level
  //       }, secret, {
  //         expiresIn:3600
  //       });
  //
  //       res.json({ status: 'OK', token: token, user:rows[0]});
  //
  //     } else if (rows.length>0){
  //
  //       res.json({ status: 'NOT OK', description:'Wrong password' });
  //
  //     } else {
  //
  //       res.json({ status: 'NOT OK', description:'Username doesnt exist' });
  //
  //     }
  //
  //
  //   } catch (e){
  //
  //     console.log(e);
  //     return res.json({"code" : 100, "status" : "Error with query"});
  //
  //   }
  //
  //
  //
  // });

  authRouter.post('/', async function(req,res){

    try {

      console.log(req.body);

      let rows = await db.collection('users').find({username: req.body.username}).toArray();

      if (rows.length==0)
        res.json({ status: 'NOT OK', description:'Username doesnt exist' });

      else {

        let validPass = bcrypt.compareSync(req.body.password, rows[0].password);

        console.log("\n\nVALID PASS", validPass);

        if (rows.length > 0 && validPass) {

          let token = jwt.sign({
            username: rows[0].username,
            email: rows[0].email
          }, secret, {
            expiresIn: 3600
          });

          res.json({
            status: 'OK',
            token: token,
            user: rows[0]
          });

        } else {

          res.json({status: 'NOT OK', description: 'Wrong password'});

        }
      }

    } catch (e){

      console.log(e);
      return res.json({"code" : 100, "status" : "Error with query"});

    }



  });




  return authRouter;

};
