import axios from 'axios'

export const emitteMaisApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EMITTE_MAIS_API,
})
