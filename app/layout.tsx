// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Firebase CRUD Task App",
  description: "To-Do app with Firebase Auth & Firestore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-800 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
