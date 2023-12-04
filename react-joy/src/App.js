import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import FilterForm from "./components/FilterForm";
import "./App.css";

function App() {
  const [episodes, setEpisodes] = useState([]); // State to store filtered episodes

  // Function to handle filter changes
  const onFilterChange = async (filters) => {
    try {
      // Constructing the query parameters based on filters
      const queryParams = new URLSearchParams(filters);

      // Making an API request with the selected filters
      const response = await axios.get(
        `http://localhost:3001/episodes/filter?${queryParams}`
      );

      // Updating the episodes state with the fetched data
      setEpisodes(response.data);
    } catch (error) {
      console.error("Error fetching filtered episodes:", error);
    }
  };

  return (
    <div className="App">
      <h1>The Joy of Painting Episodes</h1>
      <FilterForm onFilterChange={onFilterChange} />
      <div>
        {episodes.map((episode, index) => (
          <div key={index}>
            <h2>{episode.title}</h2>
            <p>Broadcast Date: {moment(episode.broadcast_date).format("LL")}</p>
            {/* 'LL' is the format string for a date like "September 4, 1986". Change it as needed. */}
            {/* Additional episode details can be displayed here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
