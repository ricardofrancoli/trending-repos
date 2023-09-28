# Trending Repos

This project provides an interface to view trending GitHub repositories created in the past week. Users can see details of these repositories and also add or remove them from their favourites. It uses Vite with React and a simple Fastify server.

## Features

- Fetches trending public GitHub repositories created in the past week
- Lists these repositories with details such as name, description, stars, forks, and creation date
- Users can specify how many repositories they want to view (between 1 to 200)
- Users can add/remove repositories to/from their favourites
- Utilizes Fastify for backend endpoints to manage favourite repositories

## Structure

- `Repos` Component: Handles the fetching of trending repositories and also manages user inputs to determine how many repositories to display
- `Repo` Component: A single repository item component that displays details of the repo
- `FavouriteToggle` Component: A toggle button to add/remove the repository to/from favourites
- `getTrendingPublicRepos`: Fetches trending repositories from the GitHub API
- Endpoints: Fastify-based API endpoints to get favourite repositories and toggle the favourite status of a repository

## Setup

1. Clone the repository

```bash
git clone https://github.com/ricardofrancoli/trending-repos.git
```

2. Navigate to the project directory

```bash
cd trending-repos
```

3. Install dependencies

```bash
pnpm install
```

4. Start the app, concurrently running the server and the client

```bash
pnpm run dev
```

## API Endpoints

- `GET /api/favourites`: Fetches a list of favourite repository IDs.
- `POST /api/toggle-favourites`: Toggles the favourite status of a given repository. Expected request body: `{ id: <repo-id> }`.
