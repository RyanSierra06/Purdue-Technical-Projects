import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WireMeshBackground = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    // Limit pixel ratio for better performance, especially on high-DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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

    // Create graph nodes in a grid pattern
    const nodes = []
    const nodeSpacing = 15
    const gridCols = 20
    const gridRows = 12
    const maxConnectionDistance = 20
    
    // Generate node positions with animation data
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const baseX = (col - gridCols / 2) * nodeSpacing
        const baseY = (row - gridRows / 2) * nodeSpacing
        // Add slight randomness for organic feel
        const offsetX = (Math.random() - 0.5) * 3
        const offsetY = (Math.random() - 0.5) * 3
        nodes.push({
          baseX: baseX + offsetX,
          baseY: baseY + offsetY,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          speedX: 0.3 + Math.random() * 0.2,
          speedY: 0.3 + Math.random() * 0.2,
          amplitude: 1 + Math.random() * 1.5
        })
      }
    }

    // Store connections (edges) as pairs of node indices
    const connections = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX
        const dy = nodes[i].baseY - nodes[j].baseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Connect nodes that are close enough
        if (distance < maxConnectionDistance) {
          // Add some randomness to connection probability
          if (Math.random() > 0.3) {
            connections.push([i, j])
          }
        }
      }
    }

    // Create edge geometry and material
    const edgeGeometry = new THREE.BufferGeometry()
    const edgePositions = new Float32Array(connections.length * 6)
    edgeGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4a90e2,
      opacity: 0.4,
      transparent: true
    })

    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    scene.add(edges)

    // Create node points
    const nodeGeometry = new THREE.BufferGeometry()
    const nodePositions = new Float32Array(nodes.length * 3)
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x4a90e2,
      size: 1.5,
      sizeAttenuation: false
    })

    const points = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(points)

    // Animation loop
    let time = 0
    let animationFrameId = null
    let isVisible = true

    // Pause animation when tab is hidden to save resources
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      // Skip rendering if tab is hidden
      if (!isVisible) return
      
      time += 0.01

      // Update node positions with floating animation
      const positionArray = nodeGeometry.attributes.position.array
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const x = node.baseX + Math.sin(time * node.speedX + node.phaseX) * node.amplitude
        const y = node.baseY + Math.cos(time * node.speedY + node.phaseY) * node.amplitude
        const z = 0
        
        positionArray[i * 3] = x
        positionArray[i * 3 + 1] = y
        positionArray[i * 3 + 2] = z
      }
      nodeGeometry.attributes.position.needsUpdate = true

      // Update edge positions based on current node positions
      const edgeArray = edgeGeometry.attributes.position.array
      for (let i = 0; i < connections.length; i++) {
        const [nodeIndex1, nodeIndex2] = connections[i]
        const node1 = nodes[nodeIndex1]
        const node2 = nodes[nodeIndex2]
        
        const x1 = node1.baseX + Math.sin(time * node1.speedX + node1.phaseX) * node1.amplitude
        const y1 = node1.baseY + Math.cos(time * node1.speedY + node1.phaseY) * node1.amplitude
        const x2 = node2.baseX + Math.sin(time * node2.speedX + node2.phaseX) * node2.amplitude
        const y2 = node2.baseY + Math.cos(time * node2.speedY + node2.phaseY) * node2.amplitude
        
        edgeArray[i * 6] = x1
        edgeArray[i * 6 + 1] = y1
        edgeArray[i * 6 + 2] = 0
        edgeArray[i * 6 + 3] = x2
        edgeArray[i * 6 + 4] = y2
        edgeArray[i * 6 + 5] = 0
      }
      edgeGeometry.attributes.position.needsUpdate = true

      // Pulse edge opacity
      edgeMaterial.opacity = 0.3 + Math.sin(time * 2) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup animation frame on unmount
    const cleanup = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }

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
      cleanup()
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
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
