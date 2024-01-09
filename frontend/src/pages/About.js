/* eslint-disable */
import React, { useEffect } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backgroundImage from "../images/welcomebg.jpg";
import zsolt from "../images/about/zsolt.jpeg";
import jamshidbek from "../images/about/jamshidbek.jpg";

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
      name: "Jamshidbek",
      title: '"Can I drop the table?"',
      description: t("About jergashe"),
      image: jamshidbek,
    },
    {
      name: "Azer",
      title: "DevOoOoops",
      description: t("About asioud"),
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Karlis",
      title: '"I can fix it"',
      description: t("About kvebers"),
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Laszlo",
      title: '"Absolutely Proprietary"',
      description: t("About slaszlo"),
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
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat z-0">
      <div className="w-full h-screen flex items-center justify-center lg:hidden">
        <Slider {...settings} className="max-w-sm">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg 
			bg-gray-900"
            >
              <img className="w-full" src={member.image} alt={member.name} />
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
      <div className="hidden lg:flex lg:items-center lg:justify-center w-full h-screen">
        <div className="h-192 flex flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <label
              key={index}
              htmlFor={`c${index}`}
              className={`w-20 bg-cover cursor-pointer overflow-hidden rounded-2xl m-2
			  flex flex-col items-center justify-center transition-all duration-800
			  ease-in-out transform-gpu shadow-2xl ${selectedCard === index ? "w-96" : ""}`}
              style={{ backgroundImage: `url(${backgroundImage})` }}
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
                  className="m-3 p-3 rounded-custom"
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
					  text-white text-center mb-3
					  ${selectedCard === index ? "opacity-100 max-h-full" : "opacity-0 max-h-0"}`}
                    >
                      {member.description}
                    </p>
                  </>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
