<template>
  <div class="page">
    <pretzelNowPlaying></pretzelNowPlaying>
  </div>
</template>

<script>
import PretzelNowPlaying from 'components/Pretzel/NowPlaying/PretzelNowPlaying'

export default {
  components: {
    PretzelNowPlaying
  }
}
</script>

<style>
  .page {
    height: 100vh;
  }
</style>
