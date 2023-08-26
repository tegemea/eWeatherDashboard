import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { axios } from '../configs/axios'

export const useLocationStore = defineStore('Location', () => {

    // hard-coded open weather map api key
    const apiKey = ref('c6a724fc7d3ee0ec2a773e95c71bae3b')

    const loading = ref(false)
    const locationsHistory = ref([])
    const coordinates = reactive({
        latitute: null,
        longitude: null
    })

    const getMyLocation = () => {
        loading.value = true
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    ({ coords }) => {
                        if (coords) {
                            coordinates.latitute = coords.latitude
                            coordinates.longitude = coords.longitude
                            getWeatherData(coordinates.latitude, coordinates.longitude)
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
                    { maximumAge: 300000, timeout: 15000, enableHighAccuracy: false }
                )
            } else {
                console.log('Geolocation not supported')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getWeatherData = async (lat, lon) => {
        try {
            await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey.value}`)
            // console.log(res)
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
        coordinates,
        loading,
        getMyLocation
    }

})