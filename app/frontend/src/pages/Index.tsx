
import React, { useState } from 'react';
import Header from '@/components/Header';
import PropertySearch from '@/components/PropertySearch';
import PropertyResults from '@/components/PropertyResults';
import { useToast } from "@/hooks/use-toast";
import { searchProperties, SearchResult } from '@/services/apiService';

const Index = () => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string, imageStyles: string[]) => {
    if (!query.trim() && imageStyles.length === 0) {
      toast({
        title: "Search Incomplete",
        description: "Please provide a description or upload inspiration images.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    toast({
      title: "Searching properties",
      description: "Finding the perfect match based on your preferences.",
    });
    
    try {
      // For now, we only use the text query
      // In the future this will handle image styles too
      const response = await searchProperties(query, 3); // Limit to 3 results
      setSearchResults(response.results);
      setSearchPerformed(true);
      
      // Scroll to results
      if (response.results.length > 0) {
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Could not connect to the search service. Please try again.",
        variant: "destructive",
      });
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16">
            <div className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              For Real Estate Professionals
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-gray-900 mb-4 tracking-tight leading-tight">
              Find the perfect property match for your clients
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use natural language and inspiration images to discover properties that match exactly what your clients are looking for.
            </p>
          </div>
          
          <PropertySearch 
            onSearch={handleSearch} 
            className="animate-fadeIn"
            isSearching={isSearching}
          />
        </section>
        
        {/* Results Section */}
        <section 
          id="results-section" 
          className={`px-6 pb-16 md:pb-24 transition-opacity duration-500 ${searchPerformed ? 'opacity-100' : 'opacity-0 hidden'}`}
        >
          <div className="max-w-6xl mx-auto">
            <PropertyResults 
              searchResults={searchResults} 
              searchPerformed={searchPerformed}
              isSearching={isSearching}
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-2"></div>
            <span className="text-gray-900 font-medium">EstateMatch</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
