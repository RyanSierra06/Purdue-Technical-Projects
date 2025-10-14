import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WireMeshBackground = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    console.log('Creating waterfall wire mesh from scratch...')

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.domElement.style.width = `${window.innerWidth}px`
    renderer.domElement.style.height = `${window.innerHeight}px`
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020208)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50
    camera.position.y = 0
    camera.lookAt(0, 0, 0)

    const gridWidth = 200
    const gridHeight = 100
    const gridDivisionsX = 40
    const gridDivisionsY = 20
    const spacingX = gridWidth / gridDivisionsX
    const spacingY = gridHeight / gridDivisionsY

    const gridGeometry = new THREE.BufferGeometry()
    const positions = []

    for (let i = 0; i <= gridDivisionsY; i++) {
      const y = (i - gridDivisionsY / 2) * spacingY
      positions.push(-gridWidth / 2, y, 0)
      positions.push(gridWidth / 2, y, 0)
    }

    for (let i = 0; i <= gridDivisionsX; i++) {
      const x = (i - gridDivisionsX / 2) * spacingX
      positions.push(x, -gridHeight / 2, 0)
      positions.push(x, gridHeight / 2, 0)
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4a90e2,
      linewidth: 2
    })

    const grids = []
    const numGrids = 4

    for (let i = 0; i < numGrids; i++) {
      const grid = new THREE.LineSegments(gridGeometry, gridMaterial)
      grid.position.y = i * gridHeight
      grids.push(grid)
      scene.add(grid)
    }

    console.log(`Created ${numGrids} overlapping grids for infinite waterfall effect`)

    const animate = () => {
      requestAnimationFrame(animate)

      grids.forEach((grid) => {
        grid.position.y -= 0.03 // Move down slower

        if (grid.position.y < -gridHeight - 50) {
          const highestY = Math.max(...grids.map(g => g.position.y))
          grid.position.y = highestY + gridHeight
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)

        renderer.domElement.style.width = `${width}px`
        renderer.domElement.style.height = `${height}px`
        renderer.domElement.style.display = 'block'
      }, 16)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#020208"
      }}
    />
  )
}

export default WireMeshBackground
