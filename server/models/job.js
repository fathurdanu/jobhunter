'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.belongsTo(models.User)
    }
  }
  Job.init({
    UserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter the job name'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter the location'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter the job description'
        }
      }
    },
    isFullTime: DataTypes.BOOLEAN,
    officialWeb: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter your company official website address'
        }
      }
    },
    applyAtPage: {
      type: DataTypes.STRING,
    },
    cvSubmissionEmail: {
      type: DataTypes.STRING,
    },
    status: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: function (job, options) {
        job.status = "open"
      },
    },
    sequelize,
    modelName: 'Job',
  });
  return Job;
};