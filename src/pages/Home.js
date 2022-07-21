import React, { useState, useEffect } from "react";
import "./Home.css";
import heroImage from "../images/Saly-16.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <>
      <nav>
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
        </div>
        <div>
          <Link to="/marks">
            <Button variant="contained">Saved Marks</Button>
          </Link>
          <Button onClick={() => logout()} variant="outlined">
            signOut
          </Button>
        </div>
      </nav>
      <div className="wrapper">
        <div className="text">
          <h1>VTU SGPA & CGPA CALCULATOR</h1>
          <div className="btns">
            <Link to="/sem">
              <button className="css-button-rounded--rose">
                Calculate SGPA
              </button>
            </Link>
            <Link to="/cgpacalc">
              <button className="css-button-rounded--rose">
                Calculate CGPA
              </button>
            </Link>
          </div>
        </div>
        <div className="pic">
          <img className="heroImg" src={heroImage} alt="heroImage" />
        </div>
      </div>
    </>
  );
}

export default Home;
