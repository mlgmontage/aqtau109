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

  // fetch data from api to stats
  const host = `http://localhost:8080/api/v1`;

  const api_url = `${host}/count_tickets`;
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      $("#closedTicket").data("number", data.closed);
      $("#sumTicket").data("number", data.all);

      // calculating percentage
      const percentage = (data.closed / data.all) * 100;

      $("#percentageOfTickets").data("number", percentage);

      // rating of likes && dislikes

      const sumOfLikesAndDislikes = data.like + data.dislike;
      const likes = (data.like / sumOfLikesAndDislikes) * 100;
      const dislikes = (data.dislike / sumOfLikesAndDislikes) * 100;

      $("#likes").data("number", likes);
      $("#dislikes").data("number", dislikes);

      counter();
    });

  // graphing
  const graphArea = document.getElementById("graphArea");

  // All
  fetch(`${host}/count_tickets`)
    .then((response) => response.json())
    .then((data) => {
      drawTotalGraph(data);
    });

  // iterating through individual departments
  fetch(`${host}/departments`)
    .then((response) => response.json())
    .then((jsonData) => {
      const data = jsonData.data;
      for (let i = 0; i < data.length; i++) {
        drawIndividual(data[i]);
      }
    });

  function drawIndividual(data) {
    const container = document.createElement("div");
    container.classList.add("row");
    const ticketcanvas = document.createElement("canvas");
    ticketcanvas.classList.add("col-6");
    const likecanvas = document.createElement("canvas");
    likecanvas.classList.add("col-6");

    const ticket_ctx = ticketcanvas.getContext("2d");
    const like_ctx = likecanvas.getContext("2d");

    fetch(`${host}/count_tickets/${data.id}`)
      .then((response) => response.json())
      .then((stat_data) => {
        const chartTicket = new Chart(ticket_ctx, {
          // type: "doughnut",
          type: "polarArea",

          data: {
            labels: ["Open", "Closed"],
            datasets: [
              {
                label: "Всего",
                data: [stat_data.open, stat_data.closed],
                backgroundColor: ["#36a2eb", "#cc65fe"],
              },
            ],
          },

          options: {
            responsive: true,
            legend: {
              position: "right",
              labels: {
                fontSize: 16,
              },
            },
            title: {
              display: true,
              text: data.name.ru,
              fontSize: 24,
              padding: 20,
            },
          },
        });

        const chartLike = new Chart(like_ctx, {
          // type: "doughnut",
          type: "polarArea",

          data: {
            labels: ["Like", "Dislike"],
            datasets: [
              {
                label: "Всего",
                data: [stat_data.like, stat_data.dislike],
                backgroundColor: ["#ff6384", "#36a2eb"],
              },
            ],
          },

          options: {
            responsive: true,
            legend: {
              position: "right",
              labels: {
                fontSize: 16,
              },
            },
            title: {
              display: true,
              text: data.name.ru,
              fontSize: 24,
              padding: 20,
            },
          },
        });
      });

    container.appendChild(ticketcanvas);
    container.appendChild(likecanvas);
    // appending to DOM
    graphArea.appendChild(container);
  }

  // draw graph total stat
  function drawTotalGraph(stat_data) {
    const ctx = document.getElementById("graph").getContext("2d");

    const chart = new Chart(ctx, {
      // type: "doughnut",
      type: "polarArea",

      data: {
        labels: ["All", "Open", "Closed", "Like", "Dislike"],
        datasets: [
          {
            label: "Всего",
            data: [
              stat_data.all,
              stat_data.open,
              stat_data.closed,
              stat_data.like,
              stat_data.dislike,
            ],
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#cc65fe",
              "#ffce56",
              "#008080",
            ],
          },
        ],
      },

      options: {
        responsive: true,
        legend: {
          position: "right",
          labels: {
            fontSize: 16,
          },
        },
        title: {
          display: true,
          text: "all",
          fontSize: 24,
          padding: 20,
        },
      },
    });
  }
});
