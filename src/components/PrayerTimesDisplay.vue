<template>
  <div class="min-h-screen flex flex-col" style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);">
    <!-- Islamic Pattern Background -->
    <div class="fixed inset-0 opacity-5 pointer-events-none">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <div class="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col">
      <!-- Header with Islamic-inspired design -->
      <div class="text-center mb-6 sm:mb-8">
        <!-- Decorative Islamic arch -->
        <div class="mb-4 sm:mb-6">
          <div class="inline-block relative">
            <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent mb-2" style="text-shadow: 0 0 40px rgba(16, 185, 129, 0.3);">
              Prayer Times
            </div>
            <div class="h-1 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
          </div>
        </div>
        
        <div v-if="currentLocation" class="text-xl sm:text-2xl md:text-3xl text-amber-200/90 mb-3 sm:mb-4 flex items-center justify-center gap-2">
          <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {{ currentLocation.name }}
        </div>
        <IslamicCalendar />
      </div>

      <!-- Countdown to Next Prayer with Islamic styling -->
      <div v-if="nextPrayer" class="text-center mb-6 sm:mb-8 md:mb-12">
        <div class="inline-block bg-gradient-to-br from-emerald-900/40 to-slate-900/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-emerald-500/30 shadow-2xl" style="box-shadow: 0 0 60px rgba(16, 185, 129, 0.2);">
          <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-200/80 mb-2 sm:mb-3 font-medium">Next Prayer</div>
          <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-300 mb-1 sm:mb-2">{{ nextPrayer.name }}</div>
          <div class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent mb-2 sm:mb-3">{{ countdown }}</div>
          <div class="text-xl sm:text-2xl md:text-3xl text-slate-300">at {{ nextPrayer.time }}</div>
        </div>
      </div>

      <!-- Prayer Times Grid with Islamic card design -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 flex-grow">
        <div 
          v-for="prayer in prayers" 
          :key="prayer.name"
          class="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 text-center transition-all duration-300 backdrop-blur-sm border"
          :class="{
            'bg-gradient-to-br from-emerald-800/60 to-emerald-900/60 border-emerald-400/50 shadow-2xl scale-105': prayer.isNext,
            'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/30 hover:border-emerald-500/50': !prayer.isNext,
            'opacity-50': prayer.hasPassed && !prayer.isNext
          }"
          :style="prayer.isNext ? 'box-shadow: 0 0 50px rgba(16, 185, 129, 0.4);' : ''"
        >
          <!-- Decorative corner for active prayer -->
          <div v-if="prayer.isNext" class="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
            <svg viewBox="0 0 100 100" class="w-full h-full text-emerald-400/50">
              <path d="M0 0 L100 0 L100 100 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div class="relative z-10">
            <div class="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4" :class="prayer.isNext ? 'text-emerald-300' : 'text-slate-200'">
              {{ prayer.name }}
            </div>
            <div class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold" :class="prayer.isNext ? 'text-white' : 'text-slate-300'">
              {{ prayer.time }}
            </div>
          </div>
        </div>
      </div>

      <!-- Location Selector with modern Islamic styling -->
      <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button 
          @click="showLocationModal = true"
          class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl md:text-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 border border-emerald-400/30"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Change Location
          </span>
        </button>
        <button 
          @click="requestNotificationPermission"
          class="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl md:text-2xl transition-all duration-300 shadow-lg hover:shadow-amber-500/30 border border-amber-400/30"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            Enable Notifications
          </span>
        </button>
      </div>
    </div>

    <!-- Location Modal with Islamic design -->
    <div v-if="showLocationModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-2xl w-full mx-4 border border-emerald-500/30 shadow-2xl" style="box-shadow: 0 0 80px rgba(16, 185, 129, 0.3);">
        <div class="text-center mb-4 sm:mb-6">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">Select Location</h2>
          <div class="h-1 w-24 sm:w-32 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mt-2"></div>
        </div>
        
        <div class="mb-6">
          <button 
            @click="detectLocation"
            class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 transition-all duration-300 border border-emerald-400/30 shadow-lg"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Use Current Location
            </span>
          </button>
        </div>

        <div class="mb-4">
          <input 
            v-model="citySearchQuery"
            placeholder="Search cities..."
            class="w-full bg-slate-700/50 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl border border-slate-600/30 focus:border-emerald-400/50 focus:outline-none transition-all duration-300"
          />
        </div>

        <div class="mb-4 sm:mb-6">
          <h3 class="text-xl sm:text-2xl font-bold text-amber-200 mb-3 sm:mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Popular Cities
          </h3>
          <div class="space-y-2 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto pr-2">
            <button 
              v-for="city in filteredCities" 
              :key="`${city.name}-${city.country}`"
              @click="selectCity(city)"
              class="w-full bg-gradient-to-r from-emerald-800/50 to-slate-800/50 hover:from-emerald-700/60 hover:to-slate-700/60 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl text-left transition-all duration-300 border border-emerald-500/20 hover:border-emerald-400/50"
            >
              {{ city.name }}, {{ city.country }}
            </button>
            <div v-if="filteredCities.length === 0" class="text-center text-slate-400 py-8">
              No cities found matching "{{ citySearchQuery }}"
            </div>
          </div>
        </div>

        <button 
          @click="showLocationModal = false; citySearchQuery = ''"
          class="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-4 sm:px-6 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl md:text-2xl transition-all duration-300 border border-slate-400/30"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { prayerApi } from '../services/prayerApi'
import { locationStore } from '../stores/locationStore'
import IslamicCalendar from './IslamicCalendar.vue'

const showLocationModal = ref(false)
const citySearchQuery = ref('')
const prayerTimes = ref(null)
const currentLocation = ref(null)
const countdown = ref('')
let countdownInterval = null

