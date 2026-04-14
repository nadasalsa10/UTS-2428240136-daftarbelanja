const STORAGE_KEY = "daftarBelanja";
let daftarBelanja = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("item-form").addEventListener("submit", event => {
        event.preventDefault();
    });
    renderDaftarBelanja();
});
// fungsi untuk menyimpan barang ke dalam daftar belanja
function simpanBarang() {
    const namaBarang = document.getElementById("namaBarang").value.trim();
    const jumlah = parseInt(document.getElementById("jumlah").value, 10);
    const keterangan = document.getElementById("keterangan").value.trim();

    // 
    const item = {
        id: Date.now().toString(),
        namaBarang,
        jumlah,
        keterangan,
        gambar: "https://plus.unsplash.com/premium_photo-1671128087724-04f3777ed597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNlbWJha298ZW58MHx8MHx8fDA%3D"
    };

    daftarBelanja.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarBelanja));
    renderDaftarBelanja();
    resetForm();
}

// fungsi untuk menampilkan daftar belanja
function renderDaftarBelanja() {
    const container = document.getElementById("DaftarBelanja");
    container.innerHTML = "";

    if (daftarBelanja.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">Belum ada barang. Tambahkan item baru.</div>
            </div>
        `;
        return;
    }
// untuk setiap item dalam daftar belanja, buat sebuah kartu dan tambahkan ke dalam container
    daftarBelanja.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-lg-3";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${item.gambar}" class="card-img-top" alt="Gambar ${item.namaBarang}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.namaBarang}</h5>
                    <p class="card-text mb-1"><strong>Jumlah:</strong> ${item.jumlah}</p>
                    <p class="card-text mb-3"><strong>Keterangan:</strong> ${item.keterangan || "-"}</p>
                    <button type="button" class="btn btn-danger mt-auto" onclick="hapusBarang('${item.id}')">Hapus</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function hapusBarang(id) {
    daftarBelanja = daftarBelanja.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarBelanja));
    renderDaftarBelanja();
}

function resetForm() {
    document.getElementById("namaBarang").value = "";
    document.getElementById("jumlah").value = "";
    document.getElementById("keterangan").value = "";
}