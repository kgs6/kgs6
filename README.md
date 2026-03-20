# Environment setup

Create .env file with with this example structure
```
NEXT_PUBLIC_APP_NAME="app"
NEXT_PUBLIC_UPLOADS_URL="https://domin.com"
NEXT_PUBLIC_APP_URL="https://domin.com"

BASE_ADMIN_EMAIL="admin@mail.com"
BASE_ADMIN_PASSWORD="superStrongPassword"

POSTGRES_USER="[dbUser]"
POSTGRES_PASSWORD="[password]"
DATABASE_URL="postgresql://[dbUser]:[password]@[host]/[dbName]?schema=public"

JWT_ACCESS_SECRET="[secret jwt string]"
JWT_REFRESH_SECRET="[secret jwt string]"

ACCESS_TOKEN_TTL=
REFRESH_TOKEN_TTL=


AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
```


# Database setup

```npx prisma generate```

```npx prisma db push```

Seed database with prepared data
```npx dotenv -e .env npx tsx prisma/seed.ts```


# Run application
Build project
```npx next build```

Start application
```PORT=3100 npx next start```

# Run application (via server.js)
Check ```next.config.ts``` in root directory
```
const nextConfig: NextConfig = {
  output: 'standalone', // It`s must containt this field
};
```


Build project
```npx next build```

Copy static file in standalone directory
```
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

Start application
```PORT=3100 node .next/standalone/server.js```