# Abreidskrav Bil-Register

Bil-Register

### start

Start vite dev server.

`npm run start`

# or

`yarn start`

### build

Build production for deployment.

`npm run build`

# or

`yarn build`

## API Documentation

| Name             | Request type | Endpoint                          | Body                              |
| ---------------- | ------------ | --------------------------------- | --------------------------------- |
|                  |              | PERSON                            |                                   |
| Get a person     | GET          | http://194.32.107.29/GaAPI/{id}   |                                   |
| Add a new Person | POST         | http://194.32.107.29/GaAPI/person |{ <br /> "firstName": "string", <br /> "lastName": "string, <br /> "age": "integer", <br /> "carsOwned": "string" or null <br /> }|
| Edit a person    | PUT          | http://194.32.107.29/GaAPI        |{ <br /> "firstName": "string", <br /> "lastName": "string, <br /> "age": "integer", <br /> "carsOwned": "string" or null <br /> }|
| Delete a person  | DELETE       | http://194.32.107.29/GaAPI        |                                   |
|                  |              | CAR                               |                                   |
| Get a car        | GET          | http://194.32.107.29/GaAPI        |{ <br /> "make": "string", <br /> "model": "string", <br /> "year": "integer" <br /> }|
| Add a car        | POST         | http://194.32.107.29/GaAPI        |{ <br /> "make": "string", <br /> "model": "string", <br /> "year": "integer" <br /> }|
| Edit a car       | PUT          | http://194.32.107.29/GaAPI        |                                   |
| Delete a car     | DELETE       | http://194.32.107.29/GaAPI        |                                   |