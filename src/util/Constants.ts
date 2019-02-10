export const apiUrl: string =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

const thirtyMinutesInSeconds = 30 * 24 * 60 * 60;
export const userCookieMaxAge: number = Number.parseInt(
  process.env.USER_COOKIE_MAX_AGE || `${thirtyMinutesInSeconds}`,
  10
);
