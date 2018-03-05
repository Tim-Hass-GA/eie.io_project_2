# EIEIO (eie.io) - Old MacDonald's First Garden App

Believe it or not Old MacDonald started off with a small backyard garden, this was long before he became
obsessed with animals and farming.  This app was the first app he used "back in the day" to help
him track, document, manage information about the plants in his garden; as well as query APIs to
obtain data, tips and other guidance related to the crops in his garden.

## User Stories:
* As a user, I’d like to document, track and manage garden(s) that I plant crops in.
* As a user, I’d like to create, edit or delete my account profile.
* As a user, I’d like to add or delete a garden from my list of gardens.
* As a user, I’d like to add or delete a section of my garden.
* As a user, I’d like to add to or delete crops from a section within my garden.
* As a user, I’d like to add or delete notes concerning crops within a section within my garden.
* As a user, I’d like to query information about the crops within a section of my garden.

https://eieio-garden-app.herokuapp.com/

## Technologies Used
* HTML, CSS, jQuery, Javascript, Bootstrap,
* Node, Express, EJS Layouts, Bcrypt, Passport,
* PG/PG-HStore, Sequelize, Connect Flash, Morgan and Custom Middleware

## API Usage
This app uses data from the Growstuff API - http://growstuff.org/

## Documentation

### Wire Frames
![Image of Wireframes](./readme_images/inital-wireframes-project-2.png)

### Data Models
![Image of Data Models](./readme_images/data-model-project-2.png)

### Routes
Verb | Path | Action | Used for
------------ | ------------- | ------------ | -------------
GET | / | index | - home page
GET | / | new | Content from cell 2
POST | / | create | Content from cell 2
PUT | / | update | Content from cell 2
DELETE | / | delete | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content from cell 1 | Content from cell 2 | Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

GET / - home page that lists all posts
GET /authors - authors page that lists all authors
POST /authors - creates a new author, then redirects back to GET /authors
GET /authors/new - page that has a form for creating a new author
GET /authors/:id - page that shows a specific author and their posts
POST /posts - creates a new post, then redirects back to GET /
GET /posts/new - page that has a form for creating a new post
GET /posts/:id - page that shows a specific post and the author

### Models
Models
user
Attributes: firstName, lastName, bio
Associations: Has many posts
garden
Attributes: title, content, authorId
Associations: Belongs to one author
section
Attributes: title, content, authorId
Associations: Belongs to one author
notes
Attributes: title, content, authorId
Associations: Belongs to one author

#### Development Process
DAY 1-3: Review code completed in class, create edit (PUT) and delete routes in, post boiler-plate to GitHub. Retrieve copy of boiler-plate and create wireframe concepts.  Discover ideas, sketch out requirements, tweak wireframe layout, draft data models and user stories.

DAY 4: Updated data model began building Sequelize models and making associations, created user and garden routes and supporting forms, reviewed USDA and other API data to determine feasibility of use (had to wait on keys). Found bug in Sequelize model associations with naming convention for join tables.

DAY 5: Reworked Sequelize models and associations, reviewed API documentation, incorporated initial api calls to obtain data.  Continue garden build routes and forms, made a few test routes to test database operations from form data.

DAY 6: Building section and crop routes and updating forms.  Found a few items in my initial models that were not necessary, rebuilt models.

DAY 7: Found a bug on form data picker, where the date variable was not loading correctly.

DAY 8: Rebuild models due to cascading associations not working correctly. Also corrected data type date variable bug within model.

DAY 9: Put in notes section (notes need update/delete routes).  Final testing and styling.

### Next Steps
- [x] this is a complete item
- [ ] this is an incomplete item
