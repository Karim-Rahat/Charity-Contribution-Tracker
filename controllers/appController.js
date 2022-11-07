const { data } = require("autoprefixer");
const dataFetchModels = require("../models/dataFetchModels");
const dataInsertModels = require("../models/dataInsertModels");
const axios = require("axios").default;

const appController = {
  confirmMail: async (req, res) => {
    res.render("authenticate/confirmRegister");
  },

  home: async (req, res) => {
    console.log(req.session,'req.user');


    res.render("client/home", {
      usersInfo: req.session,
    });
  },
  allProject: async (req, res) => {
    // const data = await dataFetchModels.getProjects();
    // const themes = await dataFetchModels.getThemes();

    res.render("client/allProject", {
      usersInfo: req.session,

    });
  },
};
module.exports = appController;
