window.initFireworks = function () {
  const canvas = document.getElementById("fireCanvas");
  const ctx = canvas.getContext("2d");

  // Danh sách các chữ muốn bắn lên trời
  const TEXTS = ["MIKA", "2026", "❤️", "LOVE", "HAPPY"]; 
  const GRAVITY = 0.04;

  function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // --- CẤU HÌNH PHÁO HOA ---
  class Firework {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height;
          this.targetY = Math.random() * canvas.height * 0.5; // Bay cao đến nửa màn hình
          this.speed = Math.random() * 3 + 5;
          this.radius = 2;
          this.exploded = false;
          this.particles = [];
          // 40% cơ hội bắn ra chữ/hình, 60% bắn nổ thường
          this.type = Math.random() < 0.4 ? "shape" : "normal"; 
          this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }

      update() {
          if (!this.exploded) {
              this.y -= this.speed;
              if (this.y <= this.targetY) this.explode();
          } else {
              this.particles.forEach((p, index) => {
                  p.update();
                  if (p.alpha <= 0) this.particles.splice(index, 1);
              });
          }
      }

      draw() {
          if (!this.exploded) {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
              ctx.fillStyle = this.color;
              ctx.fill();
          } else {
              this.particles.forEach(p => p.draw());
          }
      }

      explode() {
          this.exploded = true;
          
          if (this.type === "shape") {
              // Nếu là loại xếp hình -> Lấy chữ ngẫu nhiên
              const text = TEXTS[Math.floor(Math.random() * TEXTS.length)];
              createText(text, this.x, this.y, this.particles);
          } else {
              // Nếu là nổ thường -> Tạo hạt nổ tròn
              for (let i = 0; i < 100; i++) {
                  this.particles.push(new Particle(this.x, this.y, this.color));
              }
          }
      }
  }

  // --- CẤU HÌNH HẠT NỔ (PARTICLE) ---
  class Particle {
      constructor(x, y, color, vx, vy) {
          this.x = x;
          this.y = y;
          this.color = color;
          // Nếu có vận tốc truyền vào (từ xếp chữ) thì dùng, không thì random (nổ thường)
          if (vx !== undefined && vy !== undefined) {
              this.vx = vx;
              this.vy = vy;
          } else {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 3 + 1;
              this.vx = Math.cos(angle) * speed;
              this.vy = Math.sin(angle) * speed;
          }
          
          this.alpha = 1;
          this.decay = Math.random() * 0.015 + 0.005; // Tốc độ mờ
          this.gravity = GRAVITY;
      }

      update() {
          this.vx *= 0.96; // Ma sát không khí
          this.vy *= 0.96;
          this.vy += this.gravity;
          this.x += this.vx;
          this.y += this.vy;
          this.alpha -= this.decay;
      }

      draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
      }
  }

  // --- HÀM TẠO CHỮ TỪ CÁC HẠT ---
  function createText(text, x, y, arr) {
      const off = document.createElement("canvas");
      off.width = 300;
      off.height = 150;
      const octx = off.getContext("2d");

      octx.fillStyle = "white";
      octx.font = "bold 80px Arial"; // Chữ đậm và to
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, off.width / 2, off.height / 2);

      const img = octx.getImageData(0, 0, off.width, off.height).data;
      
      // Quét qua pixel của chữ để tạo hạt
      // i += 6 nghĩa là giảm độ phân giải để đỡ lag
      for (let i = 0; i < off.width; i += 6) {
          for (let j = 0; j < off.height; j += 6) {
              const idx = (j * off.width + i) * 4;
              if (img[idx + 3] > 150) { // Nếu pixel không trong suốt
                  arr.push(new Particle(
                      x, 
                      y, 
                      `hsl(${Math.random() * 360}, 100%, 60%)`, // Màu hạt cầu vồng
                      (i - off.width / 2) * 0.08, // Tọa độ X bung ra
                      (j - off.height / 2) * 0.08 // Tọa độ Y bung ra
                  ));
              }
          }
      }
  }

  let fireworks = [];

  function loop() {
      // Tạo hiệu ứng đuôi mờ
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'lighter';

      // Tỉ lệ xuất hiện pháo hoa
      if (Math.random() < 0.05) { 
          fireworks.push(new Firework());
      }

      fireworks.forEach((fw, index) => {
          fw.update();
          fw.draw();
          // Xóa pháo hoa đã tắt
          if (fw.exploded && fw.particles.length === 0) {
              fireworks.splice(index, 1);
          }
      });

      requestAnimationFrame(loop);
  }

  // Bắt đầu vòng lặp
  loop();

  // --- QUAN TRỌNG: KÍCH HOẠT ĐẾM NGƯỢC HIỆN THƯ ---
  startLetterTimer();
};


// --- HÀM ĐẾM NGƯỢC HIỆN THƯ (15 GIÂY) ---
function startLetterTimer() {
  setTimeout(() => {
      const fireCanvas = document.getElementById('fireCanvas');
      const letterScene = document.getElementById('letterScene');

      // Làm mờ pháo hoa từ từ
      if(fireCanvas) {
          fireCanvas.style.transition = 'opacity 2s';
          fireCanvas.style.opacity = '0.3';
      }
      
      // Hiện khung thư
      if(letterScene) {
          letterScene.classList.add('show-scene');
      }
  }, 15000); // 15000ms = 15 giây
}


// --- HÀM CLICK MỞ THƯ (ĐƯỢC GỌI TỪ HTML) ---
window.openTheLetter = function() {
  const envelope = document.querySelector('.envelope-container');
  if(envelope) {
      envelope.classList.add('is-open');
  }
  
  // Tăng âm lượng nhạc khi đọc thư
  const sound = document.getElementById('sound');
  if(sound) sound.volume = 1.0;
};