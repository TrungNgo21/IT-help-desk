import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="grid grid-cols-4 text-center bg-slate-200 p-2 rounded-md mx-4 font-medium my-2 items-center">
      <div>{new Date(ticket.createdAt).toLocaleString("vi-VN")}</div>
      <div>{ticket.product}</div>
      <div
        className={
          ticket.status === "new" ? "badge badge-new" : "badge badge-closed"
        }
      >
        {ticket.status}
      </div>
      <Link to={`/Tickets/${ticket._id}`}>
        <button className="btn btn-secondary my-0 py-1">View</button>
      </Link>
    </div>
  );
}

export default TicketItem;
