import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const BookDetails = () => {
  const { id } = useParams();

  const fetchBookDetails = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBX-8vTwj1G5F8FJtE-r8CvTvCgD3Zj9aE`
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Book not found</h1>
          <Link to="/books" className="text-primary hover:text-primary-glow">
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
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/books" className="hover:text-primary">
              Books
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{volumeInfo.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-lg shadow-elegant p-6 text-center">
                <img
                  src={
                    bookImage
                      ? bookImage.replace("http:", "https:")
                      : "/placeholder.svg"
                  }
                  alt={volumeInfo.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-book mb-6"
                />

                {/* Action Buttons */}
                <div className="space-y-4">
                  {accessInfo?.webReaderLink && (
                    <a
                      href={accessInfo.webReaderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-glow transition-all duration-200 font-semibold inline-block"
                    >
                      <i className="fas fa-book-open mr-2"></i>
                      Read Preview
                    </a>
                  )}

                  {volumeInfo.previewLink && (
                    <a
                      href={volumeInfo.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent-glow transition-all duration-200 font-semibold inline-block"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      View on Google Books
                    </a>
                  )}
                </div>

                {/* Reaction Buttons */}
                <div className="flex justify-center space-x-6 mt-6 pt-6 border-t border-border">
                  <button className="flex flex-col items-center text-muted-foreground hover:text-destructive transition-colors">
                    <i className="far fa-heart text-xl mb-1"></i>
                    <span className="text-xs">Like</span>
                  </button>
                  <button className="flex flex-col items-center text-muted-foreground hover:text-accent transition-colors">
                    <i className="far fa-bookmark text-xl mb-1"></i>
                    <span className="text-xs">Save</span>
                  </button>
                  <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                    <i className="fas fa-share text-xl mb-1"></i>
                    <span className="text-xs">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Title and Author */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
                  {volumeInfo.title}
                </h1>
                {volumeInfo.authors && (
                  <p className="text-xl text-muted-foreground mb-4">
                    by {volumeInfo.authors.join(", ")}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {volumeInfo.publishedDate && (
                    <span>
                      <i className="fas fa-calendar mr-1"></i>
                      Published:{" "}
                      {new Date(volumeInfo.publishedDate).getFullYear()}
                    </span>
                  )}
                  {volumeInfo.pageCount && (
                    <span>
                      <i className="fas fa-file-alt mr-1"></i>
                      {volumeInfo.pageCount} pages
                    </span>
                  )}
                  {volumeInfo.language && (
                    <span>
                      <i className="fas fa-globe mr-1"></i>
                      Language: {volumeInfo.language.toUpperCase()}
                    </span>
                  )}
                  {volumeInfo.publisher && (
                    <span>
                      <i className="fas fa-building mr-1"></i>
                      {volumeInfo.publisher}
                    </span>
                  )}
                </div>
              </div>

              {/* Categories */}
              {volumeInfo.categories && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {volumeInfo.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {volumeInfo.description && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    About This Book
                  </h3>
                  <div
                    className="text-muted-foreground leading-relaxed prose prose-neutral max-w-none"
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
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Download Options
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {accessInfo.epub?.downloadLink && (
                      <a
                        href={accessInfo.epub.downloadLink}
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors inline-flex items-center"
                      >
                        <i className="fas fa-download mr-2"></i>
                        EPUB
                      </a>
                    )}
                    {accessInfo.pdf?.downloadLink && (
                      <a
                        href={accessInfo.pdf.downloadLink}
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors inline-flex items-center"
                      >
                        <i className="fas fa-download mr-2"></i>
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
