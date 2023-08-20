import { io } from 'socket.io-client'

const baseUrl = process.env.NEXT_PUBLIC_API_ROUTE as string

export const socket = io(baseUrl, {
  autoConnect: false,
})
