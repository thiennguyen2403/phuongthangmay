document.addEventListener("DOMContentLoaded", function () {
  const projectMoreBtn = document.querySelector(".project-more-btn");
  const projectGrid = document.querySelector(".project-stack-grid");

  if (!projectMoreBtn || !projectGrid) return;

  projectMoreBtn.addEventListener("click", function () {
    projectGrid.classList.toggle("is-expanded");

    projectMoreBtn.textContent = projectGrid.classList.contains("is-expanded")
      ? "Thu gọn"
      : "Xem thêm công trình";
  });
});

     const deadline = new Date("2026-06-07T23:59:59+07:00");
     console.log(deadline);
      deadline.setDate(deadline.getDate() + 3);

      function pad(num) {
        return String(num).padStart(2, "0");
      }

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = deadline.getTime() - now;

        function setCountdownText(id, value) {
          const element = document.getElementById(id);
          if (element) element.textContent = value;
        }

        if (distance <= 0) {
          setCountdownText("days", "00");
          setCountdownText("hours", "00");
          setCountdownText("minutes", "00");
          setCountdownText("seconds", "00");
          setCountdownText("promoDays", "00");
          setCountdownText("promoHours", "00");
          setCountdownText("promoMinutes", "00");
          setCountdownText("promoSeconds", "00");
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        setCountdownText("days", pad(days));
        setCountdownText("hours", pad(hours));
        setCountdownText("minutes", pad(minutes));
        setCountdownText("seconds", pad(seconds));

        setCountdownText("promoDays", pad(days));
        setCountdownText("promoHours", pad(hours));
        setCountdownText("promoMinutes", pad(minutes));
        setCountdownText("promoSeconds", pad(seconds));
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);

      const GOOGLE_SHEET_WEB_APP_URL =
        "https://script.google.com/macros/s/AKfycbzLdYzwtkCo4lsjNWnMUJCvEZPCvQ4pepbnnFTYsbdvVfIf3-0ivpT1xjcWvmkHNfjj/exec";

      function clearFormErrors(form) {
  form.querySelectorAll(".input-error").forEach(function (field) {
    field.classList.remove("input-error");
  });

  form.querySelectorAll(".field-error").forEach(function (message) {
    message.remove();
  });
}

function showFieldError(field, message) {
  field.classList.add("input-error");

  const error = document.createElement("div");
  error.className = "field-error";
  error.textContent = message;

  field.insertAdjacentElement("afterend", error);
}

function normalizePhone(phone) {
  return phone.replace(/[\s.-]/g, "");
}

function isValidVietnamPhone(phone) {
  const value = normalizePhone(phone);

  // Hợp lệ: 0963087385 hoặc +84963087385
  return /^(0(3|5|7|8|9)[0-9]{8}|\+84(3|5|7|8|9)[0-9]{8})$/.test(value);
}

