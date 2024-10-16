const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `http://${process.env.VERCEL_URL}`;
  } else {
    return `https://${process.env.VERCEL_URL}`;
  }
};

export default getBaseUrl;
