"use client";

import { useEffect } from "react";
import NextError from "next/error";
import * as Sentry from "@sentry/nextjs";

/**
 * Global error boundary, automatically wraps the global layout through NextJS router magic
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError
          statusCode={0}
          error={error}
          title="An error was caught. We have logged it and will work on fixing it. You can refresh this page and try agin."
        />
      </body>
    </html>
  );
}
