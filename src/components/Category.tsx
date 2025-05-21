import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Category = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes/tags")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tags");
        return res.json();
      })
      .then((data) => {
        setTags(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tags:", err);
        setError("Something went wrong.");
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-4 text-gray-800 text-center "
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Recipe Categories
      </motion.h2>

      {loading && <p className="text-gray-600">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Slider {...settings}>
          {tags.map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 flex items-center justify-center mx-2 bg-yellow-400 text-black text-center rounded-full text-sm font-semibold shadow-lg hover:bg-yellow-500 transition cursor-pointer">
                {tag.length > 10 ? tag.slice(0, 10) + '…' : tag}
              </div>
            </motion.div>
          ))}
        </Slider>
      )}
    </motion.div>
  );
};

export default Category;
