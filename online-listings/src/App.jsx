import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Login/AuthContext";
import NavBar from "./NavBar/NavBar";
import Home from "./Home/Home"
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import NotFound from "./NotFound/NotFound";
import ListingDetails from "./ListingDetails/ListingDetails";
import ListingForm from "./ListingForm/ListingForm";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="/listing/create" element={<ListingForm />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="/listing/edit/:id" element={<ListingForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
