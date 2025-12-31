# 🚀 Hướng Dẫn Deploy Website Chúc Mừng Năm Mới 2026

## Phương án 1: GitHub Pages (Đơn giản nhất - Khuyến nghị)

### Bước 1: Tạo tài khoản GitHub
- Truy cập: https://github.com
- Đăng ký tài khoản miễn phí (nếu chưa có)

### Bước 2: Tạo Repository mới
1. Click nút **"New"** hoặc **"+"** → **"New repository"**
2. Đặt tên repository (ví dụ: `happy-new-year-2026`)
3. Chọn **Public** (để dùng miễn phí GitHub Pages)
4. **KHÔNG** tích vào "Initialize with README"
5. Click **"Create repository"**

### Bước 3: Upload code lên GitHub
**Cách 1: Sử dụng GitHub Desktop (Dễ nhất)**
1. Tải GitHub Desktop: https://desktop.github.com
2. Cài đặt và đăng nhập
3. File → Add Local Repository → Chọn thư mục project
4. Commit message: "Initial commit"
5. Publish repository

**Cách 2: Sử dụng Git Command Line**
```bash
# Mở terminal/PowerShell trong thư mục project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TEN_USER/TEN_REPO.git
git push -u origin main
```

### Bước 4: Bật GitHub Pages
1. Vào repository trên GitHub
2. Click tab **Settings**
3. Scroll xuống phần **Pages** (bên trái)
4. Source: Chọn **"main"** branch
5. Folder: Chọn **"/ (root)"**
6. Click **Save**
7. Đợi 1-2 phút, GitHub sẽ cung cấp link: `https://TEN_USER.github.io/TEN_REPO/`

---

## Phương án 2: Netlify (Nhanh nhất - Drag & Drop)

### Bước 1: Tạo tài khoản Netlify
- Truy cập: https://www.netlify.com
- Đăng ký bằng GitHub/Email (miễn phí)

### Bước 2: Deploy
1. Vào dashboard Netlify
2. Kéo thả toàn bộ thư mục project vào vùng **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
3. Netlify tự động deploy và cung cấp link (ví dụ: `https://random-name-123.netlify.app`)

### Bước 3: Đổi tên miền (Tùy chọn)
- Settings → Site details → Change site name
- Có thể đổi thành tên dễ nhớ hơn

---

## Phương án 3: Vercel (Tốt cho static sites)

### Bước 1: Tạo tài khoản Vercel
- Truy cập: https://vercel.com
- Đăng ký bằng GitHub (miễn phí)

### Bước 2: Deploy
1. Click **"Add New Project"**
2. Import từ GitHub repository (nếu đã push lên GitHub)
   HOẶC
3. Drag & drop thư mục project
4. Vercel tự động deploy và cung cấp link

---

## ⚠️ Lưu ý quan trọng:

1. **File nhạc (nhac.mp3)**: 
   - Nếu file quá lớn (>25MB), GitHub Pages có thể không hỗ trợ tốt
   - Nên dùng Netlify hoặc Vercel nếu file nhạc lớn

2. **Kiểm tra đường dẫn**:
   - Đảm bảo tất cả đường dẫn trong code là relative path (bắt đầu bằng `./`)
   - Code hiện tại đã đúng ✅

3. **Test sau khi deploy**:
   - Mở link trên trình duyệt
   - Kiểm tra xem nhạc có phát không
   - Kiểm tra animation có chạy không

---

## 🎯 Khuyến nghị:

**Nếu bạn mới bắt đầu**: Dùng **Netlify** (drag & drop, không cần Git)

**Nếu bạn muốn quản lý code**: Dùng **GitHub Pages** (có thể chỉnh sửa và cập nhật dễ dàng)

**Nếu bạn muốn tốc độ nhanh**: Dùng **Vercel**

---

## 📝 Checklist trước khi deploy:

- [ ] Tất cả file đã có trong thư mục
- [ ] Đã test trên máy local (mở file index.html bằng trình duyệt)
- [ ] File nhạc không quá lớn
- [ ] Đường dẫn file đều là relative path

---

## 🔗 Sau khi deploy:

Bạn sẽ có link dạng:
- GitHub Pages: `https://username.github.io/repository-name/`
- Netlify: `https://your-site-name.netlify.app`
- Vercel: `https://your-site-name.vercel.app`

Chia sẻ link này cho người yêu là xong! 🎉❤️

