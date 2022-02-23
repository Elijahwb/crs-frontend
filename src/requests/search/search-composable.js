import { ref, watch } from "vue"

export default function useSearchFunctions () {
    const searchActive = ref(false)
    const searchFieldContainer = ref(null)
    const searchIcon = ref(null)
    const searchField = ref(null)

    watch(searchField, () => {
        
        if (searchField.value) {

            searchField.value.addEventListener('focusin', () => {

                searchFieldContainer.value.classList.remove('border-gray-300')
                searchFieldContainer.value.classList.add('border-purple-300')

                searchIcon.value.classList.remove('text-gray-500')
                searchIcon.value.classList.add('text-purple-500')

            })
        }
    })

    return {
        searchActive,
        searchFieldContainer,
        searchIcon,
        searchField,

    }

}