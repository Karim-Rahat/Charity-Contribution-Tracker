
let middleware = {
    isUserLoggedIn: (req, res, next) => {

        if (req.session.userLogin && req.session.userName) {
            console.log("logged in hoise");
            return next();
        }
        else {

            res.redirect('/');
        }

    },
isLoggedIn : (req, res, next) => {
    console.log(req.isAuthenticated(), req.session.userLogin, req.session.adminLogin, req.session.orgLogin);

    if (req.isAuthenticated() && (req.session.userLogin && req.session.userName)) {
        res.redirect("/home");
        return false;
    }
    if (req.session.adminLogin && req.session.adminName) {
        res.redirect("/dashboard");
        return false;
    }
    if (req.session.orgLogin && req.session.orgName) {
        res.redirect("/org");
        return false;
    } else {
        console.log('hoinai');
        return next();

    }
},

isOrgLoggedIn: async(req,res,next)=>{

    if (req.session.orgLogin && req.session.orgName) {
        return next();

    }
    else{
        res.redirect("/org-login"); 
    }
},
isAdminLoggedIn: async(req,res,next)=>{
    console.log(req.session.orgLogin,req.session.orgName);
    if (req.session.adminLogin && req.session.adminName) {
        return next();

    }
    else{
        res.redirect("/admin-login"); 
    }
},

}


module.exports = middleware;
