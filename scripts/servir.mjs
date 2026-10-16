#!/usr/bin/env node
// Servidor local para ver o site: node scripts/servir.mjs [porta] → http://localhost:4175/
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.json': 'application/json; charset=utf-8',
};
const porta = +process.argv[2] || 4175;

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  const arq = path.normalize(path.join(RAIZ, rel));
  if (!arq.startsWith(RAIZ) || !fs.existsSync(arq) || !fs.statSync(arq).isFile()) { res.writeHead(404); return res.end('404'); }
  const tam = fs.statSync(arq).size;
  const tipo = TIPOS[path.extname(arq).toLowerCase()] || 'application/octet-stream';
  const r = req.headers.range && req.headers.range.match(/bytes=(\d*)-(\d*)/);
  if (r) {
    const ini = r[1] ? +r[1] : 0;
    const fim = r[2] ? +r[2] : tam - 1;
    res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${ini}-${fim}/${tam}`, 'Accept-Ranges': 'bytes', 'Content-Length': fim - ini + 1 });
    return fs.createReadStream(arq, { start: ini, end: fim }).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': tam, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' });
  fs.createReadStream(arq).pipe(res);
}).listen(porta, '127.0.0.1', () => console.log(`3ADS UX em http://localhost:${porta}/`));
