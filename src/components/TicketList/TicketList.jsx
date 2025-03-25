import React from "react";
import TicketItem from "../TicketItem/TicketItem";
import styles from "./TicketList.module.scss";
import { useSelector } from "react-redux";

function TicketList() {
  const tickets = useSelector((state) => state.filters.filteredTickets);
  const activeSort = useSelector((state) => state.sort.activeSort);

  const getTotalDuration = (ticket) =>
    ticket.segments.reduce((sum, segment) => sum + segment.duration, 0);

  const { filteredTickets, visibleCount, isLoading, error } = useSelector(
    (state) => state.filters,
  );

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (activeSort === "cheap") {
      return a.price - b.price;
    } else if (activeSort === "fast") {
      const aDuration = a.segments.reduce((sum, seg) => sum + seg.duration, 0);
      const bDuration = b.segments.reduce((sum, seg) => sum + seg.duration, 0);
      return aDuration - bDuration;
    } else if (activeSort === "optimal") {
      const aScore =
        a.price + a.segments.reduce((sum, seg) => sum + seg.duration, 0);
      const bScore =
        b.price + b.segments.reduce((sum, seg) => sum + seg.duration, 0);
      return aScore - bScore;
    }
    return 0;
  });

  return (
    <div className={styles.ticketList}>
      {sortedTickets.length > 0 ? (
        sortedTickets
          .slice(0, visibleCount)
          .map((ticket, index) => <TicketItem key={index} ticket={ticket} />)
      ) : (
        <p>Билетов нет</p>
      )}
    </div>
  );
}

export default TicketList;
