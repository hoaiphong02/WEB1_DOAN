/**
 * ==========================================================================
 * JAVASCRIPT GIAO DIỆN KHÁCH HÀNG (ShopCloth Frontend)
 * CHỈ PHỤC VỤ HIỂN THỊ GIAO DIỆN MÔ PHỎNG - HOÀN TOÀN KHÔNG CÓ CƠ SỞ DỮ LIỆU
 * Không lưu dữ liệu, không xử lý logic backend, chỉ hiển thị UI tĩnh
 * ==========================================================================
 */

// Danh mục sản phẩm thời trang mặc định của Shop (Dữ liệu tĩnh để hiển thị giao diện)
const SHOP_PRODUCTS = [
  {
    id: 1,
    name: 'Áo Khoác Da Lộn Nam Cao Cấp (Đen)',
    price: 1299000,
    image: 'images/product-jacket-black.png',
    category: 'Áo khoác',
    desc: 'Chất liệu da lộn mềm mịn, lót gió giữ ấm tốt, form ôm thanh lịch phong cách cá tính.'
  },
  {
    id: 2,
    name: 'Áo Khoác Bomber Da Bò Màu Nâu',
    price: 350000,
    image: 'images/product-jacket-brown.png',
    category: 'Áo khoác',
    desc: 'Thiết kế bomber cổ điển màu nâu sang trọng, cản gió và chống nước nhẹ.'
  },
  {
    id: 3,
    name: 'Áo Khoác Nỉ Form Rộng Xám Khói',
    price: 250000,
    image: 'images/product-jacket-grey.png',
    category: 'Áo khoác',
    desc: 'Form unisex dáng thụng thoải mái, chất nỉ dày dặn ấm áp cho mùa lạnh.'
  },
  {
    id: 4,
    name: 'Áo Sơ Mi Oxford Dài Tay Nam',
    price: 450000,
    image: 'images/product-shirt-oxford.png',
    category: 'Áo sơ mi/Thun',
    desc: 'Chất vải oxford cotton chống nhăn, thoáng mát, phong cách công sở thanh lịch.'
  },
  {
    id: 5,
    name: 'Quần Jean Slimfit Co Giãn Nam',
    price: 520000,
    image: 'images/product-pant-jean.png',
    category: 'Quần Jean/Khaki',
    desc: 'Chất denim dày dặn co giãn nhẹ, giữ form tôn dáng chuẩn, dễ phối đồ.'
  },
  {
    id: 6,
    name: 'Quần Khaki Túi Hộp Streetwear',
    price: 420000,
    image: 'images/product-pant-khaki.png',
    category: 'Quần Jean/Khaki',
    desc: 'Chất liệu khaki bền bỉ phong cách streetwear thời thượng năng động.'
  },
  {
    id: 7,
    name: 'Áo Thun Cotton Basic Form Rộng',
    price: 199000,
    image: 'images/product-shirt-tshirt.png',
    category: 'Áo sơ mi/Thun',
    desc: 'Chất vải 100% cotton 2 chiều co giãn thoáng mát, thấm hút mồ hôi cực tốt.'
  },
  {
    id: 8,
    name: 'Áo Khoác Gió Thể Thao 2 Lớp Chống Nước',
    price: 490000,
    image: 'images/product-jacket-windbreaker.png',
    category: 'Áo khoác',
    desc: 'Chất liệu trượt nước cao cấp, lót lưới thông thoáng, cản gió giữ ấm hiệu quả.'
  },
  {
    id: 9,
    name: 'Áo Polo Nam Phối Cổ Thanh Lịch',
    price: 320000,
    image: 'images/product-shirt-polo.png',
    category: 'Áo sơ mi/Thun',
    desc: 'Thiết kế cổ bẻ dệt bo sang trọng, phù hợp cả đi làm, đi chơi hay sự kiện.'
  },
  {
    id: 10,
    name: 'Quần Tây Baggy Nam Công Sở',
    price: 480000,
    image: 'images/product-pant-baggy.png',
    category: 'Quần Jean/Khaki',
    desc: 'Form dáng baggy đứng ống tôn dáng, chất vải tuyết mưa cao cấp không bai xù.'
  }
];

