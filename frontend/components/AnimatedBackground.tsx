"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(66, 135, 245, 0.5)")
    gradient.addColorStop(1, "rgba(153, 102, 255, 0.5)")

    let time = 0
    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(
          Math.sin(time + i) * canvas.width * 0.5 + canvas.width * 0.5,
          Math.cos(time + i) * canvas.height * 0.5 + canvas.height * 0.5,
          Math.abs(Math.sin(time)) * 50 + 50,
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 - i * 0.02})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

