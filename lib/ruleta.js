// lib/ruleta.js
import { spawn } from 'child_process'
import { join } from 'path'
import fs from 'fs-extra'

// Generar imagen de ruleta
export async function generarRuletaImagen(outputPath, segments, rotationDeg = 0) {
    return new Promise(async (resolve, reject) => {
        if (!(global.support.magick || global.support.gm)) return reject('ImageMagick/GraphicsMagick no soportado')
        
        const cmd = global.support.gm ? 'gm' : 'magick'
        const args = []

        // Tamaño de la imagen
        const size = 720
        const cx = size / 2
        const cy = size / 2
        const radius = size * 0.42
        const sliceAngle = 360 / segments.length

        // Crear lienzo
        args.push('convert', '-size', `${size}x${size}`, 'canvas:#0b0b0b')

        // Dibujar cada segmento
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i]
            const start = i * sliceAngle + rotationDeg
            const end = (i + 1) * sliceAngle + rotationDeg
            args.push(
                '(',
                '-size', `${size}x${size}`,
                'xc:none',
                '-fill', seg.color,
                '-draw', `path 'M ${cx},${cy} L ${cx + radius * Math.cos(Math.PI * start / 180)},${cy + radius * Math.sin(Math.PI * start / 180)} A ${radius},${radius} 0 0,1 ${cx + radius * Math.cos(Math.PI * end / 180)},${cy + radius * Math.sin(Math.PI * end / 180)} Z'`,
                '-fill', 'white',
                '-gravity', 'center',
                '-pointsize', '32',
                '-annotate', `${start + sliceAngle / 2 - 90} ${seg.label}`,
                ')',
                '-composite'
            )
        }

        // Texto central
        args.push(
            '-fill', '#FFD700',
            '-gravity', 'center',
            '-pointsize', '36',
            '-annotate', '+0+0', 'asta bot'
        )

        // Guardar
        args.push(outputPath)

        const proc = spawn(cmd, args)
        proc.on('error', reject)
        proc.on('close', () => resolve(outputPath))
    })
}
