# Admin Panel - User Management

This web application provides an admin panel for managing user data. It includes the following features:

- **Table Display:** Users are displayed in a table with columns for Name, Email, Role, and actions.
- **Search and Filter:** Use the search bar to filter users by name, email, or role.
- **Edit and Delete:** Edit or delete user information in memory. There is no data persistence.
- **Pagination:** Users are paginated, with buttons for navigation, including first, previous, next, and last pages.
- **Select and Delete:** Select one or more rows and delete them using the "Delete Selected" button.
- **Mobile Responsive:** The application is responsive for various screen sizes and devices.

## Getting Started

1. Clone the project repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the development server using `npm start`.
4. Open a web browser and access the application at the provided URL (e.g., `http://localhost:3000`).

## Dependencies

Make sure to have the following dependencies installed:

- React
- Material-UI
- Emotion (for styling)

## Project Structure

The project is organized as follows:

├── src/
│ ├── components/
│ │ ├── AdminPanel/
│ │ │ ├── AdminTable.js
│ │ │ ├── UserRow.js
│ │ │ ├── EditUserDialog.js
│ │ ├── common/
│ │ │ ├── constants.js
│ │ │ ├── api.js
├── App.js
├── README.md

## Author

- Author: Jaydeep Krishna B R
- Email: jaydeepkrishnabr@gmail.com