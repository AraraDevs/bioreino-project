const formatUrl = (url) => {
  return url
    .toLowerCase()
    .replace(/\s/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default formatUrl;
