const connection = require("../database/DB");


const bcrypt = require('bcrypt');

async function comparePasswords(plainTextPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
  return isMatch;
}

const loginModel = {
  authenticator: async (mail, pass) => {
    const sqlquery = "SELECT * FROM `users`";
    let data;
    try {
      const rows = await connection.promise().execute(sqlquery);

      rows[0].map(async (item,i) => {
        if(item.password!=null){

      
        if (mail == item.email) {
       
        data=rows[0][i];
     

        
          
       
        }
      }
      });
      
      return data
    } catch (err) {
      return err;
    }
  },
  socialAuthenticator: async (mail, pass) => {
    const sqlquery = "SELECT * FROM `users`";

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
  checkOldPassword: async (id) => {
    const sqlquery = `SELECT * FROM users WHERE user_id=${id} or social_id=${id}`;
    let data;
    try {
      const rows = await connection.promise().execute(sqlquery);

       
       return rows[0][0].password;
     

        
          
   
    } catch (err) {
      return err;
    }
  },
  
}
  module.exports=loginModel