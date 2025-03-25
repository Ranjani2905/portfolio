import { useState, useEffect } from "react";
import axios from "axios";
import { MapPinIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  resourcePerson: string;
}

function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get<Announcement[]>(
        "http://localhost:5000/api/announcements"
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mt-15 font-bold mb-6 text-center text-gray-800">📢 Announcements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white p-6  rounded-2xl shadow-lg border-l-8 border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-orange-00">{announcement.title}</h3>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs font-semibold rounded-full">
                  {announcement.date}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{announcement.description}</p>
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-500" />
                  <span>{announcement.venue}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MicrophoneIcon className="w-5 h-5 text-gray-500" />
                  <span>{announcement.resourcePerson}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">No announcements available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAnnouncements;
