export const setParams = (paramsValue) => {
  let paramsList = [];
  for (const [key, value] of Object.entries(paramsValue)) {
    if (value === 0 || value) {
      paramsList.push({ key, value });
    }
  }

  const search = paramsList.reduce((prev, currValue, index) => {
    if (index === 0) {
      return prev + `${currValue.key}=${currValue.value}`;
    } else {
      return prev + `&${currValue.key}=${currValue.value}`;
    }
  }, "?");
  return search;
};
