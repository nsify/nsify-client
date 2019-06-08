<template>
  <div class="">
    <h1>Search</h1>

    <input
      type="text"
      name="search"
      v-model="search"
      placeholder="Location">

  </div>
</template>

<script>
import StationSearchService from '@/services/StationSearchService'

let searchTimeout

export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search (value) {
      // Don't yet send the location to the server if
      // the user is still typing
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => { searchStation(value) }, 250)
    }
  }
}

/**
 * Request a station from the server
 * @param {string} location - Location specified by the user.
 */
async function searchStation (location) {
  if (location === '') {
    return
  }
  console.log('Searching for station...')
  let response = await StationSearchService.search({
    location: location
  })
  console.log(response.data)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  font-size: 1.5em;
}
</style>
