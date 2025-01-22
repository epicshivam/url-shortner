# URL Shortener

A simple URL shortener application built using **Node.js** and **MongoDB**. This project allows users to input an original URL and generate a shorter version that redirects to the original URL.

## Features

- Generate short URLs for long URLs.
- Redirect to the original URL when the short URL is accessed.
- Track visit history for each URL.
- View analytics of the shortened URLs, including the number of clicks.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store URL data.
- **EJS**: Templating engine for rendering dynamic views.
- **NANOID**: A small, secure, URL-friendly unique string generator for generating short IDs.
- **dotenv**: A module to load environment variables from a `.env` file.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
## Endpoints

1. **Homepage (GET /)**  
   Displays the form to input a URL and the list of generated short URLs.

2. **Generate New Short URL (POST /url)**  
   Accepts the original URL from the form and generates a short URL.

3. **Redirect to Original URL (GET /:shortId)**  
   Redirects the user to the original URL when they visit the short URL.

4. **Analytics (GET /analytics/:shortId)**  
   Displays the visit history for a given short URL.

## Environment Variables

- **PORT**: The port the application will run on. Default is `8000`.
- **MONGODB_URI**: The MongoDB connection URI.
