// pages/api/sendLocation.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { latitude, longitude } = req.body;
  
      // Simulasi pengiriman data ke admin (bisa menggunakan email API, database, dll)
      console.log(`Mengirim lokasi ke admin: Latitude ${latitude}, Longitude ${longitude}`);
  
      // Simulasi pengiriman email (gunakan API seperti SendGrid atau Nodemailer)
      // const sendEmail = await sendLocationToAdmin(latitude, longitude);
  
      return res.status(200).json({ message: 'Lokasi terkirim ke admin!' });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  