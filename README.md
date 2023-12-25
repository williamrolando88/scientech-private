# Scientech Portal

## Setup

To start working in the dev environment is required to have the following `.env.local` file in the root of the project:

```
# Firebase client config
API_KEY=XXXXXXX
AUTH_DOMAIN=XXXXXXX
PROJECT_ID=XXXXXXX
STORAGE_BUCKET=XXXXXXX
MESSAGING_SENDER_ID=XXXXXXX
APP_ID=XXXXXXX
```

Each of the values can be found in the firebase console.

## Development

Start by installing the dependencies:

```
yarn
```

To start the development server run:

```
yarn dev
```

By default the server will be running on port `3000`.

## Deployment

The deployment is done using vercel, it's automatically configured to deploy on every push to the `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
