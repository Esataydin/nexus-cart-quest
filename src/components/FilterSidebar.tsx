import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ""
}) => {
  return (
    <Card className={`h-fit ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          Filters
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCategoryChange(null)}
              className="h-auto p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
            Categories
          </h4>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(null)}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {selectedCategory && (
          <div>
            <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Active Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => onCategoryChange(null)}
              >
                {selectedCategory}
                <X className="h-3 w-3" />
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;