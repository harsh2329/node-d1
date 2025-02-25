# Node Project

## Installation

To install `nodemon` globally, use the following command:

```sh
npm install -g nodemon
```

## Requirements

Ensure you have Node.js v22.13.0 installed. You can check your Node.js version with:

```sh
node -v
```

## Troubleshooting

If you encounter the error `[nodemon] app crashed - waiting for file changes before starting...`, try the following steps:

1. Ensure all required dependencies are installed:
    ```sh
    npm install
    ```

2. Check for syntax errors or issues in your code that might cause the application to crash.

3. If the issue persists, try running `nodemon` with increased verbosity to get more details:
    ```sh
    nodemon --verbose
    ```

4. Restart your development environment or terminal session.

5. If none of the above steps work, consider deleting the `node_modules` directory and `package-lock.json` file, then reinstalling dependencies:
    ```sh
    rm -rf node_modules package-lock.json
    npm install
    ```
