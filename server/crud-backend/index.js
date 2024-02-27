require('dotenv').config();
const express = require('express')
const cors =  require('cors')      
const app = express()
const cookieParser =  require('cookie-parser')
const userRoutes = require('./src/routes/userRoutes')
const adminRoutes = require('./src/routes/adminRoutes')

let db = require('./src/connection/database')
const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


  
app.use('/api',userRoutes)
app.use('/api/admin',adminRoutes)
 
db.once('open', () => {
          app.listen(3000, () => {
            console.log('Server started, database successfully connected');
          });
        });
     


