import { reactive } from 'vue'

const STORAGE_KEY = 'mosque_last_location'

export const locationStore = reactive({
  currentLocation: null,

  init() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      this.currentLocation = JSON.parse(saved)
    }
  },

  setCurrentLocation(location) {
    this.currentLocation = location
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
  },

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
})

locationStore.init()
