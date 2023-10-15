import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { taskService } from "../services/taskServices";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const taskHandler = async ({ taskName, taskDescription, taskDuration, taskPriority }) => {
    try {
      const response = await taskService(taskName, taskDescription, taskDuration, taskPriority);

      console.log(response);

      const { status, message } = response.data;

      if (status === "sucess" || status === "success") {
        toast.success("Task has been Added Successfully");
      } else {
        toast.error("Failed to add your task. Please try again later.", message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding your task. Please try again later.");
    }
  };

  return (
    <TextContext.Provider value={{ taskHandler }}>
      {children}
    </TextContext.Provider>
  );
};

export const useText = () => useContext(TextContext);
