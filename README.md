# Site — Yasmine Ali

Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + GSAP/ScrollTrigger + `@phosphor-icons/react`.
Sem banco de dados, autenticação, painel ou chaves no front-end.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # build de produção
npm start          # serve o build
```

Defina `NEXT_PUBLIC_SITE_URL` (ver `.env.example`) no deploy para emitir canonical e URLs absolutas
corretas em Open Graph, sitemap e JSON-LD.

## Onde fica cada coisa

| Caminho | Conteúdo |
|---|---|
| `src/content/site-content.ts` | Todo o texto público, derivado da planilha `04_layout/layout-allocation.xlsx` e de `05_seo/seo.json` |
| `src/content/publication-guard.ts` | Trava interna (server-only). Enquanto ativa, `robots.txt` e `meta robots` bloqueiam indexação |
| `src/design/design-tokens.json` | Cópia de `03_design/design-tokens.json`; vira CSS variables em `src/design/tokens.ts` |
| `src/lib/gsap-animations.ts` | Registro único do GSAP/ScrollTrigger, tokens de movimento por seção e todas as animações |
| `src/components/sections/` | Uma seção por arquivo, na ordem definida em `homeSections` |
| `public/assets/` | Somente as mídias de `02_imagens/` |

## Antes de publicar

1. Obter autorização das mídias e concluir a revisão humana.
2. Mudar as flags em `src/content/publication-guard.ts` para `false` (libera indexação).
3. Definir `NEXT_PUBLIC_SITE_URL`.
