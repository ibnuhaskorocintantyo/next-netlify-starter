// pages/api/sendLocation.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Ambil data latitude dan longitude dari request body
    const { latitude, longitude } = req.body;

    // Log data ke server console
    console.log(`Lokasi diterima: Latitude ${latitude}, Longitude ${longitude}`);

    // Kirim respons sukses ke frontend
    res.status(200).json({ message: 'Lokasi berhasil terkirim' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
