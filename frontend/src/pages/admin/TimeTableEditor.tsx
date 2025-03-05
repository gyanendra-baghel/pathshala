import React, { useState } from "react";
import { Clock, Edit2, Save, X, PlusCircle, Book, Users } from "lucide-react";

// Remove unused Section interface
// interface Section {
//   id: number;
//   name: string;
// }

interface Faculty {
  firstName: string;
  lastName: string;
}

interface Room {
  name: string;
}

interface TimetableSlot {
  id: number;
  subject: { name: string };
  faculty: Faculty;
  dayOfWeek: string;
  period: number;
  startTime: Date;
  endTime: Date;
  classType: string;
  room: Room;
}

// Dummy data to simulate multiple sections
const dummySections = [
  { id: 1, name: "Grade 1 - Section A" },
  { id: 2, name: "Grade 1 - Section B" },
  { id: 3, name: "Grade 2 - Section A" },
  { id: 4, name: "Grade 2 - Section B" },
];

// Add index signature to dummyTimetableSlots type
const dummyTimetableSlots: { [key: number]: TimetableSlot[] } = {
  1: [
    // Timetable for Grade 1 - Section A
    {
      id: 1,
      subject: { name: "Mathematics" },
      faculty: { firstName: "John", lastName: "Doe" },
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: new Date("2024-03-05T09:00:00"),
      endTime: new Date("2024-03-05T10:00:00"),
      classType: "LECTURE",
      room: { name: "Room 101" },
    },
  ],
  2: [
    // Timetable for Grade 1 - Section B
    {
      id: 2,
      subject: { name: "Science" },
      faculty: { firstName: "Jane", lastName: "Smith" },
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: new Date("2024-03-05T09:00:00"),
      endTime: new Date("2024-03-05T10:00:00"),
      classType: "LAB",
      room: { name: "Lab 202" },
    },
  ],
};

const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const CLASS_TYPES = ["LECTURE", "ACTIVITY", "LAB", "SPORTS"];

