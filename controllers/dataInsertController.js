const dataFetchModels = require("../models/dataFetchModels");
const dataInsertModels = require("../models/dataInsertModels");
const loginModel = require("../models/loginModel");
const dataInsertController = {
  registration: async (req, res) => {
    console.log(req.body);
    const {
      firstname,
      lastname,
      email,
      password,
      birthdate,
      gender,
      countryCode,
      phone,
    } = req.body;
    const values = [
      firstname,
      lastname,
      email,
      password,
      birthdate,
      gender,
      countryCode,
      phone,
    ];
    console.log(values);
    const data = await dataInsertModels.registration(values);
    console.log(data);
    // res.render('authenticate/confirmRegister')
    res.send(data);
  },
  fbUserReg: async (req, res) => {
    const data = await loginModel.authenticator();

    let i = 0;

    data[0].some((item) => {
      console.log(req.user.email, item.email);
      if (req.user.email == item.email && item.idRef == "facebook") {
        i++;
      }
    });

    if (i == 0) {
      const values = [
        req.user.givenName,
        req.user.familyName,
        req.user.email,
        req.user.id,
        "facebook",
        req.user.photos
      ];
      const data = await dataInsertModels.SocialUserReg(values);

      console.log("fbuserData", data);
      res.redirect("/fbAuthenticate");
    } else {
      console.log("user already ase");
      res.redirect("/fbAuthenticate");
    }
  },
  googleUserReg: async (req, res) => {
    const data = await loginModel.authenticator();
   
    let i = 0;
//check if user already exist
    data[0].map((item) => {
      if (req.user.email == item.email && item.idRef == "google") {
        console.log('google user already ache');
        i++;
      }
    });

    if (i == 0) {
      const values = [
        req.user.givenName,
        req.user.familyName,
        req.user.email,
        req.user.id,
        "google",
        req.user.photos[0].value.replace('s96','s400')
      ];
      const data = await dataInsertModels.SocialUserReg(values);
      console.log("lllllllll", data);
      res.redirect("/googleAuthenticate");
    }
    else{
      res.redirect("/googleAuthenticate");
    }

  },
  saveToCart: async (req, res) => {
 
    const { title, pid, amount } = req.params;
    const values = [pid, amount, req.session.user_Id, title];
    const data = await dataInsertModels.saveToCart(values);

    if (data.affectedRows == 1) {
      res.redirect("/cart");
    }
  },
  updateCartAmount: async (req, res) => {
    console.log('update cart',req.session);
    const { c_id, amount } = req.body;
    console.log(c_id, amount);
    const values = [amount, c_id];
    const data = await dataInsertModels.updateCartAmount(values);
    console.log(data);
    res.send(data);
  },
  delCartItem: async (req, res) => {
    const { c_id } = req.body;
    const value = [c_id];
    const data = await dataInsertModels.delCartItem(value);
    res.send(data);
  },
  saveGenderBdate: async(req,res)=>{
  
    const {gender,birthdate}=req.body
    var bdate = new Date(birthdate);
  const values=[bdate,gender]
  const data=await dataInsertModels.saveGenderBdate(values,req.session.user_Id)
  res.send(data)
  },
  saveProfileData: async(req,res)=>{
 
const {firstName,lastName,email,phoneCode,phone}=req.body
const values=[firstName,lastName,email,phoneCode,phone]
  
  const data=await dataInsertModels.saveProfileData(values,req.session.user_Id)
  res.send(data)
  },
  changePicture: async(req,res)=>{

      const profilePic=req.file.filename;
      const data=await dataInsertModels.changePicture(profilePic,req.session.user_Id);
      
    if(data.affectedRows==1){
      res.redirect('/settings')
    }
   
  }
  
  // clearCartAfterPayment: async(req,res)=>{
  //   const id=req.session.user_Id
  //   console.log(id,'l');
  //   const data = await dataFetchModels.sendPaymentData()
  //   console.log(data);
  //   res.send(data)


  // },


};
module.exports = dataInsertController;
