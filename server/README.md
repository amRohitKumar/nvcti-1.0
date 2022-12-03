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
- auth
    * `/register`

        Register a new user (POST request using the data from the form, should contain all the required fields in the user schema).

    * `/verify-email/:emailToken`

        Verify the email provided by the user using nodemailer and then add the user to database. 

    *  `/login`

        Login an existing user.

- event

    * `/createevent`

        Create an event along with the form asscoiated with it.

    * `/allevents`

        API to get all events in the database in raw json format.

    * `/form/:eventId/:formId`

        API to get the form "formId" associated with the event "eventId" and the responses to that form.

    * `/statusupdate/:eventId/:formId`

        An API to accept reject the response using the "formId" of the response.

    * `/:id`
        Returns the event of specified "id".

    * `/:id/applications`
        API to get all the applicants of the specified event id in the request params.

    * `/:eventId/submitForm`
        Submit the form (client side) (POST request, requires all the required fields in the data)


# Environment variables
- JWT_SECRET
- EMAIL_VERIFY_TOKEN_SECRET
- CLIENT_ADDRESS2
- JWT_LIFETIME
