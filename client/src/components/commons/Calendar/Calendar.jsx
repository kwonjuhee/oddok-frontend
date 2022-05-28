import React, { useState } from "react";
import Picker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { addDays } from "date-fns";
import DateInput from "./DateInput";
import CalendarHeader from "./CalendarHeader";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/styles/calendar_style.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <Picker
      locale={ko}
      dateFormat="yyyy. MM. dd"
      selected={currentDate}
      onChange={(date) => setCurrentDate(date)}
      minDate={new Date()}
      showPopperArrow={false}
      popperPlacement="auto"
      customInput={<DateInput />}
      renderCustomHeader={CalendarHeader}
      dayClassName={(date) =>
        (addDays(date, 1) < new Date() ? "day_disabled" : undefined) ||
        (addDays(date, 1) > new Date() && date.getDate() === currentDate.getDate() ? "day_selected" : "day_default")
      }
    />
  );
}

export default Calendar;