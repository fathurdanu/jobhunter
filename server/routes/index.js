const route = require('express').Router();
const userRoutes = require('./userRoutes')
const jobRoutes = require('./jobRoutes');

route.get('/', (req,res) => {
    res.status(200).json({'message': "Welcome to Jobhunter"})
})

route.use('/users',userRoutes)
route.use('/jobs',jobRoutes)

module.exports = route;