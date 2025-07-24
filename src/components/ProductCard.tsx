import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your cart.",
        variant: "destructive"
      });
      return;
    }

    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border bg-card">
      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <Badge variant="secondary" className="ml-2 flex-shrink-0">
              {product.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                {isOutOfStock ? (
                  <span className="text-destructive font-medium">Out of Stock</span>
                ) : (
                  `${product.stock} in stock`
                )}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={isOutOfStock || !user}
          variant={isOutOfStock ? "secondary" : "default"}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Out of Stock" : user ? "Add to Cart" : "Login to Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;