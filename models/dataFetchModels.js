const connection = require("../database/db");

const dataFetchModels = {
  usersList: async (values) => {
    const sqlquery = "SELECT * FROM `users`";

    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  usersInfo: async (values) => {
    const sqlquery = "SELECT * FROM `users`";

    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  singleUserInfo: async (value) => {
    const sqlquery = `SELECT * FROM users where user_id=${value} OR social_id=${value}`;

    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },

  getProjectsList: async()=>{
    const sqlquery = "SELECT * FROM `projectlist`";

    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getProjects: async()=>{
    const sqlquery = "SELECT * FROM `projects`";

    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getOrg: async ()=>{
    const sqlquery="SELECT * FROM `organizations`"
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getThemes: async ()=>{
    const sqlquery="SELECT * from themes" 
    
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getDistinctCountry: async()=>{
    const sqlquery="SELECT DISTINCT country FROM `projects` ORDER BY `projects`.`country` ASC"
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
 
 
  },
  getOneProject: async (id)=>{
    const sqlquery="SELECT * from projects WHERE p_id=?" 

    try {
      const rows = await connection.promise().execute(sqlquery,[id.id]);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getCartData: async(value)=>{
    console.log(value);
    const sqlquery="SELECT * from cart WHERE status=0 AND user_id=?" 
console.log(sqlquery);
    try {
      const rows = await connection.promise().execute(sqlquery,value);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
 getCrntProjectGoal: async(values)=>{

  const sqlquery="  SELECT `funding` FROM `projects` WHERE p_id=?"
  console.log(sqlquery);
      try {
        const rows = await connection.promise().execute(sqlquery,[values]);
  
        return rows[0];
      } catch (err) {
        return err;
      }
 },
 getinvoiceList: async(values)=>{
  const sqlquery=" SELECT * FROM `invoices` WHERE user_id=?"
      try {
        const rows = await connection.promise().execute(sqlquery,values);
  
        return rows[0];
      } catch (err) {
        return err;
      }
 },
 getInvoice: async(values)=>{
  const sqlquery=" SELECT * FROM `invoices` WHERE invoice_id=?"
      try {
        const rows = await connection.promise().execute(sqlquery,[values]);
  
        return rows[0];
      } catch (err) {
        return err;
      }
 },
 getCartDataForInvoice: async(value)=>{

    console.log(value);
    const sqlquery="SELECT * from cart WHERE status=1 AND invoice_number=?" 
console.log(sqlquery);
    try {
      const rows = await connection.promise().execute(sqlquery,[value]);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
 
  sendPaymentData: async (data)=>{
    console.log('data',data);

    return data
},


//dashboard
paymentChartByhours: async()=>{
const sqlquery="SELECT * FROM `invoices` WHERE DATE(`transaction_time`) = CURDATE()"
const sqlquery2="SELECT SUM(amount) as yesterdayTotal FROM `invoices` WHERE DATE(`transaction_time`) =DATE_SUB(CURDATE(), INTERVAL 1 DAY)"
try {
  const rows = await connection.promise().execute(sqlquery);
  const rows2 = await connection.promise().execute(sqlquery2);
  return [rows[0],rows2[0][0]];
} catch (err) {
  return err;
}
},
countData: async()=>{
  const sqlquery="SELECT COUNT(*) as usersCount FROM `users`"
  const sqlquery2="SELECT COUNT(*) as projectCount FROM `projects` where status='active';"
  const sqlquery3="SELECT COUNT(*) as orgCount FROM `organizations` WHERE activeProjects>0 ;"
  try {
    const rows = await connection.promise().execute(sqlquery);
    const rows2 = await connection.promise().execute(sqlquery2);
    const rows3 = await connection.promise().execute(sqlquery3);
    return [rows[0][0],rows2[0][0],rows3[0][0]];
  } catch (err) {
    return err;
  }
  },

  countryWiseOrg: async ()=>{
    const sqlquery="SELECT country as name,COUNT(country) as value FROM `organizations` GROUP BY country;"
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  
  getAllInvoiceList: async()=>{
    
    const sqlquery="SELECT invoice_id,invoice_number,amount,transaction_time,u.first_name,u.last_name,u.email FROM `invoices` as i JOIN users as u WHERE i.user_id=u.user_id OR i.user_id=u.social_id ORDER BY `i`.`transaction_time` DESC"
    
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getLocationProject: async(value)=>{
    const sqlquery="SELECT *  FROM `projects` WHERE country=?"
    try {
      const rows = await connection.promise().execute(sqlquery,[value]);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getBangladeshProject: async(value)=>{
    const sqlquery="SELECT *  FROM `projects` WHERE country='Bangladesh'"
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },



  //organization
  getOrgProjects: async(values)=>{
    const sqlquery="SELECT *  FROM `projects` WHERE org_id=?"
    const sqlquery2="SELECT * FROM `projects` WHERE org_id=? ORDER BY `projects`.`funding` DESC LIMIT 4;"
    try {
      const rows = await connection.promise().execute(sqlquery,[values]);
      const rows2 = await connection.promise().execute(sqlquery2,[values]);
      return [rows[0],rows2[0]];
    } catch (err) {
      return err;
    }
  },

};

module.exports = dataFetchModels;
