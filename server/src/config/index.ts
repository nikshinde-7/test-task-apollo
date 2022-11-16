const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const url = `http://localhost:${process.env.PORT}`;

export { JWT_SECRET, url };
