import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f8f5f1] px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-center mb-6">Get in Touch</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Have questions about our products, events, or want to plan a visit? Reach out to us and we'll get back to you as soon as possible.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-heading font-bold mb-6">Visit Us</h3>
              
              <div className="flex items-start mb-4">
                <div className="text-primary text-xl mr-4">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-gray-600">
                    Mansouria Farm, Rural Route 7<br />
                    Countryside Valley, CV 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="text-primary text-xl mr-4">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="text-primary text-xl mr-4">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@mansouriaretreat.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary text-xl mr-4">
                  <Clock />
                </div>
                <div>
                  <h4 className="font-semibold">Open Hours</h4>
                  <p className="text-gray-600">
                    Wednesday to Sunday: 9:00 AM - 5:00 PM<br />
                    Monday & Tuesday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714940064236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620247801759!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
