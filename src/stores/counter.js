import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const selectedTask=ref('')
  const TaskList =ref([
    // {taskId:1,  title: 'Front-end Developer', descriptions: 'lindsay.walton@example.com' },
    // {taskId:2,  title: 'Front-end Developer', descriptions: 'lindsay.walton@example.com' },
    // {taskId:3,  title: 'Front-end Developer', descriptions: 'lindsay.walton@example.com' },
    // More TaskList...
  ]);
 
  function addTask(data) {
    console.log("addd---", data);
    let newObject={taskId:TaskList.value.length+1,...data};
    TaskList.value.push(newObject)
    console.log("TaskList---", TaskList.value);
  }
  function editTask(data) {
    selectedTask.value=data;
  }
  

  return {TaskList ,selectedTask, editTask,addTask }
})
