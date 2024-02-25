require('dotenv').config();
const express = require('express')
const cors =  require('cors')      
const app = express()
const cookieParser =  require('cookie-parser')
const userRoutes = require('./src/routes/userRoutes')
let db = require('./src/connection/database')


app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

        
app.use('/api',userRoutes)
 
db.once('open', () => {
          app.listen(3000, () => {
            console.log('Server started, database successfully connected');
          });
        });
     


