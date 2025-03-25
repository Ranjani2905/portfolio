import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <div>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement._id} className="bg-gray-100 p-4 mb-3 rounded shadow-md">
              <h3 className="text-lg font-bold">{announcement.title}</h3>
              <p>{announcement.description}</p>
              <p className="text-sm text-gray-600">📅 {announcement.date} | 📍 {announcement.venue}</p>
              <p className="text-sm text-gray-600">🎙 {announcement.resourcePerson}</p>
            </div>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAnnouncements;
