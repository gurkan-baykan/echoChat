import axios from 'axios';

export const sendMessage = async payload => {
  return await axios.post('sendMessage', payload);
};

export const getMessage = async payload => {
  return await axios.get('getMessages', { params: { skip: payload } });
};
