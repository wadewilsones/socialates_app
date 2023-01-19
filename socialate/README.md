# Socialates

This is a social-media web application. The stack consists: of Node, Express, Next.js, MongoDb

1. To install the app locally, run in your terminal:

```js

gh repo clone wadewilsones/socialates_app

```
2. Go to the project folder using ``cd`` command
3. Install dependencies:

``` npm i ```

4. Create .env file in the root of the project and add following data:
```
MONGODB_URI = mongodb+srv://<Username>:<password>@socialates.qbakbli.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET_KEY = Your secret Key goes here
````

Since the app was developed with MongoDB, you need to create MongoDb Atlas account or other.

5. To run the app in dev mode:

``` npm run dev ```
