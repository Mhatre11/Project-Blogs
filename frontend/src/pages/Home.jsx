import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Books",
  "Beauty",
  "Sports",
];

const POSTS_PER_PAGE = 12;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      // Simulate fetching blog posts
      const dummyPosts = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Product Review ${index + 1}`,
        description: `Description for product ${index + 1}...`,
        category: CATEGORIES[index % CATEGORIES.length],
        imageUrl: `https://placeholder.com/350x200?text=Product${index + 1}`,
        amazonLink: "https://amazon.com/...",
        price: `$${Math.floor(Math.random() * 1000) + 99}.99`,
      }));

      setBlogPosts(dummyPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-16 w-16 rounded-full border-4 border-purple-500 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center text-4xl font-bold text-purple-800"
      >
        Product Reviews
      </motion.h1>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`rounded-full px-4 py-2 ${
            selectedCategory === "All"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 hover:bg-purple-100"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 ${
              selectedCategory === category
                ? "bg-purple-500 text-white"
                : "bg-gray-200 hover:bg-purple-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-purple-100"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <span className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                {post.category}
              </span>
              <h2 className="mb-2 text-xl font-bold text-purple-900">
                {post.title}
              </h2>
              <p className="mb-4 text-gray-600">{post.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-purple-600">
                  {post.price}
                </span>
                <a
                  href={post.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-600"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded px-4 py-2 text-purple-600 disabled:opacity-50 hover:bg-purple-100"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`rounded px-4 py-2 ${
              currentPage === i + 1
                ? "bg-purple-500 text-white"
                : "bg-gray-200 hover:bg-purple-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded px-4 py-2 text-purple-600 disabled:opacity-50 hover:bg-purple-100"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
