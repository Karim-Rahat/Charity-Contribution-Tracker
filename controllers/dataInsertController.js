const dataFetchModels = require("../models/dataFetchModels");
const dataInsertModels = require("../models/dataInsertModels");
const loginModel = require("../models/loginModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contribution.trackers@gmail.com",
    pass: "brczrcdxqtyhtoky",
  },
});

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
async function comparePasswords(plainTextPassword, hashedPassword) {
  const isMatch = await bcrypt.compareSync(plainTextPassword, hashedPassword);
  return isMatch;
}

const dataInsertController = {
  registration: async (req, res) => {
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
    const token = uuidv4();
    const mailOptions = {
      from: "contribution.trackers@gmail.com",
      to: email,
      subject: "Confirm your email",
      html: `Please click on this link to confirm your email: http://127.0.0.1:${process.env.PORT}/accountConfirmed/${token}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const values = [
      firstname,
      lastname,
      email,
      await hashPassword(password),
      birthdate,
      gender,
      countryCode,
      phone,
      token,
    ];
    const data = await dataInsertModels.registration(values);
    console.log(data);
    res.send(data);
  },
  fbUserReg: async (req, res) => {
    const data = await loginModel.socialAuthenticator();
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
        req.user.photos,
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
    const data = await loginModel.socialAuthenticator();
    let i = 0;
    data[0].map((item) => {
      if (req.user.email == item.email && item.idRef == "google") {
        console.log("google user already ache");
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
        req.user.photos[0].value.replace("s96", "s400"),
      ];
      const data = await dataInsertModels.SocialUserReg(values);
      res.redirect("/googleAuthenticate");
    } else {
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
    const { c_id, amount } = req.body;
    console.log(c_id, amount);
    const values = [amount, c_id];
    const data = await dataInsertModels.updateCartAmount(values);
    res.send(data);
  },
  delCartItem: async (req, res) => {
    const { c_id } = req.body;
    const value = [c_id];
    const data = await dataInsertModels.delCartItem(value);
    res.send(data);
  },
  saveGenderBdate: async (req, res) => {
    const { gender, birthdate } = req.body;
    const values = [birthdate, gender];
    const data = await dataInsertModels.saveGenderBdate(
      values,
      req.session.user_Id
    );
    console.log(data);
    res.send(data);
  },
  saveProfileData: async (req, res) => {
    const { firstName, lastName, email, phoneCode, phone } = req.body;
    const values = [firstName, lastName, email, phoneCode, phone];
    const data = await dataInsertModels.saveProfileData(values,req.session.user_Id);
    res.send(data);
  },
changePicture: async (req, res) => {
    const profilePic = req.file.filename;
    const data = await dataInsertModels.changePicture(
      profilePic,
      req.session.user_Id
    );
    if (data.affectedRows == 1) {
      res.redirect("/settings");
    }
  },
  changePassword: async (req, res) => {
    console.log(req.body);
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const data = await loginModel.checkOldPassword([req.session.user_Id]);
    console.log(data, "old");
    if (data != null) {
      const checkOldPassword = await comparePasswords(oldPassword, data);
      console.log(checkOldPassword);
      if (checkOldPassword == false) {
        res.send({ data: 0 });
      }
      if (checkOldPassword == true) {
        if (newPassword == confirmPassword) {
          const hash = await hashPassword(newPassword);
          const savePassword = await dataInsertModels.changePassword(hash,req.session.user_Id);
          res.send(savePassword);
        }
        else {
          res.send({ data: 1 });
        }
      }
    } 
    else {
      if (newPassword == confirmPassword) {
        const hash = await hashPassword(newPassword);
        console.log(hash);
        const savePassword = await dataInsertModels.changePassword(
          hash,
          req.session.user_Id
        );
        res.send(savePassword);
      } else {
        res.send({ data: 1 });
      }
    }
  },
  changeAdress: async (req, res) => {
    const { streetAdress, city, state, zipcode } = req.body;
    const values = [streetAdress, city, state, zipcode];
    const data = await dataInsertModels.changeAdress(
      values,
      req.session.user_Id
    );

    res.send(data);
  },
//admin
insertOrg: async(req,res)=>{

  const {orgName,mission,address,city,country,postal,state,tin,theme,websiteLink,email,password}=req.body
  const logo=req.file.filename
  const values=[orgName,mission,address,city,country,postal,state,tin,logo,theme,websiteLink,email,password]
  const data= await dataInsertModels.insertOrg(values)
  console.log(data);
  if(data.affectedRows==1){
    res.redirect('/addOrg')
  }
 
},
  //organization
  insertProject: async(req,res)=>{
    console.log( Object.values(req.body));
    let values=[]
    values=Object.values(req.body)
    values.push(req.session.orgId)
    const data=await dataInsertModels.insertProject(values)

console.log(data);
if(data.affectedRows==1){
  res.redirect('/org')
}
  },
  updateProject: async(req,res)=>{
    const id=req.params.id
    console.log(id);
    console.log( Object.values(req.body));
    let values=[]
    values=Object.values(req.body)
    values.push(req.params.id)
    const data=await dataInsertModels.updateProject(values,id)

console.log(data);
if(data.affectedRows==1){
  res.redirect('/org')
}
}
}
module.exports = dataInsertController;
