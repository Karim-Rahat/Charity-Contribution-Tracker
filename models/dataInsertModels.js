const connection = require("../database/db");

const dataInsertModels = {
  registration: async (values) => {
    const sqlquery =
      "INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `birthdate`, `gender`, `phone_code`, `phone`,`verificaion_token`) VALUES (?,?,?,?,?,?,?,?,?)";

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
      "INSERT INTO `users`( `first_name`, `last_name`, `email`, `social_id`,`idRef`,profile_pic) VALUES (?,?,?,?,?,?)";

    try {
      const rows = await connection.promise().execute(sqlquery, values);
      console.log(rows[0]);
      return rows[0];
    } catch (err) {
      return err;
    }
  },

  splitProjects: async (values) => {
    const sqlquery =
      "INSERT INTO `projects`(`p_id`, `active`, `activities`, `additionalDocumentation`, `approvedDate`, `contactAddress`, `contactCity`, `contactCountry`, `contactName`, `contactPostal`, `contactState`, `contactTitle`, `contactUrl`, `country`, `dateOfMostRecentReport`, `donationOption`, `funding`, `goal`, `imageLink`, `longTermImpact`, `modifiedDate`, `need`, `numberOfDonations`, `numberOfReports`, `progressReportLink`, `projectLink`, `region`, `remaining`, `status`, `summary`, `theme`, `themeName`, `title`, `type`, `org_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    try {
      const rows = await connection.promise().execute(sqlquery, values);

      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  saveToCart: async (values) => {
    const sqlquery =
      "INSERT INTO `CART` (`project_id`,`amount`,`user_id`,`title`) VALUES (?,?,?,?)";
    try {
      const rows = await connection.promise().execute(sqlquery, values);

      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updateCartAmount: async (values) => {
    const sqlquery = "UPDATE `cart` SET `amount`=? WHERE `c_id`=?";
    try {
      const rows = await connection.promise().execute(sqlquery, values);

      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  delCartItem: async (value) => {
    const sqlquery = "DELETE FROM CART WHERE `c_id`=?";
    try {
      const rows = await connection.promise().execute(sqlquery, value);

      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  changeStatusOfCart: async (value, invoiceNumber) => {
    const sqlquery =
      "UPDATE `cart` SET `status`=1 , `invoice_number`=?  WHERE `c_id`=?";
    try {
      const rows = await connection
        .promise()
        .execute(sqlquery, [invoiceNumber, value]);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  insertPaymentData: async (values) => {
    const sqlquery =
      " INSERT INTO `invoices`(`user_id`, `invoice_number`, `card_type`, `amount`, `store_amount`, `tran_id`,`transaction_time`) VALUES (?,?,?,?,?,?,?)";
    try {
      const rows = await connection.promise().execute(sqlquery, values);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  saveDonationMoney: async (values) => {
    const sqlquery = `update projects set funding = funding+${values[0]},remaining = remaining-${values[0]},numberOfDonations=numberOfDonations+1 WHERE p_id=${values[1]};`;
    try {
      const rows = await connection.promise().execute(sqlquery);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  saveGenderBdate: async (values, id) => {
    const sqlquery = `UPDATE users SET birthdate=?,gender=? WHERE user_id=${id} or social_id=${id}`;
    try {
      const rows = await connection.promise().execute(sqlquery, values);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  saveProfileData: async (values, id) => {
    const sqlquery = `UPDATE users SET first_name=?,last_name=?,email=?,phone_code=?,phone=? WHERE user_id=${id} or social_id=${id}`;
    try {
      const rows = await connection.promise().execute(sqlquery, values);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  changePicture: async (value, id) => {
    const sqlquery = `UPDATE users SET profile_pic=? WHERE user_id=${id} or social_id=${id}`;
    try {
      const rows = await connection.promise().execute(sqlquery, [value]);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  changePassword: async (value, id) => {
    const sqlquery = `UPDATE users SET password=? WHERE user_id=${id} or social_id=${id}`;
    try {
      const rows = await connection.promise().execute(sqlquery, [value]);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  changeAdress: async (value, id) => {
    const sqlquery = `UPDATE users SET street_adress=?,city=?,state=?,zipcode=? WHERE user_id=${id} or social_id=${id}`;
    try {
      const rows = await connection.promise().execute(sqlquery, value);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  insertOrg: async (values, id) => {
    const sqlquery =
      "INSERT INTO `organizations`(`name`, `mission`, `adressLine1`, `city`, `country`, `postal`, `state`, `tin`, `logoUrl`, `themes`, `websiteLink`, `email`, `password`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    try {
      const rows = await connection.promise().execute(sqlquery, values);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  insertProject: async (values, id) => {
    const sqlquery =
      "INSERT INTO `projects`( `title`, `activities`,`summary`,`longTermImpact`, `need`,`contactAddress`, `contactCity`, `contactCountry`,  `contactPostal`, `contactState`, `contactTitle`, `themeName`,`country`,   `contactName`,`contactUrl`, `goal`,`org_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    try {
      const rows = await connection.promise().execute(sqlquery, values);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updateProject: async (values, id) => {
    const sqlquery =
      "UPDATE `projects` SET `title`=?,`activities`=?, `summary`=?,`longTermImpact`=?,`need`=?,`contactAddress`=?,`contactCity`=?,`contactCountry`=?,`contactPostal`=?,`contactState`=?,`contactTitle`=?,`themeName`=?,`country`=?,`contactName`=?,`contactUrl`=?,`goal`=? WHERE `p_id`=?";
    try {
      const rows = await connection.promise().execute(sqlquery, values, [id]);
      console.log(rows);
      return rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

module.exports = dataInsertModels;
