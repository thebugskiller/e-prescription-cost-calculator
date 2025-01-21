
# Application README

This README provides instructions to set up and run the application.

---


In the project directory, you can run:

### `rails server`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


---

## Ruby and Rails Version

- **Ruby Version**: `3.1.2`
- **Rails Version**: `~> 7.1.2`

---

## Gems Used

- **SQLite3**: `~> 1.4`
  - Used as the database for Active Record.
- **Rack CORS**: 
  - Handles Cross-Origin Resource Sharing (CORS) to enable cross-origin Ajax requests.

---

## System Dependencies

- Ensure you have `Ruby 3.1.2` and `Rails 7.1.2` installed.
- Additional dependencies include:
  - `sqlite3`
  - `rack-cors`

---

## Configuration

- Update configuration files as needed in the `config` directory.

---

## Database Setup

1. **Create the Database**:
   ```bash
   rails db:create
   ```

2. **Initialize the Database**:
   ```bash
   rails db:migrate
   ```

---

## How to Run the Test Suite

To run tests, use:
```bash
rails test
```

---

## Services


---

## Deployment Instructions

1. Push the code to the production environment.
2. Run the database migrations:
   ```bash
   rails db:migrate RAILS_ENV=production
   ```

---

## Additional Notes

- For further customization, refer to the Rails documentation.
- Update this README as the project evolves.
