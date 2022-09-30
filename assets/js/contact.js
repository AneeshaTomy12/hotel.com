(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }
  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)
  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>" :
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });
})()

/**
 *Validation 
 */
$(() => {
  $('#contact-form').submit((e) => {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();
    $(".error").remove();
    /**
     * FirstName Validation
     */
    if (name.length < 1) {
      $('#name').after('<span class="error">This field is required</span>');
    }
    else {
      var regEx = /(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/g;
      var validnmae = regEx.test(name);
      if (!validnmae) {
        $('#name').after('<span class="error">Enter a valid Name</span>');
      }
    }
    /**
     * Email Validation
     */
    if (email.length < 1) {
      $('#email').after('<span class="error">This field is required</span>');
    }
    else {
      var regEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var validEmail = regEx.test(email);
      if (!validEmail) {
        $('#email').after('<span class="error">Enter a valid email</span>');
      }
    }
    /**
     * Subject Validation
     */
    if (subject.length < 1) {
      $('#subject').after('<span class="error">This field is required</span>');
    }
    /**
     * Username validation 
     */
    if (message.length < 1) {
      $('#message').after('<span class="error">This field is required</span>');
    }

    // alert
    $("#submit").click(function () {
      if ($(".error").remove() == true) {
        alert("Registration Sucessfull");
        location.href = 'login.html';
      }

    })
  })
})
// /**
//  * Google Map
//  */
// function myMap() {
//   const myLatLng = { lat: 8.5567, lng:76.8821 };
//   var mapProp = {
//     // center:new google.maps.LatLng(8.4875,76.9525),
//     center: myLatLng,
//     zoom: 15,
//   };
  
//   var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }
