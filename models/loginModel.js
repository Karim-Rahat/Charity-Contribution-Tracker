const connection = require("../database/DB");
const loginModel = {
  authenticator: async () => {
    const sqlquery = "SELECT * FROM `user`";

    try {
      const rows = await connection.promise().execute(sqlquery);

      return [rows[0]];
    } catch (err) {
      return err;
    }
  },
  phoneCountryCode: async () => {
    const sqlquery = "SELECT name,phonecode FROM `country`";
    try {
      const rows = await connection.promise().execute(sqlquery);
      return rows[0];
    } catch (err) {
      return err;
    }
  },
  
}
  module.exports=loginModel