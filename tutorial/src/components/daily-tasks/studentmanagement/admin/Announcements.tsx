import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface Announcement {
  _id?: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  resourcePerson: string;
}

function AdminAnnouncements() {
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    description: "",
    date: "",
    venue: "",
    resourcePerson: "",
  });
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
      toast.success("Announcements loaded successfully!");
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to fetch announcements.");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/announcements/add", formData);
      toast.success("Announcement added successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        venue: "",
        resourcePerson: "",
      });
      fetchAnnouncements();
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast.error("Error adding announcement!");
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="max-w-3xl mx-auto mt-10">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className=" flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow-md text-lg font-semibold focus:outline-none">
                <span>📢 View Announcements</span>
                <ChevronUpIcon
                  className={`w-6 h-6 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-4">
                {announcements.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement._id}
                        className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-400 hover:shadow-lg transition-transform transform hover:scale-105"
                      >
                        <h3 className="text-lg font-bold text-orange-700">
                          {announcement.title}
                        </h3>
                        <p className="text-gray-700">
                          {announcement.description}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          📅 {announcement.date} | 📍 {announcement.venue}
                        </p>
                        <p className="text-sm text-gray-600">
                          🎙 {announcement.resourcePerson}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-lg">
                    No announcements available.
                  </p>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Add Announcement Form */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          📢 Add Announcement
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Venue"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="resourcePerson"
            value={formData.resourcePerson}
            onChange={handleChange}
            placeholder="Resource Person"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Add Announcement
          </button>
        </form>
      </div>

      {/* View Announcements Accordion */}
    </div>
  );
}

export default AdminAnnouncements;
