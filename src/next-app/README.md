This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Application Insights

This app has end-to-end Azure Application Insights instrumentation enabled for:

- Browser page views and client-side exceptions
- Server-side requests, dependencies, performance, and exceptions
- Distributed tracing correlation between client and server telemetry

### 1) Configure environment variables

Copy `.env.example` to `.env.local` and provide your real connection string values:

```bash
cp .env.example .env.local
```

The app reads these keys:

- `APPLICATIONINSIGHTS_CONNECTION_STRING` (preferred for server telemetry)
- `NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING` (required for browser telemetry)
- `APPLICATIONINSIGHTS_ROLE_NAME` (optional server role name)
- `NEXT_PUBLIC_APPLICATIONINSIGHTS_ROLE_NAME` (optional browser role name)

### 2) Run the app

```bash
pnpm dev
```

After traffic is generated, verify telemetry in Azure Portal under your Application Insights resource.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
