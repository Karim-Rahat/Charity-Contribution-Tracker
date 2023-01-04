const loginModel = require("../models/loginModel");
const sessionStorage = require('node-sessionstorage')

const loginControllers = {
  index: async (req, res) => {
    console.log((req.session.userLogin, req.session.userName));
    if (
      req.isAuthenticated() ||
      (req.session.userLogin && req.session.userName)
    ) {
      res.redirect("/home");
    }

    res.render("authenticate/login", { display: "display:none" });
  },
  loginAuth: async (req, res) => {
    const { mail, pass } = req.body;
    console.log(mail, pass);
    let flag = 0;
    const data = await loginModel.authenticator();

    data[0].map((item) => {
      // console.log(item.first_name + " " + item.last_name);
      // console.log(mail, item.email, pass, item.password);
      if (mail == item.email && pass == item.password) {
        req.session.userName = item.first_name + " " + item.last_name;
        req.session.userLogin = true;
        req.session.phoneCode=item.phone_code;
        req.session.phone=item.phone
        req.session.adress=item.adress
        req.session.user_Id = item.user_id;
        req.session.email = item.email;
        //save to session storage

        flag = 1;
      }
    });

    if (flag == 0) {
      res.send({ data: false });
    } else {
      res.send({ data: true });
    }
  },
  register: async (req, res) => {
    if (
      req.isAuthenticated() ||
      (req.session.userLogin && req.session.userName)
    ) {
      res.redirect("/home");
    } else {
      const data = await loginModel.phoneCountryCode();
      res.render("authenticate/register", { countryCode: data });
    }
  },
  fbAuthenticate: async (req, res) => {
    console.log("fb authenticate", req.accesstoken);
    const data = await loginModel.authenticator();

    if (req.user) {
      console.log("authenticate success hoise");
      req.session.userName = req.user.name;
      req.session.userLogin = true;
      req.session.user_Id = req.user.id;
      req.session.email = req.user.email;
      req.session.profilePic = req.user.photos[0].value;

      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  },
  googleAuthenticate: async (req, res) => {
 
    const data = await loginModel.authenticator();
    console.log(data);
    if (req.user) {
      console.log("authenticate success hoise");
      const proPic=req.user.photos[0].value.replace('s96','s400')
      req.session.userName = req.user.name;
      req.session.userLogin = true;
      req.session.user_Id = req.user.id;

      req.session.email = req.user.email;
      req.session.profilePic = proPic;
//save to session storage
      res.redirect("/home");
    }
    // else {
    //     res.redirect("/");
    // }
  },
  loginAuthenticate: async (req, res) => {
    const { mail, pass } = req.body;

    const data = await loginModel.authenticator();

    data[0].map((item) => {

      console.log(mail, item.email, pass, item.password);
      if (mail == item.email && pass == item.password) {
        req.session.userName = item.first_name + " " + item.last_name;
        req.session.userLogin = true;

        req.session.user_Id = item.user_Id;

        res.redirect("/home");
      }
    });
    res.end("done");
  },
  logout: async (req, res) => {
    console.log(req.session)
    req.session = null
    res.redirect('/');
  },
};

module.exports = loginControllers;
