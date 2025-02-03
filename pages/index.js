import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Selamat Datang Di JNT" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

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
            onClick={() => alert('Lacak Resi')}
          >
            Lacak
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
