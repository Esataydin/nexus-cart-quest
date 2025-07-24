# 🛒 Nexus Cart Quest

A modern, full-featured e-commerce platform built with React, TypeScript, and Tailwind CSS. This project features a responsive frontend with role-based authentication, product management, shopping cart functionality, and order processing.

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure JWT-based authentication
- **Role-Based Access Control** - USER and ADMIN roles with different permissions
- **Persistent Sessions** - Automatic token refresh and session management
- **Protected Routes** - Route guards based on authentication status and user roles

### 🛍️ Shopping Experience
- **Product Catalog** - Browse products with search and category filtering
- **Product Cards** - Clean, responsive product display with pricing and stock info
- **Shopping Cart** - Add/remove items, view totals, and manage quantities
- **Checkout Process** - Seamless order placement from cart
- **Order History** - Complete order tracking with detailed item breakdowns

### ⚙️ Admin Management
- **Product Management** - Full CRUD operations for products
- **Inventory Control** - Stock management and pricing updates
- **Order Monitoring** - View all orders and customer activity
- **Admin Dashboard** - Comprehensive overview of store metrics
- **Search & Filter** - Advanced product search and filtering capabilities

### 🎨 User Interface
- **Modern Design** - Built with shadcn/ui components and Tailwind CSS
- **Responsive Layout** - Mobile-first design that works on all devices
- **Dark/Light Mode** - Theme switching support
- **Loading States** - Smooth loading animations and skeleton screens
- **Toast Notifications** - User-friendly feedback for all actions
- **Error Handling** - Comprehensive error messages and fallback states

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing with protected routes
- **Axios** - HTTP client for API communication
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management with validation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Component variant management

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefix addition

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Navbar.tsx       # Navigation bar with auth state
│   ├── ProductCard.tsx  # Product display component
│   └── FilterSidebar.tsx # Product filtering component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile device detection
│   └── use-toast.ts     # Toast notification hook
├── lib/                 # Utility libraries
│   └── utils.ts         # Common utility functions
├── pages/               # Page components
│   ├── HomePage.tsx     # Product catalog and search
│   ├── LoginPage.tsx    # User authentication
│   ├── RegisterPage.tsx # User registration
│   ├── CartPage.tsx     # Shopping cart management
│   ├── OrdersPage.tsx   # Order history and details
│   ├── DashboardPage.tsx # User dashboard
│   ├── AdminPage.tsx    # Admin panel for product management
│   └── NotFound.tsx     # 404 error page
├── assets/              # Static assets
└── App.tsx              # Main application component
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn/bun
- Backend API server running on `http://localhost:8080`

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexus-cart-quest.git
   cd nexus-cart-quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Configure environment**
   - The frontend is configured to proxy API requests to `http://localhost:8080`
   - Update `vite.config.ts` if your backend runs on a different port

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Ensure your backend API is running on `http://localhost:8080`

## 🔧 Configuration

### API Proxy Configuration
The Vite development server is configured to proxy API requests:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

### Environment Variables
No additional environment variables are required for basic setup. All configuration is handled through the Vite config file.

## 📚 API Integration

### Expected Backend Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Clear entire cart
- `DELETE /api/cart/product/:product_id` - Remove specific product from cart
- `GET /api/orders` - Get user's orders
- `POST /api/orders/from-cart` - Create order from cart

### Authentication Flow
1. User logs in via `/api/auth/login`
2. Backend returns JWT token, email, and role
3. Frontend stores token in localStorage
4. Token is attached to all subsequent API requests
5. User state is persisted across browser sessions

## 🎯 Key Features Breakdown

### Authentication System
- JWT-based authentication with automatic token attachment
- Role-based access control (USER/ADMIN)
- Persistent login state across browser sessions
- Automatic logout on token expiry

### Product Management
- Admin can create, read, update, and delete products
- Real-time inventory tracking
- Category-based organization
- Search functionality with name and category filtering

### Shopping Cart
- Add products to cart with quantity management
- Real-time cart total calculation
- Seamless checkout process
- Cart persistence for logged-in users

### Order System
- Complete order history with detailed breakdowns
- Order status tracking
- Product information preserved in order history
- Easy reordering capabilities

### User Experience
- Responsive design for all screen sizes
- Loading states and error handling
- Toast notifications for user feedback
- Intuitive navigation and user flows

## 🚦 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏗️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [React Router](https://reactrouter.com/) - Routing
- [Axios](https://axios-http.com/) - HTTP client
- [React Hook Form](https://react-hook-form.com/) - Form handling

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Happy Shopping! 🛍️**
