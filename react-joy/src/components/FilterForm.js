import React, { useState } from "react";
import moment from "moment";

function FilterForm({ onFilterChange }) {
  // State for each filter criteria
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [subject, setSubject] = useState("");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange({ month, year, color, subject });
  };

  const handleYearChange = (event) => {
    const inputYear = event.target.value;
    // Use moment to check if the year is not in the future
    if (moment().year(inputYear).isSameOrBefore(moment())) {
      setYear(inputYear);
    } else {
      alert("Year cannot be in the future!");
      setYear(""); // Reset the year input if invalid
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="month">Month:</label>
        <input
          type="number"
          id="month"
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          name="year"
          value={year}
          onChange={handleYearChange}
        />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterForm;
