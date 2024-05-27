//conexión a la bd

import mongoose from 'mongoose'
mongoose.connect("mongodb+srv://dbAdmin:JoCnWZzN4sojXjHv@ford-db.3gtnire.mongodb.net/?retryWrites=true&w=majority")
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))