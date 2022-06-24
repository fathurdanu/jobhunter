const { tokenVerifier } = require('../helpers/jsonwebtoken')
const { Job,User } = require('../models')

const authentication = (req, res, next) => {
    const access_token = req.headers.access_token

    if(access_token){
        try {
            let verifyToken = tokenVerifier(access_token)
            req.userData = verifyToken
            next()
        } catch(err){
            req.status(401).json({
                message: "Token not authenticated!"
            })
        }
    } else {
        res.status(404).json({
            message: "Access token not found"
        })
    }
}

const authorization = async (req,res,next)=>{
    try{
        const username = req.userData.username;
        const JobId = req.params.id;
        const job =  await Job.findByPk(JobId,{
            include: {
                model:User,
                attributes: {
                    exclude: ['password']
                }
            }
        })
        if(!job){
            res.status(404).json({
                message: "Job not found"
            });
        }else if(job.User.username !== username){
            res.status(401).json({
                message: "User doesn't have access"
            });
        }else{
            next();
        }
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
    
}
module.exports = {authentication, authorization}