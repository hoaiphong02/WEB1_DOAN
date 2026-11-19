/**
 * ==========================================================================
 * ADMIN PORTAL SHARED JAVASCRIPT - SHOPCLOTH / ADMINSTORE
 * Utilities, Formatters, Toast, Confirmation Dialogs, Sidebar & State Handlers
 * ==========================================================================
 */

// Định dạng tiền tệ VNĐ chuẩn
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0).replace('₫', 'đ');
}

// Bỏ dấu tiếng Việt phục vụ tìm kiếm thông minh
function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

function includesText(value, searchValue) {
  return normalizeText(value).includes(normalizeText(searchValue));
}

// Toast Notification góc màn hình
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg class="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    danger: `<svg class="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    warning: `<svg class="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    info: `<svg class="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${icons[type] || icons.success}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Hộp thoại xác nhận toàn cục
function showConfirm({ title, message, confirmText = 'Xác nhận', confirmClass = 'btn-primary', onConfirm }) {
  let modalBackdrop = document.querySelector('#globalConfirmModal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'globalConfirmModal';
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog modal-sm">
        <div class="modal-header">
          <div class="modal-title" id="confirmTitle">Xác nhận</div>
          <button class="btn-close-modal" id="confirmCloseBtn">&times;</button>
        </div>
        <div class="modal-body">
          <p id="confirmMessage" style="color:var(--text-main); font-size:14px; line-height:1.5;"></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="confirmCancelBtn">Hủy bỏ</button>
          <button class="btn" id="confirmActionBtn">Đồng ý</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  }

  document.querySelector('#confirmTitle').textContent = title;
  document.querySelector('#confirmMessage').innerHTML = message;
  const actionBtn = document.querySelector('#confirmActionBtn');
  actionBtn.textContent = confirmText;
  actionBtn.className = `btn ${confirmClass}`;

  modalBackdrop.classList.add('open');

  const closeFn = () => modalBackdrop.classList.remove('open');
  document.querySelector('#confirmCloseBtn').onclick = closeFn;
  document.querySelector('#confirmCancelBtn').onclick = closeFn;

  actionBtn.onclick = () => {
    closeFn();
    if (typeof onConfirm === 'function') onConfirm();
  };
}

