import axios from "axios";

const API = "http://localhost:5000/api/chat";

const token = () =>
  localStorage.getItem("token");


export const getChats = () =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const createChat = () =>
  axios.post(
    API,
    {},
    {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }
  );

export const updateChat = (id, data) =>
  axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }
  );

export const askAI = (message) =>
  axios.post(
    `${API}/ask`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }
  );

  export const deleteChat = (id) =>
  axios.delete(

    `${API}/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }

  );