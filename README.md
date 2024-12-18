# TinyApp Project

TinyApp is a full stack web application built with Node.jsand Express that allows users to shorten long URLs (à la bit.ly). The app provides functionality for user authentication, URL creation, and management, making it a practical tool for those who frequently share links.

## Features
User Registration: Users can create an account to start managing their URLs.

Login/Logout: Secure login and logout functionality with cookie-session for session management.

URL Shortening: Generate short URLs for easier sharing.

URL Management: Edit and delete existing URLs.

Access Control: Users can only see and manage their own URLs.

## Dependencies
Node.js
Express
EJS
bcryptjs
cookie-session

## Dev Dependencies
Mocha (for testing)
Chai (for assertions in testing)

## Getting Started
Clone the repository to your local machine.
`git clone <repository-url>`

Navigate to the project directory.
`cd tinyapp`

Install all dependencies using npm.
`npm install`

Run the development web server.
`npm start`

Open your web browser and visit http://localhost:8080 to access TinyApp.

## Running Tests
Run the test suite using Mocha.
`npm test`


## Acknowledgements
This project was created as part of the Lighthouse Labs Web Development Bootcamp.

Special thanks to the instructors and peers for their support and guidance.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
