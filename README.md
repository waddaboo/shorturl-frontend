# Shorturl Frontend

Shorturl Frontend is a web interface built with React and TypeScript for [Shorturl](https://github.com/waddaboo/shorturl), a simple and lightweight URL shortener to shorten cumbersone addresses into short links.

## Key Features

- **Shorten URLs instantly**: Turn long, cumbersome URLs into consise aliases with just a few clicks.
- **Track clicks**: Keep tabs on how many times your shortened URLs have been clicked with detailed analytics.
- **Fully responsive**: Access and manage your shortened links seamlessly from any device.

## Built with

- **React**: Builds the user interface with reusable components for a dynamic and scalable experience.
- **TypeScript**: Ensure type safety and prevents runtime errors for a robust and reliable application.
- **Ant Design**: Enhance the appearance of the web application.

## Getting Started

1. Clone the repository:

```
git clone https://github.com/waddaboo/shorturl-frontend.git
```

2. Install dependencies:

```
npm install
```

3. Create your own .env.local file based on the .env.sample file or follow the configuration below:

```
REACT_APP_ENV="local"
REACT_APP_API_URL="http://localhost:8080/shorturl/api"
REACT_APP_API_VERSION="v1.0"

```

4. Run the project in local:

```
npm run local
```

5. Visit http://localhost:3000 in your browser.
6. Start shortening URLs!

### Notes

- It is required to have the [Shorturl](https://github.com/waddaboo/shorturl) running in order to use it properly.
- Please visit [Shorturl](https://github.com/waddaboo/shorturl) for more information on the backend system.

#### Hope you find Shorturl a valuable tool for managing your URLs. Happy shortening!
