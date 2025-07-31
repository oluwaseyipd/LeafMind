import { useState } from "react";
import { Send, Info, Mail, Clock, Handshake, Share2, Twitter, Linkedin, Instagram, HelpCircle } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };  

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        setFormData({
            name: "",
            email: "",
            message: ""
        });

        alert("Thank you for your message! We'll get back to you soon.");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-white via-gray-50 to-cyan-50 py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/30 to-transparent"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        We'd love to hear from you! Whether it's feedback, book requests, or partnership opportunities — reach out anytime.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 mx-auto rounded-full"></div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 max-h-fit">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg mr-3 flex items-center justify-center">
                                <Send className="text-white w-5 h-5" />
                            </div>
                            Send us a Message
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-cyan-600 mb-3">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-cyan-600 mb-3">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-cyan-600 mb-3">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-vertical"
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg mr-3 flex items-center justify-center">
                                <Info className="text-white w-5 h-5" />
                            </div>
                            Contact Information
                        </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-14 h-14 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-all duration-200">
                                        <Mail className="text-cyan-600 w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                                        <p className="text-gray-600 mb-1">hello@leafmind.com</p>
                                        <p className="text-gray-600">support@leafmind.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="w-14 h-14 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-all duration-200">
                                        <Clock className="text-cyan-600 w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                                        <p className="text-gray-600 mb-1">We typically respond within 24 hours</p>
                                        <p className="text-gray-600">Monday - Friday, 9 AM - 6 PM GMT+1</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="w-14 h-14 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-all duration-200">
                                        <Handshake className="text-cyan-600 w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Partnerships</h3>
                                        <p className="text-gray-600 mb-1">Interested in collaborating?</p>
                                        <p className="text-gray-600">partnerships@leafmind.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg mr-3 flex items-center justify-center">
                                <Share2 className="text-white w-5 h-5" />
                            </div>
                            Follow Us
                        </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Stay connected with our book community and get the latest updates on new features and book recommendations.
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4">
                                <a
                                    href="https://twitter.com/leafmind"
                                    className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 text-center group transform hover:-translate-y-1"
                                >
                                    <Twitter className="w-7 h-7 mb-3 group-hover:scale-110 transition-transform mx-auto" />
                                    <p className="text-sm font-semibold">Twitter</p>
                                </a>
                                <a
                                    href="https://linkedin.com/company/leafmind"
                                    className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-6 rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 text-center group transform hover:-translate-y-1"
                                >
                                    <Linkedin className="w-7 h-7 mb-3 group-hover:scale-110 transition-transform mx-auto" />
                                    <p className="text-sm font-semibold">LinkedIn</p>
                                </a>
                                <a
                                    href="https://instagram.com/leafmind"
                                    className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white p-6 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-200 text-center group transform hover:-translate-y-1"
                                >
                                    <Instagram className="w-7 h-7 mb-3 group-hover:scale-110 transition-transform mx-auto" />
                                    <p className="text-sm font-semibold">Instagram</p>
                                </a>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg mr-3 flex items-center justify-center">
                                <HelpCircle className="text-white w-5 h-5" />
                            </div>
                            FAQ
                        </h2>
                            
                            <div className="space-y-6">
                                <div className="border-l-4 border-cyan-500 bg-cyan-50/50 pl-6 py-4 rounded-r-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">How do I request a specific book?</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Simply send us a message with the book title and author, and we'll do our best to add it to our collection.
                                    </p>
                                </div>
                                
                                <div className="border-l-4 border-cyan-500 bg-cyan-50/50 pl-6 py-4 rounded-r-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">Can I suggest new features?</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Absolutely! We love hearing from our community. Your feedback helps us improve LeafMind for everyone.
                                    </p>
                                </div>
                                
                                <div className="border-l-4 border-cyan-500 bg-cyan-50/50 pl-6 py-4 rounded-r-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">Are you hiring?</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We're always looking for passionate book lovers and talented developers. Reach out to learn about opportunities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;