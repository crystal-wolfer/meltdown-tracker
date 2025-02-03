import React, { useState, useEffect } from 'react';

const MeltdownTracker = () => {
  // Initialize state with data from localStorage or defaults
  const [person1Count, setPerson1Count] = useState(() => {
    const saved = localStorage.getItem('person1Meltdowns');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [person2Count, setPerson2Count] = useState(() => {
    const saved = localStorage.getItem('person2Meltdowns');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save to localStorage whenever counts change
  useEffect(() => {
    localStorage.setItem('person1Meltdowns', person1Count.toString());
    localStorage.setItem('person2Meltdowns', person2Count.toString());
  }, [person1Count, person2Count]);

  // Function to get appropriate emoji based on count
  const getEmoji = (count) => {
    if (count < 10) return '😊';
    if (count < 20) return '😅';
    if (count < 30) return '😓';
    if (count < 40) return '😰';
    if (count < 50) return '😱';
    if (count < 60) return '🤯';
    if (count < 70) return '😤';
    if (count < 80) return '😡';
    if (count < 90) return '🤬';
    return '💥';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl text-center font-bold mb-6">Meltdown Tracker</h1>
      </div>
      
      <div className="space-y-8">
        {/* Person 1 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Person 1</h2>
            <div className="text-4xl">{getEmoji(person1Count)}</div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setPerson1Count(Math.max(0, person1Count - 1))}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -
            </button>
            <div className="flex-1">
              <input
                type="range"
                value={person1Count}
                onChange={(e) => setPerson1Count(Number(e.target.value))}
                min="0"
                max="100"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button 
              onClick={() => setPerson1Count(Math.min(100, person1Count + 1))}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              +
            </button>
            <span className="w-12 text-center font-mono">{person1Count}</span>
          </div>
        </div>

        {/* Person 2 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Person 2</h2>
            <div className="text-4xl">{getEmoji(person2Count)}</div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setPerson2Count(Math.max(0, person2Count - 1))}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -
            </button>
            <div className="flex-1">
              <input
                type="range"
                value={person2Count}
                onChange={(e) => setPerson2Count(Number(e.target.value))}
                min="0"
                max="100"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button 
              onClick={() => setPerson2Count(Math.min(100, person2Count + 1))}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              +
            </button>
            <span className="w-12 text-center font-mono">{person2Count}</span>
          </div>
        </div>

        {/* Winner Banner */}
        {(person1Count > 0 || person2Count > 0) && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-xl">
              {person1Count === person2Count ? (
                "It's a tie! You're both equally melting down! 🤝"
              ) : person1Count > person2Count ? (
                "Person 1 is winning the meltdown race! 🏆"
              ) : (
                "Person 2 is winning the meltdown race! 🏆"
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeltdownTracker;