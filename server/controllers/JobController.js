const { Job, User } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class JobController {
    static async getPaginationJobs(req, res, next) {
        try {
            const page = +req.params.page;
            let keywords = {};
            if (req.params.keywords) {
                let query = req.params.keywords;

                if (query.includes("fulltime")) {
                    query = (query.length === 8) ? query : query.slice(0, query.length - 9);
                    keywords['isFullTime'] = true;
                } else if (query.includes("parttime")) {
                    query = (query.length === 8) ? query : query.slice(0, query.length - 9);
                    keywords['isFullTime'] = false;
                }

                if (req.params.keywords.startsWith('jobs-in-')) {
                    query = query.slice(8, req.params.keywords.length)
                    keywords['location'] = query.replace("-", " ");
                } else if (req.params.keywords.includes('-jobs-in-')) {
                    query = query.split("-jobs-in-");
                    keywords['jobDescription'] = query[0].replace("-", " ");
                    keywords['location'] = query[1].replace("-", " ");
                } else if (!query.includes("fulltime") && !query.includes("parttime")) {
                    keywords['jobDescription'] = query.replace("-", " ");
                }
            }

            let where = {};
            if (keywords['jobDescription']) {
                where = {
                    [Op.or]: {
                        "description": {
                            [Op.like]: '%' + keywords['jobDescription'] + '%'
                        },
                        "jobName": {
                            [Op.like]: '%' + keywords['jobDescription'] + '%'
                        }
                    }
                }
            }

            if (keywords['location']) {
                where["location"] = {
                    [Op.like]: '%' + keywords['location'] + '%'
                }
            }

            if (keywords['isFullTime'] || keywords['isFullTime'] === false) {
                where["isFullTime"] = keywords['isFullTime']
            }

            let jobs = await Job.findAll({
                include: {
                    model: User,
                    attributes: ["name", "image",]
                },
                limit: 5,
                offset: (page - 1) * 5,
                where
            })
            res.status(200).json(jobs)
        } catch (err) {
            next(err)
        }
    }

    static async getJobById(req, res, next) {
        try {
            const id = +req.params.id;
            let result = await Job.findByPk(id, {
                include: {
                    model: User,
                    attributes: ["name", "image",]
                }
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const {
                UserId,
                jobName,
                location,
                description,
                isFullTime,
                officialWeb,
                applyAtPage,
                cvSubmissionEmail,
                status

            } = req.body
            let result = await Job.create({
                UserId,
                jobName,
                location,
                description,
                isFullTime,
                officialWeb,
                applyAtPage,
                cvSubmissionEmail,
                status
            })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const id = +req.params.id;
            const {
                UserId,
                jobName,
                location,
                description,
                isFullTime,
                officialWeb,
                applyAtPage,
                cvSubmissionEmail,
                status

            } = req.body
            let result = await Job.update({
                UserId,
                jobName,
                location,
                description,
                isFullTime,
                officialWeb,
                applyAtPage,
                cvSubmissionEmail,
                status
            }, {
                where: { id }
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            try {
                const id = +req.params.id;
                let result = await Job.destroy({
                    where: { id }
                })
                res.status(200).json(result)
            } catch (err) {
                next(err)
            }
        } catch (err) {
            next(err)
        }
    }

    // static async update(req, res, next) {
    //     try {
    //         const id = +req.userData.id;
    //         const { username, email, password, name, type, image } = req.body
    //         const img = req.file ? req.file.image : image;

    //         let result = await User.update({
    //             username, email, password, name, type,
    //             image: img,
    //             type,
    //         },
    //             {
    //                 where: { id },
    //                 individualHooks: true
    //             })
    //         res.status(201).json(result)
    //     } catch (err) {
    //         next(err)
    //     }
    // }
    // static async getUserById(req, res, next) {
    //     try {
    //         const id = +req.userData.id
    //         let result = await User.findOne({
    //             where: { id },
    //         })
    //         res.status(200).json(result)
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}

module.exports = JobController