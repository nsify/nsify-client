import Api from '@/services/Api'

export default {
  search (location) {
    return Api().post('search_station', location)
  }
}
