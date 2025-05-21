import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutModal from "./components/CheckoutModal";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/products" component={Products}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/admin" component={Admin}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Main App component
function App() {
  return (
    <TooltipProvider>
      <ProductsProvider>
        <CartProvider>
          <Navbar />
          <ShoppingCart />
          <CheckoutModal />
          <OrderConfirmationModal />
          <Router />
          <Footer />
          <Toaster />
        </CartProvider>
      </ProductsProvider>
    </TooltipProvider>
  );
}

export default App;
