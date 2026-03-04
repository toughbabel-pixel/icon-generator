export function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/\.svg$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function parseAndNormalizeSvg(svgText) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgText, 'image/svg+xml')
  const svgEl = doc.querySelector('svg')

  if (!svgEl) {
    throw new Error('Invalid SVG file.')
  }

  doc.querySelectorAll('script').forEach((node) => node.remove())

  const viewBox = svgEl.getAttribute('viewBox') || '0 0 24 24'

  svgEl.querySelectorAll('*').forEach((node) => {
    node.removeAttribute('fill')
    node.removeAttribute('stroke')
    node.removeAttribute('stroke-width')
    node.removeAttribute('stroke-linecap')
    node.removeAttribute('stroke-linejoin')
    node.removeAttribute('style')
  })

  return {
    viewBox,
    content: svgEl.innerHTML,
  }
}

export function svgToJsx(svgMarkup) {
  return `export function Icon(props) {\n  return (\n    ${svgMarkup
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/([a-zA-Z-]+)=\"([^\"]*)\"/g, (match, attr, value) => {
      if (attr.includes('-')) return `${camelCase(attr)}=\"${value}\"`
      return match
    })} \n  );\n}`
}

function camelCase(input) {
  return input.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}
