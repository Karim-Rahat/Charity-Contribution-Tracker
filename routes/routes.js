/* eslint-disable linebreak-style */
const passport = require("passport");
const router = require('express').Router();
const appController = require("../controllers/appController");
const dataInsertController = require('../controllers/dataInsertController');
const dataFetchController = require("../controllers/DataFetchController");
const api = require("../controllers/api");
// eslint-disable-next-line linebreak-style
const loginControllers = require('../controllers/loginControllers');
const middleware = require("../middleware/loginMiddleware");
const dataFetchModels = require("../models/dataFetchModels");
// const DataInsertModels = require("../models/DataInsertModel");
// router.post("/authenticate", loginControllers.authenticate);
router.get(
  "/authenticate",
  middleware.checkLogin,
  loginControllers.loginAuthenticate
);
router.get("/fbUserReg",  dataInsertController.fbUserReg);
router.get("/googleUserReg",  dataInsertController.googleUserReg);
router.get(
  "/fbAuthenticate",
  middleware.isLoggedIn,
  loginControllers.fbAuthenticate
);
router.get(
  "/googleAuthenticate",
  middleware.isLoggedIn,
  loginControllers.googleAuthenticate
);
router.get('/',loginControllers.index);
router.post('/loginAuth', loginControllers.loginAuth)
router.get('/register', loginControllers.register)
router.post('/registration', dataInsertController.registration)
router.get('/getUserEmail',dataFetchController.getUserEmail)
router.get('/confirmMail',appController.confirmMail)
router.get('/home',middleware.isLoggedIn,appController.home)

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

// router.get('/random',api.randomData)
// router.get("/recomend",api.recommend)

router.get('/recomend',api.getInvoice)


//fetch data
router.get('/getProjects',dataFetchController.getProjects)
router.get('/getOrg',dataFetchController.getOrg)
router.get('/getThemes',dataFetchController.getThemes)
router.get('/getCartData',dataFetchController.getCartData)


router.get('/project/:id',appController.getOneProjects)
router.get('/saveToCart/:title/:pid/:amount',dataInsertController.saveToCart)
router.get('/cart',appController.cart)
router.post('/updateCartAmount',dataInsertController.updateCartAmount)
router.post('/delCartItem',dataInsertController.delCartItem)
router.get('/allProject',appController.allProject)
router.get("/logout", loginControllers.logout);
module.exports = router;
