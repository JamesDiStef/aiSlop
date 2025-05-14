import { useState } from 'react';
import './App.css';

const robots = [
  {
    name: 'ASIMO',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/ASIMO.jpg',
    link: 'https://en.wikipedia.org/wiki/ASIMO',
  },
  {
    name: 'Atlas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Atlas_front_view.jpg',
    link: 'https://en.wikipedia.org/wiki/Atlas_(robot)',
  },
  {
    name: 'Spot',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Spot_Mini.jpg',
    link: 'https://en.wikipedia.org/wiki/Spot_(robot)',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % robots.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + robots.length) % robots.length);
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
        <button className="btn btn-primary" onClick={handlePrev}>
          Previous
        </button>
        <a
          href={robots[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Learn More
        </a>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
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
