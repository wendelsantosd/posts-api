type JWT = {
  secretKey: string;
  expiresIn: string;
};

export const jwt: JWT = {
  secretKey: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
