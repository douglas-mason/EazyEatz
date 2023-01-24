import React from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const Controls = ({
  selectedFilter,
  filterItems,
  onFilterChange,
  onSyncClick,
}) => {
  const renderItems = () => {
    return filterItems.map((item) => {
      const label = item.replaceAll("_", " ");
      return (
        <FormControlLabel value={item} control={<Radio />} label={label} />
      );
    });
  };

  return (
    <div>
      {filterItems.length ? (
        <FormControl>
          <FormLabel id="radio-buttons-group-label">Accommodation</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={onFilterChange}
            value={selectedFilter}
          >
            {renderItems()}
          </RadioGroup>
        </FormControl>
      ) : (
        null
      )}
      <div>
        <Button variant="contained" title="sync" onClick={onSyncClick}>
          Sync
        </Button>
      </div>
    </div>
  );
};
