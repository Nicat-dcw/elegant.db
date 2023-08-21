[![Node.js Package](https://github.com/Nicat-dcw/elegant.db/actions/workflows/npm-publish.yml/badge.svg?event=default)](https://github.com/Nicat-dcw/elegant.db/actions/workflows/npm-publish.yml)
[![Socket.dev](https://socket.dev/api/badge/npm/package/elegantdb)](https://socket.dev/npm/elegantdb/issues)
[![CodeQL](https://github.com/Nicat-dcw/elegant.db/actions/workflows/codeql.yml/badge.svg)](https://github.com/Nicat-dcw/elegant.db/actions/workflows/codeql.yml)
[![NPM](https://img.shields.io/npm/v/elegantdb)]()

# Elegant Database

Elegant Database is a JavaScript library that provides advanced features for managing and interacting with a database. It supports both JSON and Elegant (Custom Adaptor of ElegantDB) adaptors for storage.

## Installation

You can install Elegant Database using npm:

```sh
npm install elegantdb
```

## Usage

Import the necessary components from the library:

```javascript
import { Database, JSONAdaptor, ElegantAdaptor } from 'elegantdb';
```

Create an instance of the `Database` class with appropriate options:

```javascript
const db = new Database({
  adaptor: new JSONAdaptor(), // or new ElegantAdaptor()
  path: './my-database.json', // Optional, specify the path
  disableCheckUpdates: false, // Optional, disable update checks
  useExperimentalCaches: false // Optional
});
```

### Database Adaptors
- `JSONAdaptor`: JSON adaptor | database.json
- `ElegantAdaptor`: Custom Adaptor of ElegantDB | database.elegant
### Methods

- `set(key, value)`: Set a value in the database.
- `add(key, value)`: Add a value in the database.
- `get(key)`: Get a value from the database.
- `has(key)`: Check if a key exists in the database.
- `remove(key)`: Remove a key from the database.
- `clone()`: Create a clone of the database instance.
- `all()`: Get All Data from Adaptor.
- `getCache()`: Get All Cache from Database

## Contributing

If you encounter any issues or have suggestions for improvements, please feel free to [open an issue on GitHub](https://github.com/Nicat-dcw/elegantdb/issues).

## Versioning

We use [Semantic Versioning](https://semver.org/) for versioning. See the [latest releases](https://www.npmjs.com/package/elegant-database) on npm.

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
```

Please feel free to copy and paste this template into your repository's README file. Make sure to review it and adjust any formatting or content as needed to fit your preferences.
