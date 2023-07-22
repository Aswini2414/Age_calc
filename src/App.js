import './App.css';
import React, { useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import logo from './icon-arrow.svg';


function App() {
  const [saver, setSaver] = useState();
  const [data, setData] = useState([]);
  const [values, setValues] = useState(false);

  const date = new Date();
  const currentyear = Number(date.getFullYear());
  const currentmonth = Number(String(date.getMonth() + 1).padStart(2, "0"));
  const currentDay = Number(String(date.getDate()).padStart(2, "0"));

  const { register, handleSubmit,Watch,formState:{errors}} = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    const day = Number(data.day);
    const month = Number(data.month);
    const year = Number(data.year);

    if (month == "02" && Number(year) % 4 != "0") {
      if (day == "29" || day == "30" || day == "31") {
        setSaver(day);
      }
    } else if (month == "04" || month == "06" || month == "09" ||month == "11" ) {
      if (day == "31") {
         setSaver(day);
       }
    } else {
      if ((month == "02" && Number(year) % 4 != "0")&&(day == "30" || day == "31")) {
        setSaver(day);
      }
    }
    let finyear;
    if (month > currentmonth) {
      finyear = currentyear - 1 - year;
    } else {
      finyear = currentyear - year;
    }
    let finmonth;
    let monthsRem;
    if (currentmonth > month) {
      if (day < currentDay) {
        finmonth = currentmonth - month;
      } else {
        finmonth = currentmonth - 1 - month;
      }
    } else {
      monthsRem = 12 - month;
      if (day < currentDay) {
        finmonth = monthsRem + currentmonth;
      } else {
        finmonth = monthsRem + (currentmonth - 1);
      }
    }
    let finday;
    let numdays;
    // if (currentDay < day && month==04||month==06||month==09||month==11) {
    // finday = (30 - day) + currentDay;
    // }
    if (day < currentDay) {
      finday = currentDay - day;
    } else {
      if (
        month - 1 == "04" ||
        month - 1 == "06" ||
        month - 1 == "09" ||
        month - 1 == "11"
      ) {
        numdays = 30 - day;
        finday = numdays + currentDay;
      } else if (month - 1 == "02" && currentyear % 4 === 0) {
        numdays = 29 - day;
        finday = numdays + currentDay;
      } else if (month - 1 == "02" && currentyear % 4 !== 0) {
        numdays = 28 - day;
        finday = numdays + Number(currentDay);
      } else {
        numdays = 31 - day;
        finday = numdays + Number(currentDay);
      }
    }
    setValues(true);
    setData([finyear, finmonth, finday]);

  }

  const x = (saver === 29 || saver === 30 || saver === 31) ? "Must be a valid day" : " ";
  console.log(x);

  
  useEffect(() => {
    if (x === "Must be a valid day") {
      setValues(false);
    }
  })
    return (
      <>
        <div className="main_container">
          <section className="inner_content">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex_item_1"
            >
              <section className="sec1">
                <div>
                  <p>DAY</p>
                  <input
                    type="text"
                    name="day"
                    // value={day1}
                    // onChange={dayHandler}
                    {...register("day", { required: true, min: 1, max: 31 })}
                    className="day"
                    placeholder="DD"
                  />
                  <p style={{ color: "red" }}>
                    {errors.day?.type === "required" &&
                      "This field is required"}
                  </p>
                  <p style={{ color: "red" }}>
                    {errors.day?.type === "min" && "Must be a valid day"}
                  </p>
                  <p style={{ color: "red" }}>
                    {errors.day?.type === "max" && "Must be a valid day"}
                  </p>
                  {{ x } && <p style={{ color: "red" }}>{x}</p>}
                </div>
                <div>
                  <p>MONTH</p>
                  <input
                    type="text"
                    name="month"
                    // value={month1}
                    // onChange={monthHandler}
                    {...register("month", { required: true, min: 1, max: 12 })}
                    className="month"
                    placeholder="MM"
                  />
                  <p style={{ color: "red" }}>
                    {errors.month?.type === "required" &&
                      "This field is required"}
                  </p>
                  <p style={{ color: "red" }}>
                    {errors.month?.type === "min" && "Must be a valid month"}
                  </p>
                  <p style={{ color: "red" }}>
                    {errors.month?.type === "max" && "Must be a valid month"}
                  </p>
                </div>
                <div>
                  <p>YEAR</p>
                  <input
                    type="text"
                    name="year"
                    // value={year1}
                    // onChange={yearHandler}
                    {...register("year", {
                      required: true,
                      min: 1,
                      max: new Date().getFullYear(),
                    })}
                    className="year"
                    placeholder="YYYY"
                    required
                  />
                  <p style={{ color: "red" }}>
                    {errors.year?.type === "required" &&
                      "This field is required"}
                  </p>
                  <p style={{ color: "red" }}>
                    {errors.year?.type === "min" && "Must be in the past"}
                  </p>
                  <p style={{ color: "red" }}>
                    {errors.year?.type === "max" && "Must be in the past"}
                  </p>
                </div>
              </section>
              <section className="sec2">
                <hr className="hr-line" />
                <button>
                  <img src={logo} alt="icon" />
                </button>
                <hr className="hr-line2" />
              </section>
            </form>
            <section className="flex_item_2">
              <h1>
                <span className="dashes">{values ? data[0] : "--"}</span>years
              </h1>
              <h1>
                <span className="dashes">{values ? data[1] : "--"}</span>months
              </h1>
              <h1>
                <span className="dashes">{values ? data[2] : "--"}</span>days
              </h1>
            </section>
          </section>
        </div>
      </>
    );
}

export default App;
