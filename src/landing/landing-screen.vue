<template>
    <Mainframe>
       <RequestList />
    </Mainframe>
</template>

<script>
import Mainframe from '@/global/main-frame'
import RequestList from '@/requests'
import { inject } from '@vue/runtime-core'

export default {
    setup () {
        const selectedProject = inject('selectedProject')

        return {
            selectedProject
        }
    },
    components: { Mainframe, RequestList }
}
</script>