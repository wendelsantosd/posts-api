type SERVE_STATIC = {
  url: string;
};

export const serveStatic: SERVE_STATIC = {
  url: process.env.SERVE_STATIC_URL,
};
