const paymentModels = require("../models/paymentModel");

const express = require("express");
const app = express();

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "nurul637c5bde20663";
const store_passwd = "nurul637c5bde20663@ssl";
const is_live = false; //true for live, false for sandbox
const { Convert } = require("easy-currencies");
const { v4: uuidv4 } = require("uuid");
const dataInsertModels = require("../models/dataInsertModels");
const dataFetchController = require("./dataFetchController");
const dataFetchModels = require("../models/dataFetchModels");

//import module
const localStorage = require("localStorage");

// constructor function to create a storage directory inside our project for all our localStorage setItem.

//sslcommerz init

const paymentControllers = {
  ssl: async (req, res) => {
    let sumAmount = 0;
    const amount = req.params.amount;
    const transId = uuidv4();

    const value = await Convert(amount).from("USD").to("BDT");

    sumAmount = sumAmount + value;

    console.log(req.session.user_Id);
    //Setting localStorage Item
    localStorage.setItem("userId", req.session.user_Id);
    console.log(localStorage.getItem("userId"));
    const data = {
      total_amount: sumAmount,
      currency: "BDT",
      tran_id: transId, // use unique tran_id for each api call
      success_url: "http://localhost:5000/ssl-payment-success`",
      fail_url: "http://localhost:5000/ssl-payment-fail",
      cancel_url: "http://localhost:5000/ssl-payment-cancel",
      ipn_url: "http://localhost:5000/ipn",
      shipping_method: "No",
      product_name: "Donation",
      product_category: "Donation",
      product_profile: "non-physical-goods",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      console.log("l");
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.redirect(GatewayPageURL);
      console.log("Redirecting to: ", GatewayPageURL);
    });
  },

  paymentSuccess: async (req, res) => {
    console.log(localStorage.getItem("userId"));

    const data = req.body;
    //current date
    let date = new Date();
    date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0];
    //convert bdt to usd
    const amount = await Convert(data.amount).from("BDT").to("USD");
    const storeAmount = await Convert(data.store_amount).from("BDT").to("USD");

    const userId = localStorage.getItem("userId");
    const values = [
      userId,
      data.val_id,
      data.card_issuer,
      Math.round(amount),
      storeAmount,
      data.tran_id,
      date,
    ];

    const insertedData = await dataInsertModels.insertPaymentData(values);

    if (insertedData.affectedRows > 0) {
      const getCrntCartData = await dataFetchModels.getCartData([userId]);

      await getCrntCartData.map(async (item) => {
      

       console.log(item.amount);
        val = [item.amount, item.project_id];
        const saveDonationMoney = await dataInsertModels.saveDonationMoney(val);
        console.log(saveDonationMoney);
      });

      await dataInsertModels.changeStatusOfCart(userId, data.val_id);
      await res.redirect("/invoiceList");
    }
  },
};

module.exports = paymentControllers;
