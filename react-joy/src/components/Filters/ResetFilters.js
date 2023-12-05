// ResetFilters.js
import React from "react"; // You need React imported because you're using JSX below.
import "./FiltersStyles.css"; // Ensure that this file exists in the path specified.

const ResetFilters = ({
  setMonth,
  setYear,
  setColor,
  setSubject,
  setSuggestions,
  setSelectedMonths,
  setSelectedYears,
  setSelectedColors,
  onFilterChange,
}) => {
  const handleReset = () => {
    setMonth("");
    setYear("");
    setColor("");
    setSubject("");
    setSuggestions([]);
    setSelectedMonths([]);
    setSelectedYears([]);
    setSelectedColors([]);
    onFilterChange({ month: "", year: "", color: "", subject: "" });
  };

  return (
    <button type="button" onClick={handleReset}>
      Reset Filters
    </button>
  );
};

export default ResetFilters;
