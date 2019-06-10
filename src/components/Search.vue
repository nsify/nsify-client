<template>
  <div class="">
    <h1>Search</h1>

    <input
      type="text"
      name="search"
      v-model="search"
      placeholder="Location">

    <!-- <ul v-html="stations"> -->
      <li v-for="(station, index) in stations" :key="`station-${index}`">
        <strong>{{station.name}}</strong>
        <span>{{station.city}}</span>
        <span>{{station.province}}</span>
      </li>
    <!-- </ul> -->
    <div class="error" v-html="error"></div>

  </div>
</template>

<script>
import StationSearchService from '@/services/StationSearchService'

let searchTimeout

export default {
  data () {
    return {
      search: '',
      stations: null,
      error: null
    }
  },
  watch: {
    search (value) {
      // Don't yet send the location to the server if
      // the user is still typing
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(async () => {
        let tmp = await searchStation(value)
        console.log(tmp)
        this.stations = tmp
        // this.error = tmp.stations.Tiel
      }, 250)
    }
  },
  methods: {

  }
}

/**
* Request a station from the server
* @param {string} location - Location specified by the user.
* @return {Object} - Nearby stations
*/
async function searchStation (location) {
  if (location === '') {
    return {}
  }

  let response

  console.log('Searching for stations...')
  try {
    response = await StationSearchService.search({
      location: location
    })
    return response.data.stations
  } catch (e) {
    return {error: 'Autofill unavailable...'}
  } finally {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  font-size: 1.5em;
}

.error {
  margin-top: 1em;
  font-size: 1.1em;
  color: red;
}
</style>
