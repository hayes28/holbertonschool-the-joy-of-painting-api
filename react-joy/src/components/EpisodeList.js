import React from "react";

function FilterForm({ onFilter }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Collect filter values and call onFilter
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add inputs/selects for filters here */}
      <button type="submit">Filter Episodes</button>
    </form>
  );
}

export default FilterForm;
