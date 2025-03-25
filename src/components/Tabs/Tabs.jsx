import React from "react";
import styles from "./Tabs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../store/reducers/sortSlice";

const tabs = [
  { key: "cheap", label: "САМЫЙ ДЕШЕВЫЙ" },
  { key: "fast", label: "САМЫЙ БЫСТРЫЙ" },
  { key: "optimal", label: "ОПТИМАЛЬНЫЙ" },
];

function Tabs() {
  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.sort.activeSort);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => dispatch(setSort(tab.key))}
          className={`${styles.tab} ${activeSort === tab.key ? styles.active : ""}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
