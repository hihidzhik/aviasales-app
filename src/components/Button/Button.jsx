import { useDispatch } from "react-redux";
import { increaseVisibleCount } from "../../store/reducers/filtersSlice";
import React from "react";
import styles from "./Button.module.scss";

function Button({ text }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(increaseVisibleCount())}
      className={styles.button}
    >
      {text}
    </button>
  );
}

export default Button;
