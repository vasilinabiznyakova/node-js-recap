JWT - JSON WEB TOKENS, format user identification that is initiated after intial user authentifiction takes place
Whe user completes authentication process, our REST API will issue client authentication access token and a refresh token
Access Token = Short time (5 - 15 minutes)
Refresh Token = Long Time (several hrs, day or days)

We do it to avoid:
-  XSS: Cross-Site Scription
- CSFR: CS Request Forgery

Access Tokens:
- sent as JSON
- Client stores in memory
- DO NOT store in local storage or cookie

Essentially that if you can store it with js than a hacker can retrieve it with js,  better keep them in memory as current app state


Refresh Token:
- Sent as httpOnly cookie - not accessible with js 
- Not accessible via JS
- Must have expiry at some point and do not issue new refresh token on their one as it may grant unlimetted access ib wrong hands

Access Token:
1) Issued at Authorization 
2) Client uses for API Access until expires
3) Verified with Middleware 
4) New token issued at Refresh request

Refresh Token
1) Issued at Authorization
2) Client uses to request new acccess T
3) Verified with endpoint and database (store expiration date to track and allow to logout)
4) Must be allowed to expire or logout


$ node 
Welcome to Node.js v20.18.1.
Type ".help" for more information.
> require('crypto').randomBytes(64).toString('hex')