AOS.init({
  duration: 800,
  easing: "slide",
  once: false,
});

jQuery(document).ready(function ($) {
  "use strict";

  $(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  var sitePlusMinus = function () {
    $(".js-btn-minus").on("click", function (e) {
      e.preventDefault();
      if ($(this).closest(".input-group").find(".form-control").val() != 0) {
        $(this)
          .closest(".input-group")
          .find(".form-control")
          .val(
            parseInt(
              $(this).closest(".input-group").find(".form-control").val()
            ) - 1
          );
      } else {
        $(this).closest(".input-group").find(".form-control").val(parseInt(0));
      }
    });
    $(".js-btn-plus").on("click", function (e) {
      e.preventDefault();
      $(this)
        .closest(".input-group")
        .find(".form-control")
        .val(
          parseInt(
            $(this).closest(".input-group").find(".form-control").val()
          ) + 1
        );
    });
  };
  // sitePlusMinus();

  var siteSliderRange = function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 500,
      values: [75, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  };
  // siteSliderRange();

  var siteCarousel = function () {
    if ($(".nonloop-block-13").length > 0) {
      $(".nonloop-block-13").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 0,
        margin: 0,
        smartSpeed: 1000,
        autoplay: true,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">',
        ],
        responsive: {
          600: {
            margin: 0,
            nav: true,
            items: 2,
          },
          1000: {
            margin: 0,
            stagePadding: 0,
            nav: true,
            items: 2,
          },
          1200: {
            margin: 0,
            stagePadding: 0,
            nav: true,
            items: 3,
          },
        },
      });
    }

    $(".slide-one-item").owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      smartSpeed: 1500,
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      nav: true,
      navText: [
        '<span class="icon-keyboard_arrow_left">',
        '<span class="icon-keyboard_arrow_right">',
      ],
    });
  };
  siteCarousel();

  var siteCountDown = function () {
    $("#date-countdown").countdown("2020/10/10", function (event) {
      var $this = $(this).html(
        event.strftime(
          "" +
            '<span class="countdown-block"><span class="label">%w</span> weeks </span>' +
            '<span class="countdown-block"><span class="label">%d</span> days </span>' +
            '<span class="countdown-block"><span class="label">%H</span> hr </span>' +
            '<span class="countdown-block"><span class="label">%M</span> min </span>' +
            '<span class="countdown-block"><span class="label">%S</span> sec</span>'
        )
      );
    });
  };
  // siteCountDown();

  var siteDatePicker = function () {
    if ($(".datepicker").length > 0) {
      $(".datepicker").datepicker();
    }
  };
  // siteDatePicker();

  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  // navigation
  var OnePageNavigation = function () {
    var navToggler = $(".site-menu-toggle");

    $("body").on(
      "click",
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']",
      function (e) {
        e.preventDefault();

        var hash = this.hash;

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top - 50,
          },
          600,
          "easeInOutExpo",
          function () {
            // window.location.hash = hash;
          }
        );
      }
    );
  };
  OnePageNavigation();

  var siteScroll = function () {
    $(window).scroll(function () {
      var st = $(this).scrollTop();

      if (st > 100) {
        $(".js-sticky-header").addClass("shrink");
      } else {
        $(".js-sticky-header").removeClass("shrink");
      }
    });
  };
  siteScroll();

  //   this function adds animation to stats
  var counter = function () {
    $(".stats_counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(
            ","
          );
          $(".number > span").each(function () {
            var $this = $(this),
              num = $this.data("number");
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              3000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };

  // graphing

  const host = `http://localhost:8080/api/v1`;

  async function drawGraph(slotId, departmentId) {
    const slot = document.getElementById(slotId);
    // container
    const container = document.createElement("div");
    container.classList.add("row");

    // container header
    // const containerHeader = document.createElement("h3");
    // containerHeader.classList.add("text-center", "m-5", "col-12", "text-black");

    // tickets
    const ticketcanvas = document.createElement("canvas");
    ticketcanvas.classList.add("col-12", "col-md-6", "col-lg-6");

    // rating
    const likecanvas = document.createElement("canvas");
    likecanvas.classList.add("col-12", "col-md-6", "col-lg-6");

    // link to category stat page
    const linkToCategory = document.createElement("h3");
    linkToCategory.classList.add("text-center", "col-12", "mt-5");
    linkToCategory.innerHTML = `<a href="more_stats.html#${
      departmentId || ""
    }">Подробнее</a>`;

    // fetching department data
    const departments = await fetch(`${host}/departments`);
    let data = await departments.json();
    data = data.data.filter((department) => department.id === departmentId);
    data = data.length <= 0 ? undefined : data[0];
    console.log(data);
    const isMaster = !data ? true : false;

    // fetching ticket stats
    const tickets = await fetch(`${host}/count_tickets/${departmentId || ""}`);
    const stat_data = await tickets.json();
    const chartTicket = new Chart(ticketcanvas, {
      // type: "doughnut",
      type: "pie",

      data: {
        labels: [
          `${isMaster ? "Обращений поступило" : "Открытые"}(${stat_data.open})`,
          `${isMaster ? "Проблем решено" : "Закрытые "}  (${stat_data.closed})`,
        ],
        datasets: [
          {
            label: "Всего",
            data: [stat_data.open, stat_data.closed],
            backgroundColor: ["#157cea", "#777"],
          },
        ],
      },

      options: {
        responsive: true,
        legend: {
          position: "right",
          labels: {
            fontSize: 16,
            fontColor: "#000",
          },
        },
        title: {
          display: true,
          text: "ОБРАЩЕНИЯ ГРАЖДАН",
          fontSize: isMaster ? 24 : 18,
          fontColor: "#000",
          padding: 20,
        },
      },
    });

    const like = (
      (stat_data.like / (stat_data.like + stat_data.dislike)) *
      100
    ).toFixed(1);
    const dislike = (
      (stat_data.dislike / (stat_data.like + stat_data.dislike)) *
      100
    ).toFixed(1);

    const chartLike = new Chart(likecanvas, {
      type: "pie",

      data: {
        labels: [
          `Лайк ${isNaN(like) ? 0 : like}%`,
          `Дизлайк ${isNaN(dislike) ? 0 : dislike}%`,
        ],
        datasets: [
          {
            label: "Всего",
            data: [like, dislike],
            backgroundColor: ["#016936", "#fc0202"],
          },
        ],
      },

      options: {
        responsive: true,
        legend: {
          position: "right",
          labels: {
            fontSize: 16,
            fontColor: "#000",
          },
        },
        title: {
          display: true,
          text: "РЕЙТИНГ",
          fontSize: isMaster ? 24 : 18,
          fontColor: "#000",
          padding: 20,
          fontColor: "#000",
        },
      },
    });

    // containerHeader.innerHTML = !isMaster
    //   ? data.name.ru
    //   : "Мангистауская область";
    // container.append(containerHeader);

    container.appendChild(ticketcanvas);
    container.appendChild(likecanvas);
    container.appendChild(linkToCategory);
    // appending to DOM
    slot.appendChild(container);
  }

  drawGraph("slot"); // All
  drawGraph("slot1", 1); // All
  drawGraph("slot2", 2); // All
  drawGraph("slot3", 3); // All
  drawGraph("slot4", 4); // All
  drawGraph("slot5", 5); // All
  drawGraph("slot6", 6); // All
  drawGraph("slot7", 7); // All
  drawGraph("slot8", 8); // All

  // graph category

  (async function () {
    const hash = location.hash.split("#")[1];
    const id = parseInt(hash);

    const category_graph = document.getElementById("category_graph");
    const response = await fetch(`${host}/category/${isNaN(id) ? "" : id}`);
    const data = await response.json();
    console.log(data);

    const labels = [];
    const datas = [];
    data.map((d) => {
      labels.push(`  ${d.category_name} (${d.length})`);
      datas.push(d.length);
    });

    new Chart(category_graph, {
      type: "horizontalBar",

      data: {
        labels: labels,
        datasets: [
          {
            label: "Категории",
            data: datas,
            backgroundColor: [
              "rgba(72, 117, 73, .5)",
              "rgba(171, 186, 130, .5)",
              "rgba(167, 181, 183, .5)",
              "rgba(3, 124, 135, .5)",
              "rgba(16, 32, 32, .5)",
              "rgba(37, 31, 16, .5)",
              "rgba(94, 107, 52, .5)",
              "rgba(170, 187, 168, .5)",
              "rgba(193, 199, 41, .5)",
              "rgba(116, 133, 1, .5)",
              "rgba(60, 91, 116, .5)",
              "rgba(255, 0, 0, .5)",
            ],
          },
        ],
      },

      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 16,
                fontColor: "#000",
                mirror: true,
              },
            },
          ],
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            fontSize: 16,
            fontColor: "#000",
          },
        },
      },
    });
  })();
});
