const loginModel = require("../models/loginModel");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./localstorage");
const bcrypt = require("bcrypt");
const dataFetchModels = require("../models/dataFetchModels");

async function comparePasswords(plainTextPassword, hashedPassword) {
  const isMatch = await bcrypt.compareSync(plainTextPassword, hashedPassword);
  return isMatch;
}

const loginControllers = {
  index: async (req, res) => {
    res.render("authenticate/login", { display: "display:none" });
  },
  loginAuth: async (req, res) => {
    const { mail, pass } = req.body;

    let flag = 0;
    let hash;
    const item = await loginModel.authenticator(mail, pass);
    const adminData = await loginModel.adminAuth([mail, pass]);

    if (item) {
      if (await comparePasswords(pass, item.password)) {
        req.session.userName = item.first_name + " " + item.last_name;
        req.session.userLogin = true;
        req.session.phoneCode = item.phone_code;
        req.session.phone = item.phone;
        req.session.adress = item.adress;
        req.session.user_Id = item.user_id;
        req.session.userEmail = item.email;
        req.session.profilePic = item.profile_pic;
        req.session.connection = "siteConnected";

        flag = 1;
      }
    }
    if (adminData.length > 0) {
      adminData.map((data) => {
        if (data.email == mail && data.password == pass) {
          req.session.adminName = data.first_name + " " + data.last_name;
          req.session.adminLogin = true;
          req.session.phoneCode = data.phone_code;
          req.session.phone = data.phone;
          req.session.admin_id = data.admin_id;
          req.session.adminEmail = data.email;

          flag = 2;
        }
      });
    }

    if (flag == 0) {
      res.send({ data: false });
      return false;
    }
    if (flag == 2) {
      res.send({ data: "admin" });
      return false;
    } else {
      res.send({ data: true });
    }
  },

  //org login auth
  orgLoginAuth: async (req, res) => {
    const { mail, pass } = req.body;

    let flag = 0;

    const orgData = await dataFetchModels.getOrg();

    orgData.map((data) => {
      if (data.email == mail && data.password == pass) {
        req.session.orgName = data.name;
        req.session.orgLogin = true;
        req.session.orgId = data.id;
        req.session.orgEmail = data.email;
        req.session.profilePic = data.profile_pic;
        flag = 1;
      }
    });
    if (flag == 1) {
      res.send({ data: "org" });
    } else {
      res.send({ data: false });
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
    const data = await loginModel.socialAuthenticator();

    if (req.user) {
      req.session.userName = req.user.name;
      req.session.userLogin = true;
      req.session.user_Id = req.user.id;
      req.session.userEmail = req.user.email;
      req.session.profilePic = req.user.photos[0].value;
      req.session.connection = "socialConnected";
      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  },
  googleAuthenticate: async (req, res) => {
    const data = await loginModel.socialAuthenticator();

    if (req.user) {
      const proPic = req.user.photos[0].value.replace("s96", "s400");
      req.session.userName = req.user.name;
      req.session.userLogin = true;
      req.session.user_Id = req.user.id;

      req.session.userEmail = req.user.email;
      req.session.profilePic = proPic;
      req.session.connection = "socialConnected";
      res.redirect("/home");
    }
  },
  loginAuthenticate: async (req, res) => {
    const { mail, pass } = req.body;

    const data = await loginModel.authenticator();

    data[0].map((item) => {
      if (mail == item.email && pass == item.password) {
        req.session.userName = item.first_name + " " + item.last_name;
        req.session.userLogin = true;

        req.session.user_Id = item.user_Id;
        req.session.userEmail = item.email;
        res.redirect("/home");
      }
    });
    res.end("done");
  },

  mailConfirmed: async (req, res) => {
    const token = req.params;

    const data = await dataFetchModels.usersInfo();

    data.map((item) => {
      if (token.token == item.verificaion_token) {
        req.session.userName = item.first_name + " " + item.last_name;
        req.session.userLogin = true;
        req.session.userEmail = item.email;
        req.session.user_Id = item.user_id;

        res.render("authenticate/confirmMail");
      }
    });
  },
  //admin
  adminLoginPage: async (req, res) => {
    res.render("authenticate/adminLogin");
  },

  //prg
  orgLoginPage: async (req, res) => {
    res.render("authenticate/orgLogin");
  },

  logout: async (req, res) => {
    localStorage.removeItem("longitude");
    localStorage.removeItem("latitude");
    req.session = null;
    res.redirect("/");
  },
};

module.exports = loginControllers;
