import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useProducts } from "../contexts/ProductsContext";
import ProductCard from "../components/ProductCard";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="hero-section"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Mansouria Retreat</h1>
          <p className="text-xl md:text-2xl text-white mb-8">Experience authentic farm life and organic products</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg">
              Explore Our Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">Experience Mansouria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Host Your Events */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Host your events at Mansouria" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Host Your Events</h3>
                <p className="text-gray-600">Perfect venue for weddings, retreats, and gatherings in a picturesque farm setting.</p>
                <a href="#events" className="inline-block mt-4 text-primary hover:text-primary/80 font-semibold">
                  Learn more <ArrowRight className="inline ml-1" size={16} />
                </a>
              </div>
            </div>
            
            {/* Feature 2: Clear Your Mind */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Clear your mind at Mansouria" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Clear Your Mind</h3>
                <p className="text-gray-600">Reconnect with nature through meditation, yoga, and mindfulness activities.</p>
                <a href="#retreat" className="inline-block mt-4 text-primary hover:text-primary/80 font-semibold">
                  Learn more <ArrowRight className="inline ml-1" size={16} />
                </a>
              </div>
            </div>
            
            {/* Feature 3: Enjoy Tasty Food */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1470549813517-2fa741d25c92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Enjoy farm-to-table food at Mansouria" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Enjoy Tasty Food</h3>
                <p className="text-gray-600">Savor authentic farm-to-table dining experiences with our fresh organic produce.</p>
                <a href="#dining" className="inline-block mt-4 text-primary hover:text-primary/80 font-semibold">
                  Learn more <ArrowRight className="inline ml-1" size={16} />
                </a>
              </div>
            </div>
            
            {/* Feature 4: Live the Farm Life */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Experience farm life at Mansouria" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Live the Farm Life</h3>
                <p className="text-gray-600">Participate in farming activities, from harvesting to animal care, in our working farm.</p>
                <a href="#farm-life" className="inline-block mt-4 text-primary hover:text-primary/80 font-semibold">
                  Learn more <ArrowRight className="inline ml-1" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#f8f5f1] px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-6">Featured Farm Products</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Discover our range of organic farm products, harvested and prepared with care for the best quality and taste.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-3 px-6 rounded-lg transition">
                View All Products <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">About Mansouria Retreat</h2>
              <p className="text-gray-600 mb-4">
                Nestled in the heart of the countryside, Mansouria Retreat is a family-owned farm dedicated to sustainable agriculture and authentic rural experiences. For over three generations, we've been cultivating the land using traditional methods combined with modern ecological practices.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to reconnect people with nature and the source of their food. Whether you're joining us for a day trip, a workshop, or a longer retreat, we offer a space to slow down, learn, and enjoy the simple pleasures of farm life.
              </p>
              <p className="text-gray-600 mb-6">
                All our products are grown and prepared on-site, ensuring the highest quality and freshness. We take pride in our ethical farming practices that respect the land, animals, and the natural ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition">
                    Contact Us
                  </Button>
                </Link>
                <a href="#events">
                  <Button variant="outline" className="bg-white border-2 border-primary hover:bg-primary/5 text-primary font-semibold py-3 px-6 rounded-lg transition">
                    Our Events
                  </Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
                alt="Farmer harvesting vegetables" 
                className="rounded-lg shadow-md h-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250" 
                alt="Family enjoying farm-to-table meal" 
                className="rounded-lg shadow-md object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250" 
                alt="Farm animals grazing" 
                className="rounded-lg shadow-md object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
                alt="Rustic farm building" 
                className="rounded-lg shadow-md h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
