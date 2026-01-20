// components/TimeSlotPicker.jsx
import React from "react";
import { Sun, Utensils, Moon, ChevronUp } from "lucide-react";
import { isToday, isAfter } from "date-fns";

const TimeSlotPicker = ({ selectedDate, form, setForm }) => {
  const [showSection, setShowSection] = React.useState(null);
  const now = new Date();

  const breakfastTimes = ["11:00 AM", "11:30 AM"];
  const lunchTimes = ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM"];
  const dinnerTimes = [
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
  ];

  const isFutureDate = !isToday(selectedDate);

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return new Date(selectedDate.setHours(hours, minutes, 0, 0));
  };

  const filterTimes = (slotTimes) => {
    if (isFutureDate) return slotTimes;
    return slotTimes.filter((time) => isAfter(parseTime(time), now));
  };

  const handleSelectTime = (time) => {
    setForm({ ...form, time });
  };

  const renderSection = (label, Icon, times, id, cols = 2) => {
    const filteredTimes = filterTimes(times);
    if (filteredTimes.length === 0) return null;

    return (
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
        <div
          onClick={() => setShowSection(showSection === id ? null : id)}
          className="flex justify-between items-center cursor-pointer mb-2"
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-orange-500" />
            <span className="font-medium">{label}</span>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-gray-500 transition-transform ${
              showSection === id ? "" : "rotate-180"
            }`}
          />
        </div>

        {showSection === id && (
          <div className={`grid grid-cols-${cols} gap-2`}>
            {filteredTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleSelectTime(time)}
                className={`py-2 px-3 rounded-xl text-sm font-medium border-2 transition-colors ${
                  form.time === time
                    ? "bg-orange-100 border-orange-300 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">Pick a Time Slot</h3>
      {renderSection("Breakfast (11:00 AM - 12:00 PM)", Sun, breakfastTimes, "breakfast")}
      {renderSection("Lunch (12:00 PM - 5:00 PM)", Utensils, lunchTimes, "lunch")}
      {renderSection("Dinner (5:00 PM - 11:00 PM)", Moon, dinnerTimes, "dinner", 3)}
    </div>
  );
};

export default TimeSlotPicker;
