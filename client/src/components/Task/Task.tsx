import React, { useEffect, useState } from "react";
import TaskInterface from "./TaskInterface";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";

interface Props {
  task: TaskInterface;
}

const Task = ({ task }: Props) => {
  const [status, setStatus] = useState(task.done);

  const transferData = async () => {
    try {
      const data = await fetch_data(`/user/tasks/${task.id}`, "PUT", {
        status: status ? "done" : "undone",
      });
      task.done = data.status === "done";
      console.log(status, task.done)
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (status !== task.done) {
      transferData();
    }
  }, [status, task.done]);

  return (
    <li
      key={task.id}
      id="task"
      className={`py-2 border-bottom ${
        status && "text-decoration-line-through"
      }`}
      data-group-id={task.group_id}
      data-task-id={task.id}
      onClick={() => setStatus(!status)}
    >
      {task.name}
    </li>
  );
};

export default Task;
