import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, ArrowLeft, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productCategory: string;
  quantity: number;
  totalPrice: number;
}

interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    setIsUpdating(true);
    try {
      await axios.delete(`/api/cart/product/${productId}`);
      toast({
        title: "Product removed",
        description: "Product has been removed from your cart.",
      });
      fetchCart(); // Refresh cart data
    } catch (error: any) {
      console.error('Remove product error:', error);
      
      let errorMessage = "Failed to remove product. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    setIsUpdating(true);
    try {
      await axios.delete('/api/cart');
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
      setCart({ items: [], totalAmount: 0, totalItems: 0 });
    } catch (error: any) {
      console.error('Clear cart error:', error);
      
      let errorMessage = "Failed to clear cart. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };


  const handleCheckout = async () => {
    setIsUpdating(true);
    try {
      await axios.post('/api/orders/from-cart');
      toast({
        title: "Order placed!",
        description: "Your order has been placed successfully.",
      });
      navigate('/orders');
    } catch (error: any) {
      console.error('Checkout error:', error);
      
      let errorMessage = "Failed to place order. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Checkout failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={() => navigate('/')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shopping Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCart}
                    disabled={isUpdating || cart.items.length === 0}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${(item.productPrice || 0).toFixed(2)} each
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <span className="font-medium">Quantity: {item.quantity}</span>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">${(item.totalPrice || 0).toFixed(2)}</p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProduct(item.productId)}
                      disabled={isUpdating}
                      className="text-destructive hover:text-destructive p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                   {cart.items.map((item) => (
                     <div key={item.id} className="flex justify-between text-sm">
                       <span>{item.productName} × {item.quantity}</span>
                       <span>${(item.totalPrice || 0).toFixed(2)}</span>
                     </div>
                   ))}
                 </div>
                 
                 <div className="border-t pt-4">
                   <div className="flex justify-between font-semibold text-lg">
                     <span>Total</span>
                     <span>${(cart.totalAmount || 0).toFixed(2)}</span>
                   </div>
                 </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;