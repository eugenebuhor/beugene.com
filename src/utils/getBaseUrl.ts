const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
};

export default getBaseUrl;
