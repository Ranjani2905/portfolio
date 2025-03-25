import React from "react";

interface SidebarProps {
  title: string;
  subtopics: { id: string; title: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, subtopics }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-purple-100 shadow-lg p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2">
        {subtopics.map((topic) => (
          <li
            key={topic.id}
            onClick={() => scrollToSection(topic.id)}
            className="text-black hover:text-xl cursor-pointer"
          >
            {topic.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
