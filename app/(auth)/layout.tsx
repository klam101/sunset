import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-mc">
      {children}
      <div className="auth-asset">
        <div>
          <Image src="/images/demo.png" width={700} height={700} alt="Auth Image" />
        </div>
      </div>
    </main>
  );
}