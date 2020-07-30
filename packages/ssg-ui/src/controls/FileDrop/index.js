import { useEffect, useState } from 'react'

export function useFileDrop(props) {
  const { onDrop } = props
  const [isDragActive, setIsDragActive] = useState(false)

  useEffect(() => {
    let allowDropTimer

    function handleDragover(e) {
      e.preventDefault()
      clearTimeout(allowDropTimer)
      allowDropTimer = window.setTimeout(function () {
        setIsDragActive(false)
      }, 150)
      setIsDragActive(true)
    }
    function handleDrop(e) {
      e.preventDefault()
      if (e.dataTransfer.files) {
        for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
          const file = e.dataTransfer.files[i]
          onDrop(file)
        }
      }
    }
    document.body.addEventListener('dragover', handleDragover)
    document.body.addEventListener('drop', handleDrop)

    return function () {
      document.body.removeEventListener('dragover', handleDragover)
      document.body.removeEventListener('drop', handleDrop)
    }
  }, [])
  return { isDragActive }
}
