import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { format } from 'date-fns'; // Removed for now since we're not using it

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate years from 2020 to 2035
const years = Array.from({ length: 16 }, (_, i) => 2020 + i);

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(selected?.getMonth() ?? new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(selected?.getFullYear() ?? new Date().getFullYear());

  const handleMonthChange = (month: string) => {
    const monthIndex = months.indexOf(month);
    setCurrentMonth(monthIndex);
  };

  const handleYearChange = (year: string) => {
    setCurrentYear(parseInt(year));
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const displayDate = new Date(currentYear, currentMonth, 1);

  return (
    <div className="p-3">
      {/* Custom Navigation Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <Select value={months[currentMonth]} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-32 h-8 border-none shadow-none bg-transparent hover:bg-muted rounded-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentYear.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-20 h-8 border-none shadow-none bg-transparent hover:bg-muted rounded-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Component */}
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        month={displayDate}
        onMonthChange={(newMonth) => {
          setCurrentMonth(newMonth.getMonth());
          setCurrentYear(newMonth.getFullYear());
        }}
        className="w-full"
        classNames={{
          months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full flex flex-col",
          table: "w-full h-full border-collapse space-y-1",
          head_row: "",
          head_cell: "text-muted-foreground font-normal text-sm w-8 font-normal",
          row: "w-full mt-2",
          cell: "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-8 w-8 p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
          day_range_end: "day-range-end",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground font-semibold",
          day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_hidden: "invisible",
          caption: "hidden", // Hide default caption since we have custom navigation
          caption_label: "hidden",
          nav: "hidden", // Hide default navigation
          nav_button: "hidden",
          nav_button_previous: "hidden",
          nav_button_next: "hidden",
        }}
      />
    </div>
  );
}