// frontend/components/NewsFeed.js
import { useState, useEffect } from "react";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "cryptocurrency",
            sortBy: "publishedAt",
            apiKey: "your-newsapi-key",
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités :", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h2>Dernières Actualités</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;