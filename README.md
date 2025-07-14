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

### Example cURL Request
```bash
curl -X POST http://localhost:5000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}'
```

### Implementation Details
- Passwords are hashe ng bcrypt before storage
- Authentication uses JWT tokens
- Email addresses must be unique in the system
- Response includes both user data