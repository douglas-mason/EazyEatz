import React, { useEffect, useState } from "react";
import { LocationChart } from "./LocationChart";
import "./App.css";
import { Controls } from "./Controls";

function App() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [sortedLocations, setSortedLocations] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("wheelchair_accessible");

  const getLocations = async () => {
    const resp = await fetch("http://localhost:8000/api/locations");
    const { data } = await resp.json();
    console.log("response data", data);
    setLocations(data);
  };

  useEffect(() => {
    console.log("requesting locations");
    setLoading(true)
    getLocations().then(() => setLoading(false));
  }, []);

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
    setLoading(true)
    await fetch("http://localhost:8000/api/locations/sync", { method: "POST" });
    await getLocations();
    setLoading(false)
  };

  const handleFilterChange = (selected) => {
    console.log("selected", selected);
    setSelectedFilter(selected.target.value);
  };

  return (
    <div className="App">
      <section className="container">
        {loading ? (
            <img alt="Loading" src="https://images.says.com/uploads/story_source/source_image/599933/19bb.gif" />
        ) : (
          <>
            <LocationChart data={sortedLocations} />
            <Controls
              selectedFilter={selectedFilter}
              filterItems={[
                "wheelchair_accessible",
                "gender_neutral_restrooms",
              ]}
              onSyncClick={handleSyncClick}
              onFilterChange={handleFilterChange}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
