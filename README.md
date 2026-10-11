# Saluran Liliyana

Web app saluran gaya Telegram (biru + hitam). Murni HTML, CSS, dan JS, tanpa build.

## File
- `index.html`, `style.css`, `script.js`: aplikasinya
- `config.js`: isi kalau mau sinkron online antar perangkat (opsional)
- `supabase.sql`: dijalankan sekali di Supabase (opsional)

## Upload ke GitHub
1. Buat repo baru, upload semua file di folder ini ke root repo.
2. Settings > Pages > Source: pilih branch `main`, folder `/ (root)` > Save.
3. Tunggu satu sampai dua menit, link website muncul di halaman Pages.

## Mode data
- **Lokal (config.js kosong):** data tersimpan di browser perangkat itu saja.
  Pengunjung di perangkat lain tidak melihat postingan admin.
- **Online (config.js diisi Supabase):** saluran, postingan, reaksi, dan nama pengunjung
  tersinkron ke semua perangkat. Saluran baru buatan admin otomatis muncul
  di pengunjung (maksimal sekitar 4 detik tanpa reload).

### Mengaktifkan mode online
1. Daftar gratis di supabase.com, buat project baru.
2. SQL Editor > New query > tempel isi `supabase.sql` > Run.
3. Project Settings > API: salin **Project URL** dan **anon public key**.
4. Isi keduanya di `config.js`, lalu upload ulang ke GitHub.

## Login
- **Pengunjung:** tekan "Masuk sebagai Pengunjung". Bisa melihat, bereaksi, dan edit nama/foto profil.
- **Admin (Liliyana De Zenith):** tab Daftar (nama pengguna, Gmail, password `RYUKA5522`),
  lalu masuk di tab Masuk. Admin bisa posting, edit/hapus/sematkan pesan,
  membuat saluran baru, dan mengedit profil serta profil saluran.

## Catatan keamanan
Password admin ada di `script.js`, dan kunci anon Supabase memang publik.
Ini cukup untuk pemakaian santai, tapi bukan perlindungan sungguhan.
Untuk keamanan penuh perlu login server (Supabase Auth).
