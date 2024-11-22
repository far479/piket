document.addEventListener('DOMContentLoaded', function() {
    // Memuat data dari localStorage saat halaman dimuat
    loadPiketData();
});

document.getElementById('piketForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    // Mengambil nilai dari input
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    // Membuat objek piket
    const piket = { name, date };

    // Mendapatkan data yang sudah ada di localStorage
    let piketData = JSON.parse(localStorage.getItem('piketData')) || [];

    // Menambahkan piket baru ke data yang ada
    piketData.push(piket);

    // Menyimpan kembali data ke localStorage
    localStorage.setItem('piketData', JSON.stringify(piketData));

    // Menambahkan data ke tabel
    addPiketToTable(piket);

    // Mengosongkan form setelah pengisian
    document.getElementById('piketForm').reset();
});

// Fungsi untuk menambahkan piket ke tabel
function addPiketToTable(piket) {
    const table = document.getElementById('piketTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const dateCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);

    nameCell.textContent = piket.name;
    dateCell.textContent = piket.date;

    // Menambahkan tombol hapus
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.onclick = function() {
        deletePiket(piket);
        table.deleteRow(newRow.rowIndex - 1); // Menghapus baris yang sesuai
    };
    actionCell.appendChild(deleteButton);
}

// Fungsi untuk memuat data dari localStorage ke tabel
function loadPiketData() {
    const piketData = JSON.parse(localStorage.getItem('piketData')) || [];
    piketData.forEach(piket => {
        addPiketToTable(piket);
    });
}

// Fungsi untuk menghapus piket dari localStorage
function deletePiket(piketToDelete) {
    let piketData = JSON.parse(localStorage.getItem('piketData')) || [];
    piketData = piketData.filter(piket => piket.name !== piketToDelete.name || piket.date !== piketToDelete.date);
    localStorage.setItem('piketData', JSON.stringify(piketData));
}