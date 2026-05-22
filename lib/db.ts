import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

export function readDB<T>(filename: string): T[] {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) return []
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

export function writeDB<T>(filename: string, data: T[]): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
