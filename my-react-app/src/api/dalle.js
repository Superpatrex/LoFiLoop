import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const fetchDalleImage = async (prompt) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!API_KEY) {
    console.error("OpenAI API key is missing! Check your .env file.");
    return;
  }

  let config = {
    method: 'post',
    url: 'https://api.openai.com/v1/images/generations',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${API_KEY}`
    },
    data: JSON.stringify({
      "model": "dall-e-3",
      "prompt": prompt,
      "n": 1,
      "size": "1024x1024"
    })
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching DALL·E image:", error.response?.data || error.message);
  }
};