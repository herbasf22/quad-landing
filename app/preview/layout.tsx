import { Fraunces } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata = {
  title: 'Quad — Preview',
  robots: { index: false },
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fraunces.variable} style={{ minHeight: '100%' }}>
      {children}
    </div>
  )
}
