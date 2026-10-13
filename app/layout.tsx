import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Aura Home Appliances & Electronics | Premium Retail & 24/7 Repair',
  description: 'Upgrade your home with smarter appliances, affordable prices, WhatsApp ordering, and reliable 24/7 repair support.',
  openGraph: {
    title: 'Aura Home Appliances & Electronics',
    description: 'Explore premium home appliances, affordable prices, and reliable service support.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Home Appliances & Electronics',
    description: 'Explore premium home appliances, affordable prices, and reliable service support.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
