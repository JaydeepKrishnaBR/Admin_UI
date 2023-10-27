import { API_URL } from './constants';

export async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}
