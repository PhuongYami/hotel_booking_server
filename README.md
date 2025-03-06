# Yami Booking - Ứng dụng đặt lịch khách sạn

Yami Booking là một ứng dụng đặt lịch khách sạn hiện đại, được xây dựng với các công nghệ tiên tiến như MongoDB, React Native, Node.js và Express. Ứng dụng cung cấp một nền tảng đặt phòng khách sạn nhanh chóng và tiện lợi cho khách hàng, đồng thời giúp chủ khách sạn quản lý dễ dàng hơn.

## Các tính năng chính

- Đăng ký và đăng nhập tài khoản
- Xác thực OTP
- Quản lý tài khoản người dùng (cập nhật, xóa)
- Tìm kiếm và đặt phòng khách sạn
- Quản lý lịch đặt phòng
- Đăng ký tài khoản Partner
- Quản lý khách sạn (tạo, cập nhật thông tin)

## Hướng dẫn cài đặt

1. Kho lưu trữ GitHub:
-	Backend: https://github.com/NguyenDuyPhuongDeveloper/hotel_booking_server.git
-	Frontend: https://github.com/NguyenDuyPhuongDeveloper/Hotel_Booking.git
2. Cài đặt các gói phụ thuộc:

Tạo các file configs:
-       Backend: tạo folder configs trong source:
        require('dotenv').config();
        const mongoose = require('mongoose');
         
        const dbUrl =
        `mongodb+srv://${ process.env.DATABASE_USERNAME }:${ process.env.DATABASE_PASSWORD }@cluster0.nhqwx5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;        
        const connectDB = async () =>
        {
            try
            {
                const connection = await mongoose.connect(dbUrl);
         
                console.log('Database connected successfully');
            } catch (error)
            {
                console.log('Database connection failed');
                process.exit(1);
            }
        }
         
        module.exports = connectDB;
-       Frontend: Tạo file google-services.json.


3. Cấu hình biến môi trường
   - Tạo file `.env` trong thư mục gốc
   - Thêm các biến môi trường cần thiết (ví dụ: `MONGO_URI`, `JWT_SECRET`, ...)

4. Khởi chạy ứng dụng:

•	Di chuyển vào thư mục backend: gõ lệnh npm install và sau đó npm start.

•	Di chuyển vào thư mục frontend: gõ lệnh npm install và sau đó npm run android.


## Công nghệ sử dụng

- MongoDB: Cơ sở dữ liệu NoSQL
- React Native: Xây dựng giao diện người dùng ứng dụng di động
- Node.js: Môi trường server-side JavaScript
- Express: Framework web cho Node.js

## Đóng góp

Nếu bạn muốn đóng góp cho dự án này, vui lòng gửi pull request. Chúng tôi rất hoan nghênh các đóng góp và cải tiến.

## Giấy phép

Dự án này được cấp phép theo [MIT License](LICENSE).

