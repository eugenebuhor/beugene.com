const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `http://${process.env.URL}`;
  } else {
    return `https://${process.env.URL}`;
  }
};

export default getBaseUrl;
