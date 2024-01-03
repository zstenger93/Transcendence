import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function About() {
  const { t } = useTranslation();
  const teamMembers = [
    {
      name: "Zsolt",
      title: "Mr. Git",
      description: t("About zstenger"),
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Jamshidbek",
      title: '"Can I drop the table?"',
      description: t("About jergashe"),
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover 
	  bg-center bg-no-repeat z-0"
    >
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
  );
}

export default About;
