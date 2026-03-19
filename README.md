# 💎⛏️ Minecraft API - Documentation 💎⛏️

> **📝 UPDATE:** This project has been migrated to **NextJS**! Both frontend and backend are now in a single project. See [MIGRATION.md](./MIGRATION.md) for details.

Welcome to the **Minecraft API**! This project provides a RESTful API and a frontend interface to access detailed information about Minecraft entities such as blocks, mobs, items, biomes, structures, and more.

> 🚨 **Note:** This is a read-only API. All endpoints are `GET` methods only. The purpose is to provide Minecraft-related data to the community and developers.
>
> 🚨 **UNOFFICIAL:** Also, this Minecraft API is not official for the game, it has no relationship with Mojang, it is simply used for informational purposes for the community.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚒️ Introduction

The Minecraft API allows you to retrieve structured data on several Minecraft elements, including:

- Advancements
- Biomes
- Blocks
- Items
- Mobs
- Structures

The project consists of:

- A **frontend** application to explore and visualize the data (in `src/pages` & `app/`)
- A **backend** API that serves the data (in `app/api/`)

Both are now integrated into a single NextJS application.

---

## 💎 API Routes

The following routes are available for each Minecraft entity:

### Entity endpoints

- `/api/advancements`
- `/api/biomes`
- `/api/blocks`
- `/api/items`
- `/api/mobs`
- `/api/structures`

### Generic sub-endpoints for each entity

- `/` – Get all data entries
- `/count` – Get the total count
- `/keys` – Show available keys
- `/:id` – Get a specific entry by ID
- `/:id/image` – Get image associated with entry
- `/all/:key` – Show all entries with the specified key
- `/all/:key/:value` – Filter entries by key and value
- `/:id/:key` – Get the value of a key for a specific entry

Example:

```bash
GET /api/blocks/stone
```

---

## ⚔️ Examples of Use

Go to the documentation [here](https://minecraftapi-5h0j.onrender.com/api-docs).

Or use it from the browser or tools like `curl`, Postman, etc.:

```bash
curl https://your-deployment-url.com/api/blocks/stone
```

---

## ⛏️ Issues

If you find bugs or unexpected behaviors in the API or the web interface, feel free to open an issue in the [GitHub Issues](https://github.com/EmilioSG23/MinecraftAPI/issues/new) section.

---

## 👷 How to Run Locally

1. **Clone the repository**:

```bash
git clone https://github.com/EmilioSG23/MinecraftAPI.git
cd MinecraftAPI
```

2. **Install dependencies** (make sure you have `pnpm` installed):

```bash
pnpm install
```

3. **Frontend build**:

```bash
cd frontend
pnpm install
pnpm run build
cd ..
```

4. **Backend**:

Make sure you have a `.env` file in the `backend/` directory with the following:

```
PORT=4000
NODE_ENV=dev
API_URL=http://localhost:3000/api
```

Then run:

```bash
cd backend
pnpm install
pnpm run dev
```

Now visit: [http://localhost:3000](http://localhost:3000)

---

## 🤝 How to Contribute

We welcome contributions! Here's how to do it:

1. **Fork the repo**
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make your changes**
4. **Commit your work**:
   ```bash
   git commit -m "Add my feature"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/my-feature
   ```
6. **Open a Pull Request (PR)**

### Types of contributions:

- Fix incorrect or outdated data.
- Add missing Minecraft entities or versions (currently up to 1.19).
- Add new features or UI improvements.
- Improve the documentation.
- Help manage routes or improve backend performance.

---

## 🏹 Special Thanks

- **[Minecraft Wiki](https://minecraft.wiki/)**: Source of many data points and assets.
- **[anish-shanbhag/minecraft-api](https://github.com/anish-shanbhag/minecraft-api)**: Inspiration and reference for some of the data and values used.

---