const popularCities = [
  // Indonesia
  { name: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 },
  { name: 'Surabaya', country: 'Indonesia', latitude: -7.2575, longitude: 112.7521 },
  { name: 'Bandung', country: 'Indonesia', latitude: -6.9175, longitude: 107.6191 },
  { name: 'Medan', country: 'Indonesia', latitude: 3.5952, longitude: 98.6722 },
  { name: 'Semarang', country: 'Indonesia', latitude: -6.9667, longitude: 110.4167 },
  { name: 'Makassar', country: 'Indonesia', latitude: -5.1477, longitude: 119.4328 },
  { name: 'Palembang', country: 'Indonesia', latitude: -2.9761, longitude: 104.7758 },
  { name: 'Yogyakarta', country: 'Indonesia', latitude: -7.7956, longitude: 110.3695 },
  { name: 'Denpasar', country: 'Indonesia', latitude: -8.6705, longitude: 115.2126 },
  { name: 'Balikpapan', country: 'Indonesia', latitude: -1.2379, longitude: 116.8529 },
  { name: 'Pekanbaru', country: 'Indonesia', latitude: 0.5071, longitude: 101.4478 },
  { name: 'Manado', country: 'Indonesia', latitude: 1.4748, longitude: 124.8469 },
  { name: 'Padang', country: 'Indonesia', latitude: -0.9471, longitude: 100.4172 },
  { name: 'Batam', country: 'Indonesia', latitude: 1.1316, longitude: 104.0346 },
  { name: 'Bogor', country: 'Indonesia', latitude: -6.5944, longitude: 106.7892 },
  { name: 'Malang', country: 'Indonesia', latitude: -7.9797, longitude: 112.6304 },
  { name: 'Pontianak', country: 'Indonesia', latitude: -0.0263, longitude: 109.3425 },
  { name: 'Samarinda', country: 'Indonesia', latitude: -0.4958, longitude: 117.1438 },
  { name: 'Banjarmasin', country: 'Indonesia', latitude: -3.3195, longitude: 114.5909 },
  { name: 'Jambi', country: 'Indonesia', latitude: -1.5906, longitude: 103.6170 },
  { name: 'Tangerang', country: 'Indonesia', latitude: -6.1783, longitude: 106.6318 },
  { name: 'Depok', country: 'Indonesia', latitude: -6.4030, longitude: 106.8194 },
  { name: 'Bekasi', country: 'Indonesia', latitude: -6.2349, longitude: 106.9750 },
  { name: 'Solo', country: 'Indonesia', latitude: -7.5763, longitude: 110.8290 },
  { name: 'Ambon', country: 'Indonesia', latitude: -3.5952, longitude: 128.1811 },
  { name: 'Kupang', country: 'Indonesia', latitude: -10.1781, longitude: 123.5745 },
  { name: 'Jayapura', country: 'Indonesia', latitude: -2.5337, longitude: 140.7181 },
  { name: 'Mataram', country: 'Indonesia', latitude: -8.5833, longitude: 116.1167 },
  // Saudi Arabia (Holy Cities)
  { name: 'Mecca', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262 },
  { name: 'Medina', country: 'Saudi Arabia', latitude: 24.5247, longitude: 39.5692 },
  { name: 'Riyadh', country: 'Saudi Arabia', latitude: 24.7136, longitude: 46.6753 },
  { name: 'Jeddah', country: 'Saudi Arabia', latitude: 21.5433, longitude: 39.1728 },
  { name: 'Dammam', country: 'Saudi Arabia', latitude: 26.4262, longitude: 50.0792 },
  { name: 'Tabuk', country: 'Saudi Arabia', latitude: 28.3834, longitude: 36.5745 },
  { name: 'Ta\'if', country: 'Saudi Arabia', latitude: 21.4275, longitude: 40.4217 },
  { name: 'Abha', country: 'Saudi Arabia', latitude: 18.2465, longitude: 42.5117 },
  // UAE
  { name: 'Dubai', country: 'UAE', latitude: 25.2048, longitude: 55.2708 },
  { name: 'Abu Dhabi', country: 'UAE', latitude: 24.4539, longitude: 54.3773 },
  { name: 'Sharjah', country: 'UAE', latitude: 25.3573, longitude: 55.4034 },
  { name: 'Ajman', country: 'UAE', latitude: 25.4131, longitude: 55.4449 },
  { name: 'Ras Al Khaimah', country: 'UAE', latitude: 25.7942, longitude: 55.9756 },
  // Malaysia
  { name: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869 },
  { name: 'Penang', country: 'Malaysia', latitude: 5.4141, longitude: 100.3288 },
  { name: 'Johor Bahru', country: 'Malaysia', latitude: 1.4927, longitude: 103.7414 },
  { name: 'Ipoh', country: 'Malaysia', latitude: 4.5975, longitude: 101.0901 },
  { name: 'Malacca', country: 'Malaysia', latitude: 2.1896, longitude: 102.2501 },
  { name: 'Kuching', country: 'Malaysia', latitude: 1.5549, longitude: 110.3592 },
  { name: 'Kota Kinabalu', country: 'Malaysia', latitude: 5.9804, longitude: 116.0749 },
  // Singapore
  { name: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  // Egypt
  { name: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { name: 'Alexandria', country: 'Egypt', latitude: 31.2001, longitude: 29.9187 },
  { name: 'Giza', country: 'Egypt', latitude: 30.0131, longitude: 31.2089 },
  { name: 'Luxor', country: 'Egypt', latitude: 25.6872, longitude: 32.6397 },
  { name: 'Aswan', country: 'Egypt', latitude: 24.0889, longitude: 32.8998 },
  // Turkey
  { name: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { name: 'Ankara', country: 'Turkey', latitude: 39.9334, longitude: 32.8597 },
  { name: 'Izmir', country: 'Turkey', latitude: 38.4237, longitude: 27.1428 },
  { name: 'Bursa', country: 'Turkey', latitude: 40.1885, longitude: 29.0610 },
  { name: 'Antalya', country: 'Turkey', latitude: 36.8969, longitude: 30.7133 },
  { name: 'Konya', country: 'Turkey', latitude: 37.8714, longitude: 32.4846 },
  // Pakistan
  { name: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011 },
  { name: 'Lahore', country: 'Pakistan', latitude: 31.5204, longitude: 74.3587 },
  { name: 'Islamabad', country: 'Pakistan', latitude: 33.6844, longitude: 73.0479 },
  { name: 'Faisalabad', country: 'Pakistan', latitude: 31.4504, longitude: 73.1349 },
  { name: 'Rawalpindi', country: 'Pakistan', latitude: 33.5651, longitude: 73.0169 },
  { name: 'Multan', country: 'Pakistan', latitude: 30.1575, longitude: 71.5249 },
  { name: 'Peshawar', country: 'Pakistan', latitude: 34.0151, longitude: 71.5785 },
  { name: 'Quetta', country: 'Pakistan', latitude: 30.1798, longitude: 66.9750 },
  // India
  { name: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777 },
  { name: 'Hyderabad', country: 'India', latitude: 17.3850, longitude: 78.4867 },
  { name: 'Bangalore', country: 'India', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Chennai', country: 'India', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Kolkata', country: 'India', latitude: 22.5726, longitude: 88.3639 },
  { name: 'Ahmedabad', country: 'India', latitude: 23.0225, longitude: 72.5714 },
  { name: 'Pune', country: 'India', latitude: 18.5204, longitude: 73.8567 },
  { name: 'Jaipur', country: 'India', latitude: 26.9124, longitude: 75.7873 },
  { name: 'Lucknow', country: 'India', latitude: 26.8467, longitude: 80.9462 },
  { name: 'Kanpur', country: 'India', latitude: 26.4499, longitude: 80.3319 },
  // Bangladesh
  { name: 'Dhaka', country: 'Bangladesh', latitude: 23.8103, longitude: 90.4125 },
  { name: 'Chittagong', country: 'Bangladesh', latitude: 22.3561, longitude: 91.7832 },
  { name: 'Khulna', country: 'Bangladesh', latitude: 22.8456, longitude: 89.5403 },
  { name: 'Rajshahi', country: 'Bangladesh', latitude: 22.3733, longitude: 88.5861 },
  { name: 'Sylhet', country: 'Bangladesh', latitude: 24.9041, longitude: 91.8607 },
  // Morocco
  { name: 'Casablanca', country: 'Morocco', latitude: 33.5731, longitude: -7.5898 },
  { name: 'Rabat', country: 'Morocco', latitude: 34.0209, longitude: -6.8416 },
  { name: 'Marrakech', country: 'Morocco', latitude: 31.6295, longitude: -7.9811 },
  { name: 'Fes', country: 'Morocco', latitude: 34.0331, longitude: -5.0003 },
  { name: 'Tangier', country: 'Morocco', latitude: 35.7595, longitude: -5.8340 },
  { name: 'Agadir', country: 'Morocco', latitude: 30.4278, longitude: -9.5981 },
  // Algeria
  { name: 'Algiers', country: 'Algeria', latitude: 36.7538, longitude: 3.0588 },
  { name: 'Oran', country: 'Algeria', latitude: 35.6911, longitude: -0.6417 },
  { name: 'Constantine', country: 'Algeria', latitude: 36.3650, longitude: 6.6147 },
  { name: 'Annaba', country: 'Algeria', latitude: 36.8999, longitude: 7.7673 },
  // Tunisia
  { name: 'Tunis', country: 'Tunisia', latitude: 36.8065, longitude: 10.1815 },
  { name: 'Sfax', country: 'Tunisia', latitude: 34.7406, longitude: 10.7603 },
  { name: 'Sousse', country: 'Tunisia', latitude: 35.8256, longitude: 10.6084 },
  // Jordan
  { name: 'Amman', country: 'Jordan', latitude: 31.9539, longitude: 35.9106 },
  { name: 'Irbid', country: 'Jordan', latitude: 32.5556, longitude: 35.8547 },
  { name: 'Zarqa', country: 'Jordan', latitude: 32.0779, longitude: 36.1047 },
  // Lebanon
  { name: 'Beirut', country: 'Lebanon', latitude: 33.8938, longitude: 35.5018 },
  { name: 'Tripoli', country: 'Lebanon', latitude: 34.4367, longitude: 35.8495 },
  // Iraq
  { name: 'Baghdad', country: 'Iraq', latitude: 33.3152, longitude: 44.3661 },
  { name: 'Basra', country: 'Iraq', latitude: 30.5081, longitude: 47.7835 },
  { name: 'Mosul', country: 'Iraq', latitude: 36.3489, longitude: 43.1579 },
  { name: 'Erbil', country: 'Iraq', latitude: 36.1904, longitude: 43.9947 },
  { name: 'Najaf', country: 'Iraq', latitude: 32.0000, longitude: 44.3333 },
  // Yemen
  { name: 'Sana\'a', country: 'Yemen', latitude: 15.3694, longitude: 47.8915 },
  { name: 'Aden', country: 'Yemen', latitude: 12.7794, longitude: 45.0367 },
  { name: 'Taiz', country: 'Yemen', latitude: 13.5795, longitude: 44.0176 },
  // Oman
  { name: 'Muscat', country: 'Oman', latitude: 23.5859, longitude: 58.3829 },
  { name: 'Salalah', country: 'Oman', latitude: 17.0454, longitude: 54.0898 },
  { name: 'Sohar', country: 'Oman', latitude: 24.3483, longitude: 56.7369 },
  // Qatar
  { name: 'Doha', country: 'Qatar', latitude: 25.2854, longitude: 51.5310 },
  { name: 'Al Rayyan', country: 'Qatar', latitude: 25.2919, longitude: 51.4434 },
  // Kuwait
  { name: 'Kuwait City', country: 'Kuwait', latitude: 29.3759, longitude: 47.9774 },
  { name: 'Al Ahmadi', country: 'Kuwait', latitude: 29.0792, longitude: 48.0839 },
  // Bahrain
  { name: 'Manama', country: 'Bahrain', latitude: 26.0667, longitude: 50.5577 },
  { name: 'Riffa', country: 'Bahrain', latitude: 26.1667, longitude: 50.5556 },
  // Brunei
  { name: 'Bandar Seri Begawan', country: 'Brunei', latitude: 4.9403, longitude: 114.9481 },
  // Philippines
  { name: 'Manila', country: 'Philippines', latitude: 14.5995, longitude: 120.9842 },
  { name: 'Quezon City', country: 'Philippines', latitude: 14.6760, longitude: 121.0437 },
  { name: 'Davao', country: 'Philippines', latitude: 7.0731, longitude: 125.6128 },
  { name: 'Cebu', country: 'Philippines', latitude: 10.3157, longitude: 123.8854 },
  { name: 'Zamboanga', country: 'Philippines', latitude: 6.9214, longitude: 122.0790 },
  // Thailand
  { name: 'Bangkok', country: 'Thailand', latitude: 13.7563, longitude: 100.5018 },
  { name: 'Chiang Mai', country: 'Thailand', latitude: 18.7883, longitude: 98.9853 },
  { name: 'Phuket', country: 'Thailand', latitude: 7.8804, longitude: 98.3923 },
  { name: 'Pattaya', country: 'Thailand', latitude: 12.9236, longitude: 100.8825 },
  // Myanmar
  { name: 'Yangon', country: 'Myanmar', latitude: 16.8661, longitude: 96.1951 },
  { name: 'Mandalay', country: 'Myanmar', latitude: 21.9588, longitude: 96.0891 },
  { name: 'Naypyidaw', country: 'Myanmar', latitude: 19.7633, longitude: 96.0787 },
  // Afghanistan
  { name: 'Kabul', country: 'Afghanistan', latitude: 34.5553, longitude: 69.2075 },
  { name: 'Kandahar', country: 'Afghanistan', latitude: 31.6289, longitude: 65.7372 },
  { name: 'Herat', country: 'Afghanistan', latitude: 34.3415, longitude: 62.2030 },
  // Iran
  { name: 'Tehran', country: 'Iran', latitude: 35.6892, longitude: 51.3890 },
  { name: 'Mashhad', country: 'Iran', latitude: 36.3239, longitude: 59.5684 },
  { name: 'Isfahan', country: 'Iran', latitude: 32.6546, longitude: 51.6679 },
  { name: 'Shiraz', country: 'Iran', latitude: 29.5918, longitude: 52.5837 },
  { name: 'Tabriz', country: 'Iran', latitude: 38.0962, longitude: 46.2744 },
  { name: 'Qom', country: 'Iran', latitude: 34.6401, longitude: 50.8763 },
  // Nigeria
  { name: 'Lagos', country: 'Nigeria', latitude: 6.5244, longitude: 3.3792 },
  { name: 'Abuja', country: 'Nigeria', latitude: 9.0765, longitude: 7.3986 },
  { name: 'Kano', country: 'Nigeria', latitude: 12.0022, longitude: 8.5919 },
  { name: 'Ibadan', country: 'Nigeria', latitude: 7.3775, longitude: 3.9470 },
  { name: 'Port Harcourt', country: 'Nigeria', latitude: 4.8156, longitude: 7.0498 },
  // Ethiopia
  { name: 'Addis Ababa', country: 'Ethiopia', latitude: 8.9636, longitude: 38.7429 },
  { name: 'Dire Dawa', country: 'Ethiopia', latitude: 9.6000, longitude: 41.8667 },
  // Sudan
  { name: 'Khartoum', country: 'Sudan', latitude: 15.5007, longitude: 32.5599 },
  { name: 'Omdurman', country: 'Sudan', latitude: 15.6445, longitude: 32.4838 },
  { name: 'Port Sudan', country: 'Sudan', latitude: 19.6167, longitude: 37.2167 },
  // Somalia
  { name: 'Mogadishu', country: 'Somalia', latitude: 2.0469, longitude: 45.3182 },
  { name: 'Hargeisa', country: 'Somaliland', latitude: 9.5628, longitude: 44.0658 },
  // Mali
  { name: 'Bamako', country: 'Mali', latitude: 12.6392, longitude: -8.0029 },
  // Niger
  { name: 'Niamey', country: 'Niger', latitude: 13.5137, longitude: 2.1098 },
  // Senegal
  { name: 'Dakar', country: 'Senegal', latitude: 14.7167, longitude: -17.4677 },
  // Gambia
  { name: 'Banjul', country: 'Gambia', latitude: 13.4537, longitude: -16.5780 },
  // Guinea
  { name: 'Conakry', country: 'Guinea', latitude: 9.6412, longitude: -13.5784 },
  // Sierra Leone
  { name: 'Freetown', country: 'Sierra Leone', latitude: 8.4606, longitude: -13.2317 },
  // Liberia
  { name: 'Monrovia', country: 'Liberia', latitude: 6.3153, longitude: -10.8033 },
  // Ivory Coast
  { name: 'Abidjan', country: 'Ivory Coast', latitude: 5.3600, longitude: -3.8781 },
  { name: 'Yamoussoukro', country: 'Ivory Coast', latitude: 6.8276, longitude: -5.2893 },
  // Ghana
  { name: 'Accra', country: 'Ghana', latitude: 5.6037, longitude: -0.1870 },
  { name: 'Kumasi', country: 'Ghana', latitude: 6.6885, longitude: -1.6244 },
  // Cameroon
  { name: 'Douala', country: 'Cameroon', latitude: 4.0493, longitude: 9.7043 },
  { name: 'Yaoundé', country: 'Cameroon', latitude: 3.8480, longitude: 11.5021 },
  // Benin
  { name: 'Cotonou', country: 'Benin', latitude: 6.3539, longitude: 2.4188 },
  // Togo
  { name: 'Lomé', country: 'Togo', latitude: 6.1276, longitude: 1.2255 },
  // Burkina Faso
  { name: 'Ouagadougou', country: 'Burkina Faso', latitude: 12.2383, longitude: -1.5616 },
  // Chad
  { name: 'N\'Djamena', country: 'Chad', latitude: 12.1067, longitude: 15.0444 },
  // Central African Republic
  { name: 'Bangui', country: 'Central African Republic', latitude: 4.3612, longitude: 18.5552 },
  // Congo
  { name: 'Brazzaville', country: 'Congo', latitude: -4.2634, longitude: 15.2429 },
  { name: 'Kinshasa', country: 'DR Congo', latitude: -4.4419, longitude: 15.2663 },
  // Tanzania
  { name: 'Dar es Salaam', country: 'Tanzania', latitude: -6.7924, longitude: 39.2083 },
  { name: 'Dodoma', country: 'Tanzania', latitude: -6.1620, longitude: 35.7516 },
  { name: 'Mwanza', country: 'Tanzania', latitude: -2.5164, longitude: 32.9175 },
  // Kenya
  { name: 'Nairobi', country: 'Kenya', latitude: -1.2921, longitude: 36.8219 },
  { name: 'Mombasa', country: 'Kenya', latitude: -4.0435, longitude: 39.6682 },
  { name: 'Kisumu', country: 'Kenya', latitude: -0.0917, longitude: 34.7676 },
  // Uganda
  { name: 'Kampala', country: 'Uganda', latitude: 0.3476, longitude: 32.5825 },
  // Rwanda
  { name: 'Kigali', country: 'Rwanda', latitude: -1.9441, longitude: 30.0619 },
  // Burundi
  { name: 'Bujumbura', country: 'Burundi', latitude: -3.3643, longitude: 29.3589 },
  // Mozambique
  { name: 'Maputo', country: 'Mozambique', latitude: -25.9692, longitude: 32.5732 },
  // Zambia
  { name: 'Lusaka', country: 'Zambia', latitude: -15.4167, longitude: 28.2833 },
  // Zimbabwe
  { name: 'Harare', country: 'Zimbabwe', latitude: -17.8292, longitude: 31.0521 },
  // Angola
  { name: 'Luanda', country: 'Angola', latitude: -8.8383, longitude: 13.2344 },
  // Gabon
  { name: 'Libreville', country: 'Gabon', latitude: 0.3924, longitude: 9.4544 },
  // Equatorial Guinea
  { name: 'Malabo', country: 'Equatorial Guinea', latitude: 3.7532, longitude: 8.7371 },
  // Seychelles
  { name: 'Victoria', country: 'Seychelles', latitude: -4.6236, longitude: 55.4543 },
  // Maldives
  { name: 'Malé', country: 'Maldives', latitude: 4.1755, longitude: 73.5089 },
  // Sri Lanka
  { name: 'Colombo', country: 'Sri Lanka', latitude: 6.9271, longitude: 79.8612 },
  { name: 'Kandy', country: 'Sri Lanka', latitude: 7.2906, longitude: 80.6337 },
  // Nepal
  { name: 'Kathmandu', country: 'Nepal', latitude: 27.7172, longitude: 85.3240 },
  { name: 'Pokhara', country: 'Nepal', latitude: 28.2096, longitude: 83.9856 },
  // Bhutan
  { name: 'Thimphu', country: 'Bhutan', latitude: 27.4728, longitude: 89.6393 },
  // China
  { name: 'Beijing', country: 'China', latitude: 39.9042, longitude: 116.4074 },
  { name: 'Shanghai', country: 'China', latitude: 31.2304, longitude: 121.4737 },
  { name: 'Guangzhou', country: 'China', latitude: 23.1291, longitude: 113.2644 },
  { name: 'Shenzhen', country: 'China', latitude: 22.5431, longitude: 114.0579 },
  { name: 'Chengdu', country: 'China', latitude: 30.5728, longitude: 104.0668 },
  { name: 'Hangzhou', country: 'China', latitude: 30.2741, longitude: 120.1551 },
  { name: 'Wuhan', country: 'China', latitude: 30.5928, longitude: 114.3055 },
  { name: 'Xi\'an', country: 'China', latitude: 34.3416, longitude: 108.9398 },
  { name: 'Chongqing', country: 'China', latitude: 29.4316, longitude: 106.9123 },
  { name: 'Tianjin', country: 'China', latitude: 39.0842, longitude: 117.2009 },
  { name: 'Nanjing', country: 'China', latitude: 32.0603, longitude: 118.7969 },
  { name: 'Hong Kong', country: 'Hong Kong', latitude: 22.3193, longitude: 114.1694 },
  { name: 'Macau', country: 'Macau', latitude: 22.1987, longitude: 113.5439 },
  // Taiwan
  { name: 'Taipei', country: 'Taiwan', latitude: 25.0330, longitude: 121.5654 },
  { name: 'Kaohsiung', country: 'Taiwan', latitude: 22.6273, longitude: 120.3014 },
  // Japan
  { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Osaka', country: 'Japan', latitude: 34.6937, longitude: 135.5023 },
  { name: 'Kyoto', country: 'Japan', latitude: 35.0116, longitude: 135.7681 },
  { name: 'Yokohama', country: 'Japan', latitude: 35.4437, longitude: 139.6380 },
  { name: 'Nagoya', country: 'Japan', latitude: 35.1815, longitude: 136.9066 },
  { name: 'Sapporo', country: 'Japan', latitude: 43.0642, longitude: 141.3469 },
  { name: 'Fukuoka', country: 'Japan', latitude: 35.5904, longitude: 130.4017 },
  // South Korea
  { name: 'Seoul', country: 'South Korea', latitude: 37.5665, longitude: 126.9780 },
  { name: 'Busan', country: 'South Korea', latitude: 35.1796, longitude: 129.0756 },
  { name: 'Incheon', country: 'South Korea', latitude: 37.4563, longitude: 126.7052 },
  { name: 'Daegu', country: 'South Korea', latitude: 35.8714, longitude: 128.6014 },
  { name: 'Daejeon', country: 'South Korea', latitude: 36.3504, longitude: 127.3845 },
  // North Korea
  { name: 'Pyongyang', country: 'North Korea', latitude: 39.0392, longitude: 125.7625 },
  // Mongolia
  { name: 'Ulaanbaatar', country: 'Mongolia', latitude: 47.8864, longitude: 106.9057 },
  // Vietnam
  { name: 'Hanoi', country: 'Vietnam', latitude: 21.0285, longitude: 105.8542 },
  { name: 'Ho Chi Minh City', country: 'Vietnam', latitude: 10.8231, longitude: 106.6297 },
  { name: 'Da Nang', country: 'Vietnam', latitude: 16.0544, longitude: 108.2022 },
  // Cambodia
  { name: 'Phnom Penh', country: 'Cambodia', latitude: 6.5596, longitude: 104.9282 },
  { name: 'Siem Reap', country: 'Cambodia', latitude: 13.3617, longitude: 103.8556 },
  // Laos
  { name: 'Vientiane', country: 'Laos', latitude: 17.9757, longitude: 102.6331 },
  // Kazakhstan
  { name: 'Almaty', country: 'Kazakhstan', latitude: 43.2220, longitude: 77.0092 },
  { name: 'Nur-Sultan', country: 'Kazakhstan', latitude: 51.1605, longitude: 71.4704 },
  // Uzbekistan
  { name: 'Tashkent', country: 'Uzbekistan', latitude: 41.2995, longitude: 69.2401 },
  { name: 'Samarkand', country: 'Uzbekistan', latitude: 39.6542, longitude: 66.9597 },
  // Turkmenistan
  { name: 'Ashgabat', country: 'Turkmenistan', latitude: 37.9601, longitude: 58.3264 },
  // Tajikistan
  { name: 'Dushanbe', country: 'Tajikistan', latitude: 38.5598, longitude: 68.7869 },
  // Kyrgyzstan
  { name: 'Bishkek', country: 'Kyrgyzstan', latitude: 42.8746, longitude: 74.5698 },
  // Azerbaijan
  { name: 'Baku', country: 'Azerbaijan', latitude: 40.4093, longitude: 44.8671 },
  // Georgia
  { name: 'Tbilisi', country: 'Georgia', latitude: 41.7151, longitude: 44.8271 },
  // Armenia
  { name: 'Yerevan', country: 'Armenia', latitude: 40.1792, longitude: 44.4993 },
  // Cyprus
  { name: 'Nicosia', country: 'Cyprus', latitude: 35.1856, longitude: 33.3823 },
  // Greece
  { name: 'Athens', country: 'Greece', latitude: 37.9838, longitude: 23.7275 },
  { name: 'Thessaloniki', country: 'Greece', latitude: 40.6401, longitude: 22.9444 },
  // Albania
  { name: 'Tirana', country: 'Albania', latitude: 41.3275, longitude: 19.8187 },
  // North Macedonia
  { name: 'Skopje', country: 'North Macedonia', latitude: 41.9973, longitude: 21.4280 },
  // Kosovo
  { name: 'Pristina', country: 'Kosovo', latitude: 42.6629, longitude: 21.1655 },
  // Montenegro
  { name: 'Podgorica', country: 'Montenegro', latitude: 42.4304, longitude: 19.2594 },
  // Bosnia and Herzegovina
  { name: 'Sarajevo', country: 'Bosnia and Herzegovina', latitude: 43.8563, longitude: 18.4131 },
  // Serbia
  { name: 'Belgrade', country: 'Serbia', latitude: 44.8176, longitude: 20.4633 },
  // Croatia
  { name: 'Zagreb', country: 'Croatia', latitude: 45.8150, longitude: 15.9819 },
  // Slovenia
  { name: 'Ljubljana', country: 'Slovenia', latitude: 46.0569, longitude: 14.5058 },
  // Bulgaria
  { name: 'Sofia', country: 'Bulgaria', latitude: 42.6977, longitude: 23.3219 },
  { name: 'Plovdiv', country: 'Bulgaria', latitude: 42.1354, longitude: 24.7453 },
  // Romania
  { name: 'Bucharest', country: 'Romania', latitude: 44.4268, longitude: 26.1025 },
  // Moldova
  { name: 'Chisinau', country: 'Moldova', latitude: 47.0105, longitude: 28.8638 },
  // Ukraine
  { name: 'Kyiv', country: 'Ukraine', latitude: 50.4501, longitude: 30.5234 },
  { name: 'Kharkiv', country: 'Ukraine', latitude: 49.9935, longitude: 36.2304 },
  { name: 'Odesa', country: 'Ukraine', latitude: 46.4825, longitude: 30.7233 },
  { name: 'Dnipro', country: 'Ukraine', latitude: 48.4647, longitude: 35.0462 },
  // Belarus
  { name: 'Minsk', country: 'Belarus', latitude: 53.9006, longitude: 27.5615 },
  // Poland
  { name: 'Warsaw', country: 'Poland', latitude: 52.2297, longitude: 21.0122 },
  { name: 'Krakow', country: 'Poland', latitude: 50.0647, longitude: 19.9450 },
  // Czech Republic
  { name: 'Prague', country: 'Czech Republic', latitude: 50.0755, longitude: 14.4378 },
  // Slovakia
  { name: 'Bratislava', country: 'Slovakia', latitude: 48.1484, longitude: 17.1077 },
  // Austria
  { name: 'Vienna', country: 'Austria', latitude: 48.2082, longitude: 16.3738 },
  // Hungary
  { name: 'Budapest', country: 'Hungary', latitude: 47.4979, longitude: 19.0402 },
  // Germany
  { name: 'Berlin', country: 'Germany', latitude: 52.5200, longitude: 13.4050 },
  { name: 'Munich', country: 'Germany', latitude: 48.1351, longitude: 11.5820 },
  { name: 'Hamburg', country: 'Germany', latitude: 53.5511, longitude: 9.9937 },
  { name: 'Cologne', country: 'Germany', latitude: 50.9375, longitude: 6.9603 },
  { name: 'Frankfurt', country: 'Germany', latitude: 50.1109, longitude: 8.6821 },
  // Switzerland
  { name: 'Zurich', country: 'Switzerland', latitude: 47.3769, longitude: 8.5417 },
  { name: 'Geneva', country: 'Switzerland', latitude: 46.2022, longitude: 6.1457 },
  // Netherlands
  { name: 'Amsterdam', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041 },
  { name: 'Rotterdam', country: 'Netherlands', latitude: 51.9225, longitude: 4.4792 },
  // Belgium
  { name: 'Brussels', country: 'Belgium', latitude: 50.8503, longitude: 4.3517 },
  // Luxembourg
  { name: 'Luxembourg City', country: 'Luxembourg', latitude: 49.6116, longitude: 6.1319 },
  // France
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Lyon', country: 'France', latitude: 45.7640, longitude: 4.8357 },
  { name: 'Marseille', country: 'France', latitude: 43.2965, longitude: 5.3698 },
  { name: 'Nice', country: 'France', latitude: 43.7102, longitude: 7.2620 },
  // United Kingdom
  { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Manchester', country: 'United Kingdom', latitude: 53.4808, longitude: -2.2426 },
  { name: 'Birmingham', country: 'United Kingdom', latitude: 52.4862, longitude: -1.8904 },
  { name: 'Edinburgh', country: 'United Kingdom', latitude: 55.9533, longitude: -3.1883 },
  // Ireland
  { name: 'Dublin', country: 'Ireland', latitude: 53.3498, longitude: -6.2603 },
  // Portugal
  { name: 'Lisbon', country: 'Portugal', latitude: 38.7223, longitude: -9.1393 },
  { name: 'Porto', country: 'Portugal', latitude: 41.1579, longitude: -8.6291 },
  // Spain
  { name: 'Madrid', country: 'Spain', latitude: 40.4168, longitude: -3.7038 },
  { name: 'Barcelona', country: 'Spain', latitude: 41.3851, longitude: 2.1734 },
  { name: 'Valencia', country: 'Spain', latitude: 39.4699, longitude: -0.3763 },
  { name: 'Seville', country: 'Spain', latitude: 37.3891, longitude: -5.9845 },
  // Italy
  { name: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964 },
  { name: 'Milan', country: 'Italy', latitude: 45.4642, longitude: 9.1900 },
  { name: 'Naples', country: 'Italy', latitude: 40.8518, longitude: 14.2681 },
  { name: 'Turin', country: 'Italy', latitude: 45.0703, longitude: 7.6869 },
  { name: 'Venice', country: 'Italy', latitude: 45.4408, longitude: 12.3155 },
  // Vatican City
  { name: 'Vatican City', country: 'Vatican City', latitude: 41.9029, longitude: 12.4534 },
  // San Marino
  { name: 'San Marino', country: 'San Marino', latitude: 43.9424, longitude: 12.4578 },
  // Malta
  { name: 'Valletta', country: 'Malta', latitude: 35.8997, longitude: 14.5147 },
  // Monaco
  { name: 'Monaco', country: 'Monaco', latitude: 43.7384, longitude: 7.4246 },
  // Andorra
  { name: 'Andorra la Vella', country: 'Andorra', latitude: 42.5063, longitude: 1.5218 },
  // Sweden
  { name: 'Stockholm', country: 'Sweden', latitude: 59.3293, longitude: 18.0686 },
  { name: 'Gothenburg', country: 'Sweden', latitude: 57.7089, longitude: 11.9746 },
  // Norway
  { name: 'Oslo', country: 'Norway', latitude: 59.9139, longitude: 10.7522 },
  { name: 'Bergen', country: 'Norway', latitude: 60.3913, longitude: 5.3221 },
  // Denmark
  { name: 'Copenhagen', country: 'Denmark', latitude: 55.6761, longitude: 12.5683 },
  { name: 'Aarhus', country: 'Denmark', latitude: 56.1629, longitude: 10.2039 },
  // Finland
  { name: 'Helsinki', country: 'Finland', latitude: 60.1695, longitude: 24.9354 },
  // Iceland
  { name: 'Reykjavik', country: 'Iceland', latitude: 64.1466, longitude: -21.9426 },
  // Estonia
  { name: 'Tallinn', country: 'Estonia', latitude: 59.4370, longitude: 24.7536 },
  // Latvia
  { name: 'Riga', country: 'Latvia', latitude: 56.9496, longitude: 24.1052 },
  // Lithuania
  { name: 'Vilnius', country: 'Lithuania', latitude: 54.6872, longitude: 25.2839 },
  // Russia
  { name: 'Moscow', country: 'Russia', latitude: 55.7558, longitude: 37.6173 },
  { name: 'Saint Petersburg', country: 'Russia', latitude: 59.9343, longitude: 30.3351 },
  { name: 'Novosibirsk', country: 'Russia', latitude: 55.0084, longitude: 82.9357 },
  { name: 'Yekaterinburg', country: 'Russia', latitude: 56.8389, longitude: 60.6057 },
  { name: 'Kazan', country: 'Russia', latitude: 55.8304, longitude: 49.0661 },
  // USA
  { name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Los Angeles', country: 'USA', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Chicago', country: 'USA', latitude: 41.8781, longitude: -87.6298 },
  { name: 'Houston', country: 'USA', latitude: 29.7604, longitude: -95.3698 },
  { name: 'Phoenix', country: 'USA', latitude: 33.4484, longitude: -112.0740 },
  { name: 'Philadelphia', country: 'USA', latitude: 39.9526, longitude: -75.1652 },
  { name: 'San Antonio', country: 'USA', latitude: 29.4241, longitude: -98.4936 },
  { name: 'San Diego', country: 'USA', latitude: 32.7157, longitude: -117.1611 },
  { name: 'Dallas', country: 'USA', latitude: 32.7767, longitude: -96.7970 },
  { name: 'San Jose', country: 'USA', latitude: 37.3382, longitude: -121.8863 },
  { name: 'San Francisco', country: 'USA', latitude: 37.7749, longitude: -122.4194 },
  { name: 'Seattle', country: 'USA', latitude: 47.6062, longitude: -122.3321 },
  { name: 'Boston', country: 'USA', latitude: 42.3601, longitude: -71.0589 },
  { name: 'Miami', country: 'USA', latitude: 25.7617, longitude: -80.1918 },
  { name: 'Atlanta', country: 'USA', latitude: 33.4484, longitude: -84.3917 },
  { name: 'Denver', country: 'USA', latitude: 39.7392, longitude: -104.9903 },
  { name: 'Washington DC', country: 'USA', latitude: 38.9072, longitude: -77.0369 },
  { name: 'Detroit', country: 'USA', latitude: 42.3314, longitude: -83.0458 },
  { name: 'Minneapolis', country: 'USA', latitude: 44.9778, longitude: -93.2650 },
  // Canada
  { name: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
  { name: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207 },
  { name: 'Montreal', country: 'Canada', latitude: 45.5017, longitude: -73.5673 },
  { name: 'Calgary', country: 'Canada', latitude: 51.0447, longitude: -114.0719 },
  { name: 'Ottawa', country: 'Canada', latitude: 45.4215, longitude: -75.6972 },
  { name: 'Edmonton', country: 'Canada', latitude: 53.5461, longitude: -113.4938 },
  // Mexico
  { name: 'Mexico City', country: 'Mexico', latitude: 19.4326, longitude: -99.1332 },
  { name: 'Guadalajara', country: 'Mexico', latitude: 20.6597, longitude: -103.3496 },
  { name: 'Monterrey', country: 'Mexico', latitude: 25.6866, longitude: -100.3161 },
  { name: 'Cancún', country: 'Mexico', latitude: 21.1619, longitude: -86.8515 },
  { name: 'Tijuana', country: 'Mexico', latitude: 32.5149, longitude: -117.0382 },
  // Guatemala
  { name: 'Guatemala City', country: 'Guatemala', latitude: 14.6349, longitude: -90.5069 },
  // El Salvador
  { name: 'San Salvador', country: 'El Salvador', latitude: 13.6894, longitude: -89.1872 },
  // Honduras
  { name: 'Tegucigalpa', country: 'Honduras', latitude: 14.0942, longitude: -87.2067 },
  // Nicaragua
  { name: 'Managua', country: 'Nicaragua', latitude: 12.1328, longitude: -86.2504 },
  // Costa Rica
  { name: 'San José', country: 'Costa Rica', latitude: 9.9281, longitude: -84.0907 },
  // Panama
  { name: 'Panama City', country: 'Panama', latitude: 8.9824, longitude: -79.5199 },
  // Colombia
  { name: 'Bogotá', country: 'Colombia', latitude: 4.7110, longitude: -74.0721 },
  { name: 'Medellín', country: 'Colombia', latitude: 6.2576, longitude: -75.5658 },
  { name: 'Cali', country: 'Colombia', latitude: 3.4516, longitude: -76.5315 },
  { name: 'Barranquilla', country: 'Colombia', latitude: 10.9685, longitude: -74.7815 },
  // Venezuela
  { name: 'Caracas', country: 'Venezuela', latitude: 10.4806, longitude: -66.9036 },
  { name: 'Maracaibo', country: 'Venezuela', latitude: 10.6317, longitude: -71.6406 },
  // Guyana
  { name: 'Georgetown', country: 'Guyana', latitude: 6.8013, longitude: -58.1551 },
  // Suriname
  { name: 'Paramaribo', country: 'Suriname', latitude: 5.8520, longitude: -55.2038 },
  // French Guiana
  { name: 'Cayenne', country: 'French Guiana', latitude: 4.9333, longitude: -52.3286 },
  // Ecuador
  { name: 'Quito', country: 'Ecuador', latitude: -0.1807, longitude: -78.4678 },
  { name: 'Guayaquil', country: 'Ecuador', latitude: -2.1709, longitude: -79.9225 },
  // Peru
  { name: 'Lima', country: 'Peru', latitude: -12.0464, longitude: -77.0428 },
  { name: 'Cusco', country: 'Peru', latitude: -13.5319, longitude: -71.9675 },
  { name: 'Arequipa', country: 'Peru', latitude: -16.4023, longitude: -71.5398 },
  // Bolivia
  { name: 'La Paz', country: 'Bolivia', latitude: -16.4897, longitude: -68.1193 },
  { name: 'Sucre', country: 'Bolivia', latitude: -19.0333, longitude: -65.2615 },
  { name: 'Santa Cruz de la Sierra', country: 'Bolivia', latitude: -17.7863, longitude: -63.1802 },
  // Paraguay
  { name: 'Asunción', country: 'Paraguay', latitude: -25.2637, longitude: -57.5759 },
  // Chile
  { name: 'Santiago', country: 'Chile', latitude: -33.4489, longitude: -70.6693 },
  { name: 'Valparaíso', country: 'Chile', latitude: -33.0458, longitude: -71.6207 },
  { name: 'Concepción', country: 'Chile', latitude: -36.8201, longitude: -73.0440 },
  // Argentina
  { name: 'Buenos Aires', country: 'Argentina', latitude: -34.6037, longitude: -58.3816 },
  { name: 'Córdoba', country: 'Argentina', latitude: -31.4201, longitude: -64.1888 },
  { name: 'Rosario', country: 'Argentina', latitude: -32.9468, longitude: -60.6393 },
  { name: 'Mendoza', country: 'Argentina', latitude: -32.8895, longitude: -68.8458 },
  // Uruguay
  { name: 'Montevideo', country: 'Uruguay', latitude: -34.9011, longitude: -56.1645 },
  // Brazil
  { name: 'São Paulo', country: 'Brazil', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Rio de Janeiro', country: 'Brazil', latitude: -22.9068, longitude: -43.1729 },
  { name: 'Brasília', country: 'Brazil', latitude: -15.7975, longitude: -47.8929 },
  { name: 'Salvador', country: 'Brazil', latitude: -12.9711, longitude: -38.5014 },
  { name: 'Fortaleza', country: 'Brazil', latitude: -3.7172, longitude: -38.5433 },
  { name: 'Belo Horizonte', country: 'Brazil', latitude: -19.9220, longitude: -43.9450 },
  { name: 'Manaus', country: 'Brazil', latitude: -3.1190, longitude: -60.0217 },
  { name: 'Recife', country: 'Brazil', latitude: -8.0539, longitude: -34.8813 },
  { name: 'Porto Alegre', country: 'Brazil', latitude: -30.0346, longitude: -51.2177 },
  // Australia
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
  { name: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631 },
  { name: 'Brisbane', country: 'Australia', latitude: -27.4698, longitude: 153.0251 },
  { name: 'Perth', country: 'Australia', latitude: -31.9505, longitude: 115.8605 },
  { name: 'Adelaide', country: 'Australia', latitude: -34.9285, longitude: 138.6007 },
  { name: 'Canberra', country: 'Australia', latitude: -35.2809, longitude: 149.1300 },
  { name: 'Gold Coast', country: 'Australia', latitude: -28.0167, longitude: 153.4009 },
  // New Zealand
  { name: 'Auckland', country: 'New Zealand', latitude: -36.8485, longitude: 174.7633 },
  { name: 'Wellington', country: 'New Zealand', latitude: -41.2924, longitude: 174.7787 },
  { name: 'Christchurch', country: 'New Zealand', latitude: -43.5321, longitude: 172.6362 },
  // Fiji
  { name: 'Suva', country: 'Fiji', latitude: -18.1248, longitude: 178.4501 },
  // Papua New Guinea
  { name: 'Port Moresby', country: 'Papua New Guinea', latitude: -9.4438, longitude: 147.1803 },
]

const prayers = computed(() => {
  if (!prayerTimes.value) return []
  
  const timings = prayerTimes.value.data.timings
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const prayerList = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha }
  ]
  
  let foundNext = false
  
  return prayerList.map(prayer => {
    const [hours, minutes] = prayer.time.split(':').map(Number)
    const prayerMinutes = hours * 60 + minutes
    
    const hasPassed = prayerMinutes < currentTime
    const isNext = !foundNext && !hasPassed
    
    if (!hasPassed && !foundNext) {
      foundNext = true
    }
    
    return {
      ...prayer,
      hasPassed,
      isNext
    }
  })
})

const nextPrayer = computed(() => {
  return prayers.value.find(p => p.isNext) || null
})

const hijriDate = computed(() => {
  if (!prayerTimes.value || !prayerTimes.value.data.date) {
    return 'Loading...'
  }
  const hijri = prayerTimes.value.data.date.hijri
  return `${hijri.day} ${hijri.month.en} ${hijri.year} AH`
})

const filteredCities = computed(() => {
  if (!citySearchQuery.value.trim()) {
    return popularCities
  }
  const query = citySearchQuery.value.toLowerCase()
  return popularCities.filter(city =>
    city.name.toLowerCase().includes(query) ||
    city.country.toLowerCase().includes(query)
  )
})

const updateCountdown = () => {
  if (!nextPrayer.value) {
    countdown.value = '--:--:--'
    return
  }
  
  const [hours, minutes] = nextPrayer.value.time.split(':').map(Number)
  const now = new Date()
  const prayerTime = new Date()
  prayerTime.setHours(hours, minutes, 0, 0)
  
  if (prayerTime < now) {
    prayerTime.setDate(prayerTime.getDate() + 1)
  }
  
  const diff = prayerTime - now
  
  if (diff <= 0) {
    countdown.value = '00:00:00'
    return
  }
  
  const h = Math.floor(diff / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((diff % (1000 * 60)) / 1000)
  
  countdown.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const loadPrayerTimes = async (location) => {
  try {
    const data = await prayerApi.getPrayerTimes(
      location.latitude,
      location.longitude
    )
    prayerTimes.value = data
    currentLocation.value = location
    locationStore.setCurrentLocation(location)
  } catch (error) {
    console.error('Failed to load prayer times:', error)
    alert('Failed to load prayer times. Please try again.')
  }
}

const detectLocation = async () => {
  try {
    const position = await locationStore.getCurrentPosition()
    const location = {
      name: 'Current Location',
      latitude: position.latitude,
      longitude: position.longitude
    }
    await loadPrayerTimes(location)
    showLocationModal.value = false
  } catch (error) {
    console.error('Geolocation error:', error)
    alert('Could not get your location. Please search for a city instead.')
  }
}

const selectCity = async (city) => {
  try {
    const data = await prayerApi.getPrayerTimes(city.latitude, city.longitude)
    prayerTimes.value = data
    currentLocation.value = {
      name: `${city.name}, ${city.country}`,
      latitude: city.latitude,
      longitude: city.longitude
    }
    locationStore.setCurrentLocation(currentLocation.value)
    showLocationModal.value = false
    citySearchQuery.value = ''
  } catch (error) {
    console.error('Error loading prayer times for city:', error)
    alert('Failed to load prayer times for this city. Please try again.')
  }
}

const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications')
    return
  }
  
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    alert('Notifications enabled! You will receive reminders for prayer times.')
  }
}

onMounted(async () => {
  if (locationStore.currentLocation) {
    await loadPrayerTimes(locationStore.currentLocation)
  } else {
    // Default to Jakarta
    await loadPrayerTimes({
      name: 'Jakarta, Indonesia',
      latitude: -6.2088,
      longitude: 106.8456
    })
  }
  
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>
