
const dataFetchModels = require("../models/dataFetchModels");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');
const opencage = require('opencage-api-client');
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
getSingleUserData:async(req,res)=>{
    const value=[req.session.user_Id]
    const data= await dataFetchModels.usersList(value);
 
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
},
paymentChartByhours: async(req,res)=>{
    const data=await dataFetchModels.paymentChartByhours()
    res.send(data)
},
countData: async(req,res)=>{
const data=await dataFetchModels.countData()
res.send(data)
},
countryWiseOrg: async(req,res)=>{
    const data = await dataFetchModels.countryWiseOrg()
    res.send(data)
},
getAllInvoiceList: async(req,res)=>{
    const data= await dataFetchModels.getAllInvoiceList()
    res.send(data)
},
geoLocation: async(req,res)=>{

const {longitude,latitude}=req.body

localStorage.setItem('longitude',longitude)
localStorage.setItem('latitude',latitude)
},
getLocationProject: async(req,res)=>{

    if(localStorage.getItem('longitude')){
        const x=localStorage.getItem('longitude')
        const y= localStorage.getItem('latitude')
        const geo=JSON.stringify(`${y},${x}`)
        let country
           await opencage
            .geocode({q:geo, language: 'en' })
            .then((data) => {
              if (data.results.length > 0) {
                const place = data.results[0];
                console.log(place.components.country);
                country = place.components.country
              } 
            })
         
        const getLocationProject= await dataFetchModels.getLocationProject(country)
        
        res.send(getLocationProject)

    }

},

    //organization

    getOrgProjects: async(req,res)=>{
        const orgId=req.session.orgId
        const data= await dataFetchModels.getOrgProjects(orgId)
        res.send(data)
    },




}
module.exports=dataFetchController