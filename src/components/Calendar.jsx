import React, { useState, useEffect } from "react";
import { db, setDoc, doc, getDoc } from "../firebase"; // Firebase importları
import "./Calendar.css";
import Header from './Header'; // Header bileşenini import ediyoruz

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tasks, setTasks] = useState({});  // Store tasks in an object with full date (day-month-year)
  const [newTask, setNewTask] = useState(""); // Input for new task

  // Verilen ay ve yıl için gün sayısını alıyoruz
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= date.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  // Gün seçildiğinde ne yapılacağı
  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  // Ay seçildiğinde ne yapılacağı
  const handleMonthChange = (event) => {
    setCurrentMonth(Number(event.target.value));
  };

  // Yıl seçildiğinde ne yapılacağı
  const handleYearChange = (event) => {
    setCurrentYear(Number(event.target.value));
  };

  // Görev ekleme işlemi
  const handleAddTask = async () => {
    if (newTask.trim() === "" || selectedDate === null) return;

    // Görev tarihi formatını oluşturuyoruz (day-month-year)
    const taskDate = `${selectedDate}-${currentMonth + 1}-${currentYear}`;

    // Veriyi Firebase'e kaydediyoruz
    try {
      await setDoc(doc(db, "tasks", taskDate), {
        tasks: [...(tasks[taskDate] || []), newTask], // Yeni görev ekliyoruz
      });
      setTasks({
        ...tasks,
        [taskDate]: [...(tasks[taskDate] || []), newTask], // Local state'i güncelliyoruz
      });
      setNewTask("");  // Yeni görev ekledikten sonra inputu temizle
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // Görev silme işlemi
  const handleDeleteTask = async (taskIndex, taskDate) => {
    const updatedTasks = tasks[taskDate].filter((_, index) => index !== taskIndex);

    // Silinen görevi Firebase'den güncelliyoruz
    try {
      await setDoc(doc(db, "tasks", taskDate), { tasks: updatedTasks });
      setTasks({
        ...tasks,
        [taskDate]: updatedTasks, // Firestore'dan sonra local state'i güncelle
      });
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  // Firebase'den veri almak için
  useEffect(() => {
    if (!selectedDate) return;

    const fetchTasks = async () => {
      const taskDate = `${selectedDate}-${currentMonth + 1}-${currentYear}`;
      const taskDocRef = doc(db, "tasks", taskDate);
      
      try {
        const taskDoc = await getDoc(taskDocRef);
        if (taskDoc.exists()) {
          setTasks((prevState) => ({
            ...prevState,
            [taskDate]: taskDoc.data().tasks,
          }));
        }
      } catch (error) {
        console.error("Error getting tasks: ", error);
      }
    };

    fetchTasks();
  }, [selectedDate, currentMonth, currentYear]); // selectedDate, currentMonth veya currentYear değiştiğinde veri çek

  // Günleri alıyoruz
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div>
      <Header backButton={true} title="Calendar"/>

      <div className="calendar-container">
        <div className="calendar-header">
          <select onChange={handleMonthChange} value={currentMonth}>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
              <option value={index} key={index}>
                {month}
              </option>
            ))}
          </select>
          <select onChange={handleYearChange} value={currentYear}>
            {[2025, 2026, 2027, 2028].map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="calendar-grid">
          {daysInMonth.map((day) => {
            const taskDate = `${day}-${currentMonth + 1}-${currentYear}`;
            return (
              <div
                key={day}
                className={`calendar-day ${selectedDate === day ? "selected" : ""} ${tasks[taskDate] ? "has-task" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <div className="to-do-list">
            <h3>To-Do List for {currentMonth + 1}/{selectedDate}/{currentYear}</h3>
            <ul>
              {tasks[`${selectedDate}-${currentMonth + 1}-${currentYear}`]?.map((task, index) => (
                <li key={index}>
                  {task}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(index, `${selectedDate}-${currentMonth + 1}-${currentYear}`)} // Task delete logic
                  >
                    -
                  </button>
                </li>
              ))}
            </ul>

            {/* Input and Button to add task */}
            <div className="task-input">
              <input
                type="text"
                placeholder="Add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button className="add-task-btn" onClick={handleAddTask}>+</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
