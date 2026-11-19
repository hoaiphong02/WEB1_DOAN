(function () {
  // Danh sách sản phẩm (được lưu trực tiếp trong mã nguồn, không dùng localStorage)
  let adminShopProducts = [
    {
      id: 'CLT-101',
      name: 'Áo Khoác Da Lộn Nam Cao Cấp (Đen)',
      category: 'Áo khoác',
      price: 1299000,
      oldPrice: 1499000,
      stock: 35,
      image: '../images/product-jacket-black.png',
      description: 'Chất liệu da lộn mềm mịn, lót gió giữ ấm tốt, form ôm thanh lịch phong cách cá tính.'
    },
    {
      id: 'CLT-102',
      name: 'Áo Khoác Bomber Da Bò Màu Nâu',
      category: 'Áo khoác',
      price: 350000,
      oldPrice: 450000,
      stock: 18,
      image: '../images/product-jacket-brown.png',
      description: 'Thiết kế bomber cổ điển màu nâu sang trọng, cản gió và chống nước nhẹ.'
    },
    {
      id: 'CLT-103',
      name: 'Áo Khoác Nỉ Form Rộng Xám Khói',
      category: 'Áo khoác',
      price: 250000,
      oldPrice: 320000,
      stock: 25,
      image: '../images/product-jacket-grey.png',
      description: 'Form unisex dáng thụng thoải mái, chất nỉ dày dặn ấm áp cho mùa lạnh.'
    },
    {
      id: 'CLT-104',
      name: 'Áo Sơ Mi Oxford Dài Tay Nam',
      category: 'Áo sơ mi/Thun',
      price: 450000,
      oldPrice: 550000,
      stock: 42,
      image: '../images/product-shirt-oxford.png',
      description: 'Chất vải oxford cotton chống nhăn, thoáng mát, phong cách công sở thanh lịch.'
    },
    {
      id: 'CLT-105',
      name: 'Quần Jean Slimfit Co Giãn Nam',
      category: 'Quần Jean/Khaki',
      price: 520000,
      oldPrice: 620000,
      stock: 30,
      image: '../images/product-pant-jean.png',
      description: 'Chất denim dày dặn co giãn nhẹ, giữ form tôn dáng chuẩn, dễ phối đồ.'
    },
    {
      id: 'CLT-106',
      name: 'Quần Khaki Túi Hộp Streetwear',
      category: 'Quần Jean/Khaki',
      price: 420000,
      oldPrice: 490000,
      stock: 28,
      image: '../images/product-pant-khaki.png',
      description: 'Chất liệu khaki bền bỉ phong cách streetwear thời thượng năng động.'
    },
    {
      id: 'CLT-107',
      name: 'Áo Thun Cotton Basic Form Rộng',
      category: 'Áo sơ mi/Thun',
      price: 199000,
      oldPrice: 260000,
      stock: 50,
      image: '../images/product-shirt-tshirt.png',
      description: 'Chất vải 100% cotton 2 chiều co giãn thoáng mát, thấm hút mồ hôi cực tốt.'
    },
    {
      id: 'CLT-108',
      name: 'Áo Khoác Gió Thể Thao 2 Lớp Chống Nước',
      category: 'Áo khoác',
      price: 490000,
      oldPrice: 590000,
      stock: 22,
      image: '../images/product-jacket-windbreaker.png',
      description: 'Chất liệu trượt nước cao cấp, lót lưới thông thoáng, cản gió giữ ấm hiệu quả.'
    },
    {
      id: 'CLT-109',
      name: 'Áo Polo Nam Phối Cổ Thanh Lịch',
      category: 'Áo sơ mi/Thun',
      price: 320000,
      oldPrice: 390000,
      stock: 36,
      image: '../images/product-shirt-polo.png',
      description: 'Thiết kế cổ bẻ dệt bo sang trọng, phù hợp cả đi làm, đi chơi hay sự kiện.'
    },
    {
      id: 'CLT-110',
      name: 'Quần Tây Baggy Nam Công Sở',
      category: 'Quần Jean/Khaki',
      price: 480000,
      oldPrice: 550000,
      stock: 19,
      image: '../images/product-pant-baggy.png',
      description: 'Form dáng baggy đứng ống tôn dáng, chất vải tuyết mưa cao cấp không bai xù.'
    }
  ];

  // Trả về một bản sao của danh sách sản phẩm hiện tại
  function loadShopProducts() {
    return adminShopProducts.map(p => ({ ...p }));
  }

  // Cập nhật danh sách sản phẩm và ghi lại vào biến trong mã nguồn
  function saveShopProducts(products) {
    // Ghi đè biến adminShopProducts bằng bản sao của dữ liệu mới
    adminShopProducts = products.map(p => ({ ...p }));
  }

  // Export ra toàn cục để các trang admin có thể sử dụng
  window.shopProducts = adminShopProducts;
  window.loadShopProducts = loadShopProducts;
  window.saveShopProducts = saveShopProducts;
})();
