# To-Do App

A modern, full-stack to-do application built with Node.js, Express, and PostgreSQL, designed to run on OpenShift Dev Spaces.

## Features

- ✅ Create, read, update, and delete tasks
- 🎯 Mark tasks as complete/incomplete
- 📱 Responsive design for mobile and desktop
- 🚀 RESTful API with proper error handling
- 🐘 PostgreSQL database for data persistence
- 🔄 Real-time updates without page refresh
- 🎨 Modern, clean UI with smooth animations

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Development Environment**: OpenShift Dev Spaces

## Project Structure

```
todo-app/
├── devfile.yaml          # OpenShift Dev Spaces configuration
├── package.json          # Node.js dependencies and scripts
├── server.js            # Express server and API endpoints
├── init-db.js           # Database initialization script
├── public/
│   └── index.html       # Frontend application
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## API Endpoints

### Get All Todos
- **GET** `/api/todos`
- Returns all tasks ordered by creation date

### Create Todo
- **POST** `/api/todos`
- Body: `{ "text": "Task description" }`
- Creates a new task

### Update Todo
- **PUT** `/api/todos/:id`
- Body: `{ "text": "Updated text", "completed": true/false }`
- Updates an existing task

### Delete Todo
- **DELETE** `/api/todos/:id`
- Deletes a specific task

### Health Check
- **GET** `/api/health`
- Returns server and database status

## Getting Started

### Prerequisites

- OpenShift Dev Spaces environment
- Node.js 18 or higher
- PostgreSQL 13 or higher

### Installation

1. **Clone the repository** (if using version control)
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   npm run init-db
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

### OpenShift Dev Spaces Setup

The project includes a `devfile.yaml` that automatically sets up:
- Node.js 18 runtime environment
- PostgreSQL 13 database
- Required environment variables
- Port forwarding for the web application

When you open this project in OpenShift Dev Spaces, the environment will be automatically configured and dependencies will be installed.

## Environment Variables

The application uses the following environment variables (defaults provided):

- `DATABASE_URL`: PostgreSQL connection string
- `POSTGRES_HOST`: Database host (default: `postgres`)
- `POSTGRES_DB`: Database name (default: `todoapp`)
- `POSTGRES_USER`: Database user (default: `postgres`)
- `POSTGRES_PASSWORD`: Database password (default: `password`)
- `POSTGRES_PORT`: Database port (default: `5432`)
- `PORT`: Server port (default: `3000`)
- `NODE_ENV`: Environment mode (default: `development`)

## Database Schema

The application uses a single `todos` table with the following structure:

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run init-db` - Initialize the database and create tables

### Development Commands (OpenShift Dev Spaces)

The devfile includes these commands:
- `install-deps` - Install npm dependencies
- `start-dev` - Start the development server
- `init-db` - Initialize the database

## Features in Detail

### Frontend Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Changes are reflected immediately without page refresh
- **Error Handling**: User-friendly error messages and loading states
- **Keyboard Support**: Press Enter to add new tasks
- **Visual Feedback**: Smooth animations and hover effects

### Backend Features
- **RESTful API**: Clean, predictable API endpoints
- **Input Validation**: Validates all incoming data
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Database Connection Pooling**: Efficient database connection management
- **Graceful Shutdown**: Proper cleanup when the server is stopped

### Security Features
- **Input Sanitization**: Prevents XSS attacks by escaping HTML
- **SQL Injection Prevention**: Uses parameterized queries
- **CORS Protection**: Configurable CORS settings

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in environment variables
   - Verify network connectivity to database

2. **Port Already in Use**
   - Check if another application is using port 3000
   - Change the PORT environment variable if needed

3. **Dependencies Not Installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Database Issues

1. **Tables Not Created**
   - Run the database initialization: `npm run init-db`
   - Check database permissions

2. **Sample Data Not Inserted**
   - The init script only adds sample data if it doesn't exist
   - Check database logs for any errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the application logs
3. Verify your environment setup
4. Check the OpenShift Dev Spaces documentation

## Deployment

### OpenShift Dev Spaces
The application is designed to run in OpenShift Dev Spaces out of the box. The devfile.yaml handles all the configuration automatically.

### Local Development
For local development without OpenShift Dev Spaces:
1. Install PostgreSQL locally
2. Update environment variables to point to your local database
3. Run the application using npm scripts

### Production Deployment
For production deployment:
1. Set up a PostgreSQL database
2. Configure environment variables for production
3. Use `npm start` to run the production server
4. Set up reverse proxy (nginx, Apache) if needed
5. Configure SSL/TLS certificates

## Architecture

The application follows a simple three-tier architecture:
1. **Presentation Layer**: HTML/CSS/JavaScript frontend
2. **Application Layer**: Node.js/Express API server
3. **Data Layer**: PostgreSQL database

This architecture provides:
- Clear separation of concerns
- Scalability for future enhancements
- Easy maintenance and testing
- Flexibility for different deployment scenarios 