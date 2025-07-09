# Secret Phrase Access App

A secure Node.js application with PostgreSQL backend that allows users to input a password and access a secret phrase. Features modern UI design with real-time server health monitoring.

## Features

- 🔐 **Secure Authentication**: Password-based access with bcrypt hashing
- 🗄️ **PostgreSQL Backend**: Reliable database storage for passwords and secrets
- 🎨 **Modern UI**: Beautiful, responsive interface with gradient background
- 🔄 **Real-time Health Monitoring**: Server status indicator
- ⚡ **Loading States**: Smooth user experience with loading animations
- 🛡️ **Security**: Password hashing and SQL injection protection

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone or download this repository** to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**:
   - Create a new database named `secret_app`
   - Update database credentials in the code if needed

4. **Configure environment variables** (optional):
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=secret_app
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   PORT=3000
   ```

5. **Initialize the database**:
   ```bash
   npm run init-db
   ```

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

3. **Enter the password**:
   - Default password: `mysecretpassword123`
   - The secret phrase will be revealed upon successful authentication

## Default Configuration

- **Default Password**: `mysecretpassword123`
- **Default Secret**: `The secret phrase is: "Welcome to the hidden world of secrets! 🔐"`
- **Server Port**: `3000`

## API Endpoints

### Authentication
- **POST** `/authenticate`
  - Body: `{ "password": "your_password" }`
  - Success: `{ "success": true, "secret": "secret_phrase" }`
  - Error: `{ "success": false, "message": "error_message" }`

### Health Check
- **GET** `/health`
  - Response: `{ "status": "healthy", "database": "connected" }`

## Database Schema

The application uses a simple PostgreSQL table:

```sql
CREATE TABLE secrets (
    id SERIAL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    secret_phrase TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
- **SQL Injection Protection**: Parameterized queries with pg library
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Graceful error handling without exposing sensitive information

## Customization

### Changing the Password
To change the default password, modify the `defaultPassword` variable in `init-db.js` and run:
```bash
npm run init-db
```

### Changing the Secret Phrase
Update the secret phrase in the database insertion query in `init-db.js`.

### UI Customization
The frontend styles are contained in the `public/index.html` file. Modify the CSS in the `<style>` section to customize the appearance.

## Development

### Project Structure
```
secret-phrase-app/
├── server.js          # Main server file
├── init-db.js         # Database initialization script
├── package.json       # Dependencies and scripts
├── public/
│   └── index.html     # Frontend interface
└── README.md          # This file
```

### Running in Development Mode
```bash
npm run dev
```

This uses `nodemon` for automatic server restarts when files change.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in the configuration
- Verify the database `secret_app` exists

### Port Already in Use
- Change the `PORT` environment variable or modify the default port in `server.js`

### NPM Install Issues
- Make sure you have Node.js v14 or higher
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and run `npm install` again

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please check the troubleshooting section above or review the code comments for additional guidance. 