# Coding Challenge Documentation

This coding challenge involves optimizing the authentication process using Redis and creating a refresh token API in a Node.js, Express, and MongoDB stack.

## Task 1: Optimized Authentication Middleware

### Objective

Enhance the current authentication middleware by incorporating Redis caching to reduce the number of database calls required for token verification.

### Current Implementation

- The existing authentication middleware uses JWT for authentication.
- It searches for the token in the `usersession` collection within MongoDB.
- If the token exists in the database, it verifies the token.

### Requirements

1. **Integrate Redis**:
   - Set up Redis and integrate it with your Node.js application to be used as a cache.
   
2. **Modify Authentication Middleware**:
   - **Check Redis Cache**: Modify the middleware to first check if the JWT token exists in Redis.
   - **Fallback to MongoDB**: If the token is not found in Redis, check the `usersession` collection in MongoDB.
   - **Cache Tokens in Redis**: If the token is found in MongoDB, cache it in Redis for future requests.

### Steps to Implement

1. **Install and Configure Redis**: Set up Redis on your server and configure it within your Node.js application.
2. **Modify Middleware Logic**:
   - Before querying MongoDB, check Redis for the token.
   - If the token is found in Redis, use it to authenticate the user.
   - If the token is not found in Redis, query MongoDB.
   - Cache the token in Redis if it's retrieved from MongoDB for future efficiency.

### Expected Outcome

- **Reduced Database Load**: By using Redis as a cache, reduce the number of direct calls to MongoDB.
- **Improved Performance**: Faster authentication process due to in-memory cache lookup.

## Task 2: Refresh Token API

### Objective

Implement a refresh token API endpoint that updates the authentication token before it expires. The new token should be updated in both MongoDB and Redis.

### Requirements

1. **Create an API Endpoint**:
   - Implement a new endpoint (`POST /refresh_token`) for handling token refresh requests.
   
2. **Validate Existing Token**:
   - Validate the current token provided by the user to ensure it is still valid and authorized.

3. **Generate New Token**:
   - Upon successful validation, generate a new JWT token for the user.

4. **Update Tokens in MongoDB and Redis**:
   - Update the `usersession` collection in MongoDB with the new token.
   - Update the Redis cache with the new token to ensure consistency.

### Steps to Implement

1. **API Endpoint**:
   - Create a new API endpoint for token refresh functionality.
   
2. **Token Validation**:
   - Validate the existing token to ensure it has not expired and is authorized.

3. **Token Generation**:
   - Generate a new JWT token upon successful validation.

4. **Database and Cache Update**:
   - Update the new token in the `usersession` collection in MongoDB.
   - Also, update the token in Redis to keep the cache synchronized.

### Expected Outcome

- **Continuous User Authentication**: Users can seamlessly continue their sessions without interruptions due to token expiration.
- **Optimized Performance**: Reduced load on the database by maintaining an updated cache in Redis.

## Conclusion

This coding challenge focuses on enhancing the authentication process and improving performance using Redis caching while maintaining data integrity with MongoDB. By completing these tasks, you will optimize the authentication middleware and ensure a smooth token refresh mechanism for your Node.js, Express, and MongoDB application.