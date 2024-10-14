
const API_URL = `https://api.thecatapi.com/v1/images/search`;

export const fetchImages = async (limit = 10, page = 1) => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return {
    data: data || [], // Fallback to empty array if data is not found
    total: data.length || 0, // Get total images count if available
    }   
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch data");
  }
};
