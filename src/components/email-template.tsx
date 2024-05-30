import type { ReactNode } from "react";

interface Props {
  name?: string;
  bodyText: ReactNode;
  actionText: string;
  actionUrl: string;
}

export function EmailTemplate({
  name,
  actionUrl,
  bodyText,
  actionText,
}: Props) {
  return (
    <section
      style={{
        marginInline: "auto",
        maxWidth: "40rem",
        padding: "2rem 1.5rem",
      }}
    >
      <header>
        <a
          href="https://fleethr.vercel.app"
          target="_blank"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#20c997",
            textDecoration: "none",
            alignItems: "center",
          }}
        >
          fleethr
        </a>
      </header>
      <main style={{ marginTop: "2rem" }}>
        <p style={{ color: "#4b5563" }}>{name ? `Hello ${name},` : "Hello,"}</p>
        <div
          style={{
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
            color: "#6b7280",
          }}
        >
          {bodyText}
        </div>
        <a
          href={actionUrl}
          style={{
            marginTop: "0.5rem",
            marginBottom: "1rem",
            display: "inline-block",
            backgroundColor: "#0d9488",
            padding: "0.5rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "white",
            borderRadius: "0.5rem",
            textDecoration: "none",
            transition: "backgroundColor 0.3s ease",
          }}
        >
          {actionText}
        </a>
        <p
          style={{
            marginTop: "2rem",
            color: "#6b7280",
          }}
        >
          Thanks,
          <br />
          FleetHR team
        </p>
      </main>
      <footer style={{ marginTop: "2rem" }}>
        <p style={{ marginTop: "0.75rem", color: "#6b7280" }}>
          © FleetHR, all rights reserved.
        </p>
      </footer>
    </section>
  );
}
