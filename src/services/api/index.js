const apiURL =
  "https://64231c20001cb9fc20386cac.mockapi.io/mocked/users/";

export const apiRequest = (url = apiURL, data = {}) =>
  fetch(url, data).catch((e) => console.log("API ERROR:", e));

export const getItemsFromServer = async () => {
  const response = await apiRequest();
  return response.json();
};

export const addItemOnServer = async (payload) => {
  const response = await apiRequest(`${apiURL}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const saveItemOnServer = async (itemID, payload) => {
  const response = await apiRequest(`${apiURL}${itemID}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const deleteItemFromServer = async (itemID) => {
  const response = await apiRequest(`${apiURL}${itemID}`, {
    method: "DELETE"
  });
  return response.text();
};
