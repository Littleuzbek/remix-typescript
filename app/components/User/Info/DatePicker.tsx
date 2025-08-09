import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import "./datePicker.css";

interface DatePickerProps {
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  onDateChange,
  placeholder = "Select date",
  className = "",
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Add this new state and function to handle positioning
  // Add after the other useState declarations
  const [position, setPosition] = useState<"top" | "bottom">("top");

  const handleDateSelect = (day: Date) => {
    setDate(day);
    setIsOpen(false);
    if (onDateChange) {
      onDateChange(day);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Close the date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (placeholder === "Tug'ilgan sana") {
      setDate(undefined);
    }
  }, [placeholder]);

  // Add this useEffect to check available space and determine position
  // Add after the other useEffect
  useEffect(() => {
    if (isOpen && datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const requiredSpace = 340; // Approximate height of the calendar popup

      if (spaceAbove < requiredSpace) {
        setPosition("bottom");
      } else {
        setPosition("top");
      }
    }
  }, [isOpen]);

  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day names for the header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={`date-picker ${className} w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-none `} ref={datePickerRef}>
      <div
        className="date-picker-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        role="button"
      >
        <CalendarIcon className="date-picker-icon" />
        <span>{date ? format(date, "MMMM d, yyyy") : placeholder}</span>
      </div>

      {isOpen && (
        <div
          className={`date-picker-popup ${
            position === "bottom" ? "date-picker-popup-bottom" : ""
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="date-picker-header">
            <button
              className="month-nav-button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <h2>{format(currentMonth, "MMMM yyyy")}</h2>
            <button
              type="button"
              className="month-nav-button"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="date-picker-days-header">
            {dayNames.map((day) => (
              <div key={day} className="day-name">
                {day}
              </div>
            ))}
          </div>

          <div className="date-picker-grid">
            {daysInMonth.map((day) => (
              <button
                key={day.toString()}
                className={`date-cell ${
                  isSameDay(day, date || new Date(0)) ? "selected" : ""
                }`}
                onClick={() => handleDateSelect(day)}
                aria-label={format(day, "MMMM d, yyyy")}
                aria-selected={date ? isSameDay(day, date) : false}
              >
                {format(day, "d")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
