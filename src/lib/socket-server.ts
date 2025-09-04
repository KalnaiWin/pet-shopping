// lib/socket-server.ts
import { Server } from 'socket.io'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { prisma } from './prisma'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

let io: Server

export const initSocketServer = async () => {
  await app.prepare()

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handler(req, res, parsedUrl)
  })

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Join user to their specific room
    socket.on('join', (userId: string) => {
      socket.join(`user_${userId}`)
      console.log(`User ${userId} joined their room`)
    })

    // Handle sending messages
    socket.on('send_message', async (data: {
      text: string
      senderId: string
      receiverId: string
    }) => {
      try {
        // Save message to database
        const message = await prisma.message.create({
          data: {
            text: data.text,
            senderId: data.senderId,
            receiverId: data.receiverId,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
                role: true
              }
            },
            receiver: {
              select: {
                id: true,
                name: true,
                image: true,
                role: true
              }
            }
          }
        })

        // Send message to both sender and receiver rooms
        io.to(`user_${data.senderId}`).emit('receive_message', message)
        io.to(`user_${data.receiverId}`).emit('receive_message', message)

        console.log('Message sent and saved:', message.id)
      } catch (error) {
        console.error('Error saving message:', error)
        socket.emit('message_error', { error: 'Failed to send message' })
      }
    })

    // Handle typing indicators
    socket.on('typing', (data: { senderId: string, receiverId: string, isTyping: boolean }) => {
      socket.to(`user_${data.receiverId}`).emit('user_typing', {
        userId: data.senderId,
        isTyping: data.isTyping
      })
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
}

export { io }
