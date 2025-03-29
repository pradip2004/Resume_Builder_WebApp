# ResumeGPT

A modern, AI-powered resume builder application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Create professional resumes with ease using AI assistance and a beautiful, intuitive interface.

🌐 **Live Demo**: [resumegpt.netlify.app](https://resumegpt.netlify.app)

## Description

AI Resume Builder is a full-stack application that helps users create professional resumes with the assistance of AI. The application features a modern UI, real-time preview, and AI-powered content suggestions. Users can customize their resumes with different themes, sections, and layouts.

## Key Features

- 🤖 AI-powered content suggestions for resume sections
- 🎨 Multiple theme options with customizable colors
- 📱 Responsive design for all devices
- 🔄 Real-time preview of resume changes
- 📝 Multiple resume sections:
  - Personal Details
  - Professional Summary
  - Work Experience
  - Education
  - Skills
  - Achievements
  - Certificates
- 🔒 User authentication and authorization
- 💾 Auto-save functionality
- 📤 Export resume to PDF
- 🌙 Dark mode support

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI Integration**: Gemini API

## File Structure

```
AI_Resume_Builder/
├── Frontend/                      # Frontend React application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── context/           # React context providers
│   │   ├── service/           # API service functions
│   │   ├── utils/             # Utility functions
│   │   └── App.jsx            # Main application component
│   └── package.json
│
├── Backend/             # Backend Node.js application
│   ├── controllers/           # Route controllers
│   ├── db/                    # Database models and connection
│   ├── middleware/            # Custom middleware
│   ├── routes/                # API routes
│   └── server.js              # Main server file
│
└── README.md
```

## Environment Configuration

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_AI_API_KEY==your_googleai_api_key
VITE_CLERK_PUBLISHABLE_KEY=
```

### Backend (.env)
```
PORT=3000
MONGO_URL=your_mongodb_connection_string

```

## API Routes

### User Routes

#### Create User
- **Endpoint**: `POST /api/user`
- **Description**: Creates a new user or returns existing user if email already exists
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Response** (New User):
  ```json
  {
    "message": "User created successfully",
    "user": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "resumes": []
    }
  }
  ```
- **Response** (Existing User):
  ```json
  {
    "message": "User already exists",
    "user": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "resumes": []
    }
  }
  ```

#### Get User
- **Endpoint**: `GET /api/user`
- **Description**: Retrieves user information by email
- **Query Parameters**:
  - `email`: User's email address
- **Response** (User Found):
  ```json
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "resumes": []
  }
  ```
- **Response** (User Not Found):
  ```json
  null
  ```

### Resume Routes

#### Create New Resume
- **Endpoint**: `POST /api/resume`
- **Description**: Creates a new resume with default template data
- **Request Body**:
  ```json
  {
    "email": "string",
    "title": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Resume created successfully",
    "resumeId": "string"
  }
  ```

#### Get All Resumes
- **Endpoint**: `GET /api/resume`
- **Description**: Retrieves all resumes for a specific user
- **Query Parameters**:
  - `email`: User's email address
- **Response**:
  ```json
  {
    "message": "Resumes fetched successfully",
    "resumes": [
      {
        "_id": "string",
        "title": "string",
        "firstName": "string",
        "lastName": "string",
        "jobTitle": "string",
        "address": "string",
        "phone": "string",
        "email": "string",
        "themeColor": "string",
        "summery": "string",
        "experience": [...],
        "education": [...],
        "skills": [...],
        "achievements": [...],
        "certificates": [...]
      }
    ]
  }
  ```

#### Get Single Resume
- **Endpoint**: `GET /api/resume/:resumeId`
- **Description**: Retrieves a specific resume by ID
- **URL Parameters**:
  - `resumeId`: ID of the resume to fetch
- **Response**:
  ```json
  {
    "message": "Resume fetched successfully",
    "data": {
      "_id": "string",
      "title": "string",
      "firstName": "string",
      "lastName": "string",
      "jobTitle": "string",
      "address": "string",
      "phone": "string",
      "email": "string",
      "themeColor": "string",
      "summery": "string",
      "experience": [...],
      "education": [...],
      "skills": [...],
      "achievements": [...],
      "certificates": [...]
    }
  }
  ```

#### Update Resume
- **Endpoint**: `PUT /api/resume/:resumeId`
- **Description**: Updates an existing resume
- **URL Parameters**:
  - `resumeId`: ID of the resume to update
- **Request Body**:
  ```json
  {
    "data": {
      "firstName": "string",
      "lastName": "string",
      "jobTitle": "string",
      "address": "string",
      "phone": "string",
      "email": "string",
      "themeColor": "string",
      "summery": "string",
      "experience": [
        {
          "id": "number",
          "title": "string",
          "companyName": "string",
          "city": "string",
          "state": "string",
          "startDate": "string",
          "endDate": "string",
          "currentlyWorking": "boolean",
          "workSummery": "string"
        }
      ],
      "education": [
        {
          "id": "number",
          "universityName": "string",
          "startDate": "string",
          "endDate": "string",
          "degree": "string",
          "major": "string",
          "description": "string"
        }
      ],
      "skills": [
        {
          "category": "string",
          "items": ["string"]
        }
      ],
      "achievements": [
        {
          "id": "number",
          "title": "string",
          "description": "string",
          "date": "string"
        }
      ],
      "certificates": [
        {
          "id": "number",
          "title": "string",
          "issuer": "string",
          "date": "string",
          "link": "string"
        }
      ]
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "Resume updated successfully",
    "updatedResume": {
      // Updated resume object
    }
  }
  ```

#### Delete Resume
- **Endpoint**: `DELETE /api/resume/:resumeId`
- **Description**: Deletes a specific resume
- **URL Parameters**:
  - `resumeId`: ID of the resume to delete
- **Response**:
  ```json
  {
    "message": "Resume deleted successfully"
  }
  ```

### Error Responses
All endpoints may return the following error responses:
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd MERN-2
   npm install

   # Backend
   cd ../MERN-2-backend
   npm install
   ```
3. Set up environment variables
4. Start the development servers:
   ```bash
   # Frontend
   npm run dev

   # Backend
   npm run dev
   ```

## Contributing

We welcome contributions to AI Resume Builder! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Guidelines for Contributing

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- Shadcn UI for the beautiful component library