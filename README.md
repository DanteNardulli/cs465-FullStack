# cs465-FullStack
cs-465 Full Stack Development with MEAN
Overview

Travlr Getaways is a full stack web application built using the MEAN stack (MongoDB, Express, Angular, and Node.js). The project includes a customer-facing website and a secure administrative single-page application used to manage trip data.

Architecture

The customer-facing site uses Express with Handlebars templates to render dynamic HTML on the server. The administrative interface is built as an Angular SPA, providing a richer, more interactive experience for managing data. MongoDB was selected as the backend database because its NoSQL, document-based structure works naturally with JavaScript and JSON data and allows flexible schema design as the application evolves.

Functionality

JSON is used as the data interchange format between the frontend, backend, and database. While JavaScript controls application logic, JSON enables consistent data transfer across all layers. Code was refactored throughout development to improve efficiency and maintainability, including separating API logic from the server and creating reusable Angular UI components such as trip cards and forms.

Testing

RESTful API endpoints were tested using Postman to verify correct GET, POST, PUT, and DELETE operations. Once authentication was added, testing required valid login credentials and tokens to access protected endpoints, increasing complexity but ensuring secure access to administrative features.

Reflection

This project strengthened my full stack development skills by requiring end-to-end implementation of frontend frameworks, backend APIs, database integration, and security. I developed practical experience with MVC architecture, SPA development, RESTful services, and authentication, making me more prepared for real-world software development roles.
