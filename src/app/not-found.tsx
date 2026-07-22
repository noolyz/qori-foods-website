import Link from "next/link";

/**
 * Global fallback 404 for non-localized paths. Renders its own document shell
 * because it sits outside the [locale] layout.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#22381e",
          color: "#faf7f0",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <p style={{ fontSize: "3rem", margin: 0, fontWeight: 600 }}>404</p>
          <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>This page could not be found.</p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              background: "#c8623b",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
