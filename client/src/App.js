import React, { useEffect, useState } from "react";
import { LocationChart } from "./LocationChart";
import "./App.css";
import { Controls } from "./Controls";

function App() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [sortedLocations, setSortedLocations] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const getLocations = async () => {
    const resp = await fetch("http://localhost:8000/api/locations");
    const { data } = await resp.json();
    setLocations(data);
  };

  useEffect(() => {
    setLoading(true);
    getLocations().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const attributes = new Set();
    for (const location of locations) {
      for (const attribute of location.attributes) {
        attributes.add(attribute);
      }
    }
    const filterArray = Array.from(attributes);
    setFilters(filterArray);
    if (filterArray.length) {
      setSelectedFilter(filterArray[0]);
    }
  }, [locations]);

  useEffect(() => {
    setSortedLocations(
      locations
        .filter((d) => !d.attributes.includes(selectedFilter))
        .sort((a, b) => {
          if (a.count > b.count) return -1;
          if (b.count > a.count) return 1;
          return 0;
        })
    );
  }, [selectedFilter, locations]);

  const handleSyncClick = async () => {
    setLoading(true);
    await fetch("http://localhost:8000/api/locations/sync", { method: "POST" });
    await getLocations();
    setLoading(false);
  };

  const handleFilterChange = (selected) => {
    setSelectedFilter(selected.target.value);
  };

  if (loading) {
    return (
      <div className="App">
        <section className="container">
          <img
            alt="Loading"
            src="https://images.says.com/uploads/story_source/source_image/599933/19bb.gif"
          />
        </section>
      </div>
    );
  }

  if (!locations.length) {
    return (
      <div className="App">
        <section className="container">
          <p>Welcome, this app ranks cities by number of restaurants with specified accommodations.</p>
          <p>Press Sync to generate data</p>
          <Controls
            selectedFilter={selectedFilter}
            filterItems={filters}
            onSyncClick={handleSyncClick}
            onFilterChange={handleFilterChange}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="App">
      <section className="container">
        <LocationChart data={sortedLocations} />
        <Controls
          selectedFilter={selectedFilter}
          filterItems={filters}
          onSyncClick={handleSyncClick}
          onFilterChange={handleFilterChange}
        />
      </section>
    </div>
  );
}

export default App;
