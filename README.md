# Nutrition Tracker App 🥗

Welcome to the Nutrition App! This app is designed to help users track their nutrition data, visualize their meals, and manage their dietary information effectively.

## Pages 📄

### Dashboard 📊

The Dashboard page displays interactive bar graphs and pie charts representing nutrition data. Users can view their previous meals, analyze the nutritional content, and make informed dietary choices.

### History 📅

In the History page, users can add data for meals such as breakfast, lunch, dinner, and snacks. They can set the date and view the meal data in a tabular format. This data is then displayed in the charts and graphs on the Dashboard page.

### About Us ℹ️

The About Us page provides detailed information about the Nutrition App, its features, and functionalities. Users can also learn about the developers behind the app and their contributions.

## Features 🌟

- **Multi-User Authentication**: Users can sign up and log in to access the app's features and data securely.
- **Popover Feature**: User details and sign-out options are conveniently accessible through a popover.
- **Updated UI**: Form buttons are added over tables for easier interaction and data input.
- **Comprehensive Data Representation**: Breakfast, lunch, drink, and dinner data are included in tables and charts for a holistic view of nutritional intake.
- **Detailed Information**: An extra page dedicated to "Details" provides comprehensive information about meals and their nutritional content.
- **Efficient Database Management**: MongoDB is used as the primary database solution for storing user data and nutrition information, ensuring scalability and efficient CRUD operations.

## Technologies Used 💻

- Next.js: React framework for building the frontend
- TypeScript: Strongly-typed JavaScript for improved code quality and reliability
- Chart.js: Library for creating interactive charts and graphs
- Tailwind CSS: Utility-first CSS framework for styling the UI
- Firebase Authentication: Secure authentication system for user login and management
- MongoDB: Database for storing and retrieving user and nutrition data through CRUD operations. Two collections are used in MongoDB: one for users and one for user nutrition data.


## Database Integration 🗃️

The Nutrition App utilizes MongoDB for storing and managing user data and nutrition information. MongoDB offers a flexible and scalable solution for handling large datasets and performing CRUD operations efficiently.

Main two tables in MongoDB.

- User data: User authentication and profile information are stored securely in MongoDB collections.
-  Nutrition data: Meal records and nutritional information are stored in separate collections, allowing for easy retrieval and analysis.

## Getting Started 🚀

To get started with the Nutrition App:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up Firebase Authentication for user management.
4. Start the development server using `npm run dev`.
5. Explore the different pages and functionalities of the app.

## Support and Feedback 📧

For any issues, feedback, or queries related to the Nutrition App, please contact [info@systemintegration.in](mailto:info@systemintegration.in).

We hope you enjoy using the Nutrition App and find it helpful in managing your dietary needs and goals!