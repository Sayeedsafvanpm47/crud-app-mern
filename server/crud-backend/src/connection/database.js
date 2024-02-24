
const uri = 'mongodb+srv://sayeedsafvan123:fxwaMtuYfmkNnNGc@crud-react.pzicfdq.mongodb.net/crud-app?retryWrites=true&w=majority&appName=crud-react'
const mongoose = require('mongoose')
mongoose.connect(uri)
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))


module.exports = db
