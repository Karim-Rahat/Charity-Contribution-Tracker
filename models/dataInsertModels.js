const connection = require("../database/db");

const dataInsertModels = {
  registration: async (values) => {
    const sqlquery =
      "INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `birthdate`, `gender`, `phone_code`, `phone`) VALUES (?,?,?,?,?,?,?,?)";

    try {
      const rows = await connection.promise().execute(sqlquery, values);
      console.log(rows[0]);
      return rows[0];
    } catch (err) {
      return err;
    }
  },
  SocialUserReg: async (values) => {
    const sqlquery =
      "INSERT INTO `user`( `first_name`, `last_name`, `email`, `idRef`,`social_id`) VALUES (?,?,?,?,?)";

    try {
      const rows = await connection.promise().execute(sqlquery, values);
      console.log(rows[0]);
      return rows[0];
    } catch (err) {
      return err;
    }
  },

  splitProjects: async (values)=>{


    const sqlquery="INSERT INTO `projects`(`p_id`, `active`, `activities`, `additionalDocumentation`, `approvedDate`, `contactAddress`, `contactCity`, `contactCountry`, `contactName`, `contactPostal`, `contactState`, `contactTitle`, `contactUrl`, `country`, `dateOfMostRecentReport`, `donationOption`, `funding`, `goal`, `imageLink`, `longTermImpact`, `modifiedDate`, `need`, `numberOfDonations`, `numberOfReports`, `progressReportLink`, `projectLink`, `region`, `remaining`, `status`, `summary`, `theme`, `themeName`, `title`, `type`, `org_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
 
    try {
      const rows = await connection.promise().execute(sqlquery, values);
 
     
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
 
  },
  saveToCart: async (values)=>{
    console.log(values);
    const sqlquery="INSERT INTO `CART` (`project_id`,`amount`,`user_id`,`title`) VALUES (?,?,?,?)"
    try {
      const rows = await connection.promise().execute(sqlquery, values);
 
     
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
 
  },
  updateCartAmount: async (values)=>{
    console.log(values);
    const sqlquery="UPDATE `cart` SET `amount`=? WHERE `c_id`=?"
    try {
      const rows = await connection.promise().execute(sqlquery, values);
 
     
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  delCartItem:async (value)=>{
    console.log(value);
    const sqlquery="DELETE FROM CART WHERE `c_id`=?"
    try {
      const rows = await connection.promise().execute(sqlquery, value);
 
     
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

module.exports = dataInsertModels;
