import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaBookmark } from "react-icons/fa";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);

  const categories = [
    { id: "all", name: "All Books" },
    { id: "fiction", name: "Fiction" },
    { id: "history", name: "History" },
    { id: "science", name: "Science" },
    { id: "biography", name: "Biography" },
    { id: "technology", name: "Technology" },
    { id: "self-help", name: "Self Help" },
    { id: "business", name: "Business" },
  ];

  const fetchBooks = async () => {
    const startIndex = (page - 1) * 20;
    let query = searchQuery.trim() === "" ? "all" : searchQuery.trim();
    const categoryFilter =
      selectedCategory !== "all" ? `+subject:${selectedCategory}` : "";

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}${categoryFilter}&startIndex=${startIndex}&maxResults=20`
    );

    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", searchQuery, selectedCategory, page],
    queryFn: fetchBooks,
    keepPreviousData: true, // keeps old data while fetching new page
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page when searching
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // reset to first page when switching category
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-cyan-900 py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-pulse">
            Search for Books You Love
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore our vast collection of books powered by Google Books API
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, authors, or topics..."
                className="flex-1 px-6 py-4 rounded-lg border border-gray-600 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 font-semibold flex items-center justify-center hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-gray-100 text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 border border-gray-200 hover:border-cyan-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg font-medium">Failed to load books. Please try again.</p>
            </div>
          )}

          {data?.items && data.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {data.items.map((book) => (
                  <Link key={book.id} to={`/books/${book.id}`} className="group block">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 group">
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <img
                          src={
                            book.volumeInfo.imageLinks?.thumbnail
                              ? book.volumeInfo.imageLinks.thumbnail.replace("http:", "https:")
                              : "/placeholder.svg"
                          }
                          alt={book.volumeInfo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors duration-200">
                          {book.volumeInfo.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-4 line-clamp-1 font-medium">
                          {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                        </p>
                        {book.volumeInfo.categories && (
                          <span className="inline-block bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 text-xs px-3 py-1 rounded-full font-semibold border border-cyan-300">
                            {book.volumeInfo.categories[0]}
                          </span>
                        )}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          <div className="flex space-x-4">
                            <button
                              aria-label="Add to favorites"
                              className="text-gray-500 hover:text-red-500 transition-colors duration-200 hover:scale-110"
                            >
                              <FaHeart />
                            </button>
                            <button
                              aria-label="Bookmark"
                              className="text-gray-500 hover:text-cyan-600 transition-colors duration-200 hover:scale-110"
                            >
                              <FaBookmark />
                            </button>
                          </div>
                          <span className="text-xs text-gray-500 group-hover:text-cyan-600 transition-colors duration-200 font-medium">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-cyan-500 hover:text-white disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-4 py-2 font-semibold">{page}</span>

                <button
                  onClick={() => setPage((old) => old + 1)}
                  disabled={!data.items || data.items.length < 20}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-cyan-500 hover:text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            !isLoading && (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-3xl text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No books found</h3>
                <p className="text-gray-600 text-lg">Try adjusting your search terms or filters.</p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Books;
