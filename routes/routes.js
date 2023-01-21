/* eslint-disable linebreak-style */
const passport = require("passport");
const router = require('express').Router();
const appController = require("../controllers/appController");
const dataInsertController = require('../controllers/dataInsertController');
const dataFetchController = require("../controllers/DataFetchController");
const loginControllers = require('../controllers/loginControllers');
const middleware = require("../middleware/loginMiddleware");
const paymentControllers = require("../controllers/paymentController");

router.get(
  "/authenticate",
  middleware.isUserLoggedIn,
  loginControllers.loginAuthenticate
);
router.get("/fbUserReg",  dataInsertController.fbUserReg);
router.get("/googleUserReg",  dataInsertController.googleUserReg);
router.get(
  "/fbAuthenticate",
  loginControllers.fbAuthenticate
);
router.get(
  "/googleAuthenticate",
  loginControllers.googleAuthenticate
);
//user
router.get('/',middleware.isLoggedIn,loginControllers.index);
router.post('/loginAuth',loginControllers.loginAuth)
router.get('/register',middleware.isLoggedIn,  loginControllers.register)
router.post('/registration', dataInsertController.registration)
router.get('/getUserEmail',dataFetchController.getUserEmail)
router.get('/confirmMail',appController.confirmMail)
router.get('/accountConfirmed/:token',loginControllers.mailConfirmed)
router.get('/home', middleware.isUserLoggedIn,appController.home)
router.get('/allProject',middleware.isUserLoggedIn,appController.allProject)
router.get('/faqs',middleware.isUserLoggedIn,appController.faqs)
router.get('/invoiceList',middleware.isUserLoggedIn,appController.invoiceList)
router.get('/invoices/:id',middleware.isUserLoggedIn,appController.invoices)
router.get('/cart',middleware.isUserLoggedIn,appController.cart)
router.get('/settings',middleware.isUserLoggedIn,appController.settings)
router.get("/logout", loginControllers.logout);



//fetch data
router.get('/getProjects',dataFetchController.getProjects)
router.get('/getOrg',dataFetchController.getOrg)
router.get('/getThemes',dataFetchController.getThemes)
router.get('/getCartData',dataFetchController.getCartData)
router.get('/getInvoiceList',dataFetchController.getInvoiceList)
router.get('/getUserInfo',dataFetchController.getUserInfo)
router.get('/project/:id',appController.getOneProjects)
router.get('/saveToCart/:title/:pid/:amount',dataInsertController.saveToCart)

router.post('/updateCartAmount',dataInsertController.updateCartAmount)
router.post('/delCartItem',dataInsertController.delCartItem)
router.post('/saveGenderBdate',dataInsertController.saveGenderBdate)
router.post('/saveProfileData',dataInsertController.saveProfileData)
router.post('/changePicture', dataInsertController.changePicture)
router.post('/changePassword',dataInsertController.changePassword)
router.post('/changeAdress',dataInsertController.changeAdress)
router.post('/geoLocation',dataFetchController.geoLocation)
router.get('/getLocationProject',dataFetchController.getLocationProject)
//payment
router.get('/init/:amount',paymentControllers.ssl)


//admin 
router.get('/admin-login',middleware.isLoggedIn,loginControllers.adminLoginPage)
router.get('/dashboard',middleware.isAdminLoggedIn,appController.dashboard)
router.get('/paymentChartByhours',dataFetchController.paymentChartByhours)
router.get('/countData',dataFetchController.countData)
router.get('/countryWiseOrg',dataFetchController.countryWiseOrg)
router.get('/getAllInvoiceList',dataFetchController.getAllInvoiceList)
router.get('/viewAllProjects',middleware.isAdminLoggedIn,appController.viewAllProjects)
router.get('/viewAllOrganization',middleware.isAdminLoggedIn,appController.viewAllOrganization)
router.get('/addOrg',middleware.isAdminLoggedIn,appController.addOrg)
router.post('/insertOrg',dataInsertController.insertOrg)



//orgnazitation page
router.get('/org-login',middleware.isLoggedIn,loginControllers.orgLoginPage)
router.post('/orgLoginAuth',loginControllers.orgLoginAuth)
router.get('/org',middleware.isOrgLoggedIn,appController.organization)
router.get('/addProject',middleware.isOrgLoggedIn,appController.addProject)
router.post('/insertProject',dataInsertController.insertProject)
router.get('/editProject/:id',appController.editProject)
router.post('/updateProject/:id',dataInsertController.updateProject)
module.exports = router;



//ssl

router.post("/ssl-payment-notification", async (req, res) => {

  /** 
  * If payment notification
  */

  return res.status(200).json(
    {
      data: req.body,
      message: 'Payment notification'
    }
  );
})

router.post("/ssl-payment-success",paymentControllers.paymentSuccess)
// router.get('/clearCartAfterPayment',dataInsertController.clearCartAfterPayment)


// router.post("/ssl-payment-fail",paymentControllers.paymentFailed)

router.post("/ssl-payment-cancel", async (req, res) => {


  return res.status(200).json(
    {
      data: req.body,
      message: 'Payment cancelled'
    }
  );
})


router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/fbUserReg",
    failureRedirect: "error",
  })
);

router.get("/auth/facebook/callback/lol", (req, res) => {
  console.log("lol");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/googleUserReg",
    failureRedirect: "/error",
  })
);