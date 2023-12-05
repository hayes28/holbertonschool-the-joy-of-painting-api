import React, { useState } from "react";
import moment from "moment";
import ColorSwatch from "../Colors/ColorSwatch.js";
import colorsData from "../Colors/colorsData.js";
import ResetFilters from "./ResetFilters.js";

function FilterForm({ onFilterChange }) {
  // State for each filter criteria
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [subject, setSubject] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange({ month, year, color, subject });
  };

  // Handle multiple year selection
  const handleYearInput = (selectedYear) => {
    // Use moment to check if the year is not in the future
    if (moment().year(selectedYear).isSameOrBefore(moment())) {
      setYear(selectedYear);
    } else {
      alert("Year cannot be in the future!");
      setYear(""); // Reset the year input if invalid
    }

    // Check if the year is already selected in the array for multiple selections
    if (selectedYears.includes(selectedYear)) {
      setSelectedYears(selectedYears.filter((year) => year !== selectedYear));
    } else {
      setSelectedYears([...selectedYears, selectedYear]);
    }
  };

  // ColorSwatch
  // Handle multiple color selection
  const handleColorSelect = (selectedColor) => {
    // Check if the color is already selected
    if (selectedColors.includes(selectedColor)) {
      // Remove the color from the selected colors
      setSelectedColors(
        selectedColors.filter((color) => color !== selectedColor)
      );
    } else {
      // Add the color to the selected colors
      setSelectedColors([...selectedColors, selectedColor]);
    }
  };

  // Suggestions
  const handleSubjectChange = (event) => {
    const inputSubject = event.target.value;
    setSubject(inputSubject);

    // Fetch suggestions from the API
    fetch(`http://localhost:3001/suggestions?subject=${inputSubject}`)
      .then((response) => response.json())
      .then((data) => setSuggestions(data));
  };
  const selectSuggestion = (suggestion) => {
    setSubject(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Handle multiple month selection
  const handleMonthSelect = (selectedMonth) => {
    // Check if the month is already selected
    if (selectedMonths.includes(selectedMonth)) {
      // Remove the month from the selected months
      setSelectedMonths(
        selectedMonths.filter((month) => month !== selectedMonth)
      );
    } else {
      // Add the month to the selected months
      setSelectedMonths([...selectedMonths, selectedMonth]);
    }
  };

  // Reset all filters
  const FilterTag = ({ label, onRemove }) => (
    <span
      style={{
        padding: "5px",
        border: "1px solid black",
        margin: "5px",
        cursor: "pointer",
      }}
      onClick={onRemove}
    >
      {label} x
    </span>
  );

  const selectedFilterTags = (
    <>
      {selectedMonths.map((month) => (
        <FilterTag
          key={month}
          label={month}
          onRemove={() => handleMonthSelect(month)}
        />
      ))}
      {selectedYears.map((year) => (
        <FilterTag
          key={year}
          label={year}
          onRemove={() => handleYearInput(year)}
        />
      ))}
      {selectedColors.map((color) => (
        <FilterTag
          key={color}
          label={color}
          onRemove={() => handleColorSelect(color)}
        />
      ))}
    </>
  );

  // Render form elements
  return (
    <form onSubmit={handleSubmit}>
      {/* Month Select */}
      <div>
        <label htmlFor="monthSelect">Month:</label>
        <select
          id="monthSelect"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select a Month</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m, index) => (
            <option key={index} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      {/* Year Select */}
      <div>
        <label htmlFor="yearSelect">Year:</label>
        <select
          id="yearSelect"
          value={year}
          onChange={(e) => handleYearInput(e.target.value)}
        >
          <option value="">Select a Year</option>
          {Array.from({ length: 1994 - 1983 + 1 }, (_, i) => 1983 + i).map(
            (y) => (
              <option key={y} value={y}>
                {y}
              </option>
            )
          )}
        </select>
      </div>
      {/* Color Select */}
      <div>
        <label htmlFor="colorSelect">Color:</label>
        <ColorSwatch colors={colorsData} onColorSelect={handleColorSelect} />
      </div>
      {/* Subject Input and Suggestions */}
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={handleSubjectChange}
        />
        {suggestions.map((suggestion, index) => (
          <div key={index} onClick={() => selectSuggestion(suggestion)}>
            {suggestion}
          </div>
        ))}
      </div>

      {/* Selected Months */}
      <div>
        {selectedMonths.map((month, index) => (
          <div key={index} onClick={() => handleMonthSelect(month)}>
            {month}
          </div>
        ))}
      </div>
      {/* Tags for selected filters */}
      {/* This div could be styled to look like a "tag area" or "filter area" */}
      <div style={{ margin: "20px" }}>
        <strong>Active Filters:</strong>
        <div>{selectedFilterTags}</div>
      </div>
      {/* Render the ResetFilters component */}
      <ResetFilters
        setMonth={setMonth}
        setYear={setYear}
        setColor={setColor}
        setSubject={setSubject}
        setSuggestions={setSuggestions}
        setSelectedMonths={setSelectedMonths}
        setSelectedYears={setSelectedYears}
        setSelectedColors={setSelectedColors}
        onFilterChange={onFilterChange}
      />

      {/* Submit Button */}
      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterForm;
