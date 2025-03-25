import React from "react";
import styles from "./Filters.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleFilter, setAllFilters } from "../../store/reducers/filtersSlice";

const filterOptions = [
  { key: "all", label: "Все" },
  { key: 0, label: "Без пересадок" },
  { key: 1, label: "1 пересадка" },
  { key: 2, label: "2 пересадки" },
  { key: 3, label: "3 пересадки" },
];

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);

  const handleChange = (key) => {
    if (key === "all") {
      dispatch(setAllFilters(!filters.all));
    } else {
      dispatch(toggleFilter(key));

      if (filters.all && filters[key]) {
        dispatch(setAllFilters(false));
      }
    }
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <div className={styles.options}>
        {filterOptions.map(({ key, label }) => (
          <label key={key} className={styles.option}>
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => handleChange(key)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Filters;
