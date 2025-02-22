import dotenv from "dotenv";

dotenv.config();

export const JWT_ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "default_secret";
export const JWT_ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY|| "1d";

export const JWT_REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "default_secret";
export const JWT_REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "10d";
