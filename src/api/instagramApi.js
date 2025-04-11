import { axiosInstance } from './axiosInstance';
import axios from 'axios';
export const instagramApi = {
  getAuthUrl: async () => {
    try {
      const response = await axiosInstance.get(`/auth/instagram`);
      return response.data.url;
    } catch (error) {
      throw new Error('Failed to get Instagram auth URL');
    }
  },

  handleCallback: async (code) => {
    try {
      const response = await axiosInstance.post(`/auth/instagram/callback`, { code });
      return response.data;

    } catch (error) {
      throw new Error('Failed to authenticate with Instagram');
    }
  },

  getUserProfile: async (accessToken) => {
    try {
      const response = await axiosInstance.get(`/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  },

  getMedia: async (accessToken) => {
    try {
      const response = await axiosInstance.get(`/media/instagram/post`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user media');
    }
  },

  getNextMedia: async (nextPage) => {
    try {
      const response = await axios.get(nextPage);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch next page of media');
    }
  }
};
