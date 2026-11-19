/**
 * ==========================================================================
 * JAVASCRIPT GIAO DIỆN KHÁCH HÀNG (ShopCloth Frontend)
 * Quản lý giỏ hàng, đặt hàng, tài khoản và đồng bộ với hệ thống Admin
 * ==========================================================================
 */

// Danh mục sản phẩm thời trang mặc định của Shop
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

// Định dạng tiền tệ VNĐ
function formatMoney(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount || 0) + ' đ';
}

// ==========================================================================
// 1. QUẢN LÝ GIỎ HÀNG (Local Storage)
// ==========================================================================
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('shopcloth_cart') || '[]');
  } catch (_) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('shopcloth_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge, #cartCountBadge').forEach(el => {
    el.textContent = totalCount > 99 ? '99+' : totalCount;
    el.style.display = 'inline-flex';
  });
}

// Cập nhật hình đại diện khách hàng đã đăng nhập trên Navbar (nằm bên trái nút 3 gạch)
function updateUserNavbarAvatar() {
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('shopcloth_current_user') || 'null');
  } catch (_) {}

  // Cập nhật link nút Home
  const homeBtns = document.querySelectorAll('.nav-home-btn, .navbar a[href="index.html"], .navbar a[href="logged-index.html"]');
  homeBtns.forEach(link => {
    if (currentUser && currentUser.name) {
      link.setAttribute('href', 'logged-index.html');
    } else {
      link.setAttribute('href', 'index.html');
    }
  });

  // Tìm tất cả các slot chứa thông tin người dùng (#navUserSlot hoặc fallback trong .navbar)
  const userSlots = document.querySelectorAll('#navUserSlot');
  if (userSlots.length > 0) {
    userSlots.forEach(slot => {
      if (currentUser && currentUser.name) {
        const firstLetter = currentUser.name.trim().charAt(0).toUpperCase() || 'U';
        const displayName = currentUser.name.trim();
        slot.innerHTML = `
          <a href="account.html" class="nav-user-pill" title="Tài khoản: ${displayName}">
            <span class="nav-user-avatar">${firstLetter}</span>
            <span class="nav-user-name">${displayName}</span>
          </a>
        `;
      } else {
        slot.innerHTML = `
          <a href="account.html" class="nav-account-link" style="color: #cbd5e1; font-size: 14.5px; font-weight: 500; text-decoration: none; padding: 6px 12px;">Tài Khoản</a>
        `;
      }
    });
  }
}

