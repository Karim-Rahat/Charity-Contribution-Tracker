
let middleware = {
    checkLogin: function(req, res, next) {
      
        if (req.session.userLogin && req.session.userName) {
            console.log("logged in hoise");
            return next()
           
          
            


        }  
        else{
         
            res.redirect('/')
        }
        
    },
    isLoggedIn: function(req, res, next) {

       
        if(req.isAuthenticated() || (req.session.userLogin && req.session.userName)){
            return next();
        
        } else {
            console.log('hoinai');
            res.redirect("/")
        }


    }
}


module.exports = middleware;

function checkSession(req, res, next) {
    // if (
    //   (req.session.userLogin && !req.cookies.user_cookie) ||
    //   (!req.session.userLogin && req.cookies.user_cookie)

    // ) {
    //   console.log("check session e");
    //   res.clearCookie("user_cookie");
    //   req.session.destroy(() => {
    //     res.redirect("/");
    //   });
    // } 
    // else {
    //   console.log("dhuktese next");

    //   console.log("dhukse next e");
    //   console.log(req.session.userName, "username");
    //   console.log(req.session.userLogin, req.cookies.user_cookie);
    //   next();
    //        if (req.session.userName !== undefined) {
    //          console.log("true");
    //          return res.redirect("/productPage");
    //        } else {
    //          console.log("undefined");
    //          res.render("admin/");
    //        }
    // }
}