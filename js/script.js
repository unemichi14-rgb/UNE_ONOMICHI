//アイコンバー
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
});

//Q&Aアコーディオンメニュー
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

//スライダー（onomichi）
const mainSwiper = new Swiper("#js-onomichi_swiper", {
  // Optional parameters
  // direction: "vertical",
  loop: true,
  speed: 2000, //ループの時間
  width: 100,
  allowTouchMove: false, // スワイプ無効
  autoplay: {
    delay: 0, //途切れなくループ
  },
  //  ループの弾切れを防止
  loopAdditionalSlides: 5,

  spaceBetween: 16,
  centeredSlides: false,
  //  画面に表示したい最大枚数（10枚なら10以上）を指定します
  loopedSlides: 10,

  breakpoints: {
    //900以上の場合
    900: {
      spaceBetween: 20,
      width: 200,
    },
  },

  // If we need pagination
  pagination: {
    el: "#js-onomichi_pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: "#js-onomichi_next",
    prevEl: "#js-onomichi_prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: "#js-onomichi_scrollbar",
  },
});

//モーダル
jQuery(".js-modal-open").on("click", function (e) {
  e.preventDefault();
  // クリックされた要素の data-target 属性を取得（例: "js-sweet-modal"）
  var targetId = jQuery(this).data("target");

  // 対応するモーダルを ID で指定して取得
  // <dialog> 要素のネイティブメソッド showModal() を使うために [0] でDOM要素を取り出す
  var modal = jQuery("#" + targetId)[0];

  if (modal) {
    modal.showModal();
  }
});

//閉じる
jQuery(".js-modal-close").on("click", function (e) {
  e.preventDefault();

  // 一番近い親要素の <dialog> を探して閉じる
  var modal = jQuery(this).closest("dialog")[0];
  if (modal) {
    modal.close();
  }
});

//スムーススクロール(sp)
jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
});

//スムーススクロール(pc)
jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 700;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing", //swing or linear
  );
});

//トップへ戻るボタン非表示
jQuery(window).on("scroll resize", function () {
  var scrollTop = jQuery(window).scrollTop();
  var windowWidth = window.innerWidth;
  var target = jQuery("#js-pagetop");
  var footer = jQuery("#js-footer");

  if (windowWidth <= 900) {
    // 🔥 SP（900px以下）：フッターが画面内に入ったら表示
    var windowHeight = jQuery(window).height();
    var footerTop = footer.offset().top;

    if (scrollTop + windowHeight > footerTop) {
      target.addClass("is-show");
    } else {
      target.removeClass("is-show");
    }
  } else {
    // 💻 PC：300px以上スクロールしたら表示
    if (scrollTop > 300) {
      target.addClass("is-show");
    } else {
      target.removeClass("is-show");
    }
  }
});

//スライダー（おすすめスポット）
const spotSwiper = new Swiper("#js-spot_swiper", {
  // Optional parameters

  loop: true,
  slidesPerView: 1.5273, // ← SPで1.5枚表示
  spaceBetween: 16,
  centeredSlides: true, // ← これが超重要！

  breakpoints: {
    //600px以上の場合
    600: {
      slidesPerView: 2,
    },
    //900px以上の場合
    900: {
      slidesPerView: 2.2,
      centeredSlides: false,
    },
    //1200px以上の場合
    1200: {
      slidesPerView: 3.2, //← 3.2表示
      spaceBetween: 32,
      centeredSlides: false,
    },
  },
  // If we need pagination
  pagination: {
    el: "#js-spot_pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: "#js-spot_next",
    prevEl: "#js-spot_prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: "#js-spot_scrollbar",
  },
});

//フォームエラー
$(function () {
  const $submitBtn = $(".button");
  const $privacyCheck = $('[name="your-privacy"]');

  // --- 共通関数 ---
  function addError($el) {
    $el.addClass("is-error");
    // 親のform_fieldにもクラスをつける（ラベルの色を変えるため）
    $el.closest(".form_field").addClass("is-error");
  }

  function deleteError($el) {
    $el.removeClass("is-error");
    // 親のform_fieldからクラスを消す
    $el.closest(".form_field").removeClass("is-error");
  }

  // --- A. リアルタイム監視 ---

  $(".form-select").on("change", function () {
    if ($(this).val() !== "") {
      deleteError($(this));
    } else {
      addError($(this));
    }
  });

  $(".form-text, .form-textarea").on("input blur", function () {
    if ($(this).val().trim() !== "") {
      deleteError($(this));
    }
  });

  $privacyCheck.on("change", function () {
    if ($(this).is(":checked")) {
      $(".form_checkbox").removeClass("is-error");
    } else {
      $(".form_checkbox").addClass("is-error");
    }
  });

  // --- B. 送信ボタンクリック時の一括チェック ---

  $submitBtn.on("click", function (e) {
    let hasError = false;

    $("[required]").each(function () {
      const $this = $(this);
      if ($this.is(":radio") || $this.is(":checkbox")) return true;

      if ($this.val().trim() === "") {
        addError($this);
        hasError = true;
      } else {
        deleteError($this);
      }
    });

    // ラジオボタン判定
    const $radioGroup = $(".form-radio_input");
    if ($radioGroup.length > 0) {
      const name = $radioGroup.attr("name");
      if ($(`input[name="${name}"]:checked`).length === 0) {
        $(".form-field_radios").addClass("is-error");
        // ラジオボタンの親要素に対してもis-errorを付与
        $radioGroup.closest(".form_field").addClass("is-error");
        hasError = true;
      } else {
        $(".form-field_radios").removeClass("is-error");
        $radioGroup.closest(".form_field").removeClass("is-error");
      }
    }
  });
});

//送信完了アラート
$("form").submit(function () {
  alert("送信しました！");
});
