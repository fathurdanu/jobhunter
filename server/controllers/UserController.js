const { User } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator, tokenVerifier } = require('../helpers/jsonwebtoken')
const base_url = process.env.BASE_URL || "http://localhost:3000";

class UserController {
    static async register(req, res, next) {
        try {

            const { username, email, password, name, type } = req.body

            let isUsernameTaken = await User.findOne({
                where: { username }
            });

            let isEmailTaken = await User.findOne({
                where: { email }
            })

            console.log(isUsernameTaken)
            console.log(isEmailTaken)

            if (!isUsernameTaken && !isEmailTaken) {
                const defaultUserPic = "https://www.w3schools.com/howto/img_avatar.png"
                const defaultCompanyPic = "https://bursakerja.jatengprov.go.id/assets/default-logo.png"
                const defaultPic = (type === "company") ? defaultCompanyPic : defaultUserPic;

                const img = req.file ? base_url + "/" + req.file.path.replaceAll("\\", "/") : defaultPic;
                let result = await User.create({
                    username, email, password, name, type, image: img
                })
                res.status(201).json(result)
            }else if(isUsernameTaken){
                res.status(400).json({message: "Username already taken"})
            }else if(isEmailTaken){
                res.status(400).json({message: "Email already taken"})
            }

        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            let account = await User.findOne({
                where: { username }
            })
            if (account) {
                if (decryptPwd(password, account.password)) {
                    let access_token = tokenGenerator(account)
                    res.status(200).json({
                        access_token,
                        type: account.type,
                        image: account.image,
                    })
                } else {
                    res.status(403).json({
                        message: "Invalid password"
                    })
                }
            } else {
                res.status(404).json({
                    message: `Account not found`
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async update(req, res, next) {
        try {
            const id = +req.userData.id;
            const { username, email, password, name, type, image } = req.body
            const img = req.file ? base_url + "/" + req.file.path.replaceAll("\\", "/") : image;

            let result = await User.update({
                username, email, password, name, type,
                image: img,
                type,
            },
                {
                    where: { id },
                    individualHooks: true
                })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async getUserByUsername(req, res, next) {
        try {
            const username = req.params.username
            let result = await User.findOne({
                where: { username },
                attributes: {
                    exclude: ['password']
                }
            });
            (result) ? res.status(200).json(result) : res.status(404).json({ message: 'User not found' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController