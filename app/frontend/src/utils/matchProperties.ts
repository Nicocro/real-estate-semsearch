
import { Property } from './propertyData';

// Simple matching algorithm for properties based on text description
export const matchPropertiesByText = (
  properties: Property[],
  textQuery: string,
  limit: number = 5
): Property[] => {
  if (!textQuery.trim()) {
    return properties.slice(0, limit); // Return first few if no query
  }

  // Normalize text for case-insensitive matching
  const normalizedQuery = textQuery.toLowerCase();
  const keywords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);

  // Score properties based on keyword matches
  const scoredProperties = properties.map(property => {
    let score = 0;
    const propertyText = `
      ${property.description.toLowerCase()} 
      ${property.features.join(' ').toLowerCase()} 
      ${property.neighborhood.toLowerCase()} 
      ${property.type.toLowerCase()} 
      ${property.address.toLowerCase()}
    `;

    // Check for each keyword
    for (const keyword of keywords) {
      const matches = propertyText.match(new RegExp(keyword, 'g')) || [];
      score += matches.length;
    }

    // Boost score for exact phrase match
    if (propertyText.includes(normalizedQuery)) {
      score += 5;
    }

    return { property, score };
  });

  // Sort by score and return top matches
  return scoredProperties
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .slice(0, limit)
    .map(item => item.property);
};

// Simple visual similarity check (in a real app, this would use AI for image comparison)
export const matchPropertiesByImage = (
  properties: Property[],
  imageStyles: string[], // This could be visual features extracted from images
  limit: number = 5
): Property[] => {
  // Mock implementation - in a real app, use AI for image comparison
  // For now, return random properties as "matches"
  return properties
    .sort(() => 0.5 - Math.random()) // Random shuffle
    .slice(0, limit);
};

// Combined matching function
export const findMatchingProperties = (
  properties: Property[],
  textQuery: string,
  imageStyles: string[] = [],
  limit: number = 5
): Property[] => {
  // Get matches from both sources
  const textMatches = matchPropertiesByText(properties, textQuery, limit * 2);
  const imageMatches = matchPropertiesByImage(properties, imageStyles, limit * 2);
  
  // Combine and deduplicate results
  const allMatches = [...textMatches, ...imageMatches];
  const uniqueMatches = Array.from(new Map(allMatches.map(p => [p.id, p])).values());
  
  // Return top matches
  return uniqueMatches.slice(0, limit);
};
