const transformResponse = async (response) => {
  let data;
  try {
    data = await response.clone().json();
  } catch (error) {
    data = await response.clone().text();
  }
  return data;
};

export default transformResponse;
