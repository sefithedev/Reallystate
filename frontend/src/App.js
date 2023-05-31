import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PopularProperties from "./components/PopularProperties/PopularProperties";
import FeaturedProperties from "./components/FeaturedProperties/FeaturedProperties";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import Properties from "./components/Properties/Properties";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <PopularProperties />
              <FeaturedProperties />
              <Newsletter />
              <Footer />
            </>
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route
          path="/properties"
          element={
            <>
              <Navbar />
              <Properties />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/property-details/:id"
          element={
            <>
              <Navbar />
              <PropertyDetails />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
