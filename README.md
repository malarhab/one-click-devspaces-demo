To-Do App


#Run in DevSpaces!


## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript 

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



## Troubleshooting

### Common Issues
 **Dependencies Not Installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Database Issues

1. **Tables Not Created**
   - Run the database initialization: `npm run init-db`
   - Check database permissions