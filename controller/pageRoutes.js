



exports.getHomePage = (req,res)=>{
    try {
     res.render('home.pug')
    } catch (error) {
     console.log("here is some error to load home page : ",err)
    }
 }

exports.getLoginPage = (req,res)=>{
    try {
        res.render("login.pug")
    } catch(error) {
        console.log("can not getlogin page ",error)
    }
}


exports.getSignUpPage = (req,res)=>{
    try {
        res.render("registration.pug")
    } catch(error) {
        console.log("can not get signup page ",error)
    }
}


exports.getContactUsPage = (req,res)=>{
    try {
        res.render("contactUs.pug")
    } catch(error) {
        console.log("can not get contact us page ",error)
    }
}


exports.getExplorePage= (req,res)=>{
    try {
        res.render("explore.pug")
    } catch(error) {
        console.log("can not get explore page ",error)
    }
}