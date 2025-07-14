# User API Documentation

## Register User
**Endpoint**: `POST /users/register`

Creates a new user account and returns an authentication token.

### Request Body
```json
{
  "fullName": {
    "firstName": "string", // minimum 3 characters
    "lastName": "string"
  },
  "email": "string",
  "password": "string" // minimum 6 characters
}
```

### Validation Rules
- `fullName.firstName`: Minimum 3 characters required
- `email`: Must be a valid email address format
- `password`: Minimum 6 characters required

### Responses

#### Success (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token string
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "_id": "60c72b2f9b1d8e001c8e4b8a",
    "createdAt": "2025-07-14T12:34:56.789Z",
    "updatedAt": "2025-07-14T12:34:56.789Z"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## Login User
**Endpoint**: `POST /users/login`

Authenticates a user and returns an authentication token.

### Request Body
```json
{
  "email": "string", // must be a valid email
  "password": "string" // minimum 6 characters
}
```

### Validation Rules
- `email`: Must be a valid email address format
- `password`: Minimum 6 characters required

### Responses

#### Success (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token string
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "_id": "60c72b2f9b1d8e001c8e4b8a",
    "createdAt": "2025-07-14T12:34:56.789Z",
    "updatedAt": "2025-07-14T12:34:56.789Z"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

### Example cURL Request
```bash
curl -X POST http://localhost:5000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

### Implementation Details
- Passwords are hashed using bcrypt before comparison
- Authentication uses JWT tokens
- Response includes both user data