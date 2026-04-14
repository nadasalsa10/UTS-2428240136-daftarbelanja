const form = document.getElementById('item-form');
const cardsRow = document.getElementById('cards-row');

const storage_KEY = 'daftarBelanjaItems';

function getItems() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createCard(item) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-3';

    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = item.namaBarang;

    const jumlah = document.createElement('p');
    jumlah.className = 'card-text mb-1';
    jumlah.innerHTML = `<strong>Jumlah:</strong> ${item.jumlah}`;

    const keterangan = document.createElement('p');
    keterangan.className = 'card-text text-muted';
    keterangan.innerHTML = `<strong>Keterangan:</strong> ${item.keterangan || '-'}`;

    body.append(title, jumlah, keterangan);
    card.appendChild(body);
    col.appendChild(card);
    return col;
}

function renderItems() {
    cardsRow.innerHTML = '';
    const items = getItems();
    if (items.length === 0) {
        cardsRow.innerHTML = `
            <div class="col-12">
                <div class="alert alert-secondary mb-0">
                    Belum ada barang tersimpan.
                </div>
            </div>
        `;
        return;
    }
    items.forEach(item => cardsRow.appendChild(createCard(item)));
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const namaBarang = document.getElementById('namaBarang').value.trim();
    const jumlah = document.getElementById('jumlah').value.trim();
    const keterangan = document.getElementById('keterangan').value.trim();

    if (!namaBarang || !jumlah) return;

    const items = getItems();
    items.push({ namaBarang, jumlah, keterangan });
    saveItems(items);

    renderItems();
    form.reset();
});

renderItems();