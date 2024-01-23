type REDIS = {
  host: string;
  cacheTTL: string;
};

export const redis: REDIS = {
  host: process.env.REDIS_HOST ?? 'localhost',
  cacheTTL: process.env.CACHE_TTL,
};
