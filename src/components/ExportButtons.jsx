function downloadFile(url, name) {
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  URL.revokeObjectURL(url)
}

async function svgToCanvas(svgElement, size) {
  const serialized = new XMLSerializer().serializeToString(svgElement)
  const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, size, size)
  URL.revokeObjectURL(url)

  return canvas
}

function ExportButtons({ iconName, iconSize }) {
  const getSvgNode = () => document.getElementById('icon-generator-svg')

  const downloadSvg = () => {
    const svgNode = getSvgNode()
    if (!svgNode) return

    const serialized = new XMLSerializer().serializeToString(svgNode)
    const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' })
    downloadFile(URL.createObjectURL(blob), `${iconName}.svg`)
  }

  const downloadPng = async () => {
    const svgNode = getSvgNode()
    if (!svgNode) return

    const canvas = await svgToCanvas(svgNode, iconSize)
    canvas.toBlob((blob) => {
      if (!blob) return
      downloadFile(URL.createObjectURL(blob), `${iconName}.png`)
    }, 'image/png')
  }

  const downloadIco = async () => {
    const svgNode = getSvgNode()
    if (!svgNode) return

    const canvas = await svgToCanvas(svgNode, 256)
    canvas.toBlob((blob) => {
      if (!blob) return
      downloadFile(URL.createObjectURL(blob), `${iconName}.ico`)
    }, 'image/png')
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={downloadPng}
        className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Download PNG
      </button>
      <button
        type="button"
        onClick={downloadSvg}
        className="w-full rounded-md bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Download SVG
      </button>
      <button
        type="button"
        onClick={downloadIco}
        className="w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Download ICO
      </button>
    </div>
  )
}

export default ExportButtons
