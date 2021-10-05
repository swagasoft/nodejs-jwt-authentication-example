const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


// login controller
const login = (req, res, done)=> {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    UserModel.findOne({email:email},(errr, user)=> {
      //  unknown user
      if(!user){
        res.status(404).send({message: 'Invalid credentials.'});
      }else{
    let databasePassword = user.password;
    let decrypePass = cryptr.decrypt(databasePassword);
    
        if(decrypePass === password){
          token = user.generateJwt(user);
          // send user role to client...
          res.json({"token":token });
    
        }else{
          res.status(401).send({message: ' Invalid User Credentials.'});
        }
    }
    });
    }

    

    const createUser = (request , response)=> {
      console.log(request.body);

            var  user = new UserModel();
            user.firstName = request.body.firstName;
            user.lastName = request.body.lastName;
            user.email = request.body.email.toLowerCase();
            let crypPassword = cryptr.encrypt(request.body.password);
            user.password = crypPassword;
         
            user.save().then((newuser, err)=> {
              if(!err){
                response.status(200).send({message: 'operation successful...'});
              }else{
                response.status(500).send({message : 'Error in user information'});
              }
        
            }).catch((err)=> {
              console.log(err);
              if(err.errors.email){
                response.status(422).send({message: ' Email has been taken!'});
              }else{
                response.status(501).send({message: 'error in user information'});
              }
            });

          }
    



    const getUserDetails = async (req, res)=> {
     await UserModel.findById({_id:req._id}).then((user)=> {
        if(user){
          res.status(200).send({user: user});
        }else{
          res.status(404).send({msg:'user not found!'});
        }
      });
    }


    const updateUserDetails = async (req, res)=> {
      console.log(req.body);
     await UserModel.findById({_id:req._id}).then((user)=> {
        if(user){
          user.phone = req.body.phone;
          user.bank = req.body.bank;
          user.bank_account_name = req.body.bank_account_name;
          user.bank_account_number = req.body.bank_account_no;
          user.save().then(()=> {
            res.status(200).send({user: user, msg:'profile updated successful!'});
          })
          
        }else{
          res.status(404).send({msg:'user not found!'});
        }
      });
    }




const getMyProfile = async (req, res)=> {
  const currentUser = await UserModel.findOne({_id:req._id});
  res.status(200).send({currentUser});
}

    



module.exports = { login, createUser, getUserDetails, updateUserDetails, getMyProfile }