function addToCart(productId, quantity = 1) {
  let product = SHOP_PRODUCTS.find(p => p.id == productId);
  if (!product) {
    product = {
      id: productId,
      name: 'Áo Khoác Da Lộn Nam',
      price: 1299000,
      image: 'images/product-jacket-black.png'
    };
  }

  const cart = getCart();
  const existing = cart.find(item => item.id == productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart(cart);
  alert(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
}

function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  const item = cart.find(x => x.id == productId);
  if (item) {
    if (quantity <= 0) {
      cart = cart.filter(x => x.id != productId);
    } else {
      item.quantity = quantity;
    }
    saveCart(cart);
  }
}

function removeCartItem(productId) {
  let cart = getCart();
  cart = cart.filter(x => x.id != productId);
  saveCart(cart);
}

// ==========================================================================
// 2. RENDER TRANG GIỎ HÀNG (cart.html)
// ==========================================================================
function renderCartPage() {
  const container = document.getElementById('cartContentArea');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-box">
        <div style="font-size: 54px; color: #38bdf8; margin-bottom: 12px;">🛒</div>
        <h3>Giỏ hàng của bạn đang trống</h3>
        <p>Hãy khám phá thêm các mẫu quần áo thời trang mới nhất tại ShopCloth nhé!</p>
        <a href="index.html" class="btn-primary" style="display:inline-block; width:auto; padding:12px 28px; text-decoration:none;">
          &larr; Khám Phá Sản Phẩm Ngay
        </a>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  container.innerHTML = `
    <div class="cart-layout">
      <!-- Bảng danh sách sản phẩm trong giỏ -->
      <div class="cart-box">
        <h2>Giỏ Hàng Của Bạn (${cart.length} món)</h2>
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
                      <button class="btn-qty" onclick="changeItemQty(${item.id}, ${item.quantity - 1})">-</button>
                      <input type="text" class="qty-input" value="${item.quantity}" readonly>
                      <button class="btn-qty" onclick="changeItemQty(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                  </td>
                  <td style="color:#38bdf8; font-weight:700;">${formatMoney(item.price * item.quantity)}</td>
                  <td style="text-align:right;">
                    <button class="btn-remove-item" onclick="deleteCartItem(${item.id})" title="Xóa món này">&times;</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:20px;">
          <a href="index.html" class="back-link">&larr; Tiếp tục chọn thêm sản phẩm</a>
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

window.changeItemQty = function (id, newQty) {
  updateCartQuantity(id, newQty);
  renderCartPage();
};

window.deleteCartItem = function (id) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
    removeCartItem(id);
    renderCartPage();
  }
};

// ==========================================================================
// 3. XỬ LÝ ĐẶT HÀNG (checkout.html) & ĐỒNG BỘ VÀO adminOrders
// ==========================================================================
function setupCheckoutPage() {
  const checkoutSummary = document.getElementById('checkoutSummaryItems');
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutSummary || !checkoutForm) return;

  const cart = getCart();

  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
    window.location.href = 'index.html';
    return;
  }

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

  // Xử lý gửi đơn hàng (Bỏ hết ràng buộc, bấm là đặt được ngay)
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('orderCustomerName').value.trim() || 'Khách Mua Hàng';
    const phone = document.getElementById('orderCustomerPhone').value.trim() || '0901234567';
    const address = document.getElementById('orderCustomerAddress').value.trim() || '123 Đường Mẫu';
    const city = document.getElementById('orderCustomerCity').value.trim() || 'Hồ Chí Minh';
    const notes = document.getElementById('orderCustomerNotes')?.value.trim() || '';

    // Tạo mã đơn hàng mới dạng ORD-XXXX
    const newOrderId = 'ORD-' + Math.floor(9030 + Math.random() * 900);
    const today = new Date().toISOString().split('T')[0];

    // Chuyển cart thành format items của adminOrders: [ [name, qty, price], ... ]
    const orderItems = cart.map(item => [item.name, item.quantity, item.price]);

    const newOrder = {
      id: newOrderId,
      customer: name,
      phone: phone,
      address: address,
      location: city,
      date: today,
      total: subtotal,
      status: 'Chưa xác nhận', // Đơn mới đặt
      items: orderItems,
      notes: notes
    };

    // ĐỒNG BỘ TRỰC TIẾP VÀO adminOrders TRONG LOCALSTORAGE!
    try {
      const adminOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
      adminOrders.unshift(newOrder); // Đẩy lên đầu danh sách
      localStorage.setItem('adminOrders', JSON.stringify(adminOrders));
    } catch (_) { }

    // Lưu vào lịch sử đơn hàng của tài khoản khách
    try {
      const userOrders = JSON.parse(localStorage.getItem('shopcloth_user_orders') || '[]');
      userOrders.unshift(newOrder);
      localStorage.setItem('shopcloth_user_orders', JSON.stringify(userOrders));
    } catch (_) { }

    // Xóa giỏ hàng
    localStorage.removeItem('shopcloth_cart');
    updateCartBadge();

    alert(`🎉 Chúc mừng bạn đã đặt hàng thành công! Mã đơn của bạn là #${newOrderId}`);
    window.location.href = `order-detail.html?id=${encodeURIComponent(newOrderId)}`;
  });
}

