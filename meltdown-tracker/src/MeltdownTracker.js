import React, { useState, useEffect } from 'react';

const BIN_ID = "67a14774ad19ca34f8f956c7"; // Replace with your actual JSONBin ID
const API_KEY = "$2a$10$KXcOxj3.fZxuE7t0JEYtVeJOhdl6OQGF0/wcixatIPPXV9fHql0jK" // Replace with your JSONBin API Key
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Fetch data from JSONBin.io
const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });
    const data = await response.json();
    return data.record;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { person1Meltdowns: 0, person2Meltdowns: 0 };
  }
};

// Update JSONBin.io when user clicks "Save"
const updateData = async (person1Count, person2Count) => {
  try {
    await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ person1Meltdowns: person1Count, person2Meltdowns: person2Count }),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const MeltdownTracker = () => {
  const [person1Count, setPerson1Count] = useState(0);
  const [person2Count, setPerson2Count] = useState(0);
  const [isSaved, setIsSaved] = useState(true); // Track if changes need saving

  // Load scores from JSONBin.io when the app starts
  useEffect(() => {
    const loadScores = async () => {
      const data = await fetchData();
      setPerson1Count(data.person1Meltdowns);
      setPerson2Count(data.person2Meltdowns);
    };
    loadScores();
  }, []);

  // Function to update local values (without API call)
  const handleUpdate = (person, value) => {
    if (person === 1) setPerson1Count(value);
    else setPerson2Count(value);
    setIsSaved(false); // Mark as unsaved
  };

  // Function to manually save data to JSONBin.io
  const handleSave = async () => {
    await updateData(person1Count, person2Count);
    setIsSaved(true); // Mark as saved
  };

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
            <h2 className="text-xl font-semibold">Jess</h2>
            <div className="text-4xl">{getEmoji(person1Count)}</div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleUpdate(1, Math.max(0, person1Count - 1))}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -
            </button>
            <div className="flex-1">
              <input
                type="range"
                value={person1Count}
                onChange={(e) => handleUpdate(1, Number(e.target.value))}
                min="0"
                max="100"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button 
              onClick={() => handleUpdate(1, Math.min(100, person1Count + 1))}
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
            <h2 className="text-xl font-semibold">Tsani</h2>
            <div className="text-4xl">{getEmoji(person2Count)}</div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleUpdate(2, Math.max(0, person2Count - 1))}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -
            </button>
            <div className="flex-1">
              <input
                type="range"
                value={person2Count}
                onChange={(e) => handleUpdate(2, Number(e.target.value))}
                min="0"
                max="100"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button 
              onClick={() => handleUpdate(2, Math.min(100, person2Count + 1))}
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
                "Jess is winning the meltdown race! 🏆"
              ) : (
                "Tsani is winning the meltdown race! 🏆"
              )}
            </p>
          </div>
        )}

        {/* Save Button */}
        <div className="text-center mt-6">
          <button 
            onClick={handleSave} 
            className={`px-6 py-2 text-white rounded transition-colors ${
              isSaved ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSaved}
          >
            {isSaved ? "Saved ✅" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeltdownTracker;