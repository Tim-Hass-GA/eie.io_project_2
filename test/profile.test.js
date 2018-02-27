var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');
var agent = request.agent(app);

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('GET /profile', function() {
  it('should redirect to /auth/login if not logged in', function(done) {
    request(app).get('/profile')
    .expect('Location', '/auth/login')
    .expect(302, done);
  });

  it('should return a 200 response if logged in', function(done) {
    agent.post('/auth/signup')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      email: 'my@user.co',
      first_name: 'Brian',
      last_name: 'Lifton',
      password: 'password'
    })
    .expect(302)
    .expect('Location', '/')
    .end(function(error, res) {
      if (error) {
        done(error);
      } else {
        agent.saveCookies(res);

        agent.get('/profile')
        .expect(200, done);
      }
    });
  });
});


// new implementation test
// describe('the /user/profile routes', function() {
//   // describe 'is telling us what this test is for'
//   it('should GET the /user/profile route and return a 200 code', function(done) {
//     // it 'is telling us what we are testing'
//     request(app).get('/user/profile')
//     .expect('Location', '/user/profile')
//     .expect(200, done);
//   });
//
//   it('should PUT form data and redirect or something (if logged in)', function(done) {
//     agent.post('/user/edit/:id')
//     .set('Content-Type', 'application/x-www-form-urlencoded')
//     .send({
//       email: 'my@user.co',
//       name: 'Brian',
//       password: 'password'
//     })
//     .expect(302)
//     .expect('Location', '/')
//     .end(function(error, res) {
//       if (error) {
//         done(error);
//       } else {
//         agent.saveCookies(res);
//
//         agent.get('/user/profile')
//         .expect(200, done);
//       }
//     });
//   });
// });
