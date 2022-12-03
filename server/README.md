# Models
#### There are two models
- User
    - New user created is stored in "user" collection of "nvcti" database.
    - The field "enrolledEvents" is where the ObjectID of forms submitted by the user is stored as an array, other fields are self explainatory.
- Event
    - The questions in the form of a particular event is stored in "questions" field of the model.

# Controllers
* authController
    To control process required for authentication.

# Routes
* `/register`
    Register a new user (Post request using the data from the form, should contain all the required fields in the user schema).
* `/verify-email/:emailToken`
    Verify the email provided by the user using nodemailer and then add the user to database. 
*  `/login`
    Login an existing user

# Environment variables
- JWT_SECRET
- EMAIL_VERIFY_TOKEN_SECRET
- CLIENT_ADDRESS2
- JWT_LIFETIME
