
export const getBaseUrl = () => {

  const isProdStr = process.env.VITE_APP_IS_PROD;
  const isProd = isProdStr === 'true';
  let baseUrl;

  if (isProd) {
    baseUrl = process.env.VITE_APP_BOOT_PROD_BASE_URL;
  }
  else {
    baseUrl = process.env.VITE_APP_BOOT_DEV_BASE_URL;
  }

  return baseUrl;
}

export const getTimeout = () => {
  let timeout = process.env.VITE_APP_TIMEOUT_PROD;

  if (!process.env.VITE_APP_IS_PROD) {
    timeout = process.env.VITE_APP_TIMEOUT_DEV;
  }

  if (timeout) {
    return parseInt(timeout);
  }
  else {
    return 5000;
  }
}