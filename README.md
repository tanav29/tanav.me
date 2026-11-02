# tanav

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/tanav29/tanav.me.git
cd tanav.me
bun install
bun dev
```

Create a `.env.local` file with the environment variables required for your local setup.

GitHub activity is cached in Upstash Redis for one hour. Configure the same Redis credentials used by feedback and subscriptions:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

If Redis is unavailable or unconfigured, GitHub data is fetched directly instead.

For the Spotify now-playing card, also add:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information (blog posts, images, etc.) by running `bun run setup`.
