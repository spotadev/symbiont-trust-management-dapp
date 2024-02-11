
export const getBaseUrl = () => {

  const isProdStr = import.meta.env.VITE_APP_IS_PROD;
  const isProd = isProdStr === 'true';
  let baseUrl;

  if (isProd) {
    baseUrl = import.meta.env.VITE_APP_BOOT_PROD_BASE_URL;
  }
  else {
    baseUrl = import.meta.env.VITE_APP_BOOT_DEV_BASE_URL;
  }

  return baseUrl;
}

export const getTimeout = () => {
  let timeout = import.meta.env.VITE_APP_TIMEOUT_PROD;

  if (!import.meta.env.VITE_APP_IS_PROD) {
    timeout = import.meta.env.VITE_APP_TIMEOUT_DEV;
  }

  if (timeout) {
    return parseInt(timeout);
  }
  else {
    return 5000;
  }
}