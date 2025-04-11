import React from "react";
import { Property } from "@/utils/propertyData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Home, MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  className = "",
}) => {
  // Format price as currency
  const formatPrice = (price: number) => {
    return price >= 10000
      ? `$${(price / 1000).toFixed(0)}k`
      : `$${price.toLocaleString()}`;
  };

  // Get price display based on status
  const getPriceDisplay = () => {
    if (property.status === "for-rent") {
      return `${formatPrice(property.price)}/mo`;
    }
    return formatPrice(property.price);
  };

  // Function to get status label and colors
  const getStatusBadge = () => {
    switch (property.status) {
      case "for-sale":
        return { label: "For Sale", className: "bg-blue-100 text-blue-800" };
      case "for-rent":
        return { label: "For Rent", className: "bg-green-100 text-green-800" };
      case "pending":
        return { label: "Pending", className: "bg-amber-100 text-amber-800" };
      case "sold":
        return { label: "Sold", className: "bg-red-100 text-red-800" };
      default:
        return { label: "Unknown", className: "bg-gray-100 text-gray-800" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <Card
      className={`overflow-hidden group bg-white border-gray-100 hover:shadow-elevation transition-all duration-300 ${className}`}
    >
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={property.images[0]}
          alt={property.address}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status Badge */}
        <Badge
          className={`absolute top-2 right-2 text-xs ${statusBadge.className}`}
        >
          {statusBadge.label}
        </Badge>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div className="mb-2">
          <div className="flex items-center mb-1 text-gray-500 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{property.neighborhood}</span>
          </div>

          <h3 className="font-medium text-gray-900 mb-1 truncate">
            {property.address}
          </h3>

          <p className="text-lg font-semibold">{getPriceDisplay()}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </div>

          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>

          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.squareFeet.toLocaleString()} sf</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.features.slice(0, 3).map((feature, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-gray-50 border-gray-100 text-gray-600"
            >
              {feature}
            </Badge>
          ))}
        </div>

        <div className="text-sm text-gray-500 line-clamp-3">
          {property.description}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
