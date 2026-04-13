declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      CRON_SECRET: string
      PREVIEW_SECRET: string
      S3_BUCKET: string
      S3_ENDPOINT: string
      S3_REGION: string
      S3_ACCESS_KEY_ID: string
      S3_SECRET_ACCESS_KEY: string
      POSTGRES_PASSWORD: string
    }
  }
}

export {}
