import Navbar from '@/components/navbar'
import PresaleSection from '@/components/presale-section'

export default function Home() {
  return (
    <main style={{ backgroundColor: '#FEF7E3' }} className="min-h-screen">
      <Navbar />
      <PresaleSection />
    </main>
  )
}
