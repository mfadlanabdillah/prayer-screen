import axios from 'axios'

const API_BASE = 'https://api.aladhan.com/v1'

export const prayerApi = {
  async getPrayerTimes(latitude, longitude, method = 2) {
    try {
      const today = new Date()
      const response = await axios.get(`${API_BASE}/timings`, {
        params: {
          latitude,
          longitude,
          method,
          date: today.toISOString().split('T')[0]
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching prayer times:', error)
      throw error
    }
  },

  async getIslamicCalendar(latitude, longitude) {
    try {
      const today = new Date()
      const response = await axios.get(`${API_BASE}/gToH`, {
        params: {
          date: today.toISOString().split('T')[0]
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching Islamic calendar:', error)
      throw error
    }
  },

  async getPrayerTimesByCity(city, country, method = 2) {
    try {
      const today = new Date()
      const response = await axios.get(`${API_BASE}/timingsByCity`, {
        params: {
          city,
          country,
          method,
          date: today.toISOString().split('T')[0]
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching prayer times by city:', error)
      throw error
    }
  }
}
