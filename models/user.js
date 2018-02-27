'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid First Name. Must be between 1 and 99 characters.'
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'First Name can only contain alpha-characters.'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Last Name. Must be between 1 and 99 characters.'
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg: 'Last Name can only contain alpha-characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid Email Address. Please check your address format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be at least 8 characters.'
        }
      }
    },
    bio: {
      type: DataTypes.TEXT
    }
  }, {
    // hooks and options
    hooks: {
      // happens before the validation
      beforeCreate: function(pendingUser, options){
          // check to make sure we have a pending record
          // check to see if there is a password for the pending user
          if (pendingUser && pendingUser.password){
            // hash the password
            var hash = bcrypt.hashSync(pendingUser.password, 10);
              pendingUser.password = hash;
          }
      },
      // happens after the validation
      afterValidate: function(){
        console.log('afterValidate')

      },
      // happens before the creation
      beforeValidate: function(){
        console.log('beforeValidate')

      },
      // happens after the creation
      afterCreate: function(res){
        console.log('afterCreate: created user with id ' + res.dataValues.id)

      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.garden);

  };
  // add a method to the class model
  // this function will remove the password from the user object
  user.prototype.validPassword = function(passwordEntered){
    // this is the model
    // for password it may be better to use SYNC instead of ASYNC
    return bcrypt.compareSync(passwordEntered, this.password);
  };

  // modify the user object to remove the password
  user.prototype.toJSON = function(){
    // get the user object
    var userData = this.get();
    // delete the password var from the user object
    delete userData.password;
    return userData;
  };
  return user;
};
