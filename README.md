# 🛍️ ĐỒ ÁN MÔN HỌC: WEBSITE BÁN HÀNG THỜI TRANG (SHOPCLOTH)

## 📁 CẤU TRÚC THƯ MỤC & CÁC TỆP TIN TRONG DỰ ÁN

```text
WEB1-DOAN/
│
├── admin/                           # Khu vực dành riêng cho Quản trị viên
│   ├── index.html                   # Bảng điều khiển tổng quan (Dashboard thống kê)
│   ├── login.html                   # Trang đăng nhập dành cho Quản trị viên
│   ├── products.html                # Quản lý danh sách sản phẩm (CRUD sản phẩm, tồn kho)
│   ├── orders.html                  # Quản lý đơn hàng (xem, lọc, duyệt trạng thái đơn)
│   ├── order-detail.html            # Trang chi tiết đơn hàng quản trị (in hóa đơn, cập nhật)
│   └── users.html                   # Quản lý tài khoản người dùng và phân quyền
│
├── css/                             # Thư mục chứa mã nguồn định kiểu giao diện
│   ├── style.css                    # Toàn bộ CSS giao diện khách hàng (Modern Dark Theme)
│   └── admin.css                    # Toàn bộ CSS giao diện trang quản trị Admin
│
├── js/                              # Thư mục chứa mã nguồn xử lý logic JavaScript
│   ├── main.js                      # Xử lý logic phía khách hàng (giỏ hàng, đặt hàng, lọc, phân trang)
│   ├── admin.js                     # Xử lý logic các chức năng bên trong Admin Portal
│   └── products.js                  # Cơ sở dữ liệu mẫu & API lưu trữ sản phẩm cho Admin
│
├── images/                          # Thư mục tài nguyên hình ảnh sản phẩm & icon
│   ├── logo-cat.png                 # Logo biểu tượng thương hiệu
│   ├── product-jacket-black.png     # Ảnh sản phẩm: Áo khoác da lộn đen
│   ├── product-jacket-brown.png     # Ảnh sản phẩm: Áo bomber da bò nâu
│   ├── product-jacket-grey.png      # Ảnh sản phẩm: Áo khoác nỉ xám khói
│   ├── product-jacket-windbreaker.png # Ảnh sản phẩm: Áo khoác gió 2 lớp
│   ├── product-pant-baggy.png       # Ảnh sản phẩm: Quần tây Baggy công sở
│   ├── product-pant-jean.png        # Ảnh sản phẩm: Quần Jean Slimfit co giãn
│   ├── product-pant-khaki.png       # Ảnh sản phẩm: Quần Khaki túi hộp
│   ├── product-shirt-oxford.png     # Ảnh sản phẩm: Áo sơ mi Oxford
│   ├── product-shirt-polo.png       # Ảnh sản phẩm: Áo Polo nam phối cổ
│   └── product-shirt-tshirt.png     # Ảnh sản phẩm: Áo thun Cotton basic
│
├── index.html                       # Trang chủ dành cho khách (chưa đăng nhập)
├── logged-index.html                # Trang chủ sau khi khách hàng đã đăng nhập thành công
├── product-detail.html              # Trang chi tiết sản phẩm (chọn số lượng, thêm giỏ hàng)
├── cart.html                        # Trang giỏ hàng (tăng/giảm số lượng, xóa món, tính tổng tiền)
├── checkout.html                    # Trang đặt hàng & nhập thông tin thanh toán (COD / Chuyển khoản)
├── success.html                     # Trang thông báo đặt hàng thành công
├── order-detail.html                # Trang chi tiết đơn hàng riêng biệt phía khách hàng (không popup)
├── account.html                     # Trang quản lý tài khoản & lịch sử đơn hàng của khách
├── log-in.html                      # Trang đăng nhập riêng biệt
├── register.html                    # Trang đăng ký tài khoản mới riêng biệt
├── history.html                     # Trang xem lịch sử các đơn hàng đã mua
└── README.md                        # Tài liệu hướng dẫn và mô tả dự án
```

---

