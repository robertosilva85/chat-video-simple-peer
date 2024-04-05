'use client';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex min-h-screen flex-col'>{children}</div>;
}
