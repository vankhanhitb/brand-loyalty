# Brand Loyalty Frontend

This is the frontend application for the Brand Loyalty Shopify app, built with React, TypeScript, and Shopify Polaris.

## Features

- Customer management
- Rewards and points system
- Campaign management
- Settings and configuration
- Multi-language support
- Integration with Shopify

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Shopify Partner account
- Shopify store for testing

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd loyalty-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SHOPIFY_API_KEY=your_shopify_api_key
REACT_APP_SHOPIFY_API_SECRET=your_shopify_api_secret
```

4. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Development

### Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── services/      # API and external service integrations
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

### Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the application for production
- `npm serve` - Preview the production build
- `npm lint` - Run ESLint to check code quality

### Shopify Integration

The application uses Shopify Polaris for the UI components and follows Shopify's design guidelines. It integrates with the Shopify Admin API for store data and customer information.

### Testing

To run tests:

```bash
npm test
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy the contents of the `dist` directory to your hosting provider.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
