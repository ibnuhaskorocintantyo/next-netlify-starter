import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'

export default function Home() {
  const [location, setLocation] = useState(null)

  const handleTrack = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`)
        },
        (error) => {
          alert("Gagal mendapatkan lokasi: " + error.message)
        }
      )
    } else {
      alert("Geolocation tidak didukung oleh browser ini.")
    }
  }

  return (
    <div className="container">
      <Head>
        <title>JNT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Selamat Datang Di JNT" />
        {/* Input box untuk resi dengan inline styles */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="resi" style={{ fontSize: '16px' }}>Masukkan Nomor Resi:</label>
          <input
            type="text"
            id="resi"
            name="resi"
            placeholder="Contoh: 123456789"
            style={{
              padding: '10px',
              marginRight: '10px',
              fontSize: '16px',
              width: '200px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={handleTrack}
          >
            Lacak
          </button>
        </div>

        {/* Menampilkan lokasi jika tersedia */}
        {location && (
          <div style={{ marginTop: '20px', fontSize: '16px' }}>
            <p><strong>Lokasi Anda:</strong> {location}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