// Danh sách sản phẩm mẫu cố định hiển thị trong giỏ hàng (Giao diện tĩnh)
const DEMO_CART_ITEMS = [
  {
    id: 1,
    name: 'Áo Khoác Da Lộn Nam Cao Cấp (Đen)',
    price: 1299000,
    image: 'images/product-jacket-black.png',
    quantity: 1
  },
  {
    id: 5,
    name: 'Quần Jean Slimfit Co Giãn Nam',
    price: 520000,
    image: 'images/product-pant-jean.png',
    quantity: 1
  }
];

// Đơn hàng mẫu cố định phục vụ hiển thị chi tiết đơn và lịch sử (Giao diện tĩnh)
const DEMO_CUSTOMER_ORDERS = [
  {
    id: 'ORD-9021',
    customer: 'Nguyễn Văn An',
    phone: '0901234567',
    address: '123 Lê Lợi, Phường Bến Nghé, Quận 1',
    location: 'Hồ Chí Minh',
    date: '2026-10-15',
    total: 3118000,
    status: 'Chưa xác nhận',
    items: [
      ['Áo Khoác Da Lộn Nam Cao Cấp (Đen)', 2, 1299000],
      ['Quần Jean Slimfit Co Giãn Nam', 1, 520000]
    ]
  },
  {
    id: 'ORD-9027',
    customer: 'Nguyễn Văn An',
    phone: '0901234567',
    address: '123 Lê Lợi, Phường Bến Nghé, Quận 1',
    location: 'Hồ Chí Minh',
    date: '2026-10-10',
    total: 350000,
    status: 'Đã giao',
    items: [
      ['Áo Khoác Bomber Da Bò Màu Nâu', 1, 350000]
    ]
  }
];

// Định dạng tiền tệ VNĐ
function formatMoney(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount || 0) + ' đ';
}

// Giỏ hàng tĩnh chỉ đọc
function getCart() {
  return DEMO_CART_ITEMS;
}

// Cập nhật số badge giỏ hàng cố định
function updateCartBadge() {
  const totalCount = DEMO_CART_ITEMS.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge, #cartCountBadge').forEach(el => {
    el.textContent = totalCount;
    el.style.display = 'inline-flex';
  });
}

// Avatar người dùng trên Navbar (Luôn hiển thị trạng thái đã đăng nhập của Nguyễn Văn A)
function updateUserNavbarAvatar() {
  const userSlots = document.querySelectorAll('#navUserSlot');
  userSlots.forEach(slot => {
    slot.innerHTML = `
      <a href="account.html" class="nav-user-pill" title="Tài khoản: Nguyễn Văn A">
        <span class="nav-user-avatar">N</span>
        <span class="nav-user-name">Nguyễn Văn A</span>
      </a>
    `;
  });

  // Cập nhật tất cả các link Home/Logo dẫn về logged-index.html
  document.querySelectorAll('.nav-home-btn, .logo a').forEach(link => {
    link.setAttribute('href', 'logged-index.html');
  });
}

// Nút Thêm vào giỏ hàng: Vô hiệu hóa hoàn toàn, không có tác dụng
function addToCart(productId, quantity = 1) {
  // Nút thêm vào giỏ hàng đã bị vô hiệu hóa
}

// Nút tăng giảm số lượng
window.changeItemQty = function (id, newQty) {
  // Thao tác đổi số lượng
};

// Nút xóa sản phẩm khỏi giỏ
window.deleteCartItem = function (id) {
  // Thao tác xóa món khỏi giỏ
};

