<template>
  <router-view></router-view>
</template>

<script>
import useAllFunctionality from '@/composables'

export default {
  setup () {

    useAllFunctionality()

  }
}
</script>