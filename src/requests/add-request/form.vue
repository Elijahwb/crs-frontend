<template>
    <div class="bg-white w-full h-full flex flex-col items-center text-sm py-5">
        <div @click="deActivateAddRequest" class="w-full pb-3 px-3 text-gray-700 mb-4 border-b border-gray-300 text-sm flex justify-between items-center group">
            <div class="text-purple-500 font-medium cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <div>Requests List</div>
            </div>
        </div>

        <div class="h-[90vh] w-full flex justify-center overflow-y-auto">
            <form @submit.prevent="dispatchCreateNewRequest" autocomplete="off" class="text-gray-600 w-3/5">
                <div class="flex-1 flex flex-col justify-center mt-5 bt-5">
                    <label class="flex flex-col mb-5">
                        <span class="label-content text-sm font-medium mb-1">
                            Request title
                        </span>
                        <input v-model="newRequest.title" autocomplete="off" class="mt-1 text-gray-600 px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full sm:text-sm focus:ring-0.5" type="text" name="email" placeholder="Request title" required/>
                    </label>

                    <!-- <label class="flex flex-col mb-5">
                        <span class="label-content text-sm font-medium">
                            Module
                        </span>
                        <input class="mt-1 text-gray-600 px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full sm:text-sm focus:ring-0.5"  type="password" required/>
                    </label> -->

                    <div class="relative mb-5">
                        <div class="text-sm font-bold mb-1">Module</div>
                        <div class="flex items-center w-full border border-gray-300 h-9">
                            <input ref="modulesSearchField" v-model="selectedModule.name" type="text" class="text-gray-600 uppercase px-3 placeholder-gray-400 focus:outline-none block w-[90%] h-full sm:text-sm focus:ring-0.5" placeholder="select project" required>
                            
                            <div class="flex items-center justify-center h-full w-[10%]">
                                <svg v-if="!modulesListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                                <svg v-if="modulesListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </div>
                        </div>

                        <div v-if="modulesListVisible" ref="modulesItemsList" class="absolute py-2 bg-white shadow-lg w-full z-10">
                            <div ref="projectElement" :data-module='JSON.stringify(module)' v-for="module, index in modulesList" :key="index" class="uppercase p-2 cursor-pointer hover:bg-purple-500 hover:text-white">{{module.name}}</div>
                        </div>
                    </div>

                    <div class="relative mb-5">
                        <div class="text-sm font-bold mb-1">Developer</div>
                        <div class="flex items-center w-full border border-gray-300 h-9">
                            <input ref="developersSearchField" v-model="selectedDeveloper.first_name" type="text" class="text-gray-600 uppercase px-3 placeholder-gray-400 focus:outline-none block w-[90%] h-full sm:text-sm focus:ring-0.5" placeholder="select developer" required>
                            
                            <div class="flex items-center justify-center h-full w-[10%]">
                                <svg v-if="!developersListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                                <svg v-if="developersListVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </div>
                        </div>

                        <div v-if="developersListVisible" ref="developersItemsList" class="absolute py-2 bg-white shadow-lg w-full z-10">
                            <div ref="projectElement" :data-developer='JSON.stringify(developer)' v-for="developer, index in developersList" :key="index" class="uppercase p-2 cursor-pointer hover:bg-purple-500 hover:text-white">{{developer.first_name}} {{developer.last_name}}</div>
                            <div v-if="developersList.length === 0" class="p-2 cursor-pointer hover:bg-purple-500 hover:text-white"> No developers found</div>
                        </div>
                    </div>

                    <label class="flex flex-col mb-5">
                        <span class="label-content text-sm font-bold mb-2">
                            Details
                        </span>
                        <QuillEditor v-model:content="newRequest.description" contentType="html" theme="snow" toolbar='full' />
                    </label>


                    <div class="text-sm text-gray-500 font-medium flex justify-between items-center my-1">
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <label class="check-container pr-0">
                                    <span></span>
                                    <input type="checkbox">
                                    <span class="checkmark shadow-wbe rounded"></span>
                                </label>
                                <div class="font-medium ml-4 mt-2">Create Another</div>
                            </div>
                        </div>
                        <div>
                            <button :disabled='newRequestLoader' class="py-1 px-2 my-2 text-white bg-gradient-to-b from-purple-400 to-purple-500 rounded overflow-hidden flex items-center justify-center" type="submit">
                                <div v-if="!newRequestLoader" class="uppercase">create request</div>
                                <Loader v-if="newRequestLoader" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Loader from '@/global/loader'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import useRequestFormFunctions from './form-composable'
import { inject } from '@vue/runtime-core';

export default {
    setup () {
        const {
            modulesSearchField,
            modulesList,
            modulesItemsList,
            modulesListVisible,
            selectedModule,
            showModulesList,
            hideModulesList,

            selectedDeveloper,
            developersList,
            developersListVisible,
            showDevelopersList,
            hideDevelopersList,
            developersSearchField,
            developersItemsList,

            newRequest,
            newRequestLoader,
            dispatchCreateNewRequest,

        } = useRequestFormFunctions()

        const deActivateAddRequest = inject('deActivateAddRequest')

        return {
            selectedModule,
            modulesList,
            modulesListVisible,
            showModulesList,
            hideModulesList,
            modulesSearchField,
            modulesItemsList,

            selectedDeveloper,
            developersList,
            developersListVisible,
            showDevelopersList,
            hideDevelopersList,
            developersSearchField,
            developersItemsList,

            deActivateAddRequest,

            newRequest,
            newRequestLoader,
            dispatchCreateNewRequest,
        }
    },

    components: { Loader, QuillEditor }
}
</script>