/**
 * Script untuk extract embedded PNG dari file SVG
 * yang berisi <image xlink:href="data:image/png;base64,..."/>
 */
const fs = require('fs')
const path = require('path')

const assetsDir = path.join(__dirname, '..', 'assets', 'images')

const files = [
  { svg: 'Kosong.svg',  png: 'Kosong.png'  },
  { svg: 'Pesanan.svg', png: 'Pesanan.png' },
]

files.forEach(({ svg, png }) => {
  const svgPath = path.join(assetsDir, svg)
  const pngPath = path.join(assetsDir, png)

  if (!fs.existsSync(svgPath)) {
    console.log(`⚠️  File tidak ditemukan: ${svg}`)
    return
  }

  const content = fs.readFileSync(svgPath, 'utf-8')

  // Cari base64 PNG data di dalam SVG
  const match = content.match(/xlink:href="data:image\/png;base64,([^"]+)"/)
  if (!match) {
    console.log(`⚠️  Tidak ada embedded PNG di: ${svg}`)
    return
  }

  const base64Data = match[1]
  const buffer = Buffer.from(base64Data, 'base64')
  fs.writeFileSync(pngPath, buffer)
  console.log(`✅  Berhasil extract: ${svg} → ${png} (${(buffer.length / 1024).toFixed(1)} KB)`)
})
