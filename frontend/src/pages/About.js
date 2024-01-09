/* eslint-disable */
import React, { useEffect } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backgroundImage from "../images/welcomebg.jpg";
import zsolt from "../images/about/zsolt.jpeg";
import jamshidbek from "../images/about/jamshidbek.jpg";
import karlis from "../images/about/karlis.png";
import laszlo from "../images/about/laszlo.png";

function About() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const { t } = useTranslation();
  const teamMembers = [
    {
      name: "Zsolt",
      title: "Mr. Git",
      description: t("About zstenger"),
      image: zsolt,
    },
    {
      name: "Karlis",
      title: '"I can fix it"',
      description: t("About kvebers"),
      image: karlis,
    },
    {
      name: "Jamshidbek",
      title: '"Can I drop the table?"',
      description: t("About jergashe"),
      image: jamshidbek,
    },
    {
      name: "Laszlo",
      title: '"Absolutely Proprietary"',
      description: t("About slaszlo"),
      image: laszlo,
    },
    {
      name: "Azer",
      title: "DevOoOoops",
      description: t("About asioud"),
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
  ];

  useEffect(() => {
    teamMembers.forEach((member) => {
      const img = new Image();
      img.src = member.image;
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat z-0">
      <div className="w-full h-screen flex items-center justify-center lg:hidden">
        <Slider {...settings} className="max-w-sm flex flex-col">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col min-h-full max-w-sm rounded overflow-hidden shadow-lg 
			bg-gray-900"
            >
              <img
                className="w-auto h-96 block mx-auto mt-3"
                src={member.image}
                alt={member.name}
              />
              <div className="px-6 py-4">
                <div
                  className="font-bold text-white font-nosifer 
			  	text-center text-xl mb-2"
                >
                  {member.name}
                </div>
                <div className="text-white font-roboto text-center text-sm mb-2">
                  {member.title}
                </div>
                <p className="text-white text-center text-base">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="h-192 hidden lg:flex lg:items-center lg:justify-center w-full relative">
        <div className=" flex flex-wrap justify-center items-center">
          {teamMembers.map((member, index) => (
            <div className="flex flex-col items-center">
              <div
                className={`w-20 m-2 ${selectedCard === index ? "w-96" : ""}`}
                style={{
                  visibility: selectedCard === index ? "visible" : "hidden",
                }}
              />
              <label
                key={index}
                htmlFor={`c${index}`}
                className={`w-20 bg-cover cursor-pointer overflow-hidden rounded-2xl m-2
				flex flex-col items-center justify-start transition-all duration-800
				ease-in-out transform-gpu shadow-2xl
				${
					selectedCard === index
					? "w-96 absolute top-1/2 transform -translate-y-1/2"
					: ""
				}`}
                style={{ backgroundImage: `url(${backgroundImage})`, transition: "transform 0.0s ease-in-out", }}
              >
                <input
                  type="radio"
                  id={`c${index}`}
                  name="card"
                  className="hidden"
                  onChange={() => setSelectedCard(index)}
                />
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="m-3 mt-5 p-3 rounded-custom"
                  />
                  <h4
                    className={`mt-1 mb-1 font-nosifer text-xl text-white text-center
				  transform
				  ${selectedCard === index ? "" : "flex flex-col"}`}
                  >
                    {member.name.split("").map((letter, i) => (
                      <span key={i}>{letter}</span>
                    ))}
                  </h4>
                  {selectedCard === index && (
                    <>
                      <p
                        className={`transition-opacity duration-500 ease-in-out overflow-hidden 
					  text-white text-center mb-3
					  ${selectedCard === index ? "opacity-100 max-h-full" : "opacity-0 max-h-0"}`}
                      >
                        {member.title}
                      </p>
                      <p
                        className={`transition-opacity duration-500 ease-in-out overflow-hidden 
					  text-white text-center mb-5 p-5
					  ${selectedCard === index ? "opacity-100 max-h-full" : "opacity-0 max-h-0"}`}
                      >
                        {member.description}
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
