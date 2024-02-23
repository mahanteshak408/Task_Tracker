<template>
    <div class="card border-2  rounded-md my-2">
        <div class="flex justify-center border-2 p-2 rounded-t-md bg-slate-400">
            <p>Add Task</p>
        </div>
        <form @submit.prevent="addItem">
            <div class=" ">
                <div class="flex justify-center"><div class="p-2 flex flex-col  justify-center">
                    <div>
                        <label for="title" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Title</label>
                        <div class="mt-2">
                            <input v-model="formData.title" type="title" name="title" id="title"
                                class="block w-full lg:w-1/2 md:w-1/2 lg:w-full p-1 rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter Task Title" />
                            <span v-if="!isTitleValid" class="error">Title is required</span>

                        </div>
                    </div>
                    <div>
                        <label for="description"
                            class="block text-sm font-medium leading-6 text-gray-900  dark:text-white ">Descriptions</label>
                        <div class="mt-2">
                            <textarea v-model="formData.descriptions" type="description" name="description" id="description"
                                class="block p-1 w-full rounded-md border-0 py-1.5 dark:text-white dark:bg-black text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter Task description" />
                            <span v-if="!isDescriptionValid" class="error">Descriptions is required</span>

                        </div>
                    </div>
                </div></div>
                


                <div class="flex justify-end my-5">
                    <button type="button" @click="emit('close')"
                        class="rounded bg-indigo-150 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">Cancel</button>
                    <button type="submit"
                        class="rounded mx-2 bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>

                </div>

                <!-- <input v-model="title"  class="border-2"/>
<textarea v-model="description" class="border-2" />

    <button type="submit">Add</button>
    <button type="button" @click="emit('close')">Close</button>
 -->

            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    enable: Boolean,
    isEdit: Boolean,


})
const emit = defineEmits(['close', 'update']);
import { useCounterStore } from '@/stores/counter'
import { onMounted } from 'vue';
const counter = useCounterStore()

const formData = ref({
    title: '',
    descriptions: ''
});
// const title=ref('')
const taskList = ref([])
onMounted(() => {

    taskList.value = counter.TaskList;
    console.log("counter.selectedTask;", counter.selectedTask.taskId);
    console.log("props", props);
    if (props.isEdit) {
        counter.TaskList.map(() => {
            if (counter.selectedTask.taskId) {
                formData.value.title = counter.selectedTask.title,
                    formData.value.descriptions = counter.selectedTask.descriptions
            }
        })

    }

})




const isTitleValid = ref(true);
const isDescriptionValid = ref(true);

const addItem = () => {
    // Validate form before submission
    if (formData.value.title === '') {
        isTitleValid.value = false;
    } else {
        isTitleValid.value = true;
    }

    if (formData.value.descriptions === '') {
        isDescriptionValid.value = false;
    } else {
        isDescriptionValid.value = true;
    }

    // If form is valid, proceed with submission
  if (isTitleValid.value && isDescriptionValid.value) {
    // Handle form submission logic here
    console.log('Form submitted with data:', props.isEdit, formData.value);
    console.log("vjbhjbjhb-----", taskList.value);

    if (props.isEdit) {
        // For editing, filter out the task to be updated
        let updatedTaskList = taskList.value.filter(item => item.taskId !== counter.selectedTask.taskId);
        // Update the filtered task list with the modified task
        let newObj={taskId:counter.TaskList.length,...formData.value}
        updatedTaskList.push(newObj);
        // Update the taskList.value with the modified list
        counter.TaskList = updatedTaskList;
    } else {
        // For adding a new task, simply add it to the task list
        counter.addTask(formData.value);
    }

    console.log("Updated taskList.value:", taskList.value);
    emit('close');
    emit('update');
}

};



</script>


<style scoped>
.error {
    color: brown;
}
</style>