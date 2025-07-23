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


## Captain API Documentation

## Captain API Documentation

### Register Captain
**Endpoint**: `POST /captains/register`

Registers a new captain (driver) and returns an authentication token.

#### Request Body
```json
{
  "fullName": {
    "firstName": "string", // required, min 3 characters
    "lastName": "string"   // optional
  },
  "email": "string",        // required, valid email
  "password": "string",     // required, min 6 characters
  "vehicle": {
    "color": "string",      // required, min 3 characters
    "plate": "string",      // required, min 3 characters
    "capacity": 4,          // required, integer 1-10
    "vehicleType": "car"    // required, one of: bike, car, auto
  }
}
```

#### Validation Rules
- `email`: Must be a valid email address format.
- `fullName.firstName`: Minimum 3 characters required.
- `password`: Minimum 6 characters required.
- `vehicle.color`: Minimum 3 characters required.
- `vehicle.plate`: Minimum 3 characters required.
- `vehicle.capacity`: Must be an integer between 1 and 10.
- `vehicle.vehicleType`: Must be one of `bike`, `car`, or `auto`.

#### Responses

##### Success (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "64c1e9a8f9b4a2c9a8b1c2d3",
    "createdAt": "2025-07-27T12:00:00.000Z",
    "updatedAt": "2025-07-27T12:00:00.000Z"
  }
}
```

##### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
```json
{
  "message": "Captain already exists"
}
```

---

### Login Captain
**Endpoint**: `POST /captains/login`

Authenticates a captain and returns an authentication token.

#### Request Body
```json
{
  "email": "string",    // required, valid email
  "password": "string"  // required, min 6 characters
}
```

#### Validation Rules
- `email`: Must be a valid email address format.
- `password`: Minimum 6 characters required.

#### Responses

##### Success (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "64c1e9a8f9b4a2c9a8b1c2d3",
    "createdAt": "2025-07-27T12:00:00.000Z",
    "updatedAt": "2025-07-27T12:00:00.000Z"
  }
}
```

##### Error (400 Bad Request)
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

##### Error (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

---

### Get Captain Profile
**Endpoint**: `GET /captains/profile`

Retrieves the profile information of the authenticated captain.

#### Authentication
- Requires a valid JWT token in the `Authorization` header (e.g., `Bearer <token>`) or as a cookie.

#### Responses

##### Success (200 OK)
```json
{
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "64c1e9a8f9b4a2c9a8b1c2d3",
    "createdAt": "2025-07-27T12:00:00.000Z",
    "updatedAt": "2025-07-27T12:00:00.000Z"
  }
}
```

##### Error (404 Not Found)
```json
{
  "message": "Captain not found"
}
```

---

### Logout Captain
**Endpoint**: `GET /captains/logout`

Logs out the current captain by blacklisting the token and clearing the cookie.

#### Authentication
- Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Responses

##### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

##### Error (401 Unauthorized)
```json