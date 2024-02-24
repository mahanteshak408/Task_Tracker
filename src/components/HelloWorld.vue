<template>
  <div class="px-4 sm:px-6 lg:px-8 card  dark:bg-slate-50   border-b border-gray-200 bg-white  h-screen py-5 sm:px-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6  text-black dark:text-black">Task Tracker</h1>
        <!-- <p class="mt-2 text-sm text-gray-700">Your team is on the <strong class="font-semibold text-gray-900">Startup</strong> plan. The next payment of $80 will be due on August 4, 2022.</p> -->
      </div>

      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="addTask()">Add Task</button>
      </div>
      <div v-if="isNewTask" class="flex flex-col">
        <AddTask :enable="isNewTask" :isEdit="isEditTask" @close="closeTask" @update="tasksAdded" />
      </div>
    </div>
    <div class="-mx-4 mt-10 sm:mx-0 sm:rounded-lg" :class="{'ring-1 ring-gray-300':TaskList.length>0 }">
      <table  v-if="TaskList.length>0" class="min-w-full divide-y divide-gray-300 text-white dark:text-black">
        <thead>
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-black sm:pl-6">Title</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-black">Descriptions</th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span class="sr-only">Select</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in TaskList" :key="task.taskId">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 dark:text-black">{{task.title }}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-black">{{ task.descriptions}}</td>


            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0" @click="editTask(task)">
              <a href="#" class="text-indigo-600 hover:text-indigo-900"><svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                <span class="sr-only">,</span></a>
            </td>
            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0" @click="deleteTask(task)">
              <a href="#" class="text-indigo-600 hover:text-indigo-900"><svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span class="sr-only">, </span></a>
            </td>
          </tr>
        </tbody>
      </table>


      <div v-else class="rounded-full bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm text-blue-700">Initially, there is no task list. To add one, click on the "Add Task" button.</p>
        
      </div>
    </div>
  </div>

    </div>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ deletedSelectedTask.title
                  }}</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to delete <span
                        class="font-bold">{{ deletedSelectedTask.title }}</span> ? </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="deleteTask1(deletedSelectedTask)">Delete</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="open = false" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import AddTask from './AddTask.vue'

import { InformationCircleIcon } from '@heroicons/vue/20/solid'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const counter = useCounterStore()

import { onMounted, ref } from 'vue'
const TaskList = ref([])
onMounted(() => {
  console.log("counter", counter.TaskList);
  TaskList.value = counter.TaskList;
})

const isNewTask = ref(false);

const isEditTask = ref(false)
const addTask = () => {
  console.log("close components");
  isNewTask.value = true;

  isEditTask.value = false;
}

const editTask = (task) => {
  console.log(task);
  isNewTask.value = true;
  isEditTask.value = true;
  counter.editTask(task)
}
const closeTask = () => {
  console.log("close components");
  isNewTask.value = false;
}




const deletedSelectedTask = ref('')
const deleteTask = (data) => {
  open.value = true;
  deletedSelectedTask.value = data;
}
const deleteTask1 = (data) => {
  console.log("data", data);
  TaskList.value = counter.TaskList.filter((item) => {
    return item.taskId !== data.taskId; // use return statement
  });
  open.value = false;
  counter.TaskList=TaskList.value;
  console.log("removedList", TaskList.value);

  deletedSelectedTask.value = [];
}

const tasksAdded = () => {
  console.log("counter.TaskList", counter.TaskList);
  TaskList.value = counter.TaskList;
}
</script>