# 📚 Smart Library Management System

Smart Library Management System is a web-based application developed to simplify and manage library operations digitally. It provides a centralized system for managing books, authors, and borrowers while maintaining organized library records using MongoDB.

The application allows users to add, update, delete, and search book records, manage author and borrower information, and perform book issue and return operations. It also provides library statistics to monitor the availability of books, registered authors, and borrowers.

## 🎯 Objectives

- Develop a centralized system for managing library records.
- Maintain book information, including titles, authors, categories, and prices.
- Manage author details and their associated books.
- Maintain borrower information and borrowing records.
- Implement book checkout and check-in operations.
- Search books, authors, and borrowers efficiently.
- Track book availability and borrowing status.
- Generate library statistics using database records.
- Reduce manual work involved in traditional library management.

## ✨ Features

- **Book Management:** Add, update, delete, and manage book records with details such as title, author, category, and price.
- **Author Management:** Store and manage author information, including author name, email, phone number, and associated books.
- **Borrower Management:** Register borrowers and maintain their personal information, including name, email, phone number, and address.
- **Book Search:** Search for books using their titles and categories.
- **Author Search:** Find authors using their names and email addresses.
- **Borrower Search:** Search borrower records using names, email addresses, phone numbers, and addresses.
- **Book Checkout:** Assign available books to registered borrowers and update borrowing records.
- **Book Check-in:** Return borrowed books and update their availability status.
- **Available Books:** Search and retrieve books that are currently available for borrowing.
- **Borrowed Books:** Search and retrieve books that are currently issued to borrowers.
- **Library Statistics:** Display total books, authors, borrowers, borrowed books, and borrowers without assigned books.
- **REST API:** Provides API endpoints for communication between the application and MongoDB database.
- **Database Management:** Uses MongoDB to store and maintain library records.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript | Application logic and server-side programming |
| Node.js | JavaScript runtime environment |
| Express.js | Building REST APIs and handling HTTP requests |
| MongoDB | Storing library information |
| Mongoose | MongoDB object data modeling and database operations |
| HTML5 | Web page structure (if frontend is integrated) |
| CSS3 | User interface styling (if frontend is integrated) |
| npm | Package and dependency management |
| dotenv | Managing environment variables |
| CORS | Enabling cross-origin resource sharing |

## 🏗️ System Architecture

The application follows a backend-based architecture using Node.js, Express.js, and MongoDB.

- **Server Layer:** Uses Express.js to create and manage the application server.
- **API Layer:** Handles HTTP requests and responses through REST API endpoints.
- **Book Management Layer:** Manages book records, author associations, and borrowing status.
- **Author Management Layer:** Maintains author information and relationships with books.
- **Borrower Management Layer:** Stores borrower details and maintains their associated book records.
- **Database Layer:** Uses MongoDB to store books, authors, and borrowers.
- **Statistics Layer:** Retrieves database counts to generate library statistics.

## ⚙️ Core Operations

The system performs the following important library operations:

### 1. Book Management

- Add new books with title, author, category, and price.
- Update existing book information.
- Delete book records.
- Search books by title or category.

### 2. Author Management

- Register new authors.
- Store author contact information.
- Associate books with their respective authors.
- Search and update author information.

### 3. Borrower Management

- Register new borrowers.
- Maintain borrower contact details.
- Update borrower information.
- Search borrower records.
- Delete borrowers when they have no remaining issued books.

### 4. Book Checkout and Check-in

**Checkout Process:**
1. Select an available book.
2. Select the registered borrower.
3. Update the book's borrower information.
4. Add the book to the borrower's book records.

**Check-in Process:**
1. Select the borrowed book.
2. Identify the borrower.
3. Remove the borrower association from the book.
4. Remove the book from the borrower's records.

### 5. Library Statistics

The system retrieves the following information from MongoDB:

- Total number of books.
- Total number of authors.
- Total number of borrowers.
- Number of books currently borrowed.
- Number of borrowers without assigned books.

