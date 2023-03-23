function isValidJsonString(jsonString) {
  if (!(jsonString && typeof jsonString === "string")) {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

/* eslint-disable no-undef */
export const getFromStorage = (key) => {
  if (typeof window !== "undefined") {
    let data = localStorage.getItem(key);

    if (isValidJsonString(data)) {
      data = JSON.parse(data);
    }
    return data;
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }
};
