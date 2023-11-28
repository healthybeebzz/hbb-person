# hbb-person
 
 1. write the API contract
 2. based on the API routes and what they do, figure what the database structure should look like
 
#### Operations
- create person
- get person
- edit person
- delete person

# hbb-person API contract:

POST /person/
- payload:
    - userId
    - FirstName
    - LastName
    - Age
    - Phone
    - Address
    
-> the request handler will validate that these properties exist on the payload
-> the request handler will insert an entry into the transactions table from the DB

GET /person/:userId
- no payload as it is a GET request
-> the request handler will select the requested user from the db

PUT /person/:userId/edit
- payload:
    - userId
    - FirstName
    - LastName
    - Age
    - Phone
    - Address
-> the request handler will select the requested user from db and will update the information with the new payload


DELETE /person/:userId/delete

-> the request handler will delete the selected user






