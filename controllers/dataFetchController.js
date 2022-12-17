
const { getCartData } = require("../models/dataFetchModels");
const dataFetchModels = require("../models/dataFetchModels");

const dataFetchController={
getUserEmail:async(req,res)=>{
   const data= await dataFetchModels.usersList();
   const emails=[]
data.map(item=>{
emails.push(item.email)
})
    res.send(emails)
},
getUserInfo: async(req,res)=>{
const data=[]
data.push(req.session.userName,req.session.email)
res.send(data)
},
getProjects: async(req,res)=>{
    const data= await dataFetchModels.getProjects()
    res.send(data)
},
getOrg: async (req,res)=>{
    const data= await dataFetchModels.getOrg()
    res.send(data)
},
getThemes: async (req,res)=>{
    const data= await dataFetchModels.getThemes()
    res.send(data)
},
getCartData: async(req,res)=>{
    const value=[req.session.user_Id]
    const data=await dataFetchModels.getCartData(value)
    res.send(data)
},
getInvoiceList: async(req,res)=>{
    const value=[req.session.user_Id]

    const data=await dataFetchModels.getinvoiceList(value)
    res.send(data)
}
}
module.exports=dataFetchController