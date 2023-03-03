import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
function Ticket() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  const onClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed !!!");
    navigate("/Tickets");
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-8">
      <div className="flex flex-col justify-between border-b-2 border-black pb-2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Ticket ID: {ticket._id}</h1>
          <div
            className={`badge badge-${ticket.status} w-1/6 my-4 mx-12 mr-0 justify-self-end`}
          >
            {ticket.status}
          </div>
        </div>
        <p className="font-bold text-xl mx-4">
          Date Submitted:{" "}
          <span>{new Date(ticket.createdAt).toLocaleString("vi-VN")}</span>
        </p>
      </div>

      <div className="my-4 border-1 bg-slate-200 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Description of Issue</h1>
        <p>{ticket.description}</p>
      </div>
        {ticket.status !== "closed" && (
          <button className="btn btn-primary mr-8 bg-red-500 text-xl " onClick={onClose}>
            Close
          </button>
        )}
    </div>
  );
}

export default Ticket;
