# Update konten HTML sesuai permintaan: Nama agen, daftar produk, dan 2 nomor WhatsApp
updated_html_resta = """
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AGEN TELUR RESTA</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #fff8e1;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #f57f17;
      color: #fff;
      padding: 20px;
      text-align: center;
    }

    nav {
      background-color: #ffcc80;
      padding: 10px;
      text-align: center;
    }

    nav a {
      margin: 0 15px;
      color: #4e342e;
      text-decoration: none;
      font-weight: bold;
    }

    section {
      padding: 20px;
    }

    .produk {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }

    .card {
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      padding: 15px;
      width: 200px;
      text-align: center;
    }

    .card img {
      width: 100%;
      border-radius: 10px;
      height: 150px;
      object-fit: cover;
    }

    .order-btn {
      display: inline-block;
      background-color: #25D366;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      margin: 10px;
    }

    footer {
      background-color: #f57f17;
      color: #fff;
      text-align: center;
      padding: 15px;
      margin-top: 30px;
    }
  </style>
</head>
<body>

  <header>
    <h1>AGEN TELUR RESTA</h1>
    <p>Telur Berkualitas, Harga Bersahabat!</p>
  </header>

  <nav>
    <a href="#tentang">Tentang Kami</a>
    <a href="#produk">Produk</a>
    <a href="#kontak">Kontak</a>
  </nav>

  <section id="tentang">
    <h2>Tentang Kami</h2>
    <p>AGEN TELUR RESTA menyediakan berbagai macam telur segar dan berkualitas, langsung dari peternakan. Cocok untuk kebutuhan rumah tangga, UMKM, hingga restoran.</p>
  </section>

  <section id="produk">
    <h2>Produk Kami</h2>
    <div class="produk">
      <div class="card">
        <img src="https://source.unsplash.com/200x150/?chicken-eggs" alt="Telur Ayam" />
        <h3>Telur Ayam</h3>
      </div>
      <div class="card">
        <img src="https://source.unsplash.com/200x150/?duck-eggs" alt="Telur Bebek" />
        <h3>Telur Bebek</h3>
      </div>
      <div class="card">
        <img src="https://source.unsplash.com/200x150/?kampung-egg" alt="Telur Ayam Kampung" />
        <h3>Telur Ayam Kampung</h3>
      </div>
      <div class="card">
        <img src="https://source.unsplash.com/200x150/?quail-eggs" alt="Telur Puyuh" />
        <h3>Telur Puyuh</h3>
      </div>
      <div class="card">
        <img src="https://source.unsplash.com/200x150/?omega-egg" alt="Telur Omega" />
        <h3>Telur Omega</h3>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px;">
      <a href="https://wa.me/62895346037550?text=Halo%20saya%20ingin%20pesan%20telur" class="order-btn">
        📲 Order via WA 1
      </a>
      <a href="https://wa.me/6289531687189?text=Halo%20saya%20ingin%20pesan%20telur" class="order-btn">
        📲 Order via WA 2
      </a>
    </div>
  </section>

  <section id="kontak">
    <h2>Hubungi Kami</h2>
    <p>📞 WhatsApp 1: +62 895-3460-37550</p>
    <p>📞 WhatsApp 2: +62 895-3168-7189</p>
    <p>📍 Alamat: Jl. Petamburan 5 Tanah Abang</p>

  <footer>
    <p>&copy; 2025 AGEN TELUR RESTA. Semua hak dilindungi.</p>
  </footer>

</body>
</html>
"""

# Simpan file HTML yang sudah diubah ke folder baru
resta_folder_path = "/mnt/data/agen_telur_resta"
os.makedirs(resta_folder_path, exist_ok=True)

resta_html_path = os.path.join(resta_folder_path, "index.html")
with open(resta_html_path, "w", encoding="utf-8") as f:
    f.write(updated_html_resta)

# Buat ZIP-nya
resta_zip_path = "/mnt/data/agen_telur_resta.zip"
with ZipFile(resta_zip_path, "w") as zipf:
    zipf.write(resta_html_path, arcname="index.html")

resta_zip_path
