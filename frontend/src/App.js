import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newTicket" element={<PrivateRoute />}>
            <Route path="/newTicket" element={<NewTicket />} />
          </Route>
          <Route path="/Tickets" element={<PrivateRoute />}>
            <Route path="/Tickets" element={<Tickets />} />
          </Route>
          <Route path="/Tickets/:ticketId" element={<PrivateRoute />}>
            <Route path="/Tickets/:ticketId" element={<Ticket />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
