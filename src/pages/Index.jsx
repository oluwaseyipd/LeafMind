import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Book, Mail, Brain, Languages, Heart, Users } from "lucide-react";
import heroImage from "../assets/hero-books.jpg"; 
import LibraryImage from "../assets/library-interior.jpg"; 

const Index = () => {


  const benefits = [
    {
      icon: Brain,
      title: "Boosts Your Brainpower",
      description: "Reading stimulates neural pathways and improves cognitive function, keeping your mind sharp and active."
    },
    {
      icon: Languages,
      title: "Expands Your Vocabulary",
      description: "Regular reading introduces you to new words and phrases, enhancing your communication skills."
    },
    {
      icon: Heart,
      title: "Increases Empathy and Focus",
      description: "Books help you understand different perspectives and improve your ability to concentrate for extended periods."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50"> 
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-cyan-900/70"></div>
        

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block text-cyan-400 drop-shadow-lg">Favorite Book</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Explore thousands of books across genres, powered by AI and the Google Books API
          </p>
          

          <Link
            to="/books"
            className="w-[250px] mx-auto bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5 mr-2" />
            <span>Browse Library</span>
          </Link>
          

          <div className="mt-12 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>


{/* About LeafMind Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About LeafMind</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                LeafMind is a curated digital library that helps book lovers discover and explore a world of stories, knowledge, and inspiration. Join our book community and spark your reading journey.
              </p>
              <p className="text-gray-600 mb-10 leading-relaxed">
                We believe that every book has the power to change a life, spark an idea, or transport you to another world. Our mission is to make discovering your next great read as easy and enjoyable as possible.
              </p>
              <Link
                to="/contact"
                className="flex items-center gap-2 w-[250px] bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1"
              >
              <Users className="w-5 h-5" />
                Join Our Community
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src={LibraryImage}
                  alt="Cozy library interior"
                  className="w-full rounded-xl shadow-2xl"
                />
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Books Are Good Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Books Are Good for You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Reading isn't just entertainment – it's a powerful tool for personal growth and mental well-being
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center hover:scale-105 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 border border-cyan-300 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-cyan-200 group-hover:to-cyan-300 transition-all duration-300">
                  {benefit.icon && <benefit.icon className="text-cyan-600 w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-cyan-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of book lovers who have already discovered their next favorite read with LeafMind
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/books"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Book className="w-5 h-5" />
              Explore Books
            </Link>
            <Link
              to="/contact"
              className=" bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-lg font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
          </div>
          
          {/* Decorative line */}
          <div className="mt-12 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index