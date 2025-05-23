document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("languageSelect");
  const keywordInput = document.getElementById("keywordInput");
  const classifyButton = document.getElementById("classifyButton");
  const resultDiv = document.getElementById("result");
  const usageLink = document.getElementById("usageLink");

  // Nội dung cho liên kết "Usage" theo các ngôn ngữ
  const usageLinkTexts = {
    ja: "こちらをクリックして使用方法をご覧ください",
    en: "Click here to see usage instructions",
    vi: "Nhấp vào đây để xem cách xử lý",
    mn: "Энд дарж ашиглах зааврыг үзнэ үү",
    zh: "点击这里查看使用说明",
  };

  // Hàm cập nhật văn bản của usageLink theo ngôn ngữ đã chọn
  function updateUsageLinkText() {
    const selectedLanguage = languageSelect.value;
    usageLink.textContent = usageLinkTexts[selectedLanguage];
  }

  // Cập nhật văn bản khi thay đổi ngôn ngữ
  languageSelect.addEventListener("change", () => {
    updateUsageLinkText();
  });

  // Xử lý sự kiện nhấn nút "検索"
  classifyButton.addEventListener("click", () => {
    const selectedLanguage = languageSelect.value;
    const keyword = keywordInput.value.trim().toLowerCase();

    // Kiểm tra nếu có từ khóa
    if (keyword) {
      // Giả sử bạn có hàm `classifyWaste` trong `classificationFunctions.js` để tìm kiếm kết quả
      const result = classifyWaste(selectedLanguage, keyword); // Tìm kết quả
      const noResultMessages = {
        ja: "結果が見つかりませんでした。",
        en: "No results found.",
        vi: "Không tìm thấy kết quả.",
        mn: "Үр дүн олдсонгүй.",
        zh: "未找到结果。",
      };
      resultDiv.innerText = result || noResultMessages[selectedLanguage]; // Hiển thị kết quả hoặc thông báo không tìm thấy

      if (result) {
        updateUsageLinkText(); // Cập nhật nội dung của usageLink theo ngôn ngữ
        usageLink.style.display = "block"; // Hiển thị liên kết khi có kết quả
      } else {
        usageLink.style.display = "none"; // Ẩn liên kết nếu không có kết quả
      }
    } else {
      const emptyKeywordMessages = {
        ja: "入力してください...",
        en: "Please enter a keyword...",
        vi: "Vui lòng nhập từ khóa...",
        mn: "Түлхүүр үгээ оруулна уу...",
        zh: "请输入关键词...",
      };
      resultDiv.innerText = emptyKeywordMessages[selectedLanguage]; // Hiển thị thông báo khi không nhập từ khóa
      usageLink.style.display = "none"; // Ẩn liên kết nếu không nhập từ khóa
    }
  });
});

let currentSlide = 0;
let slideInterval;

// Hiển thị slide theo chỉ số
function showSlide(index) {
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function startSlideAuto() {
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000); // Chuyển mỗi 3 giây
}

// Khởi động slideshow khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
  startSlideAuto();
});
