const connection = require("../database/db");

const dataFetchModels = {
  usersList: async (values) => {
    const sqlquery = "SELECT * FROM `user`";

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
    const sqlquery="SELECT * FROM organizations"
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  },
  getThemes: async ()=>{
    const sqlquery="SELECT t_name from themes" 
    
    try {
      const rows = await connection.promise().execute(sqlquery);

      return rows[0];
    } catch (err) {
      return err;
    }
  }

};

module.exports = dataFetchModels;
