const fetchBooks = async (query) => {
    const response = await fetch(`https://books-google-api.vercel.app/books?q=${encodeURIComponent(query)}&maxResults=21&startIndex=0`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.items; 
};

const fetchDetailBook = async (id) => {
    const response = await fetch(`https://books-google-api.vercel.app/books/${encodeURIComponent(id)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; 
}

const fetchCategoryData = async (category) => {
  try {
    const response = await fetch(
      `https://books-google-api.vercel.app/books?category=${encodeURIComponent(
        category
      )}&maxResults=21&startIndex=0`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return result.items || [];
  } catch (error) {
    console.error("Error fetching category data:", error);
    return [];
  }
};

export {fetchBooks, fetchDetailBook, fetchCategoryData};
