const args = process.argv.slice(2);

process.env.NODE_ENV = ! args[0] || args[0] === "development" ? "development" : args[0];
