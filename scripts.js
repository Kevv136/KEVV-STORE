document.addEventListener('DOMContentLoaded', () => {
let cart = []; // Array untuk menyimpan item di keranjang

// --- Elemen Akun ---
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const userGreeting = document.getElementById('user-greeting');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutButton = document.getElementById('logout-btn');

    // --- Modal Login ---
    const loginModal = document.getElementById('login-modal');
    const closeLoginModalButton = document.getElementById('close-login-modal-btn');
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const switchToRegisterLink = document.getElementById('switch-to-register');

    // --- Modal Pendaftaran ---
    const registerModal = document.getElementById('register-modal');
    const closeRegisterModalButton = document.getElementById('close-register-modal-btn');
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');
    const switchToLoginLink = document.getElementById('switch-to-login');

     // ... (Elemen Akun dan Modal Login/Pendaftaran yang sudah ada) ...
    
    // --- Fungsi untuk memperbarui status UI login ---
    function updateLoginStatus(isLoggedIn, username = '') {
        if (isLoggedIn) {
            loginLink.classList.add('hidden');
            registerLink.classList.add('hidden');
            userGreeting.classList.remove('hidden');
            welcomeMessage.textContent = `Selamat datang, ${username}!`;
        } else {
            loginLink.classList.remove('hidden');
            registerLink.classList.remove('hidden');
            userGreeting.classList.add('hidden');
        }
    }

    // --- Event Listeners untuk Modal Login ---
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginMessage.textContent = ''; // Bersihkan pesan
        loginModal.classList.remove('hidden');
    });

    closeLoginModalButton.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });

    // Simulasi Login (Front-end only)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.elements['login-email'].value;
        const password = loginForm.elements['login-password'].value;

        loginMessage.classList.remove('text-red-600', 'text-green-600');
        loginMessage.textContent = 'Memproses login...';
        loginMessage.classList.add('text-blue-600');

        setTimeout(() => {
            // Ini adalah simulasi! Di dunia nyata, Anda akan mengirim ini ke backend.
            if (email === 'user@example.com' && password === 'password123') {
                loginMessage.textContent = 'Login berhasil!';
                loginMessage.classList.remove('text-blue-600');
                loginMessage.classList.add('text-green-600');
                loginModal.classList.add('hidden');
                updateLoginStatus(true, 'Pengguna'); // Ganti 'Pengguna' dengan nama asli dari backend
            } else {
                loginMessage.textContent = 'Email atau kata sandi salah.';
                loginMessage.classList.remove('text-blue-600');
                loginMessage.classList.add('text-red-600');
            }
        }, 1500); // Simulasi penundaan
    });

    // --- Event Listeners untuk Modal Pendaftaran ---
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerMessage.textContent = ''; // Bersihkan pesan
        registerModal.classList.remove('hidden');
    });

    closeRegisterModalButton.addEventListener('click', () => {
        registerModal.classList.add('hidden');
    });

    // Simulasi Pendaftaran (Front-end only)
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.elements['register-username'].value;
        const email = registerForm.elements['register-email'].value;
        const password = registerForm.elements['register-password'].value;
        const confirmPassword = registerForm.elements['register-confirm-password'].value;

        registerMessage.classList.remove('text-red-600', 'text-green-600');
        registerMessage.textContent = ''; // Bersihkan pesan sebelumnya

        if (password !== confirmPassword) {
            registerMessage.textContent = 'Kata sandi dan konfirmasi kata sandi tidak cocok.';
            registerMessage.classList.add('text-red-600');
            return;
        }

        registerMessage.textContent = 'Memproses pendaftaran...';
        registerMessage.classList.add('text-blue-600');

        setTimeout(() => {
            // Ini adalah simulasi! Di dunia nyata, Anda akan mengirim ini ke backend.
            // Backend akan menyimpan data (setelah validasi dan hashing password)
            // dan mengembalikan status keberhasilan atau kegagalan.
            const success = Math.random() > 0.3; // 70% sukses, 30% gagal untuk demo

            if (success) {
                registerMessage.textContent = 'Pendaftaran berhasil! Silakan masuk.';
                registerMessage.classList.remove('text-blue-600');
                registerMessage.classList.add('text-green-600');
                registerForm.reset(); // Kosongkan form
                // Opsional: Langsung arahkan ke modal login
                setTimeout(() => {
                    registerModal.classList.add('hidden');
                    loginModal.classList.remove('hidden');
                    loginForm.elements['login-email'].value = email; // Isi email secara otomatis
                    loginMessage.textContent = '';
                }, 1000);
            } else {
                registerMessage.textContent = 'Pendaftaran gagal. Email mungkin sudah terdaftar atau masalah server.';
                registerMessage.classList.remove('text-blue-600');
                registerMessage.classList.add('text-red-600');
            }
            
        }, 2000); // Simulasi penundaan
    });

    // --- Tombol Switch antar Modal ---
    switchToRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('hidden');
        registerModal.classList.remove('hidden');
        registerForm.reset();
        registerMessage.textContent = '';
    });

    switchToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.add('hidden');
        loginModal.classList.remove('hidden');
        loginForm.reset();
        loginMessage.textContent = '';
    });

    // --- Logika Logout ---
    logoutButton.addEventListener('click', () => {
        // Di dunia nyata, ini akan menghapus token sesi atau cookie dari browser.
        alert('Anda telah berhasil keluar.');
        updateLoginStatus(false);
    });

    // Inisialisasi status login saat halaman dimuat (asumsi belum login)
    updateLoginStatus(false);
    const cartLink = document.getElementById('cart-link');
    const cartCountText = document.getElementById('cart-count-text');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // --- Elemen Modal Keranjang ---
    const cartModal = document.getElementById('cart-modal');
    const closeModalButton = document.getElementById('close-modal-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-btn');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // --- Elemen Modal Pembayaran ---
    const paymentModal = document.getElementById('payment-modal');
    const closePaymentModalButton = document.getElementById('close-payment-modal-btn');
    const paymentSummaryItems = document.getElementById('payment-summary-items');
    const paymentSummaryTotal = document.getElementById('payment-summary-total');
    const paymentMethodSelect = document.getElementById('payment-method');
    const completePaymentButton = document.getElementById('complete-payment-btn');
    const paymentStatusMessage = document.getElementById('payment-status-message');


    // Fungsi untuk memperbarui tampilan keranjang
    function updateCartDisplay() {
        cartCountText.textContent = `Keranjang (${cart.length})`;

        cartItemsContainer.innerHTML = ''; // Kosongkan daftar item di modal
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            checkoutButton.classList.add('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            checkoutButton.classList.remove('hidden');
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('flex', 'justify-between', 'items-center', 'py-2', 'border-b', 'border-gray-200');
                itemElement.innerHTML = `
                    <span class="text-gray-800">${item.name}</span>
                    <div class="flex items-center">
                        <span class="text-gray-600 mr-2">Rp ${item.price.toLocaleString('id-ID')}</span>
                        <button class="remove-from-cart-btn bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition" data-index="${index}">Hapus</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price;
            });
        }
        cartTotalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }

    // Event listener untuk tombol "Tambahkan ke Keranjang"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.productName;
            const productPrice = parseInt(event.target.dataset.productPrice);

            cart.push({ name: productName, price: productPrice });
            updateCartDisplay();
            // Opsional: berikan feedback ke user bahwa produk berhasil ditambahkan
            alert(`${productName} telah ditambahkan ke keranjang!`);
        });
    });

    // Event listener untuk tombol "Hapus" dari keranjang
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const indexToRemove = parseInt(event.target.dataset.index);
            cart.splice(indexToRemove, 1); // Hapus item dari array cart
            updateCartDisplay(); // Perbarui tampilan
        }
    });

    // Event listener untuk klik pada link "Keranjang"
    cartLink.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah scroll ke #keranjang
        updateCartDisplay(); // Pastikan keranjang diperbarui sebelum dibuka
        cartModal.classList.remove('hidden');
    });

    // Event listener untuk tombol tutup modal keranjang
    closeModalButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // Event listener untuk tombol "Lanjutkan ke Pembayaran"
    checkoutButton.addEventListener('click', () => {
        cartModal.classList.add('hidden'); // Tutup modal keranjang
        paymentModal.classList.remove('hidden'); // Buka modal pembayaran
        displayPaymentSummary();
    });

    // --- Fungsi dan Event Listener untuk Modal Pembayaran ---
    function displayPaymentSummary() {
        paymentSummaryItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('flex', 'justify-between', 'py-1');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>Rp ${item.price.toLocaleString('id-ID')}</span>
            `;
            paymentSummaryItems.appendChild(itemElement);
            total += item.price;
        });
        paymentSummaryTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        paymentStatusMessage.textContent = ''; // Reset pesan status
    }

    // Event listener untuk tombol tutup modal pembayaran
    closePaymentModalButton.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
    });

    // Event listener untuk tombol "Selesaikan Pembayaran"
    completePaymentButton.addEventListener('click', () => {
        const selectedMethod = paymentMethodSelect.value;
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

        if (cart.length === 0) {
            paymentStatusMessage.textContent = "Keranjang Anda kosong. Tidak ada yang bisa dibayar.";
            paymentStatusMessage.classList.add('text-red-600');
            return;
        }

        if (selectedMethod === '') {
            paymentStatusMessage.textContent = "Mohon pilih metode pembayaran.";
            paymentStatusMessage.classList.add('text-red-600');
            return;
        }

        // Simulasi proses pembayaran
        paymentStatusMessage.classList.remove('text-red-600', 'text-green-600'); // Bersihkan kelas sebelumnya
        paymentStatusMessage.textContent = `Memproses pembayaran sejumlah Rp ${totalAmount.toLocaleString('id-ID')} menggunakan ${selectedMethod}...`;
        paymentStatusMessage.classList.add('text-blue-600');

        setTimeout(() => {
            // Simulasi sukses atau gagal
            const success = Math.random() > 0.1; // 90% sukses, 10% gagal untuk demo

            if (success) {
                paymentStatusMessage.textContent = "Pembayaran berhasil! Terima kasih atas pesanan Anda.";
                paymentStatusMessage.classList.remove('text-blue-600');
                paymentStatusMessage.classList.add('text-green-600');
                cart = []; // Kosongkan keranjang setelah pembayaran berhasil
                updateCartDisplay(); // Perbarui tampilan keranjang
                // Opsional: Redirect ke halaman konfirmasi atau tampilkan pesan lebih lanjut
            } else {
                paymentStatusMessage.textContent = "Pembayaran gagal. Mohon coba lagi atau gunakan metode lain.";
                paymentStatusMessage.classList.remove('text-blue-600');
                paymentStatusMessage.classList.add('text-red-600');
            }
        }, 2000); // Simulasi waktu proses 2 detik
    });

    // Inisialisasi tampilan keranjang saat halaman dimuat
    updateCartDisplay();
});