// ==========================================================================
// 1. RENDER GIAO DIỆN GIỎ HÀNG (cart.html)
// ==========================================================================
function renderCartPage() {
  const container = document.getElementById('cartContentArea');
  if (!container) return;

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  container.innerHTML = `
    <div class="cart-layout">
      <!-- Bảng danh sách sản phẩm trong giỏ -->
      <div class="cart-box">
        <h2>Giỏ Hàng Của Bạn (${cart.length} món mẫu)</h2>
        <div style="overflow-x: auto;">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th style="text-align:center;">Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td>
                    <div class="cart-item-info">
                      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='images/product-jacket-black.png'">
                      <div>
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-meta">Size: L • Màu chuẩn</div>
                      </div>
                    </div>
                  </td>
                  <td style="color:#94a3b8;">${formatMoney(item.price)}</td>
                  <td style="text-align:center;">
                    <div class="qty-controller">
                      <button type="button" class="btn-qty" onclick="changeItemQty(${item.id}, ${item.quantity - 1})">-</button>
                      <input type="text" class="qty-input" value="${item.quantity}" readonly>
                      <button type="button" class="btn-qty" onclick="changeItemQty(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                  </td>
                  <td style="color:#38bdf8; font-weight:700;">${formatMoney(item.price * item.quantity)}</td>
                  <td style="text-align:right;">
                    <button type="button" class="btn-remove-item" onclick="deleteCartItem(${item.id})" title="Xóa món này">&times;</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:20px;">
          <a href="logged-index.html" class="back-link">&larr; Tiếp tục chọn thêm sản phẩm</a>
        </div>
      </div>

      <!-- Khung Tóm tắt Đơn hàng -->
      <div class="cart-box" style="height: fit-content;">
        <h2>Tóm Tắt Đơn Hàng</h2>
        <div class="summary-row">
          <span>Tạm tính tiền hàng:</span>
          <strong>${formatMoney(subtotal)}</strong>
        </div>
        <div class="summary-row">
          <span>Phí vận chuyển:</span>
          <span style="color:#10b981; font-weight:600;">Miễn phí toàn quốc</span>
        </div>
        <div class="summary-row">
          <span>Mã giảm giá (Voucher):</span>
          <span style="color:#94a3b8;">Không áp dụng</span>
        </div>
        <div class="summary-row total">
          <span>Tổng thanh toán:</span>
          <span>${formatMoney(subtotal)}</span>
        </div>

        <a href="checkout.html" class="btn-primary" style="display:block; text-align:center; text-decoration:none; margin-top:20px; padding:13px; font-size:15px;">
          Tiến Hành Đặt Hàng &rarr;
        </a>
      </div>
    </div>
  `;
}

// ==========================================================================
// 2. GIAO DIỆN ĐẶT HÀNG (checkout.html)
// ==========================================================================
function setupCheckoutPage() {
  const checkoutSummary = document.getElementById('checkoutSummaryItems');
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutSummary || !checkoutForm) return;

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  checkoutSummary.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
      ${cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:13.5px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${item.image}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; border:1px solid #334155;">
            <div>
              <div style="font-weight:600; color:#f8fafc;">${item.name}</div>
              <div style="color:#94a3b8; font-size:12px;">Số lượng: x${item.quantity}</div>
            </div>
          </div>
          <strong style="color:#38bdf8;">${formatMoney(item.price * item.quantity)}</strong>
        </div>
      `).join('')}
    </div>

    <div class="summary-row total" style="margin-top:0;">
      <span>Tổng thanh toán:</span>
      <span>${formatMoney(subtotal)}</span>
    </div>
  `;

  // Submit form đặt hàng: Chỉ chuyển hướng sang trang chi tiết đơn hàng demo, không lưu DB
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('🎉 Xác nhận đặt hàng thành công! Đang chuyển đến trang chi tiết đơn hàng...');
    window.location.href = 'order-detail.html?id=ORD-9021';
  });
}

