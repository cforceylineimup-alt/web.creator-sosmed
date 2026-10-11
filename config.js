/*
  Pengaturan sinkron online (opsional).

  Dibiarkan kosong  -> mode LOKAL: data tersimpan di browser perangkat itu saja.
  Diisi (Supabase)  -> mode ONLINE: saluran, postingan, reaksi, dan nama pengunjung
                       tersinkron ke semua perangkat. Langkah lengkap ada di README.md.
*/
window.SL_CONFIG = {
  SUPABASE_URL: "",   // contoh: "https://abcdxyz.supabase.co"
  SUPABASE_KEY: ""    // anon public key dari Supabase (Project Settings > API)
};
