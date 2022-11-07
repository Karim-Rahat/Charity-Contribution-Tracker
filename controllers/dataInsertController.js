

const dataInsertModels = require("../models/dataInsertModels");
const loginModel = require("../models/loginModel");
const dataInsertController = {
  registration: async (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password, birthdate, gender, countryCode, phone } = req.body
    const values = [firstname, lastname, email, password, birthdate, gender, countryCode, phone]
    console.log(values);
    const data = await dataInsertModels.registration(values)
    console.log(data);
    // res.render('authenticate/confirmRegister')
    res.send(data)
  },
  fbUserReg: async (req, res) => {
    const data = await loginModel.authenticator();
    console.log(data);
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
      ];
      const data = await dataInsertModels.SocialUserReg(values);
      console.log("fbuserData", data);
      res.redirect("/fbAuthenticate");
    }
    else {
      console.log('user already ase');
      res.redirect("/fbAuthenticate");
    }
  },
  googleUserReg: async (req, res) => {
    const data = await loginModel.authenticator();
    console.log(req.user);
    data[0].some(async (item) => {

      let i = 0;
      if (req.user.email == item.email && item.idRef == "google") {
        i++;
      }


      if (i == 0) {
        const values = [

          req.user.givenName,
          req.user.familyName,
          req.user.email,
          req.user.id,
          "google",
        ];
        const data = await dataInsertModels.SocialUserReg(values);
        console.log("fbuserData", data);
        res.redirect("/googleAuthenticate");
      }
      // else{
      //   console.log('user already ase');
      //   res.redirect("/googleAuthenticate");
      // } 
    });
  },


}
module.exports=dataInsertController