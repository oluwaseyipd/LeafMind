import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaBookmark } from "react-icons/fa";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("trending");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const fetchBooks = async ({ pageParam = 0 }) => {
    const categoryFilter = selectedCategory !== "all" ? `+subject:${selectedCategory}` : "";
    const startIndex = pageParam * 20;

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${categoryFilter}&startIndex=${startIndex}&maxResults=20`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["books", searchQuery, selectedCategory],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.items || lastPage.items.length === 0) return undefined;
      return allPages.length; // pageParam increments by 1
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Search for Books You Love
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Explore our vast collection of books powered by Google Books API
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, authors, or topics..."
                className="flex-1 px-6 py-4 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent-glow transition-all duration-200 font-semibold flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-destructive text-lg">Failed to load books. Please try again.</p>
            </div>
          )}

          {data?.pages && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.pages.flatMap((page) =>
                page.items?.map((book) => (
                  <Link key={book.id} to={`/books/${book.id}`} className="group block">
                    <div className="bg-card rounded-lg shadow-book hover:shadow-elegant transition-all duration-300 overflow-hidden hover:scale-105">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={
                            book.volumeInfo.imageLinks?.thumbnail
                              ? book.volumeInfo.imageLinks.thumbnail.replace("http:", "https:")
                              : "/placeholder.svg"
                          }
                          alt={book.volumeInfo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-card-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {book.volumeInfo.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-3 line-clamp-1">
                          {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                        </p>
                        {book.volumeInfo.categories && (
                          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {book.volumeInfo.categories[0]}
                          </span>
                        )}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div className="flex space-x-3">
                            <button
                              aria-label="Add to favorites"
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <FaHeart />
                            </button>
                            <button
                              aria-label="Bookmark"
                              className="text-muted-foreground hover:text-accent transition-colors"
                            >
                              <FaBookmark />
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                            Read more
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Load More */}
          {hasNextPage && (
            <div className="text-center mt-12">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-glow transition-all duration-200 font-semibold"
              >
                {isFetchingNextPage ? "Loading..." : "Load More Books"}
              </button>
            </div>
          )}

          {!isLoading && data?.pages.every((p) => !p.items || p.items.length === 0) && (
            <div className="text-center py-20">
              <FaSearch className="text-6xl text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Books;
