# 💎⛏️ Minecraft API

Minecraft API is a unified Next.js project that serves both:

- A read-only REST API for Minecraft entities
- A frontend explorer (information pages, terminal, documentation)

> This project is **unofficial** and not affiliated with Mojang.

## Stack

- Next.js 15
- React 19
- TypeScript
- TailwindCSS

## Quick Start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Project Structure

- `app/` Next.js routes (UI + API)
- `app/api/` API endpoints
- `src/components/` shared and feature components
- `src/components/information/` reusable entity cards + list view
- `src/views/` page-level client views
- `data/` static JSON datasets
- `public/information/` entity images

## API Endpoints

Base: `/api`

### Entities

- `/api/advancements`
- `/api/biomes`
- `/api/blocks`
- `/api/items`
- `/api/mobs`
- `/api/structures`

### Generic Subroutes

For each entity path above:

- `/` list all
- `/count` total count
- `/keys` entity keys
- `/:id` entity by id
- `/:id/image` image binary
- `/all/:key` all entries with key
- `/all/:key/:value` filter by key/value
- `/:id/:key` key value by id

## Frontend Routes

- `/` home
- `/information` sections hub
- `/information/advancements`
- `/information/biomes`
- `/information/blocks`
- `/information/items`
- `/information/mobs`
- `/information/structures`
- `/terminal`
- `/documentation`

## Performance Notes

- API data loading uses async file I/O with in-memory cache
- API responses and image responses include cache headers
- Information pages use progressive rendering for large datasets
- Tooltip updates are throttled with `requestAnimationFrame`

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm type-check`

## Contributing

1. Fork repository
2. Create feature branch
3. Run `pnpm type-check` and `pnpm build`
4. Open pull request with clear description
