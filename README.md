# SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ - FRONTEND

## Giới Thiệu
Đây là phần **Frontend** của hệ thống **Sàn Giao Dịch Thương Mại Điện Tử**, được phát triển bằng **React.js**. Hệ thống hỗ trợ nhiều vai trò như **Người dùng, Người bán, Nhân viên sàn giao dịch, Quản trị viên**, với các tính năng liên quan đến mua bán, đánh giá sản phẩm, thanh toán, quản lý cửa hàng và thống kê doanh thu.

## Công Nghệ Sử Dụng
- **Ngôn ngữ:** JavaScript 
- **Framework:** React.js
- **State Management:** Redux Toolkit
- **Giao diện:** Tailwind CSS, Material UI
- **Routing:** React Router
- **Giao tiếp API:** Axios
- **Xác thực & Phân quyền:** JWT
- **Realtime Chat:** Firebase
- **Thanh toán online:** PayPal, Stripe, Zalo Pay, Momo

## Chức Năng Chính
### 1. Đăng ký & Đăng nhập
- Hỗ trợ đăng ký và đăng nhập tài khoản với các vai trò: **Người dùng, Người bán, Nhân viên, Quản trị viên**.
- Người bán cần được **nhân viên hệ thống phê duyệt** trước khi có thể hoạt động.

### 2. Chức năng cho Người bán
- **Tạo cửa hàng** và **đăng sản phẩm** lên sàn.
- **Xem thống kê doanh thu** theo tháng, quý, năm.

### 3. Chức năng cho Người dùng
- **Tìm kiếm sản phẩm** theo tên, giá, cửa hàng.
- **Sắp xếp sản phẩm** theo tên hoặc giá.
- **Phân trang sản phẩm** (tối đa 20 sản phẩm/trang).
- **Đánh giá & bình luận** về sản phẩm và người bán.
- **Mua hàng online** qua nhiều phương thức thanh toán (**PayPal, Stripe, Zalo Pay, Momo**).
- **So sánh sản phẩm** giữa các cửa hàng khác nhau.

### 4. Chức năng cho Quản trị viên
- **Xem thống kê** tần suất bán hàng, tổng sản phẩm.
- **Quản lý người bán**, xác nhận tài khoản.



