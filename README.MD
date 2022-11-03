# [Abreidskrav Bil-Register](https://gokstadakademiet.itslearning.com/ContentArea/ContentArea.aspx?LocationID=37&LocationType=1&ElementID=11696)

Bil-Register is an app where you can view a list of registered persons, and what cars they own.
With administrator permissions you can create, read, update and delete from the database using forms.

### Start server

Start vite dev server.
`npm start`

### Build

Build production for deployment.
`npm run build`

## Group members

[Mustafa Baker](https://github.com/mobak88)\
[Morten Løkkemoen](https://github.com/mortenlokkemoen)\
[André Lindgård](https://github.com/Lindgard)\
[Herman Novak](https://github.com/hernok)

## API Documentation

| Name             | Request type | Endpoint                                                                         | Body                                                                                                                               |
| ---------------- | ------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
|                  |              | PERSON                                                                           |                                                                                                                                    |
| Get a person     | GET          | [http://194.32.107.29/GaAPI/person/{id}](http://194.32.107.29/GaAPI/person/{id}) |                                                                                                                                    |
| Add a new Person | POST         | [http://194.32.107.29/GaAPI/person](http://194.32.107.29/GaAPI/person)           | { <br /> "firstName": "string", <br /> "lastName": "string, <br /> "age": "integer", <br /> "carsOwned": "string" or null <br /> } |
| Edit a person    | PUT          | [http://194.32.107.29/GaAPI/person/{id}](http://194.32.107.29/GaAPI/person/{id}) | { <br /> "firstName": "string", <br /> "lastName": "string, <br /> "age": "integer", <br /> "carsOwned": "string" or null <br /> } |
| Delete a person  | DELETE       | [http://194.32.107.29/GaAPI/person/{id}](http://194.32.107.29/GaAPI/person/{id}) |                                                                                                                                    |
|                  |              | CAR                                                                              |                                                                                                                                    |
| Get a car        | GET          | [http://194.32.107.29/GaAPI/car/{id}](http://194.32.107.29/GaAPI/car/{id})       | { <br /> "make": "string", <br /> "model": "string", <br /> "year": "integer" <br /> }                                             |
| Add a car        | POST         | [http://194.32.107.29/GaAPI/car](http://194.32.107.29/GaAPI/car)                 | { <br /> "make": "string", <br /> "model": "string", <br /> "year": "integer" <br /> }                                             |
| Edit a car       | PUT          | [http://194.32.107.29/GaAPI/car/{id}](http://194.32.107.29/GaAPI/car/{id})       |                                                                                                                                    |
| Delete a car     | DELETE       | [http://194.32.107.29/GaAPI/car/{id}](http://194.32.107.29/GaAPI/car/{id})       |                                                                                                                                    |
