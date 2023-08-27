import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { axios } from '../configs/axios'

export const useLocationStore = defineStore('Location', () => {

    // hard-coded open weather map api key
    const apiKey = ref('c6a724fc7d3ee0ec2a773e95c71bae3b')

    const loading = ref(false)
    const myCityData = ref({})
    const cityWeatherData = ref(null)
    const cityChoicesOnSearch = ref([])
    const locationsHistory = ref([])
    const cityNameToSearch = ref('')
    const coordinates = reactive({
        latitute: null,
        longitude: null
    })

    watch(
        cityNameToSearch,
        v => { if (!v.length) cityChoicesOnSearch.value = [] }
    )

    const getLocation = () => {
        loading.value = true
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async ({ coords }) => {
                        if (coords) {
                            coordinates.latitute = coords.latitude
                            coordinates.longitude = coords.longitude
                            const { data: theCityData } = await getCityName(coords.latitude, coords.longitude)
                            myCityData.value = theCityData[0]
                            const { data: theCityWeatherData } = await getWeatherData(coords.latitude, coords.longitude)
                            cityWeatherData.value = theCityWeatherData
                            loading.value = false
                        }
                    },
                    error => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                console.log("User denied the request for Geolocation.")
                                loading.value = false
                                break;
                            case error.POSITION_UNAVAILABLE:
                                console.log("Location information is unavailable.")
                                loading.value = false
                                break;
                            case error.TIMEOUT:
                                console.log("The request to get user location timed out.")
                                loading.value = false
                                break;
                            case error.UNKNOWN_ERROR:
                                console.log("An unknown error occurred.")
                                loading.value = false
                                break;
                        }
                    },
                    { maximumAge: Infinity, timeout: 5000, enableHighAccuracy: true }
                )
            } else {
                console.log('Geolocation not supported by this browser')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getCityName = async (lat, lon) => {
        try {
            return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                console.log('Sorry, response error', e.response)
            } else if (e.request) {
                // request error
                console.log('Sorry, request error', e.request)
            } else {
                // general error
                // console.log(e.message)
            }
            // console.log(e.config)
        }
    }

    const getWeatherData = async (lat, lon) => {
        try {
            return await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                console.log('Sorry, response error', e.response)
            } else if (e.request) {
                // request error
                console.log('Sorry, request error', e.request)
            } else {
                // general error
                // console.log(e.message)
            }
            // console.log(e.config)
        }
    }

    const getCityChoicesByName = async (city) => {
        loading.value = true;
        try {
            return await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=${apiKey.value}`)
            // return await axios.get(`https://api.openweathermap.org/data/2.5/forecast?cnt=5&q=${city.value}&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                console.log('Sorry, response error', e.response)
                loading.value = false
            } else if (e.request) {
                // request error
                console.log('Sorry, request error', e.request)
                loading.value = false
            } else {
                // general error
                // console.log(e.message)
                loading.value = false
            }
            // console.log(e.config)
        }
    }

    const getCityWeatherData = async (lat, lon) => {
        loading.value = true;
        try {
            return await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey.value}`)
            // return await axios.get(`https://api.openweathermap.org/data/2.5/forecast?cnt=5&q=${city.value}&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                console.log('Sorry, response error', e.response)
            } else if (e.request) {
                // request error
                console.log('Sorry, request error', e.request)
            } else {
                // general error
                // console.log(e.message)
            }
            // console.log(e.config)
        }
    }

    return {
        locationsHistory,
        myCityData,
        cityNameToSearch,
        cityWeatherData,
        coordinates,
        cityChoicesOnSearch,
        loading,
        getLocation,
        getCityChoicesByName,
        getCityWeatherData
    }

})