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
 * Validation  
 */
$(() => {
  $('#form').submit((e) => {
    e.preventDefault();
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var email = $('#email').val();
    var phno = $('#phno').val();
    var password = $('#password').val();
    var username = $('#username').val();
    var confirm_password = $('#confirm_password').val();
    $(".error").remove();
    /**
     * FirstName Validation 
     */
    if (firstname.length < 1) {
      $('#firstname').after('<span class="error">This field is required</span>');
    }
    else {
      var regEx = /^[A-Za-z]{3,12}$/;
      var validfnmae = regEx.test(firstname);
      if (!validfnmae) {
        $('#firstname').after('<span class="error">Enter a valid Name</span>');
      }
    }
    /**
     * LastName Validation
     */
    if (lastname.length < 1) {
      $('#lastname').after('<span class="error">This field is required</span>');
    }
    else {
      var regEx = /^[A-Za-z]{0,12}$/;
      var validlnmae = regEx.test(lastname);
      if (!validlnmae) {
        $('#lastname').after('<span class="error">Enter a valid Name</span>');
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
     * Phone Validation
     */
    if (phno.length < 1) {
      $('#phno').after('<span class="error">This field is required</span>');
    }
    else {
      var regEx = /^[0-9]{10}$/;
      var validphno = regEx.test(phno);
      if (!validphno) {
        $('#phno').after('<span class="error">Enter a valid Phone number</span>');
      }
    }
    /**
     * Username validation
     */
    if (username.length < 1) {
      $('#username').after('<span class="error">This field is required</span>');
    }
    /** 
     * Password Validation
     */
    if (password.length < 1) {
      $('#password').after('<span class="error">This field is required</span>');
    }
    else {
      var regEx = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
      var validpswd = regEx.test(password);
      if (!validpswd) {
        $('#password').after('<span class="error">Enter a valid password</span>');
      }
    }
    /**
     * Confirm password validation
     */
    if (confirm_password.length < 1) {
      $('#confirm_password').after('<span class="error">This field is required</span>');
    }
    else {
      var password = $("#password").val();
      var confirmPassword = $("#confirm_password").val();
      if (password != confirmPassword)
        $('#confirm_password').after('<span class="error">Password does not match</span>');
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
