const { data } = require("autoprefixer");
const { invoke } = require("underscore");
const dataFetchModels = require("../models/dataFetchModels");
const dataInsertModels = require("../models/dataInsertModels");
const loginModel = require("../models/loginModel");
const appController = {
  confirmMail: async (req, res) => {
    res.render("authenticate/confirmRegister");
  },

  home: async (req, res) => {
    const cart = await dataFetchModels.getCartData([req.session.user_Id]);
    res.render("client/home", {
      usersInfo: req.session,
      cartLength: cart.length,
    });
  },
  allProject: async (req, res) => {
    // const data = await dataFetchModels.getProjects();
    const themes = await dataFetchModels.getThemes();
    const disCountry = await dataFetchModels.getDistinctCountry();
    const cart = await dataFetchModels.getCartData([req.session.user_Id]);
    res.render("client/allProject", {
      usersInfo: req.session,
      themes: themes,
      country: disCountry,
      cartLength: cart.length,
    });
  },
  getOneProjects: async (req, res) => {
    
    const id = req.params;
    const data = await dataFetchModels.getOneProject(id);
    const org = await dataFetchModels.getOrg();
    const cart = await dataFetchModels.getCartData([req.session.user_Id]);
    res.render("client/singleProject", {
      usersInfo: req.session,
      project: data,
      org: org,
      cartLength: cart.length,
    });
  },
  cart: async (req, res) => {
    const data = await dataFetchModels.getCartData([req.session.user_Id]);

    res.render("client/cart", {
      usersInfo: req.session,
      cartLength: data.length,
    });
  },
  invoiceList: async (req, res) => {
    const data = await dataFetchModels.getCartData([req.session.user_Id]);
    res.render("client/invoiceList", {
      usersInfo: req.session,

      cartLength: data.length,
    });
  },

  invoices: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await dataFetchModels.getCartData([req.session.user_Id]);
    const invoice = await dataFetchModels.getInvoice(id);
    console.log(invoice);
    const inVoiceItems = await dataFetchModels.getCartDataForInvoice(
      invoice[0].invoice_number
    );
    console.log(inVoiceItems);

    res.render("client/invoice", {
      usersInfo: req.session,
      cartLength: data.length,
      invoice: invoice,
      inVoiceItems: inVoiceItems,
    });
  },
  settings: async (req, res) => {




    const value = [req.session.user_Id];
    const data = await dataFetchModels.singleUserInfo(value);
    
    const data2 = await loginModel.phoneCountryCode();
    const data3 = await dataFetchModels.getCartData([req.session.user_Id]);
    res.render("client/settings", {
      data: data[0],
      countryCode: data2,
      usersInfo: req.session,
      cartLength: data3.length,
    });
  },


  //admin panel

  dashboard: async (req, res) => {
    const data=await dataFetchModels.countData()
    const data2= await dataFetchModels.getAllInvoiceList()
    const data3= await dataFetchModels.getProjects()
    const org = await dataFetchModels.getOrg();
    res.render("admin/dashboard", {
      adminInfo: req.session,countData: data,
      invoiceList: data2,
      projects: data3,
      org: org
    });
  },
  viewAllProjects: async(req,res)=>{
    const data3= await dataFetchModels.getProjects()
    const org = await dataFetchModels.getOrg();
    res.render("admin/viewAllProject", {
      adminInfo: req.session,
      projects: data3,
      org: org
    });
  },
  viewAllOrganization: async(req,res)=>{
    const org = await dataFetchModels.getOrg();

    res.render("admin/viewAllOrg",{org:org})
  }


};
module.exports = appController;
