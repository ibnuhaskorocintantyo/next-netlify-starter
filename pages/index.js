import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'

export default function Home() {
  const [location, setLocation] = useState(null)
  const [mapLink, setMapLink] = useState(null)

  const handleTrack = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`)
          // Membuat link Google Maps berdasarkan koordinat
          setMapLink(`https://www.google.com/maps?q=${latitude},${longitude}`)
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

        {/* Menampilkan lokasi dan link ke Google Maps jika tersedia */}
        {location && (
          <div style={{ marginTop: '20px', fontSize: '16px' }}>
            <p><strong>Lokasi Anda:</strong> {location}</p>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '10px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Buka di Google Maps
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
