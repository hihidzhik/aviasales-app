import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTickets } from "./store/reducers/filtersSlice";

import Filters from "./components/Filters/Filters";
import TicketList from "./components/TicketList/TicketList";
import Tabs from "./components/Tabs/Tabs";
import Button from "./components/Button/Button";

import styles from "./App.module.scss";
import airplaneIcon from "/src/assets/logo.svg";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.logoContainer}>
        <img
          src={airplaneIcon}
          alt="Airplane"
          className={styles.airplaneIcon}
        />
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.sidebar}>
          <Filters />
        </div>

        <div className={styles.mainContent}>
          <Tabs />
          <TicketList />
          <Button text="Показать еще 5 билетов" />
        </div>
      </div>
    </div>
  );
}

export default App;
