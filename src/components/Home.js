import React from "react";
import "./Home.css";
import home_image_grid_one from "../images/home_image_grid.jpg";
import home_image_grid_three from "../images/home_image_grid_three.jpg";
import home_image from "../images/home_image.jpg";
import saree from "../images/saree.jpg";
import sunglass from "../images/sunglass.jpg";
import kurta from "../images/kurta.jpg";
import shoes from "../images/shoes.jpg";
import shirts from "../images/shirts.jpg";
import jeans from "../images/jeans.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home__container">
      <div className="home__page">
        <h1 className="heading__quote">Fashions fade, style is eternal.</h1>
        <div className="image__grid">
          <img className="" src={home_image_grid_one} alt="" />
          <img className="" src={home_image_grid_three} alt="" />
        </div>
        <div className="fashion__quote">
          Go <span className="inline__style">Traditional</span> &{" "}
          <span className="inline__style">Trendy</span> at the same time!!
        </div>
        <div className="wear__confidence">Wear Confidence</div>
        <img src={home_image} className="man" alt="" />
        <p className=" tags">
          Unvieled brings you all the latest collections in both ethnic and
          Gen-Z trend.
        </p>
        <p className=" tags">Style at your fingertips.</p>
        <div className="explore">
          <p>COLLECTIONS</p>
          <Link className="explore__btn" to="/products">
            Explore
          </Link>
        </div>
        <div className="collections">
          <img src={saree} alt="" />
          <img src={kurta} alt="" />
          <img src={jeans} alt="" />
          <img src={sunglass} alt="" />
          <img src={shirts} alt="" />
          <img src={shoes} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
