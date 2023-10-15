import axios from "axios";

const taskService =  async(taskName,taskDescription,taskDuration,taskPriority) =>{
    const Users = localStorage.getItem("loginDetails");
    const loginDetailsObj = JSON.parse(Users);
    const email = loginDetailsObj.user.userEmail;

    await axios.post("http://localhost:8080/api/addtask",{

    taskName:taskName,
    taskDescription: taskDescription,
    taskDuration:taskDuration,
    taskPriority:taskPriority,
    userEmail:email
    
});
}

export {taskService};

