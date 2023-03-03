import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mx-8 flex flex-col items-center mt-12">
      <h1 className="font-bold text-3xl text-center my-1">
        What do you need help with?
      </h1>
      <p className="font-semibold text-2xl text-center text-[#6A6F72] my-1">
        Please choose from an option
      </p>
      <Link to="/newTicket" className="w-full">
        <button className="btn btn-secondary capitalize">
          <FaQuestionCircle className="inline pr-2 text-2xl" />
          create new ticket
        </button>
      </Link>
      <Link to="/Tickets" className="w-full">
        <button className="btn btn-primary capitalize">
          <FaTicketAlt className="inline pr-2 text-2xl" />
          view my tickets
        </button>
      </Link>
    </div>
  );
}

export default Home;
