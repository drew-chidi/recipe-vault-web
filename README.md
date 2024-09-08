# Recipe Vault

**Recipe Vault** is a web application designed to help users discover, create, and share recipes. The app offers a clean and intuitive interface for browsing recipes, reading detailed instructions, and accessing a variety of culinary resources.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Deployment Link](#deployment)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contact](#contact)

## Features

- **Recipe Listings**: Browse through a wide selection of recipes, categorized by cuisine, meal type, and dietary restrictions.
- **Recipe Details**: View detailed recipes with ingredients, instructions, and cooking times.
- **Pagination**: Navigate through recipe lists with paginated views for improved user experience.
- **User Interaction**: Like and save your favorite recipes to your profile.
- **Search Functionality**: Easily find recipes using the search bar.
- **Responsive Design**: Fully responsive design that works seamlessly across desktop, tablet, and mobile devices.
- **Footer with Terms and Conditions**: A clean footer with a link to the app's terms and conditions.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/drew-chidi/recipe-vault-web.git

   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-vault-web

   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

1. Start the development server:

   ```bash
   npm run dev

   ```

2. Open your browser and navigate to http://localhost:3000 to see the app in action.

## Deployment Link

[Recipe Vault](https://recipe-vault-web.vercel.app/) [Recipe Vault API documentation](https://documenter.getpostman.com/view/19302224/2sAXjRWVP5)

## API Endpoints

GET /api/recipes Description: Fetches a paginated list of recipes. Parameters: page: Page number (default: 1) limit: Number of recipes per page (default: 10)

GET /api/recipes/ Description: Fetches detailed information about a specific recipe by its ID.

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Styling: Tailwind CSS
- Storage: Cloudinary

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or feedback, feel free to reach out:

- Author: Andrew Ofuenweuche
- Email: chidi.andrew@gmail.com

username: pci-qs
