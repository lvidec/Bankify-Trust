
module.exports={

  port:  process.env.PORT || 8081,
  pool: 'mongodb://localhost:27017/bank',
  // pool: 'mongodb+srv://Lima:Lima@clusterbank.ridye.mongodb.net/BankifyTrust?retryWrites=true&w=majority',
  secret:'somehugestringfordecodingtokens'

};
