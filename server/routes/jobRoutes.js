const jobRoutes = require('express').Router();
const { JobController } = require('../controllers')
const {authentication,authorization} = require('../middlewares/auth')

jobRoutes.get('/info/:id', authentication, JobController.getJobById);
jobRoutes.get('/:page/:keywords?', authentication, JobController.getPaginationJobs);
jobRoutes.post('/', authentication, JobController.create);
jobRoutes.put('/:id', authentication, authorization, JobController.update);
jobRoutes.delete('/:id', authentication, authorization, JobController.delete);


module.exports = jobRoutes;