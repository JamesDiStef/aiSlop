import { useState } from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

const robots = [
  {
    name: 'ASIMO',
    image: '/asimo.jpg',
    link: 'https://en.wikipedia.org/wiki/ASIMO',
  },
  {
    name: 'Atlas',
    image: '/atlas.jpg',
    link: 'https://en.wikipedia.org/wiki/Atlas_(robot)',
  },
  {
    name: 'Spot',
    image: '/spot.jpg',
    link: 'https://en.wikipedia.org/wiki/Spot_(robot)',
  },
];

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: posts = [], isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(posts.length / rowsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % robots.length);
    setCurrentPage((currentPage % totalPages) + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + robots.length) % robots.length);
    setCurrentPage((currentPage - 2 + totalPages) % totalPages + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Robot Carousel</h1>
      <div className="carousel w-96 h-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={robots[currentIndex].image}
          alt={robots[currentIndex].name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between w-96 mt-4">
        <button className="btn btn-circle btn-primary" onClick={handlePrev}>
          ◀
        </button>
        <a
          href={robots[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Learn More
        </a>
        <button className="btn btn-circle btn-primary" onClick={handleNext}>
          ▶
        </button>
      </div>
      <div className="mt-8 w-96">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="overflow-x-auto">
          <table className="table table-fixed w-full border border-gray-300">
            <thead>
              <tr>
                <th className="w-1/6">ID</th>
                <th className="w-2/6">Title</th>
                <th className="w-3/6">Body</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr key={post.id}>
                  <td className="text-center">{post.id}</td>
                  <td className="truncate">{post.title}</td>
                  <td className="truncate">{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="btn btn-circle btn-primary"
            onClick={handlePrev}
            disabled={currentPage === 1 && totalPages === 1}
          >
            ◀
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-circle btn-primary"
            onClick={handleNext}
            disabled={currentPage === totalPages && totalPages === 1}
          >
            ▶
          </button>
        </div>
      </div>
      <footer className="mt-8">
        <a
          href="https://github.com/JamesDiStef"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit My GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
