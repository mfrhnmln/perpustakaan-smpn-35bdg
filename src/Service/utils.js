// mengubah huruf kecil menjadi huruf kapital pada bagaian judul layout setting
// digunakan di collorsetting.jsx dan typographysetting.jsx

export const beautifyLabel = (text) =>
  text.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
