const { data } = require("autoprefixer");
const { invoke } = require("underscore");
const dataFetchModels = require("../models/dataFetchModels");
const dataInsertModels = require("../models/dataInsertModels");

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
    const id=req.params.id
    console.log(id);
    const data = await dataFetchModels.getCartData([req.session.user_Id]);
    const invoice=await dataFetchModels.getInvoice(id)
console.log(invoice);
const inVoiceItems= await dataFetchModels.getCartDataForInvoice(invoice[0].invoice_number)
console.log(inVoiceItems);

    res.render("client/invoice", {
      usersInfo: req.session,
      cartLength: data.length,
      invoice: invoice,
      inVoiceItems: inVoiceItems
    });
  },
};
module.exports = appController;
