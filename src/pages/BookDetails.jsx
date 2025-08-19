import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaBookOpen, FaExternalLinkAlt, FaHeart, FaBookmark, FaShare, FaCalendar, FaFileAlt, FaGlobe, FaBuilding, FaDownload } from "react-icons/fa";

const BookDetails = () => {
  const { id } = useParams();

  const fetchBookDetails = async () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}${API_KEY ? `?key=${API_KEY}` : ""}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    return response.json();
  };

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: fetchBookDetails,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <Link to="/books" className="text-cyan-600 hover:text-cyan-500">
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  const { volumeInfo, accessInfo } = book;
  const bookImage =
    volumeInfo.imageLinks?.medium ||
    volumeInfo.imageLinks?.small ||
    volumeInfo.imageLinks?.thumbnail;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-cyan-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/books" className="hover:text-cyan-600 transition-colors">
              Books
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{volumeInfo.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 text-center">
                <img
                  src={
                    bookImage
                      ? bookImage.replace("http:", "https:")
                      : "/placeholder.svg"
                  }
                  alt={volumeInfo.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-xl mb-8 hover:shadow-2xl transition-shadow duration-300"
                />

                {/* Action Buttons */}
                <div className="space-y-4">
                  {accessInfo?.webReaderLink && (
                    <a
                      href={accessInfo.webReaderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold inline-block transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <FaBookOpen className="mr-2 inline" />
                      Read Preview
                    </a>
                  )}

                  {volumeInfo.previewLink && (
                    <a
                      href={volumeInfo.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg border border-gray-300 transition-all duration-300 font-semibold inline-block hover:scale-105"
                    >
                      <FaExternalLinkAlt className="mr-2 inline" />
                      View on Google Books
                    </a>
                  )}
                </div>

                {/* Reaction Buttons */}
                <div className="flex justify-center space-x-8 mt-8 pt-6 border-t border-gray-200">
                  <button className="flex flex-col items-center text-gray-500 hover:text-red-500 transition-colors group">
                    <FaHeart className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Like</span>
                  </button>
                  <button className="flex flex-col items-center text-gray-500 hover:text-cyan-600 transition-colors group">
                    <FaBookmark className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Save</span>
                  </button>
                  <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors group">
                    <FaShare className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Title and Author */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                  {volumeInfo.title}
                </h1>
                {volumeInfo.authors && (
                  <p className="text-xl text-cyan-600 mb-6 font-medium">
                    by {volumeInfo.authors.join(", ")}
                  </p>
                )}

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  {volumeInfo.publishedDate && (
                    <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                      <FaCalendar className="mr-3 text-cyan-600" />
                      <span>
                        <span className="font-medium text-gray-900">Published:</span>{" "}
                        {new Date(volumeInfo.publishedDate).getFullYear()}
                      </span>
                    </div>
                  )}
                  {volumeInfo.pageCount && (
                    <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                      <FaFileAlt className="mr-3 text-cyan-600" />
                      <span>
                        <span className="font-medium text-gray-900">Pages:</span>{" "}
                        {volumeInfo.pageCount}
                      </span>
                    </div>
                  )}
                  {volumeInfo.language && (
                    <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                      <FaGlobe className="mr-3 text-cyan-600" />
                      <span>
                        <span className="font-medium text-gray-900">Language:</span>{" "}
                        {volumeInfo.language.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {volumeInfo.publisher && (
                    <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                      <FaBuilding className="mr-3 text-cyan-600" />
                      <span>
                        <span className="font-medium text-gray-900">Publisher:</span>{" "}
                        {volumeInfo.publisher}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              {volumeInfo.categories && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {volumeInfo.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-300 hover:from-cyan-200 hover:to-cyan-300 transition-all duration-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {volumeInfo.description && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    About This Book
                  </h3>
                  <div
                    className="text-gray-600 leading-relaxed prose prose-gray max-w-none prose-p:text-gray-600 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: volumeInfo.description
                        .replace(/<br\s*\/?>/gi, "</p><p>")
                        .replace(/^/, "<p>")
                        .replace(/$/, "</p>"),
                    }}
                  />
                </div>
              )}

              {/* Download Options */}
              {(accessInfo?.epub?.downloadLink ||
                accessInfo?.pdf?.downloadLink) && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Download Options
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {accessInfo.epub?.downloadLink && (
                      <a
                        href={accessInfo.epub.downloadLink}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg border border-gray-300 transition-all duration-300 inline-flex items-center font-medium hover:scale-105"
                      >
                        <FaDownload className="mr-2 text-cyan-600" />
                        EPUB
                      </a>
                    )}
                    {accessInfo.pdf?.downloadLink && (
                      <a
                        href={accessInfo.pdf.downloadLink}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg border border-gray-300 transition-all duration-300 inline-flex items-center font-medium hover:scale-105"
                      >
                        <FaDownload className="mr-2 text-cyan-600" />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;