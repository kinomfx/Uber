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

### Register Captain
**Endpoint**: `GET /captain/register`

Registers a new captain (driver) and returns an authentication token.

#### Request Parameters (Query Parameters)
Since the route is set up as `GET /captain/register` with validation middleware expecting data in the body, it should be a `POST` request. However, documenting it as it is currently defined:



**Query Parameters:**
*   `email`: string (required, valid email format)
*   `fullName.firstName`: string (required, minimum 3 characters)
*   `fullName.lastName`: string (optional)
*   `password`: string (required, minimum 6 characters)
*   `vehicle.color`: string (required, minimum 3 characters)
*   `vehicle.plate`: string (required, minimum 3 characters)
*   `vehicle.capacity`: number (required, integer between 1 and 10)
*   `vehicle.vehicleType`: string (required, must be one of: `bike`, `car`, `auto`)

#### Validation Rules

*   `email`: Must be a valid email address format.
*   `fullName.firstName`: Minimum 3 characters required.
*   `password`: Minimum 6 characters required.
*   `vehicle.color`: Minimum 3 characters required.
*   `vehicle.plate`: Minimum 3 characters required.
*   `vehicle.capacity`: Must be an integer between 1 and 10.
*   `vehicle.vehicleType`: Must be one of `bike`, `car`, or `auto`.

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

#### Error (400 Bad Request)
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}

#### or
{
    "message": "Captain already exists"
}

#### Example cURL Request
curl "http://localhost:5000/captain/register?email=test@example.com&fullName.firstName=John&fullName.lastName=Doe&password=secure123&vehicle.color=red&vehicle.plate=XYZ-789&vehicle.capacity=4&vehicle.vehicleType=car"