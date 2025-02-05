import React, { useState, useEffect } from "react";

const BIN_ID = "67a14774ad19ca34f8f956c7";
const API_KEY = "$2a$10$KXcOxj3.fZxuE7t0JEYtVeJOhdl6OQGF0/wcixatIPPXV9fHql0jK";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

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

const updateData = async (person1Count, person2Count) => {
  try {
    await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({
        person1Meltdowns: person1Count,
        person2Meltdowns: person2Count,
      }),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const MeltdownTracker = () => {
  const [person1Count, setPerson1Count] = useState(0);
  const [person2Count, setPerson2Count] = useState(0);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      const data = await fetchData();
      setPerson1Count(data.person1Meltdowns);
      setPerson2Count(data.person2Meltdowns);
    };
    loadScores();
  }, []);

  const handleUpdate = (person, value) => {
    if (person === 1) {
      setPerson1Count(value);
    } else {
      setPerson2Count(value);
    }
    setIsSaved(false);
  };

  const handleSave = async () => {
    await updateData(person1Count, person2Count);
    setIsSaved(true);
  };

  const getEmojiAndLabel = (count) => {
    if (count < 5) return { emoji: "😊", label: "Still OK" };
    if (count < 20) return { emoji: "😅", label: "Slightly Stressed" };
    if (count < 30) return { emoji: "😓", label: "Worried" };
    if (count < 40) return { emoji: "😰", label: "Anxious" };
    if (count < 50) return { emoji: "😱", label: "Scared" };
    if (count < 60) return { emoji: "🤯", label: "Mind Blown" };
    if (count < 70) return { emoji: "😤", label: "Frustrated" };
    if (count < 80) return { emoji: "😡", label: "Angry" };
    if (count < 90) return { emoji: "🤬", label: "Furious" };
    return { emoji: "💥", label: "Complete Meltdown" };
  };

  const renderPersonTracker = (name, count, person) => {
    return (
      <div className="mb-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xl">{name}</h2>
            <div className="text-2xl w-8 text-center">
              {getEmojiAndLabel(count).emoji}
            </div>
          </div>
          <span className="text-sm text-gray-600">
            {getEmojiAndLabel(count).label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleUpdate(person, Math.max(0, count - 1))}
            className="w-12 h-12 flex items-center justify-center bg-red-500 text-white text-2xl font-medium rounded-lg hover:bg-red-600 focus:outline-none"
          >
            -
          </button>

          <div className="flex-1">
            <input
              type="range"
              value={count}
              onInput={(e) => handleUpdate(person, Number(e.target.value))}
              min="0"
              max="100"
              step="1"
              className="custom-slider"
            />
          </div>

          <button
            onClick={() => handleUpdate(person, Math.min(100, count + 1))}
            className="w-12 h-12 flex items-center justify-center bg-green-500 text-white text-2xl font-medium rounded-lg hover:bg-green-600 focus:outline-none"
          >
            +
          </button>

          <span className="w-8 text-xl text-center">{count}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center mb-12">Meltdown Tracker</h1>

      <div>
        {renderPersonTracker("Jess", person1Count, 1)}
        {renderPersonTracker("Tsani", person2Count, 2)}

        {(person1Count > 0 || person2Count > 0) && (
          <div className="mt-8 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-xl">
              {person1Count === person2Count
                ? "It's a tie! You're both equally melting down! 🤝"
                : person1Count > person2Count
                ? "Jess is winning the meltdown race! 🏆"
                : "Tsani is winning the meltdown race! 🏆"}
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`
              px-6 py-2 rounded-lg text-white transition-colors
              ${
                isSaved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }
            `}
          >
            {isSaved ? "Saved ✅" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeltdownTracker;
