# 3ADS UX

One page do time de UX da 3ADS: portfólio de landing pages, sites, protótipos e e-commerce.

**No ar:** https://atende3ads-ux.github.io/3ads-ux/

Segue o design system da página da [3ADS EDU](https://atende3ads-ux.github.io/3ads-edu/) (repo `atende3ads-ux/3ads-edu`): Geist, papel `#fafbf9`, azul `#a8dded`, verde-petróleo `#182323`, botões divididos e as mesmas seções (topo com vídeo, clientes, projetos, formatos, método, perguntas e contato).

## Estrutura

```
index.html          a página
assets/styles.css   estilos (baseados em src/styles.css da EDU)
assets/main.js      projetos, serviços, perguntas, modal e vídeo
assets/fonts/       Geist
media/              vídeo do topo (1080p no desktop, 720p no celular) e capa
images/projetos/    capturas dos projetos (capa, página inteira e celular)
images/clientes/    logos de clientes da 3ADS
scripts/servir.mjs  servidor local: node scripts/servir.mjs → http://localhost:4175/
```

HTML, CSS e JS puros, sem build. Push na `main` publica no GitHub Pages.

## Editar conteúdo

- **Projetos, serviços e perguntas:** objetos `PROJETOS`, `SERVICOS` e `PERGUNTAS` no topo de `assets/main.js`. O projeto em destaque (EQ Seguros) fica no `index.html`.
- **Imagens de projeto:** `images/projetos/<slug>-capa.webp` (primeira tela no desktop), `<slug>-pagina.webp` (página inteira) e `<slug>-celular.webp`. Foram geradas a partir das cópias limpas da [Biblioteca de LPs](https://github.com/atende3ads-ux/portal-lps).
- **Contato:** WhatsApp da 3ADS (o mesmo da página da EDU), na constante `WHATSAPP` em `assets/main.js`.
- **Vídeo do topo:** gerado a partir do original 2560×1440 com:

  ```bash
  ffmpeg -i original.mp4 -an -vf "scale=1920:1080,fps=30" -c:v libx264 -preset slow -crf 24 -movflags +faststart media/ux-hero-1080.mp4
  ffmpeg -i original.mp4 -an -vf "scale=1280:720,fps=30" -c:v libx264 -preset slow -crf 26 -movflags +faststart media/ux-hero-720.mp4
  ```
