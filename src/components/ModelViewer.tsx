'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three-stdlib'

const ModelViewer = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Tambah cahaya
    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    let object: THREE.Object3D

    const loader = new OBJLoader()
    loader.load('/base.obj', (loadedObject) => {
      object = loadedObject
      object.scale.set(1, 1, 1)
      object.position.set(0, -0.5, 0) // Turunkan sedikit agar lebih center visual
      scene.add(object)
    })

    // Inisialisasi kamera di posisi awal
    const radius = 3
    let angle = 0

    const animate = () => {
      requestAnimationFrame(animate)

      angle += 0.01 // kecepatan rotasi kamera
      const x = radius * Math.sin(angle)
      const z = radius * Math.cos(angle)

      camera.position.set(x, 0, z) // hanya horizontal
      camera.lookAt(new THREE.Vector3(0, 0, 0)) // arahkan ke tengah scene

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      while (mountRef.current?.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10 [perspective:1000px]">
      <div ref={mountRef} className="flex justify-center items-center w-3/4 sm:w-2/4 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-xs sm:max-w-sm md:max-w-lg mt-44 h-[800px]" />
    </div>
  )
}

export default ModelViewer
