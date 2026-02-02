async function downloadVideo() {
  const url = document.getElementById('videoUrl').value.trim();
  const quality = document.querySelector('input[name="quality"]:checked').value;
  const resultDiv = document.getElementById('result');

  if (!url) {
    resultDiv.innerHTML = '<p style="color:red;">Masukkan URL terlebih dahulu!</p>';
    return;
  }

  resultDiv.innerHTML = '<p>Memproses...</p>';

  let apiUrl = '';
  // Kita gunakan API gratis pihak ketiga (contoh open API)
  if (url.includes('tiktok.com')) {
    apiUrl = `https://api.tiktokdownloaderapi.com/download?url=${encodeURIComponent(url)}&quality=${quality}`;
  } else if (url.includes('instagram.com/reel')) {
    apiUrl = `https://api.instagrambulkdownload.com/reel?url=${encodeURIComponent(url)}&quality=${quality}`;
  } else if (url.includes('facebook.com')) {
    apiUrl = `https://api.fbdownloader.com/download?url=${encodeURIComponent(url)}&quality=${quality}`;
  } else if (url.includes('youtube.com/shorts') || url.includes('youtube.com/watch')) {
    apiUrl = `https://api.youtubedownloader.com/download?url=${encodeURIComponent(url)}&quality=${quality}`;
  } else {
    resultDiv.innerHTML = '<p style="color:red;">Platform tidak didukung</p>';
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.download_url) {
      resultDiv.innerHTML = `<a href="${data.download_url}" target="_blank">Klik di sini untuk mengunduh video (${quality.toUpperCase()})</a>`;
    } else {
      resultDiv.innerHTML = '<p style="color:red;">Gagal mengambil video. Coba lagi.</p>';
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = '<p style="color:red;">Terjadi kesalahan saat menghubungkan API</p>';
  }
      }
