import Sidebar from "../shared/sidebar";
function Tailwind() {
  const tailTopics = [
    { id: "Intro", title: "Introduction to Tailwind CSS" },
    { id: "core", title: "Core Concepts" },
    { id: "basic", title: "Basic Utilities" },
    { id: "layout", title: "Layout and Positioning" },
    { id: "responsive", title: "Responsive Design" },
    { id: "advanced", title: "Advanced Styling" },
    { id: "customization", title: "Customization" },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 h-screen sticky top-0 bg-gray-100 p-4 border-r border-gray-300">
        <Sidebar title="Tailwind CSS " subtopics={tailTopics} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Tailwind Study Materials</h1>
      </div>
    </div>
  );
}
export default Tailwind;
