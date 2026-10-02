(function () {
      "use strict";

      /* ============================================
         UTILITAS
         ============================================ */
      function $(id) {
        return document.getElementById(id);
      }

      /* ============================================
         1. SHOW/HIDE KONTEN (ini dipakai dimana dah?)
         ============================================ */
      function initShowBtn() {
        var btn = $("show-btn");
        var konten = $("konten");
        if (!btn || !konten) return;

        btn.addEventListener("click", function () {
          konten.classList.toggle("open");
        });
      }

      /* ============================================
         2. MODAL GAMBAR (Lebih Aman & Terisolasi) (ini dipakai dimana dah?)
         ============================================ */
      function initImageModal() {(function () {
      "use strict";

      /* ============================================
         UTILITAS
         ============================================ */
      function $(id) {
        return document.getElementById(id);
      }

      /* ============================================
         1. SHOW/HIDE KONTEN
         ============================================ */
      function initShowBtn() {
        var btn = $("show-btn");
        var konten = $("konten");
        if (!btn || !konten) return;

        btn.addEventListener("click", function () {
          konten.classList.toggle("open");
        });
      }

      /* ============================================
         2. MODAL GAMBAR (Lebih Aman & Terisolasi)
         ============================================ */
      function initImageModal() {
        var modal = $("imageModal");
        var modalImg = $("modalImg");
        var closeBtn = document.querySelector(".close");

        if (!modal || !modalImg || !closeBtn) return;

        // Hanya target gambar di area armada/konten, bukan semua gambar logo/icon website
        var targetImgs = document.querySelectorAll(".lkl-ar-page img, .unit-mobil img, .zoomable-img");

        // Fallback jika class khusus tidak ada, cari img selain icon/logo
        if (!targetImgs.length) {
          targetImgs = document.querySelectorAll("img:not(.logo):not(.custom-logo)");
        }

        targetImgs.forEach(function (img) {
          if (img.closest("a") || img.closest(".lkl-ar-thumb")) return;
          img.style.cursor = "zoom-in";
          img.addEventListener("click", function () {
            modal.classList.add("active");
            modalImg.src = img.src;
          });
        });

        closeBtn.addEventListener("click", function () {
          modal.classList.remove("active");
        });

        modal.addEventListener("click", function (e) {
          if (e.target === modal) modal.classList.remove("active");
        });

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") modal.classList.remove("active");
        });
      }

      /* ============================================
         3. GALLERY FOTO ARMADA
         ============================================ */
      function initArmadaGallery() {
        var mainImg = $("lkl-ar-main-img");
        var placeholder = $("lkl-ar-photo-placeholder");
        if (!mainImg) return;

        var thumbs = document.querySelectorAll(".lkl-ar-thumb");
        thumbs.forEach(function (thumb) {
          thumb.addEventListener("click", function () {
            var src = thumb.dataset.src;
            if (!src) return;
            mainImg.src = src;
            mainImg.style.display = "block";
            if (placeholder) placeholder.style.display = "none";

            thumbs.forEach(function (t) {
              t.classList.remove("lkl-ar-thumb--active");
            });
            thumb.classList.add("lkl-ar-thumb--active");
          });
        });
      }

      /* ============================================
         4. FAQ ACCORDION ARMADA
         ============================================ */
      function initArmadaFaq() {
        var faqs = document.querySelectorAll(".lkl-ar-faq-q");
        if (!faqs.length) return;

        var answers = document.querySelectorAll(".lkl-ar-faq-a");

        faqs.forEach(function (btn) {
          btn.addEventListener("click", function () {
            var answer = btn.nextElementSibling;
            if (!answer) return;
            var isOpen = answer.classList.contains("lkl-ar-faq-a--open");

            answers.forEach(function (a) {
              a.classList.remove("lkl-ar-faq-a--open");
            });
            faqs.forEach(function (q) {
              q.classList.remove("lkl-ar-faq-q--open");
            });

            if (!isOpen) {
              answer.classList.add("lkl-ar-faq-a--open");
              btn.classList.add("lkl-ar-faq-q--open");
            }
          });
        });
      }

      /* ============================================
         5. SYARAT & KETENTUAN TOGGLE
         ============================================ */
      function initSnkToggle() {
        var btns = document.querySelectorAll(".snk-btn");
        var extraItems = document.querySelectorAll(".lkl-ar-term-item[data-extra]");
        if (!btns.length) return;

        btns.forEach(function (btn) {
          btn.addEventListener("click", function () {
            btns.forEach(function (b) {
              b.classList.remove("active");
            });
            btn.classList.add("active");

            var isLuar = btn.dataset.target === "luar";
            extraItems.forEach(function (el) {
              if (isLuar) {
                el.classList.remove("hide");
              } else {
                el.classList.add("hide");
              }
            });
          });
        });
      }

      /* ============================================
         6. FILTER ARMADA MOBIL (Bebas Layout Thrashing)
         ============================================ */
      function initFleetFilter() {
        var tombolFilter = document.querySelectorAll(".filter-jenis");
        var semuaCard = document.querySelectorAll(".unit-mobil");

        if (!tombolFilter.length || !semuaCard.length) return;

        var DELAY_PER_CARD = 0.07;

        function playFadeUp(cardsVisible) {
          // 1. Reset class sekaligus
          cardsVisible.forEach(function (card) {
            card.classList.remove("fade-up");
            card.style.removeProperty("--fade-delay");
          });

          // 2. Cukup paksa reflow SEKALI di elemen pertama agar animasi restart
          if (cardsVisible.length > 0) {
            void cardsVisible[0].offsetWidth;
          }

          // 3. Pasang delay & trigger animasi
          cardsVisible.forEach(function (card, i) {
            card.style.setProperty("--fade-delay", (i * DELAY_PER_CARD) + "s");
            card.classList.add("fade-up");
          });
        }

        function terapkanFilter(target) {
          var cardVisible = [];

          semuaCard.forEach(function (card) {
            var cocok = target === "semua" || card.classList.contains("jenis-" + target);
            card.style.display = cocok ? "" : "none";
            if (cocok) cardVisible.push(card);
          });

          playFadeUp(cardVisible);
        }

        // Terapkan awal saat load
        terapkanFilter("semua");

        tombolFilter.forEach(function (btn) {
          btn.addEventListener("click", function () {
            tombolFilter.forEach(function (b) {
              b.classList.remove("active");
            });
            btn.classList.add("active");
            terapkanFilter(btn.dataset.target);
          });
        });
      }

      /* ============================================
         BOOTSTRAPPER (Aman untuk WP Rocket / Defer)
         ============================================ */
      function initAll() {
        initShowBtn();
        initImageModal();
        initArmadaGallery();
        initArmadaFaq();
        initSnkToggle();
        initFleetFilter();
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
      } else {
        // Jika DOM sudah selesai dimuat sebelum script dieksekusi
        initAll();
      }
    })();
        var modal = $("imageModal");
        var modalImg = $("modalImg");
        var closeBtn = document.querySelector(".close");

        if (!modal || !modalImg || !closeBtn) return;

        // Hanya target gambar di area armada/konten, bukan semua gambar logo/icon website
        var targetImgs = document.querySelectorAll(".lkl-ar-page img, .unit-mobil img, .zoomable-img");

        // Fallback jika class khusus tidak ada, cari img selain icon/logo
        if (!targetImgs.length) {
          targetImgs = document.querySelectorAll("img:not(.logo):not(.custom-logo)");
        }

        targetImgs.forEach(function (img) {
          if (img.closest("a") || img.closest(".lkl-ar-thumb")) return;
          img.style.cursor = "zoom-in";
          img.addEventListener("click", function () {
            modal.classList.add("active");
            modalImg.src = img.src;
          });
        });

        closeBtn.addEventListener("click", function () {
          modal.classList.remove("active");
        });

        modal.addEventListener("click", function (e) {
          if (e.target === modal) modal.classList.remove("active");
        });

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") modal.classList.remove("active");
        });
      }

      /* ============================================
         3. GALLERY FOTO ARMADA
         ============================================ */
      function initArmadaGallery() {
        var mainImg = $("lkl-ar-main-img");
        var placeholder = $("lkl-ar-photo-placeholder");
        if (!mainImg) return;

        var thumbs = document.querySelectorAll(".lkl-ar-thumb");
        thumbs.forEach(function (thumb) {
          thumb.addEventListener("click", function () {
            var src = thumb.dataset.src;
            if (!src) return;
            mainImg.src = src;
            mainImg.style.display = "block";
            if (placeholder) placeholder.style.display = "none";

            thumbs.forEach(function (t) {
              t.classList.remove("lkl-ar-thumb--active");
            });
            thumb.classList.add("lkl-ar-thumb--active");
          });
        });
      }

      /* ============================================
         4. FAQ ACCORDION ARMADA
         ============================================ */
      function initArmadaFaq() {
        var faqs = document.querySelectorAll(".lkl-ar-faq-q");
        if (!faqs.length) return;

        var answers = document.querySelectorAll(".lkl-ar-faq-a");

        faqs.forEach(function (btn) {
          btn.addEventListener("click", function () {
            var answer = btn.nextElementSibling;
            if (!answer) return;
            var isOpen = answer.classList.contains("lkl-ar-faq-a--open");

            answers.forEach(function (a) {
              a.classList.remove("lkl-ar-faq-a--open");
            });
            faqs.forEach(function (q) {
              q.classList.remove("lkl-ar-faq-q--open");
            });

            if (!isOpen) {
              answer.classList.add("lkl-ar-faq-a--open");
              btn.classList.add("lkl-ar-faq-q--open");
            }
          });
        });
      }

      /* ============================================
         5. SYARAT & KETENTUAN TOGGLE
         ============================================ */
      function initSnkToggle() {
        var btns = document.querySelectorAll(".snk-btn");
        var extraItems = document.querySelectorAll(".lkl-ar-term-item[data-extra]");
        if (!btns.length) return;

        btns.forEach(function (btn) {
          btn.addEventListener("click", function () {
            btns.forEach(function (b) {
              b.classList.remove("active");
            });
            btn.classList.add("active");

            var isLuar = btn.dataset.target === "luar";
            extraItems.forEach(function (el) {
              if (isLuar) {
                el.classList.remove("hide");
              } else {
                el.classList.add("hide");
              }
            });
          });
        });
      }

      /* ============================================
         6. FILTER ARMADA MOBIL (Bebas Layout Thrashing)
         ============================================ */
      function initFleetFilter() {
        var tombolFilter = document.querySelectorAll(".filter-jenis");
        var semuaCard = document.querySelectorAll(".unit-mobil");

        if (!tombolFilter.length || !semuaCard.length) return;

        var DELAY_PER_CARD = 0.07;

        function playFadeUp(cardsVisible) {
          // 1. Reset class sekaligus
          cardsVisible.forEach(function (card) {
            card.classList.remove("fade-up");
            card.style.removeProperty("--fade-delay");
          });

          // 2. Cukup paksa reflow SEKALI di elemen pertama agar animasi restart
          if (cardsVisible.length > 0) {
            void cardsVisible[0].offsetWidth;
          }

          // 3. Pasang delay & trigger animasi
          cardsVisible.forEach(function (card, i) {
            card.style.setProperty("--fade-delay", (i * DELAY_PER_CARD) + "s");
            card.classList.add("fade-up");
          });
        }

        function terapkanFilter(target) {
          var cardVisible = [];

          semuaCard.forEach(function (card) {
            var cocok = target === "semua" || card.classList.contains("jenis-" + target);
            card.style.display = cocok ? "" : "none";
            if (cocok) cardVisible.push(card);
          });

          playFadeUp(cardVisible);
        }

        // Terapkan awal saat load
        terapkanFilter("semua");

        tombolFilter.forEach(function (btn) {
          btn.addEventListener("click", function () {
            tombolFilter.forEach(function (b) {
              b.classList.remove("active");
            });
            btn.classList.add("active");
            terapkanFilter(btn.dataset.target);
          });
        });
      }

      /* ============================================
         BOOTSTRAPPER (Aman untuk WP Rocket / Defer)
         ============================================ */
      function initAll() {
        initShowBtn();
        initImageModal();
        initArmadaGallery();
        initArmadaFaq();
        initSnkToggle();
        initFleetFilter();
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
      } else {
        // Jika DOM sudah selesai dimuat sebelum script dieksekusi
        initAll();
      }
    })();