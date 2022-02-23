<template>
    <div class="w-full my-5 text-sm text-gray-500">
        <div class="font-medium mb-2">Search</div>
        <div ref="searchFieldContainer" class="flex items-center w-full border-b border-gray-300 h-9">
            <input v-model="requestSearchQuery" ref="searchField" type="text" class="outline-none w-[90%] h-full px-1 text-purple-700" placeholder="search request">
            <div class="flex items-center justify-center h-full w-[10%]">
                <svg ref="searchIcon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import useSearchFunctions from './search-composable'

export default {
    setup () {
        const { searchActive, searchFieldContainer, searchIcon, searchField } =  useSearchFunctions()

        const requestSearchQuery = inject('requestSearchQuery')

        return {
            searchActive,
            searchFieldContainer,
            searchIcon,
            searchField,
            requestSearchQuery,

        }
    }
}
</script>