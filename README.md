This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First,

create environment variables using:

SECRET_JWT=`openssl rand -base64 64`
JWT_SECRET=`npx node-jose-tools newkey -s 256 -t oct -a HS512`
CLOUD_NAME=`create account in https://cloudinary.com and store respective variable`
API_KEY=`create account in https://cloudinary.com and store respective variable`
API_SECRET=`create account in https://cloudinary.com and store respective variable`
NEXTAUTH_URL=http://localhost:3000

The cloudinary envoriment variables are defined in .env.example, set your values with your keys created in your cloudinary account.

If you set jwt.encryption: true in next-auth configuration, you must set the JWT_ENCRYPTION_KEY env variable using:
JWT_ENCRYPTION_KEY=`npx node-jose-tools newkey -s 256 -t oct -a A256GCM -u enc` and define variable in next-auth
configuration: jwt.encryptionKey: process.env.JWT_ENCRYPTION_KEY

2) Create a file named .env.local and store respectives variables and

3) Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
