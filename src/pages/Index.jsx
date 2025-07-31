import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import heroImage from "../assets/hero-books.jpg"; 
import LibraryImage from "../assets/library-interior.jpg"; 

const Index = () => {
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
    </div>
  )
}

export default Index