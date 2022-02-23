<template>
    <Mainframe>
       <Summary />
       <RequestList />
    </Mainframe>
</template>

<script>
import Mainframe from '@/global/main-frame'
import Summary from './components/summary.vue'
import RequestList from '@/requests/requests-list'

export default {
    components: { Mainframe, Summary, RequestList }
}
</script>