## 🔌 API Endpoints

The application provides REST API endpoints for managing library operations.

| Module | HTTP Method | Endpoint | Operation |
|---|---|---|---|
| Books | POST | `/api/books` | Add a new book |
| Books | PUT | `/api/books` | Update book details |
| Books | DELETE | `/api/books` | Delete a book |
| Books | GET | `/api/books/search` | Search books |
| Books | GET | `/api/books/searchout` | Search available books |
| Books | GET | `/api/books/searchin` | Search borrowed books |
| Books | PUT | `/api/books/checkout` | Issue a book |
| Books | PUT | `/api/books/checkin` | Return a book |
| Authors | POST | `/api/authors` | Add an author |
| Authors | GET | `/api/authors/search` | Search authors |
| Authors | GET | `/api/authors/:id` | Retrieve author details |
| Authors | PUT | `/api/authors/:id` | Update author details |
| Borrowers | POST | `/api/borrowers` | Register a borrower |
| Borrowers | GET | `/api/borrowers/search` | Search borrowers |
| Borrowers | GET | `/api/borrowers/searchdel` | Find borrowers without books |
| Borrowers | GET | `/api/borrowers/:id` | Retrieve borrower details |
| Borrowers | PUT | `/api/borrowers/:id` | Update borrower details |
| Borrowers | DELETE | `/api/borrowers/:id` | Delete a borrower |
| Statistics | GET | `/api/counts` | Retrieve library statistics |

## 🗄️ Database Structure

The application uses MongoDB with Mongoose to maintain three main data collections:

### 1. Books Collection
- Book Title
- Author Reference
- Category
- Price
- Borrower Reference

### 2. Authors Collection
- Author Name
- Author Email
- Author Phone
- Associated Books

### 3. Borrowers Collection
- Borrower Name
- Borrower Email
- Borrower Phone
- Borrower Address
- Borrowed Books

The collections maintain relationships using MongoDB ObjectId references.

## 🚀 Setup and Installation

### Prerequisites

- Node.js
- npm
- MongoDB Community Server
- Visual Studio Code
- Postman (for API testing)

### Installation Steps

1. Clone or download the project repository.
2. Open the project folder in Visual Studio Code.
3. Open the integrated terminal.
4. Install the required dependencies:

   `npm install`

5. Create a `.env` file in the project root directory and configure the following variables:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bookstore
   ```

6. Make sure MongoDB is running on your system.
7. Start the application server:

   `npm start`

8. The server will run at:

   `http://localhost:5000`

### API Testing

Use Postman to test the REST API endpoints by sending GET, POST, PUT, and DELETE requests.

## 📁 Project Structure

```text
Smart-Library-Management-System/
│
├── models/
│   ├── Book.js
│   ├── Author.js
│   └── Borrower.js
│
├── routes/
│   ├── bookRoutes.js
│   ├── authorRoutes.js
│   ├── borrowerRoutes.js
│   └── countRoutes.js
│
├── .env
├── .gitignore
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

*The structure represents the backend organization; adjust filenames and folders to match your final project.*

## 🔮 Future Scope

- Add user authentication and role-based access for administrators and librarians.
- Develop a responsive frontend dashboard.
- Implement automatic due-date tracking and late-fee calculation.
- Add book reservation functionality.
- Generate borrowing and return history reports.
- Add advanced search and filtering options.
- Implement book availability notifications.
- Add data backup and recovery functionality.
- Introduce analytics for library usage and borrowing trends.

## 🎓 Project Information

**Project Name:** Smart Library Management System  
**Student:** Lakshay  
**UID:** 26MCD10093  
**Program:** MCA (Data Science)  
**Section:** B  
**Semester:** 1st Semester  
**University:** Chandigarh University  
**Academic Session:** 2026–27

---

**Smart Library Management System — Simplifying Library Operations, Organizing Resources, and Managing Books Efficiently.**