// ==========================================================================
// 4. QUẢN LÝ TÀI KHOẢN KHÁCH HÀNG (account.html)
// "Bỏ hết các ràng buộc khi đăng ký đăng nhập"
// ==========================================================================
function setupAccountPage() {
  const loginForm = document.getElementById('userLoginForm');
  const registerForm = document.getElementById('userRegisterForm');
  const accountDashboard = document.getElementById('accountDashboardView');
  const authFormsWrap = document.getElementById('authFormsWrap');

  if (!accountDashboard || !authFormsWrap) return;

  function renderAccountView() {
    const currentUser = JSON.parse(localStorage.getItem('shopcloth_current_user') || 'null');

    if (currentUser) {
      authFormsWrap.style.display = 'none';
      accountDashboard.style.display = 'block';

      document.getElementById('accUserName').textContent = currentUser.name || 'Khách hàng';
      document.getElementById('accUserEmail').textContent = currentUser.email || 'user@gmail.com';
      document.getElementById('accUserPhone').textContent = currentUser.phone || 'Chưa cập nhật';

      // Lấy lịch sử đơn hàng từ cả shopcloth_user_orders và adminOrders để đảm bảo luôn hiển thị đầy đủ
      let userSavedOrders = [];
      try {
        userSavedOrders = JSON.parse(localStorage.getItem('shopcloth_user_orders') || '[]');
      } catch (_) {}

      let allOrders = [];
      try {
        allOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
      } catch (_) {}

      // Gộp các đơn hàng của khách
      const myOrdersMap = new Map();
      userSavedOrders.forEach(o => myOrdersMap.set(o.id, o));
      allOrders.forEach(o => {
        if (!myOrdersMap.has(o.id)) {
          if (
            (currentUser.name && o.customer && o.customer.toLowerCase().includes(currentUser.name.toLowerCase())) ||
            (currentUser.phone && o.phone && o.phone.includes(currentUser.phone))
          ) {
            myOrdersMap.set(o.id, o);
          }
        }
      });

      const myOrders = Array.from(myOrdersMap.values());

      const historyTbody = document.getElementById('userOrderHistoryBody');
      if (historyTbody) {
        if (myOrders.length === 0) {
          historyTbody.innerHTML = `
            <tr>
              <td colspan="5" style="text-align:center; padding:24px; color:#94a3b8;">
                Bạn chưa có đơn đặt hàng nào gần đây.
              </td>
            </tr>
          `;
        } else {
          historyTbody.innerHTML = myOrders.map(o => {
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
      }
    } else {
      authFormsWrap.style.display = 'block';
      accountDashboard.style.display = 'none';
    }
  }

  // Đăng nhập (Bỏ hết ràng buộc)
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginUserEmail').value.trim() || 'an.nguyen@gmail.com';
      const name = email.split('@')[0];

      localStorage.setItem('shopcloth_current_user', JSON.stringify({
        name: name.toUpperCase(),
        email: email,
        phone: '0901234567'
      }));

      alert('Đăng nhập thành công!');
      updateUserNavbarAvatar();
      renderAccountView();
    });
  }

  // Đăng ký (Bỏ hết ràng buộc)
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim() || 'Khách hàng mới';
      const email = document.getElementById('regEmail').value.trim() || 'user@example.com';
      const phone = document.getElementById('regPhone').value.trim() || '0987654321';

      localStorage.setItem('shopcloth_current_user', JSON.stringify({
        name: name,
        email: email,
        phone: phone
      }));

      alert('Đăng ký tài khoản thành công!');
      updateUserNavbarAvatar();
      renderAccountView();
    });
  }

  // Đăng xuất
  const btnLogout = document.getElementById('btnUserLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function () {
      localStorage.removeItem('shopcloth_current_user');
      updateUserNavbarAvatar();
      renderAccountView();
    });
  }

  renderAccountView();
}

