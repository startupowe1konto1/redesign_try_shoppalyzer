/**
 * Links to the Shoppalyzer backend (live application).
 *
 * Single source of truth for the backend URL across the marketing site.
 * The old `shoppalyzer-backend-ls4m.vercel.app` deploy still works, but the
 * canonical host is now the custom domain `app.shoppalyzer.pl`.
 */

export const APP_BASE_URL = 'https://app.shoppalyzer.pl';
export const APP_SIGNUP_URL = `${APP_BASE_URL}/signup`;
export const APP_LOGIN_URL = `${APP_BASE_URL}/login`;
