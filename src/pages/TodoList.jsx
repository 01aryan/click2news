import { Box } from "@mui/material";
import Todo from "components/todoList/Todo";
import useTitle from "hooks/useTitle";

const TodoList = () => {
  // change navbar title
  useTitle("To Do List");
  return <Box pt={2} pb={4}>
      <Todo />
    </Box>;
};

export default TodoList;