// ==========================================================================
// 5. TRANG CHI TIẾT ĐƠN HÀNG PHÍA KHÁCH HÀNG (order-detail.html)
// ==========================================================================
function setupCustomerOrderDetail() {
  const container = document.getElementById('customerOrderDetailBox');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id');
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
  } catch (_) { }

  const order = orders.find(x => x.id === id);

  if (!order) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px;">
        <h2 style="color:#ef4444; margin-bottom:12px;">Không tìm thấy đơn hàng</h2>
        <p style="color:#94a3b8; margin-bottom:20px;">Mã đơn hàng "${id || 'N/A'}" không có trong hệ thống.</p>
        <a href="index.html" class="btn-primary" style="display:inline-block; width:auto; padding:10px 24px; text-decoration:none;">Về trang chủ</a>
      </div>
    `;
    return;
  }

  let statusBadge = `<span class="order-badge-status status-pending">Chờ xác nhận</span>`;
  if (order.status === 'Đã giao') statusBadge = `<span class="order-badge-status status-delivered">Đã giao thành công</span>`;
  else if (order.status === 'Đã xác nhận') statusBadge = `<span class="order-badge-status status-confirmed">Đã xác nhận & đang vận chuyển</span>`;
  else if (order.status === 'Hủy đơn') statusBadge = `<span class="order-badge-status status-cancelled">Đã hủy</span>`;

  // Hàm tìm ảnh sản phẩm theo tên (đồng bộ với SHOP_PRODUCTS)
  function findProductImg(itemName) {
    const nameLower = itemName.toLowerCase();
    let found = SHOP_PRODUCTS.find(p => p.name.toLowerCase() === nameLower);
    if (found) return found.image;
    found = SHOP_PRODUCTS.find(p => nameLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(nameLower));
    if (found) return found.image;
    return null;
  }

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
          ${order.items.map(item => {
    const img = findProductImg(item[0]);
    const imgHtml = img
      ? `<img src="${img}" alt="${item[0]}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; border:1px solid #334155; margin-right:10px; vertical-align:middle;" onerror="this.style.display='none'">`
      : '';
    return `
            <tr>
              <td>
                <div style="display:flex; align-items:center;">
                  ${imgHtml}
                  <strong>${item[0]}</strong>
                </div>
              </td>
              <td style="text-align:center;">x${item[1]}</td>
              <td style="text-align:right; color:#94a3b8;">${formatMoney(item[2])}</td>
              <td style="text-align:right; color:#38bdf8; font-weight:700;">${formatMoney(item[1] * item[2])}</td>
            </tr>
          `}).join('')}
        </tbody>
      </table>
    </div>

    <div class="summary-row total" style="margin-top:20px; font-size:18px;">
      <span>Tổng thanh toán:</span>
      <span>${formatMoney(order.total)}</span>
    </div>

    <div style="margin-top:30px; display:flex; gap:16px;">
      <a href="index.html" class="btn-primary" style="text-decoration:none; text-align:center; flex:1;">&larr; Tiếp tục mua sắm</a>
      <a href="account.html" class="btn-secondary-link" style="margin-top:0; flex:1;">Xem lịch sử đơn hàng</a>
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

  // Nút thêm vào giỏ hàng tại product-detail.html
  const btnAddCart = document.getElementById('btnAddCart');
  if (btnAddCart) {
    btnAddCart.addEventListener('click', () => {
      const qtyInput = document.getElementById('quantity');
      const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
      const urlId = new URLSearchParams(window.location.search).get('id') || 1;
      addToCart(urlId, qty);
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
            <button type="button" class="btn-quick-add" onclick="addToCart(${p.id}, 1)" title="Thêm ngay vào giỏ">
              🛒 Thêm Giỏ
            </button>
          </div>
        </div>
      `).join('');

      renderUserPagination(totalPages);
    }

    function renderUserPagination(totalPages) {
      if (!paginationContainer) return;
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
      }

      let html = '';
      if (currentUserPage > 1) {
        html += `<button onclick="changeUserPage(${currentUserPage - 1})">&laquo; Trang trước</button>`;
      }

      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentUserPage ? 'active' : ''}" onclick="changeUserPage(${i})">${i}</button>`;
      }

      if (currentUserPage < totalPages) {
        html += `<button onclick="changeUserPage(${currentUserPage + 1})">Trang sau &raquo;</button>`;
      }

      paginationContainer.innerHTML = html;
    }

    window.changeUserPage = function (page) {
      currentUserPage = page;
      renderUserProductList();
      window.scrollTo({ top: productGrid.offsetTop - 80, behavior: 'smooth' });
    };

    function filterStoreProducts() {
      const keyword = (searchInput ? searchInput.value.trim().toLowerCase() : '');
      const cat = (catFilter ? catFilter.value : 'all');
      const minP = (minPriceInput && minPriceInput.value) ? parseFloat(minPriceInput.value) : 0;
      const maxP = (maxPriceInput && maxPriceInput.value) ? parseFloat(maxPriceInput.value) : Infinity;

      currentFilteredList = SHOP_PRODUCTS.filter(p => {
        const matchKeyword = !keyword || p.name.toLowerCase().includes(keyword);
        const matchCat = (cat === 'all') || (p.category === cat);
        const matchPrice = p.price >= minP && p.price <= maxP;
        return matchKeyword && matchCat && matchPrice;
      });

      currentUserPage = 1;
      renderUserProductList();
    }

    if (searchInput) searchInput.addEventListener('input', filterStoreProducts);
    if (catFilter) catFilter.addEventListener('change', filterStoreProducts);
    if (btnAdvSearch) btnAdvSearch.addEventListener('click', filterStoreProducts);

    // Initial render 6 sản phẩm trang 1
    renderUserProductList();
  }
});

