
/**
 * Service for handling API calls to the property search backend
 */

export interface PropertyImage {
  thumbnail: string;
  medium: string;
  full: string;
}

export interface SearchResult {
  id: string;
  description: string;
  images: PropertyImage;
  distance: number;
}

export interface SearchResponse {
  results: SearchResult[];
}

/**
 * Performs a property search based on text query
 */
export const searchProperties = async (query: string, topN: number = 3): Promise<SearchResponse> => {
  try {
    console.log("Searching for properties with query:", query, "topN:", topN);
    const response = await fetch('http://localhost:8000/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        top_n: topN
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};
