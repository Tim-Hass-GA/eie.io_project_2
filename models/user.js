'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type:DataTypes.STRING,
       validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Username. Must be between 1 and 99 characters.'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid Email Address. Please check your address format.'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be at least 8 characters.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
          // check to make sure we have a pending record
          // check to see if there is a password for the pending user
          if (pendingUser && pendingUser.password){
            // hash the password
            var hash = bcrypt.hashSync(pendingUser.password, 10);
              pendingUser.password = hash;
          }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
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
