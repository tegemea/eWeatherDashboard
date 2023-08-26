import Axios from 'axios'

const instance = Axios.create({
    timeout: 3000,
})

export { instance as axios }