function validateLeadForm(form) {
  clearFormErrors(form);

  let isValid = true;

  const hoTen = form.querySelector('[name="hoTen"]');
  const soDienThoai = form.querySelector('[name="soDienThoai"]');
  const loaiCongTrinh = form.querySelector('[name="loaiCongTrinh"]');
  const nhuCau = form.querySelector('[name="nhuCau"]');

  if (!hoTen.value.trim()) {
    showFieldError(hoTen, "Vui lòng nhập họ và tên.");
    isValid = false;
  }

  if (!soDienThoai.value.trim()) {
    showFieldError(soDienThoai, "Vui lòng nhập số điện thoại/Zalo.");
    isValid = false;
  } else if (!isValidVietnamPhone(soDienThoai.value)) {
    showFieldError(
      soDienThoai,
      "Số điện thoại chưa đúng. Ví dụ: 0963087385 hoặc +84963087385."
    );
    isValid = false;
  }

  if (!loaiCongTrinh.value) {
    showFieldError(loaiCongTrinh, "Vui lòng chọn loại công trình.");
    isValid = false;
  }

  if (!nhuCau.value) {
    showFieldError(nhuCau, "Vui lòng chọn nhu cầu của bạn.");
    isValid = false;
  }

  if (!isValid) {
    const firstError = form.querySelector(".input-error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
  }

  return isValid;
}

document
  .getElementById("leadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = document.getElementById("submitButton");
    const formStatus = document.getElementById("formStatus");

    formStatus.textContent = "";

    if (!validateLeadForm(form)) {
      formStatus.style.color = "#d92d20";
      formStatus.textContent = "Vui lòng kiểm tra lại thông tin bắt buộc.";
      return;
    }

    const formData = new FormData(form);

    formData.set(
      "soDienThoai",
      normalizePhone(form.querySelector('[name="soDienThoai"]').value)
    );

    formData.append("thoiGianGui", new Date().toLocaleString("vi-VN"));
    formData.append("trangHienTai", window.location.href);

    submitButton.disabled = true;
    submitButton.textContent = "Đang gửi thông tin...";

    try {
      await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset();
      clearFormErrors(form);
      formStatus.style.color = "#087443";
      formStatus.textContent =
        "Cảm ơn bạn! Phương Thang Máy sẽ liên hệ tư vấn sớm.";
    } catch (error) {
      formStatus.style.color = "#d92d20";
      formStatus.textContent =
        "Chưa gửi được thông tin. Vui lòng gọi/Zalo trực tiếp hoặc thử lại sau.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Đăng ký tư vấn miễn phí";
    }
  });

      function initProjectModal() {
        const modal = document.getElementById("projectModal");
        if (!modal) return;

        const img = document.getElementById("projectModalImg");
        const title = document.getElementById("projectModalTitle");
        const shortText = document.getElementById("projectModalShort");
        const detail = document.getElementById("projectModalDetail");
        const quote = document.getElementById("projectModalQuote");
        const owner = document.getElementById("projectModalOwner");

        function openModal(trigger) {
          img.src = trigger.dataset.img || "";
          img.alt = trigger.dataset.title || "Công trình thang máy";
          title.textContent = trigger.dataset.title || "Công trình thang máy";
          shortText.textContent = trigger.dataset.short || "";
         const detailItems = (trigger.dataset.detail || "")
  .split("|")
  .map(item => item.trim())
  .filter(Boolean);

detail.innerHTML = detailItems.length
  ? `<ul class="project-detail-list">${detailItems.map(item => `<li>${item}</li>`).join("")}</ul>`
  : "";
          quote.textContent = trigger.dataset.quote || "";
          owner.textContent = trigger.dataset.owner || "";
          modal.classList.add("is-open");
          modal.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        }

        function closeModal() {
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        }

        document.querySelectorAll(".project-trigger").forEach(function (trigger) {
          trigger.addEventListener("click", function () {
            openModal(trigger);
          });
          trigger.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openModal(trigger);
            }
          });
        });

        document.querySelectorAll("[data-close-project-modal]").forEach(function (closeButton) {
          closeButton.addEventListener("click", closeModal);
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
        });
      }

      function initVideoMoreButton() {
        const videoList = document.getElementById("videoList");
        const button = document.getElementById("videoMoreBtn");
        if (!videoList || !button) return;

        button.addEventListener("click", function () {
          const expanded = videoList.classList.toggle("is-expanded");
          button.textContent = expanded ? "Thu gọn video" : "Xem thêm video";
        });
      }
function initHeroDesktopDrag() {
  const track = document.querySelector(".hero-slider-track");
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = false;

  track.addEventListener("mousedown", function (e) {
    isDown = true;
    moved = false;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = "grabbing";
  });

  track.addEventListener("mouseleave", function () {
    isDown = false;
    track.style.cursor = "";
  });

  track.addEventListener("mouseup", function () {
    isDown = false;
    track.style.cursor = "";
  });

  track.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (Math.abs(walk) > 6) moved = true;
    track.scrollLeft = scrollLeft - walk;
  });

  document.querySelectorAll(".hero-slide").forEach(function (slide) {
    slide.addEventListener("click", function (e) {
      if (moved) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  });
}

initHeroDesktopDrag();
      initProjectModal();
      initVideoMoreButton();

 