// ==========================================================================
// 3. GIAO DIỆN TÀI KHOẢN (account.html)
// ==========================================================================
function setupAccountPage() {
  const accountDashboard = document.getElementById('accountDashboardView');
  const authFormsWrap = document.getElementById('authFormsWrap');
  if (!accountDashboard || !authFormsWrap) return;

  // Hiển thị trực tiếp giao diện tài khoản mẫu để giáo viên xem
  authFormsWrap.style.display = 'none';
  accountDashboard.style.display = 'block';

  const historyTbody = document.getElementById('userOrderHistoryBody');
  if (historyTbody) {
    historyTbody.innerHTML = DEMO_CUSTOMER_ORDERS.map(o => {
      let statusBadge = `<span class="order-badge-status status-pending">${o.status}</span>`;
      if (o.status === 'Đã giao') statusBadge = `<span class="order-badge-status status-delivered">${o.status}</span>`;
      else if (o.status === 'Đã xác nhận') statusBadge = `<span class="order-badge-status status-confirmed">${o.status}</span>`;
      else if (o.status === 'Hủy đơn') statusBadge = `<span class="order-badge-status status-cancelled">${o.status}</span>`;

      return `
        <tr>
          <td><strong>#${o.id}</strong></td>
          <td>${new Date(o.date).toLocaleDateString('vi-VN')}</td>
          <td style="color:#38bdf8; font-weight:700;">${formatMoney(o.total)}</td>
          <td>${statusBadge}</td>
          <td>
            <a href="order-detail.html?id=${encodeURIComponent(o.id)}" class="btn-detail" style="padding:4px 10px; font-size:12px; display:inline-block;">
              Xem chi tiết
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }

  const btnLogout = document.getElementById('btnUserLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function () {
      window.location.href = 'log-in.html';
    });
  }
}

// ==========================================================================
// 4. TRANG CHI TIẾT ĐƠN HÀNG PHÍA KHÁCH HÀNG (order-detail.html)
// ==========================================================================
function setupCustomerOrderDetail() {
  const container = document.getElementById('customerOrderDetailBox');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id') || 'ORD-9021';
  let order = DEMO_CUSTOMER_ORDERS.find(x => x.id === id) || DEMO_CUSTOMER_ORDERS[0];

  let statusBadge = `<span class="order-badge-status status-pending">${order.status}</span>`;
  if (order.status === 'Đã giao') statusBadge = `<span class="order-badge-status status-delivered">Đã giao thành công</span>`;
  else if (order.status === 'Đã xác nhận') statusBadge = `<span class="order-badge-status status-confirmed">Đã xác nhận & đang vận chuyển</span>`;
  else if (order.status === 'Hủy đơn') statusBadge = `<span class="order-badge-status status-cancelled">Đã hủy</span>`;

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:16px; margin-bottom:20px;">
      <div>
        <h2 style="font-size:22px; color:#f8fafc; margin-bottom:4px;">Chi Tiết Đơn Hàng #${order.id}</h2>
        <span style="font-size:13px; color:#94a3b8;">Ngày đặt: ${new Date(order.date).toLocaleDateString('vi-VN')}</span>
      </div>
      <div>${statusBadge}</div>
    </div>

    <!-- Thông tin người nhận -->
    <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:18px; margin-bottom:24px; line-height:1.8; font-size:14px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div><strong>Người nhận:</strong> ${order.customer}</div>
        <div><strong>Số điện thoại:</strong> ${order.phone}</div>
        <div style="grid-column: span 2;"><strong>Địa chỉ giao:</strong> ${order.address}, ${order.location}</div>
        <div><strong>Hình thức thanh toán:</strong> Thanh toán khi nhận hàng (COD)</div>
      </div>
    </div>

    <!-- Danh sách sản phẩm -->
    <h3 style="font-size:16px; margin-bottom:14px; color:#f8fafc;">Danh Sách Mặt Hàng:</h3>
    <div style="overflow-x:auto;">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th style="text-align:center;">Số lượng</th>
            <th style="text-align:right;">Đơn giá</th>
            <th style="text-align:right;">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>
                <strong>${item[0]}</strong>
              </td>
              <td style="text-align:center;">x${item[1]}</td>
              <td style="text-align:right; color:#94a3b8;">${formatMoney(item[2])}</td>
              <td style="text-align:right; color:#38bdf8; font-weight:700;">${formatMoney(item[1] * item[2])}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="summary-row total" style="margin-top:20px; font-size:18px;">
      <span>Tổng thanh toán:</span>
      <span>${formatMoney(order.total)}</span>
    </div>

    <div style="margin-top:30px; display:flex; gap:16px;">
      <a href="logged-index.html" class="btn-primary" style="text-decoration:none; text-align:center; flex:1;">&larr; Tiếp tục mua sắm</a>
      <a href="history.html" class="btn-secondary-link" style="margin-top:0; flex:1;">Xem lịch sử đơn hàng</a>
    </div>
  `;
}

// Khởi chạy khi tài liệu tải xong
document.addEventListener('DOMContentLoaded', () => {
  // Xử lý nút 3 gạch (Hamburger Menu)
  const btnHamburger = document.getElementById('btnHamburgerMenu');
  const dropdownMenu = document.getElementById('hamburgerDropdown');

  if (btnHamburger && dropdownMenu) {
    btnHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
      btnHamburger.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !btnHamburger.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        btnHamburger.classList.remove('active');
      }
    });
  }

  updateCartBadge();
  updateUserNavbarAvatar();
  renderCartPage();
  setupCheckoutPage();
  setupAccountPage();
  setupCustomerOrderDetail();

  // Nút thêm vào giỏ hàng tại product-detail.html: Vô hiệu hóa
  const btnAddCart = document.getElementById('btnAddCart');
  if (btnAddCart) {
    btnAddCart.addEventListener('click', (e) => {
      e.preventDefault();
      // Nút bị vô hiệu hóa
    });
  }

  // Phân trang & Bộ lọc tìm kiếm sản phẩm tại trang index.html
  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const btnAdvSearch = document.getElementById('btnAdvancedSearch');
  const productGrid = document.getElementById('productGrid');
  const paginationContainer = document.getElementById('userPagination');

  if (productGrid) {
    let currentUserPage = 1;
    const userProductsPerPage = 8;
    let currentFilteredList = [...SHOP_PRODUCTS];

    function renderUserProductList() {
      const totalPages = Math.ceil(currentFilteredList.length / userProductsPerPage) || 1;
      if (currentUserPage > totalPages) currentUserPage = totalPages;
      if (currentUserPage < 1) currentUserPage = 1;

      const startIndex = (currentUserPage - 1) * userProductsPerPage;
      const pageItems = currentFilteredList.slice(startIndex, startIndex + userProductsPerPage);

      if (pageItems.length === 0) {
        productGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
            <p style="font-size: 16px;">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
          </div>
        `;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
      }

      productGrid.innerHTML = pageItems.map(p => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p class="price">${formatMoney(p.price)}</p>
          <div class="card-actions">
            <a href="product-detail.html?id=${p.id}" class="btn-detail">Chi Tiết</a>
            <button type="button" class="btn-quick-add" onclick="event.preventDefault()" title="Thêm ngay vào giỏ">
              🛒 Thêm Giỏ
            </button>
          </div>
        </div>
      `).join('');

      renderUserPagination(totalPages);
    }

    function renderUserPagination(totalPages) {
      if (!paginationContainer) return;

      let html = '';
      html += `<button type="button" onclick="event.preventDefault()">&laquo; Trang trước</button>`;
      html += `<button type="button" class="active" onclick="event.preventDefault()">1</button>`;
      html += `<button type="button" onclick="event.preventDefault()">2</button>`;
      html += `<button type="button" onclick="event.preventDefault()">Trang sau &raquo;</button>`;

      paginationContainer.innerHTML = html;
    }

    window.changeUserPage = function (page) {
      // Vô hiệu hóa nút chuyển trang sản phẩm
    };

    function filterStoreProducts() {
      // Giữ nguyên giao diện, không thực hiện tìm kiếm / lọc dữ liệu
    }

    if (btnAdvSearch) {
      btnAdvSearch.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }

    renderUserProductList();
  }
});