// Khởi tạo Dữ liệu Đơn Hàng Mẫu nếu chưa có trong localStorage
// Items đồng bộ với sản phẩm trong trang Quản lý Sản phẩm (products.js) và trang Sản phẩm khách (main.js)
const DEFAULT_ADMIN_ORDERS = [
  { id: "ORD-9021", customer: "Nguyễn Văn An", phone: "0901234567", address: "123 Lê Lợi, Q.1", location: "Hồ Chí Minh", date: "2026-10-15", total: 3118000, status: "Chưa xác nhận", items: [["Áo Khoác Da Lộn Nam Cao Cấp (Đen)", 2, 1299000], ["Quần Jean Slimfit Co Giãn Nam", 1, 520000]] },
  { id: "ORD-9022", customer: "Trần Thị Bích", phone: "0912345678", address: "45 Hàng Bài, Hoàn Kiếm", location: "Hà Nội", date: "2026-10-14", total: 350000, status: "Đã xác nhận", items: [["Áo Khoác Bomber Da Bò Màu Nâu", 1, 350000]] },
  { id: "ORD-9023", customer: "Lê Hoàng Long", phone: "0987654321", address: "89 Nguyễn Văn Linh, Hải Châu", location: "Đà Nẵng", date: "2026-10-14", total: 1549000, status: "Đã giao", items: [["Áo Khoác Da Lộn Nam Cao Cấp (Đen)", 1, 1299000], ["Áo Khoác Nỉ Form Rộng Xám Khói", 1, 250000]] },
  { id: "ORD-9024", customer: "Phạm Minh Tuấn", phone: "0934567890", address: "12 Trần Hưng Đạo", location: "Cần Thơ", date: "2026-10-13", total: 940000, status: "Đã giao", items: [["Quần Jean Slimfit Co Giãn Nam", 1, 520000], ["Quần Khaki Túi Hộp Streetwear", 1, 420000]] },
  { id: "ORD-9025", customer: "Hoàng Thảo My", phone: "0978123456", address: "67 Lê Duẩn, Thanh Khê", location: "Đà Nẵng", date: "2026-10-12", total: 800000, status: "Chưa xác nhận", items: [["Áo Khoác Bomber Da Bò Màu Nâu", 1, 350000], ["Áo Sơ Mi Oxford Dài Tay Nam", 1, 450000]] },
  { id: "ORD-9026", customer: "Đặng Quốc Huy", phone: "0922334455", address: "234 Quang Trung, Gò Vấp", location: "Hồ Chí Minh", date: "2026-10-12", total: 700000, status: "Đã giao", items: [["Áo Khoác Bomber Da Bò Màu Nâu", 2, 350000]] },
  { id: "ORD-9027", customer: "Nguyễn Văn An", phone: "0901234567", address: "123 Lê Lợi, Q.1", location: "Hồ Chí Minh", date: "2026-10-10", total: 350000, status: "Đã giao", items: [["Áo Khoác Bomber Da Bò Màu Nâu", 1, 350000]] },
  { id: "ORD-9028", customer: "Vũ Bích Ngọc", phone: "0944556677", address: "78 Phố Huế, Hai Bà Trưng", location: "Hà Nội", date: "2026-10-09", total: 970000, status: "Đã xác nhận", items: [["Áo Sơ Mi Oxford Dài Tay Nam", 1, 450000], ["Quần Jean Slimfit Co Giãn Nam", 1, 520000]] },
  { id: "ORD-9029", customer: "Trần Thị Bích", phone: "0912345678", address: "45 Hàng Bài, Hoàn Kiếm", location: "Hà Nội", date: "2026-10-08", total: 420000, status: "Đã giao", items: [["Quần Khaki Túi Hộp Streetwear", 1, 420000]] },
  { id: "ORD-9030", customer: "Hoàng Gia Bảo", phone: "0918234567", address: "15 Lê Thánh Tôn, Bến Nghé", location: "Hồ Chí Minh", date: "2026-10-16", total: 870000, status: "Chưa xác nhận", items: [["Áo Khoác Bomber Da Bò Màu Nâu", 1, 350000], ["Quần Jean Slimfit Co Giãn Nam", 1, 520000]] },
  { id: "ORD-9031", customer: "Bùi Anh Tuấn", phone: "0966333888", address: "54 Cầu Giấy, Quan Hoa", location: "Hà Nội", date: "2026-10-16", total: 1299000, status: "Đã xác nhận", items: [["Áo Khoác Da Lộn Nam Cao Cấp (Đen)", 1, 1299000]] },
  { id: "ORD-9032", customer: "Lý Quốc Cường", phone: "0981112233", address: "102 Hùng Vương", location: "Đà Nẵng", date: "2026-10-15", total: 670000, status: "Chưa xác nhận", items: [["Áo Khoác Nỉ Form Rộng Xám Khói", 1, 250000], ["Quần Khaki Túi Hộp Streetwear", 1, 420000]] },
  { id: "ORD-9033", customer: "Đỗ Thùy Linh", phone: "0909555222", address: "88 Lý Tự Trọng, Ninh Kiều", location: "Cần Thơ", date: "2026-10-11", total: 350000, status: "Hủy đơn", items: [["Áo Khoác Bomber Da Bò Màu Nâu", 1, 350000]] },
  { id: "ORD-9034", customer: "Hoàng Gia Bảo", phone: "0918234567", address: "15 Lê Thánh Tôn, Bến Nghé", location: "Hồ Chí Minh", date: "2026-10-07", total: 629000, status: "Đã giao", items: [["Áo Sơ Mi Oxford Dài Tay Nam", 1, 450000], ["Quần Jean Slimfit Co Giãn Nam", 1, 520000]] }
];

// Đơn hàng được lưu trực tiếp trong mã nguồn (không sử dụng localStorage)
let adminOrders = [...DEFAULT_ADMIN_ORDERS];

function getAdminOrders() {
  // Trả về mảng đơn hàng hiện tại trong bộ nhớ
  return adminOrders;
}

function saveAdminOrders(orders) {
  // Cập nhật biến trong bộ nhớ thay vì localStorage
  adminOrders = [...orders];
  updateSidebarBadges();
}

// Cập nhật số lượng đơn hàng chưa xác nhận trên Badge của Sidebar
function updateSidebarBadges() {
  try {
    const orders = getAdminOrders();
    const pendingCount = orders.filter(o => o.status === 'Chưa xác nhận').length;
    document.querySelectorAll('#sidePendingCount, .side-pending-badge').forEach(el => {
      el.textContent = pendingCount > 0 ? `${pendingCount} mới` : '0';
    });
  } catch (_) {}
}

// Cập nhật thông tin ngày tháng và sự kiện chung
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const sidebar = document.querySelector('.admin-sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const toggleBtn = document.querySelector('.btn-mobile-sidebar');

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
    });
  }

  // Set current date on date-badge
  const datePill = document.querySelector('#currentDateBadge');
  if (datePill) {
    const now = new Date();
    datePill.textContent = now.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Global ESC to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        modal.classList.remove('open');
      });
    }
  });

  // Đồng bộ badge số đơn chưa xác nhận
  updateSidebarBadges();
});
