const getItem = (keyword, defaultValue = undefined) => {
  const storedData = localStorage.getItem(keyword);
  if (!storedData) {
    return defaultValue;
  }

  return JSON.parse(storedData);
};

const setItem = (keyword, value) => {
  localStorage.setItem(keyword, JSON.stringify(value));
};

export { getItem, setItem };
