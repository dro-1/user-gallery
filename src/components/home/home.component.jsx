import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "./home.css";
import Loader from "./../utils/loader.component";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const Home = () => {
  const { user } = useAuth0();
  const btnRef = useRef(null);
  const [images, setImages] = useState([]);
  console.log(user);

  const fetchImages = async () => {
    let { data } = await axios.get("http://localhost:3001/images");
    setImages((images) => [...images, ...data]);
  };

  const setUploadWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        folder: user.email,
        tags: [user.email],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages((prevImages) => [...prevImages, result.info.secure_url]);
        }
      }
    );
    btnRef.current.addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  };

  useEffect(() => {
    setUploadWidget();
    fetchImages();
  }, []);

  return (
    <div className="home">
      <header>
        <img src={user.picture} alt="" />
        <h2>Welcome, {user.name}</h2>
        <LogoutButton />
      </header>
      <button ref={btnRef} className="cloudinary-button">
        Upload files
      </button>
      <section>
        {images.length ? (
          images.map((image, index) => (
            <a
              href={image}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image} alt="Ronaldo" />
            </a>
          ))
        ) : (
          <Loader home />
        )}
      </section>
    </div>
  );
};

export default Home;
