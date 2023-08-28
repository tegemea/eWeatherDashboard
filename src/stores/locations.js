import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { axios } from '../configs/axios'
import dayjs from 'dayjs'

export const useLocationStore = defineStore('Location', () => {

    // hard-coded open weather map api key
    const apiKey = ref('c6a724fc7d3ee0ec2a773e95c71bae3b')

    const errors = ref([])

    const loading = ref(false)
    const tempUnits = ref('ºC')
    const humidUnits = ref('RH')
    const windSpeedUnits = ref('m/s')
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
                                errors.value.push('Sorry, User denied the request for Geolocation.')
                                loading.value = false
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errors.value.push('Sorry, Location information is unavailable.')
                                loading.value = false
                                break;
                            case error.TIMEOUT:
                                errors.value.push('Sorry, The request to get user location timed out.')
                                loading.value = false
                                break;
                            case error.UNKNOWN_ERROR:
                                console.log("An unknown error occurred.")
                                errors.value.push('Sorry, An unknown error occurred. Our Engineers are working on it.')
                                loading.value = false
                                break;
                        }
                    },
                    { maximumAge: Infinity, timeout: 5000, enableHighAccuracy: true }
                )
            } else {
                errors.value.push('Geolocation not supported by this browser')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getCityName = async (lat, lon) => {
        try {
            return axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                errors.value.push(`Sorry, there is an error. Error : ${e.response}`)
                loading.value = false
            } else if (e.request) {
                // request error
                errors.value.push(`Sorry, there is an error. Error :  ${e.request}`)
                loading.value = false
            } else {
                // general error
                errors.value.push(e)
                loading.value = false
            }
        }
    }

    const getWeatherData = async (lat, lon) => {
        try {
            return await axios.get(`https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                errors.value.push(`Sorry, there is an error. Error : ${e.response}`)
                loading.value = false
            } else if (e.request) {
                // request error
                errors.value.push(`Sorry, there is an error. Error :  ${e.request}`)
                loading.value = false
            } else {
                // general error
                errors.value.push(e)
                loading.value = false
            }
        }
    }

    const getCityChoicesByName = async (city) => {
        loading.value = true;
        try {
            return await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=${apiKey.value}`)
        } catch (e) {
            if (e.response) {
                // response error here
                errors.value.push(`Sorry, there is an error. Error : ${e.response}`)
                loading.value = false
            } else if (e.request) {
                // request error
                errors.value.push(`Sorry, there is an error. Error :  ${e.request}`)
                loading.value = false
            } else {
                // general error
                errors.value.push(e)
                loading.value = false
            }
        }
    }

    const getCityWeatherData = async (lat, lon) => {
        loading.value = true;
        try {
            const {
                data: cityForecast
            } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey.value}`)
            const {
                data: cityCurrentWeather
            } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey.value}`)
            return { cityForecast, cityCurrentWeather }
        } catch (e) {
            if (e.response) {
                // response error here
                errors.value.push(`Sorry, there is an error. Error : ${e.response}`)
                loading.value = false
            } else if (e.request) {
                // request error
                errors.value.push(`Sorry, there is an error. Error :  ${e.request}`)
                loading.value = false
            } else {
                // general error
                errors.value.push(e.message)
                loading.value = false
            }
        }
    }

    const getOnlyMorningData = data => {
        try {
            return { city: data.city, forecasts: data.list.filter(d => dayjs(d.dt_txt).format('HH:mm:ss') === '09:00:00') }
        } catch (e) {
            errors.value.push(`Sorry, there is an error. Error : ${e.message}`)
        }
    }

    return {
        locationsHistory,
        myCityData,
        tempUnits,
        windSpeedUnits,
        humidUnits,
        cityNameToSearch,
        cityWeatherData,
        coordinates,
        cityChoicesOnSearch,
        loading,
        errors,
        getLocation,
        getCityChoicesByName,
        getCityWeatherData,
        getOnlyMorningData
    }

})