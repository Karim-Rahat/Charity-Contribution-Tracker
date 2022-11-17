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
    const themes = await dataFetchModels.getThemes();
    const disCountry = await dataFetchModels.getDistinctCountry();
    res.render("client/allProject", {
      usersInfo: req.session,
      themes: themes,
      country: disCountry

    });
  },
  getOneProjects: async (req,res)=>{
    const id=req.params
    const data= await dataFetchModels.getOneProject(id)
    const org=await dataFetchModels.getOrg()
    console.log(data);
    res.render("client/singleProject",{ usersInfo: req.session,project: data,org:org})
  },
  cart: async(req,res)=>{

    res.render('client/cart',{usersInfo: req.session})
  }

};
module.exports = appController;
