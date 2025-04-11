
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Search } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { useImageComparison } from '@/hooks/useImageComparison';

interface PropertySearchProps {
  onSearch: (query: string, imageStyles: string[]) => void;
  className?: string;
  isSearching?: boolean;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ 
  onSearch, 
  className = '',
  isSearching = false
}) => {
  const { toast } = useToast();
  const [description, setDescription] = useState('');
  const { 
    analyzing, 
    hasAnalyzed, 
    imageStyles, 
    analyzeImages, 
    resetAnalysis 
  } = useImageComparison();
  
  const handleImagesSelected = async (files: File[]) => {
    if (files.length > 0) {
      await analyzeImages(files);
    } else {
      resetAnalysis();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() && !hasAnalyzed) {
      toast({
        title: "Search Incomplete",
        description: "Please provide a description or upload inspiration images.",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(description, imageStyles);
  };
  
  return (
    <div className={`w-full max-w-3xl mx-auto bg-white rounded-xl shadow-card overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex flex-col space-y-2 mb-5">
          <h2 className="text-2xl font-display font-medium text-gray-900">Find the perfect match</h2>
          <p className="text-sm text-gray-500">
            Describe the property your client is looking for or upload inspiration images
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Property Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe what your client is looking for... (e.g., 'Modern 3-bedroom house with an open kitchen and natural light')"
              className="resize-none min-h-[120px] w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="px-3 text-xs font-medium text-gray-400 uppercase">or</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>
            
            <ImageUploader onImagesSelected={handleImagesSelected} />
            
            {analyzing && (
              <div className="mt-3 flex items-center justify-center">
                <div className="animate-pulse flex space-x-2 items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
                </div>
                <span className="ml-2 text-sm text-gray-500">Analyzing images...</span>
              </div>
            )}
            
            {hasAnalyzed && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Detected preferences:</p>
                <div className="flex flex-wrap gap-2">
                  {imageStyles.map((style, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
              disabled={isSearching || analyzing}
            >
              <Search className="h-4 w-4" />
              {isSearching ? 'Searching...' : 'Find Matching Properties'}
              {!isSearching && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertySearch;
