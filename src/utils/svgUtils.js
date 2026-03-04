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
    node.removeAttribute('onload')
    node.removeAttribute('onclick')
  })

  return {
    viewBox,
    content: svgEl.innerHTML,
  }
}

export function svgToJsx(svgMarkup) {
  const jsxMarkup = svgMarkup
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')

  const withProps = jsxMarkup.replace('<svg ', '<svg {...props} ')

  return `export function Icon(props) {\n  return (\n    ${withProps}\n  );\n}`
}
