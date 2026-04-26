# Hotmart (arquivos do produto)

Conteúdo sugerido para upload na Hotmart:

- `Guia - Cardápio Digital Moderno.pdf` (gerado a partir de `docs/hotmart/ebook.md`)
- `BellaCucina-Template.zip` (código-fonte do template, sem `node_modules/`)

## Gerar PDF (opção rápida)

Se você tiver `pandoc` instalado:

```bash
pandoc docs/hotmart/ebook.md -o "Guia - Cardápio Digital Moderno.pdf"
```

> Se preferir, você também pode colar o conteúdo do `ebook.md` no Google Docs/Word e exportar como PDF.

## Checklist do ZIP

- NÃO incluir: `node_modules/`, `dist/`, `.env`
- Incluir: `src/`, `public/`, `package.json`, `package-lock.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig*.json`, `docs/`

Para empacotar no Linux:

```bash
zip -r BellaCucina-Template.zip . \
  -x "node_modules/*" "dist/*" \
  -x ".env" \
  -x ".git/*" \
  -x "docs/hotmart/*"
```
