import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import TicketItem from "../components/TicketItem";
import Spinner from "../components/Spinner";

function Tickets() {
  const dispatch = useDispatch();
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h1 className="font-bold text-4xl text-center my-8">Tickets</h1>
      <div>
          <div className="grid grid-cols-4 text-center bg-slate-200 p-2 rounded-md mx-4 font-bold">
              <div>Date</div>
              <div>Product</div>
              <div>Status</div>
              <div>View Details</div>
          </div>
        {tickets.map((ticket) => {
          return <TicketItem key={ticket._id} ticket={ticket}/>;
        })}
      </div>
    </>
  );
}

export default Tickets;
