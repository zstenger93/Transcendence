import React from "react";
import backgroundImage from "../images/bg0.png";

function About() {
  const teamMembers = [
    {
      name: "Zsolt",
      title: "Mr. Git",
      description: `The version control virtuoso. Commits breakfast choices, branches weekend plans, and merges life decisions flawlessly. 
			His code is as organized as his repository, and 'git push' is his mantra. Legend says he even forks his dreams.`,
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Jamshidbek",
      title: '"Can I drop the table?"',
      description: `Hungry for knowledge, but occasionally drops the database table in the quest for understanding. 
			The eternal learner who loves unraveling mysteries, even if it means a 'DROP TABLE' detour.`,
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Azer",
      title: "DevOoOoops",
      description: `A maestro of automation and deployment orchestration, but occasionally dances on the edge of chaos. 
			Balancing on the fine line between brilliance and 'oops,' this DevOps guru turns every setback into a valuable lesson. 
			Deployment scripts by day, debugging confessions by night.`,
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Karlis",
      title: '"I can fix it"',
      description: `Master of coding chaos, fueled by bursts of hyperfocus. Multitasking maestro with a brain faster than compile times. 
			Jumps between projects like a caffeinated squirrel on a keyboard. Bugs beware, he will debug you into oblivion.`,
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
    {
      name: "Laszlo",
      title: '"I use Arch btw"',
      description: `Customization is his middle name, and he navigates through life with the precision of a well-crafted script. 
			Proprietary software? No thanks. He lives for that sweet feeling of freedom and collaboration in the Linux realm. 
			Tux the penguin is his spirit animal, and the terminal is his happy place.`,
      image:
        "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
    },
  ];

  const firstRowMembers = teamMembers.slice(0, 2);
  const secondRowMembers = teamMembers.slice(2);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="grid grid-cols-2 gap-4">
        {firstRowMembers.map((member, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-900"
          >
            <img className="w-full" src={member.image} alt={member.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-white font-nosifer text-center text-xl mb-2">
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
      </div>
      <div className="grid grid-cols-3 gap-4">
        {secondRowMembers.map((member, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-900"
          >
            <img className="w-full" src={member.image} alt={member.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-white font-nosifer text-center text-xl mb-2">
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
      </div>
    </div>
  );
}

export default About;
