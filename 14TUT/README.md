JWT - JSON WEB TOKENS, format user identification that is initiated after intial user authentifiction takes place
Whe user completes authentication process, our REST API will issue client authentication access token and a refresh token
Access Token = Short time (5 - 15 minutes)
Refresh Token = Long Time (several hrs, day or days)

We do it to avoid:

- XSS: Cross-Site Scription
- CSFR: CS Request Forgery

Access Tokens:

- sent as JSON
- Client stores in memory
- DO NOT store in local storage or cookie

Essentially that if you can store it with js than a hacker can retrieve it with js, better keep them in memory as current app state

Refresh Token:

- Sent as httpOnly cookie - not accessible with js
- Not accessible via JS
- Must have expiry at some point and do not issue new refresh token on their one as it may grant unlimetted access ib wrong hands

Access Token:

1. Issued at Authorization
2. Client uses for API Access until expires
3. Verified with Middleware
4. New token issued at Refresh request

Refresh Token

1. Issued at Authorization
2. Client uses to request new acccess T
3. Verified with endpoint and database (store expiration date to track and allow to logout)
4. Must be allowed to expire or logout

$ node
Welcome to Node.js v20.18.1.
Type ".help" for more information.

> require('crypto').randomBytes(64).toString('hex')

Authentication and Authorization is not the the same

Authentication - the process of verifying who someone is
when we logging with login and password its authentication
after we logged in our app issues JSON Web TOkens which:

- confirm authentication
  Authorization - the process of verifying what resources a user has access to
- allow access to API endpoints (authorization)
- endpoints provide data resources(authorization)
- use Authorization header (authorization)

Another step of authorization process is User Roles & Permissions

- provide different levels of access
- sent in access token payload
- verified with middleware

MERN vs MEAN vs PERN

MERN stands for MongoDB, Express.js, React, and Node.js.
It’s a JavaScript-based full-stack setup commonly used for SPAs and fast MVP development.

MEAN uses Angular instead of React.
Angular is a full framework with strong conventions, dependency injection, and built-in tooling, which makes MEAN more suitable for enterprise environments, but with a higher learning curve.

PERN replaces MongoDB with PostgreSQL, a relational SQL database.
It’s preferred for applications that require strong data consistency, complex relationships, and ACID transactions, such as financial or business-critical systems.

Key Differences:

MERN → fast to build, flexible, great for startups and SPAs
MEAN → structured, opinionated, enterprise-oriented
PERN → robust, transactional, best for complex business domains

When MERN Is a Bad Choice?

MERN is not ideal when:

- the application requires complex transactions
- data has many strict relationships
- strong schema enforcement is needed
- the system is finance-critical or long-term enterprise-scale

In such cases, a SQL-based stack like PERN is usually a better choice.

MongoDB - noSQL DB, stores the data in collections and documents, documents are individual records they have key-value structure and look like JSON. Collection holds all the data for example of user instead of breaking it into related tables, duplicating data is permitted

Advantages of usinng nosql db and MongoDB:

- Performance is key, the spead of queried collection is fast
- Flexibility (its very easy to make structural changes making a new field without, its similar with adding a new property to an object )
- scalability(nosql can support large dbs with high req rates at a very low latency )
- usability (we can get up and running with mongodb very fast)

mongoose is library for work with Mongo