const TimetableEditor = () => {
  const [selectedSection, setSelectedSection] = useState(dummySections[0].id);
  const [timetableSlots, setTimetableSlots] = useState(dummyTimetableSlots);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);

  const handleSectionChange = (sectionId: number) => {
    setSelectedSection(sectionId);
    setEditingSlot(null);
  };

  const handleEditSlot = (slot: TimetableSlot) => {
    setEditingSlot(slot);
  };

  const handleSaveSlot = (updatedSlot: TimetableSlot) => {
    setTimetableSlots((prev) => ({
      ...prev,
      [selectedSection]: prev[selectedSection].map((slot) =>
        slot.id === updatedSlot.id ? updatedSlot : slot
      ),
    }));
    setEditingSlot(null);
  };

  const handleCancelEdit = () => {
    setEditingSlot(null);
  };

  const handleAddNewSlot = () => {
    const newSlot: TimetableSlot = {
      id: Date.now(),
      subject: { name: "" },
      faculty: { firstName: "", lastName: "" },
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: new Date(),
      endTime: new Date(),
      classType: "LECTURE",
      room: { name: "" },
    };

    setTimetableSlots((prev) => ({
      ...prev,
      [selectedSection]: [...(prev[selectedSection] || []), newSlot],
    }));
    setEditingSlot(newSlot);
  };

  const handleDeleteSlot = (slotId: number) => {
    setTimetableSlots((prev) => ({
      ...prev,
      [selectedSection]: prev[selectedSection].filter(
        (slot) => slot.id !== slotId
      ),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Clock className="mr-2" /> Multi-Section Timetable
      </h1>

      {/* Section Selection */}
      <div className="mb-4 flex items-center space-x-2 overflow-x-auto">
        {dummySections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={`
              px-4 py-2 rounded flex items-center 
              ${
                selectedSection === section.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            <Users className="mr-2" size={20} />
            {section.name}
          </button>
        ))}
      </div>

      {/* Timetable Management */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Book className="mr-2" />
          Timetable for{" "}
          {dummySections.find((s) => s.id === selectedSection)?.name}
        </h2>
        <button
          onClick={handleAddNewSlot}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
        >
          <PlusCircle className="mr-2" /> New Slot
        </button>
      </div>

      <div className="grid gap-4">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">{day}</h3>

            {(timetableSlots[selectedSection] || [])
              .filter((slot) => slot.dayOfWeek === day)
              .sort((a, b) => a.period - b.period)
              .map((slot) => (
                <div
                  key={slot.id}
                  className="border-b py-3 flex justify-between items-center"
                >
                  {editingSlot && editingSlot.id === slot.id ? (
                    <EditSlotForm
                      slot={editingSlot}
                      onSave={handleSaveSlot}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <>
                      <div>
                        <p className="font-semibold">
                          {slot.subject.name} (Period {slot.period})
                        </p>
                        <p className="text-sm text-gray-600">
                          {slot.faculty.firstName} {slot.faculty.lastName}|{" "}
                          {slot.room.name} | {slot.classType}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(slot.startTime).toLocaleTimeString()} -
                          {new Date(slot.endTime).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSlot(slot)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

            {!(timetableSlots[selectedSection] || []).filter(
              (slot) => slot.dayOfWeek === day
            ).length && (
              <p className="text-gray-500 text-center py-4">
                No classes scheduled for this day
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface EditSlotFormProps {
  slot: TimetableSlot;
  onSave: (slot: TimetableSlot) => void;
  onCancel: () => void;
}

const EditSlotForm: React.FC<EditSlotFormProps> = ({
  slot,
  onSave,
  onCancel,
}) => {
  const [editedSlot, setEditedSlot] = useState<TimetableSlot>({ ...slot });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedSlot((prev) => {
      if (name.startsWith("subject.")) {
        return {
          ...prev,
          subject: {
            ...prev.subject,
            [name.split(".")[1]]: value,
          },
        };
      }
      if (name.startsWith("faculty.")) {
        return {
          ...prev,
          faculty: {
            ...prev.faculty,
            [name.split(".")[1]]: value,
          },
        };
      }
      if (name.startsWith("room.")) {
        return {
          ...prev,
          room: {
            ...prev.room,
            [name.split(".")[1]]: value,
          },
        };
      }
      if (name === "startTime" || name === "endTime") {
        return {
          ...prev,
          [name]: new Date(value),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSave = () => {
    onSave(editedSlot);
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <input
        name="subject.name"
        value={editedSlot.subject.name}
        onChange={handleChange}
        placeholder="Subject Name"
        className="border p-2 rounded"
      />
      <select
        name="dayOfWeek"
        value={editedSlot.dayOfWeek}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        {DAYS_OF_WEEK.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <input
        name="faculty.firstName"
        value={editedSlot.faculty.firstName}
        onChange={handleChange}
        placeholder="Faculty First Name"
        className="border p-2 rounded"
      />
      <input
        name="faculty.lastName"
        value={editedSlot.faculty.lastName}
        onChange={handleChange}
        placeholder="Faculty Last Name"
        className="border p-2 rounded"
      />
      <input
        name="period"
        type="number"
        value={editedSlot.period}
        onChange={handleChange}
        placeholder="Period"
        className="border p-2 rounded"
      />
      <select
        name="classType"
        value={editedSlot.classType}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        {CLASS_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        name="room.name"
        value={editedSlot.room.name}
        onChange={handleChange}
        placeholder="Room Name"
        className="border p-2 rounded"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          name="startTime"
          type="time"
          value={editedSlot.startTime.toTimeString().slice(0, 5)}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="endTime"
          type="time"
          value={editedSlot.endTime.toTimeString().slice(0, 5)}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="col-span-2 flex space-x-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center flex-1 justify-center"
        >
          <Save className="mr-2" /> Save
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center flex-1 justify-center"
        >
          <X className="mr-2" /> Cancel
        </button>
      </div>
    </div>
  );
};

export default TimetableEditor;
