const express = require("express")
const app = express();
const path = require("path")
const bodyParser = require('body-parser')

require('dotenv').config()


const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true
}).then(()=>{
    console.log("Connection with database is successfull")
}).catch((err)=>{
    console.log("Cannot connect with the database, Here is the error : ",err)
})



///allow express to use JSON format to accept the data
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
///To use bootstrap 5
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/public', express.static(__dirname + '/public'))


///configure views file 
app.set('views', path.join(__dirname, 'views'))
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html')
app.set('view engine', 'pug')





const userController = require('./controller/user')
const pageRoutes = require('./controller/pageRoutes')


app.get('/loginPage', pageRoutes.getLoginPage)
app.get('/signUpPage', pageRoutes.getSignUpPage)
app.get('/', pageRoutes.getHomePage)
app.get('/contactUsPage', pageRoutes.getContactUsPage)
app.get('/explorePage', pageRoutes.getExplorePage)


app.post('/users', userController.addNewUser)
app.get('/users',userController.getAllUser)
app.get('/users/:id',userController.getOneUser)
app.post('/login', userController.loginUser)

const port = (process.env.STATUS === "development")? process.env.DEV_PORT : process.env.PRODUCTION_PORT
app.listen(port,()=>{
console.log(`Server is listning on http://127.0.0.1:${port}`)
})