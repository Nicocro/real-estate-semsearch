import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Home, ExternalLink } from "lucide-react";
import { SearchResult } from "@/services/apiService";

interface PropertyResultsProps {
  searchResults: SearchResult[];
  searchPerformed: boolean;
  isSearching?: boolean;
  className?: string;
}

const PropertyResults: React.FC<PropertyResultsProps> = ({
  searchResults,
  searchPerformed,
  isSearching = false,
  className = "",
}) => {
  if (!searchPerformed) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-display font-medium text-gray-900 mb-1">
              {isSearching
                ? "Searching for properties..."
                : searchResults.length > 0
                ? `${searchResults.length} matching properties`
                : "No matching properties found"}
            </h2>
            {searchResults.length > 0 && !isSearching && (
              <p className="text-sm text-gray-500">
                Showing the best matches based on your preferences
              </p>
            )}
          </div>

          {searchResults.length > 0 && !isSearching && (
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          )}
        </div>

        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Searching for properties
            </h3>
            <p className="text-sm text-gray-500 max-w-md text-center">
              Finding the perfect matches based on your criteria...
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 animate-fadeIn">
            {searchResults.map((result, index) => (
              <div
                key={result.id || index}
                className="opacity-0 animate-slideUp bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 aspect-video bg-gray-100 overflow-hidden">
                    {result.images &&
                    (result.images.medium ||
                      result.images.thumbnail ||
                      result.images.full) ? (
                      <img
                        src={
                          result.images.medium ||
                          result.images.thumbnail ||
                          result.images.full
                        }
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          console.error("Image failed to load:", e);
                          // Try all possible image URLs before falling back to placeholder
                          const target = e.target as HTMLImageElement;
                          const currentSrc = target.src;

                          if (
                            result.images.medium &&
                            currentSrc !== result.images.medium
                          ) {
                            console.log(
                              "Trying medium image:",
                              result.images.medium
                            );
                            target.src = result.images.medium;
                          } else if (
                            result.images.thumbnail &&
                            currentSrc !== result.images.thumbnail
                          ) {
                            console.log(
                              "Trying thumbnail image:",
                              result.images.thumbnail
                            );
                            target.src = result.images.thumbnail;
                          } else if (
                            result.images.full &&
                            currentSrc !== result.images.full
                          ) {
                            console.log(
                              "Trying full image:",
                              result.images.full
                            );
                            target.src = result.images.full;
                          } else {
                            console.log("Using placeholder image");
                            target.src =
                              "https://via.placeholder.com/300x200?text=No+Image";
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Home className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded">
                      Match: {result.distance.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      Property #{index + 1}
                    </h3>
                    <p className="text-gray-700 mb-4">{result.description}</p>

                    {result.images && result.images.full && (
                      <a
                        href={result.images.full}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-800"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        View full image
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No properties match the criteria
            </h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md text-center">
              Try adjusting your search description or uploading different
              inspiration images.
            </p>
            <Button
              variant="outline"
              className="text-sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Modify Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyResults;
