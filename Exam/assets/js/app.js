'use strict';
!function() {
  /**
   * @param {string} i
   * @return {undefined}
   */
  function load(i) {
    if (document.getElementById("header-lang-img")) {
      if ("en" == i) {
        /** @type {string} */
        document.getElementById("header-lang-img").src = "assets/images/flags/us.svg";
      } else {
        if ("sp" == i) {
          /** @type {string} */
          document.getElementById("header-lang-img").src = "assets/images/flags/spain.svg";
        } else {
          if ("gr" == i) {
            /** @type {string} */
            document.getElementById("header-lang-img").src = "assets/images/flags/germany.svg";
          } else {
            if ("it" == i) {
              /** @type {string} */
              document.getElementById("header-lang-img").src = "assets/images/flags/italy.svg";
            } else {
              if ("ru" == i) {
                /** @type {string} */
                document.getElementById("header-lang-img").src = "assets/images/flags/russia.svg";
              } else {
                if ("ch" == i) {
                  /** @type {string} */
                  document.getElementById("header-lang-img").src = "assets/images/flags/china.svg";
                } else {
                  if ("fr" == i) {
                    /** @type {string} */
                    document.getElementById("header-lang-img").src = "assets/images/flags/french.svg";
                  }
                }
              }
            }
          }
        }
      }
      localStorage.setItem("language", i);
      result = localStorage.getItem("language");
      (function() {
        if (null == result) {
          load(item);
        }
        /** @type {!XMLHttpRequest} */
        var requestForData = new XMLHttpRequest;
        requestForData.open("GET", "assets/lang/" + result + ".json");
        /**
         * @return {undefined}
         */
        requestForData.onreadystatechange = function() {
          var data;
          if (4 === this.readyState && 200 === this.status) {
            /** @type {*} */
            data = JSON.parse(this.responseText);
            Object.keys(data).forEach(function(index) {
              document.querySelectorAll("[data-key='" + index + "']").forEach(function(param) {
                param.textContent = data[index];
              });
            });
          }
        };
        requestForData.send();
      })();
    }
  }
  /**
   * @return {undefined}
   */
  function collapse() {
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      document.querySelectorAll(".navbar-nav .collapse").forEach(function(t) {
        var text = new bootstrap.Collapse(t, {
          toggle : false
        });
        t.addEventListener("show.bs.collapse", function(event) {
          event.stopPropagation();
          /** @type {(Element|null)} */
          event = t.parentElement.closest(".collapse");
          if (event) {
            event.querySelectorAll(".collapse").forEach(function(selector) {
              selector = bootstrap.Collapse.getInstance(selector);
              if (selector !== text) {
                selector.hide();
              }
            });
          } else {
            (function(e) {
              /** @type {!Array} */
              var hash_settings = [];
              /** @type {(Node|null)} */
              var i = e.parentNode.firstChild;
              for (; i;) {
                if (1 === i.nodeType && i !== e) {
                  hash_settings.push(i);
                }
                /** @type {(Node|null)} */
                i = i.nextSibling;
              }
              return hash_settings;
            })(t.parentElement).forEach(function(e) {
              if (2 < e.childNodes.length) {
                e.firstElementChild.setAttribute("aria-expanded", "false");
              }
              e.querySelectorAll("*[id]").forEach(function(e) {
                e.classList.remove("show");
                if (2 < e.childNodes.length) {
                  e.querySelectorAll("ul li a").forEach(function(triggerElement) {
                    if (triggerElement.hasAttribute("aria-expanded")) {
                      triggerElement.setAttribute("aria-expanded", "false");
                    }
                  });
                }
              });
            });
          }
        });
        t.addEventListener("hide.bs.collapse", function(event) {
          event.stopPropagation();
          t.querySelectorAll(".collapse").forEach(function(vpId) {
            childCollapseInstance = bootstrap.Collapse.getInstance(vpId);
            childCollapseInstance.hide();
          });
        });
      });
    }
  }
  /**
   * @return {undefined}
   */
  function init() {
    var tr;
    var control;
    /** @type {string} */
    var layout_id = document.documentElement.getAttribute("data-layout");
    var b = sessionStorage.getItem("defaultAttribute");
    /** @type {*} */
    b = JSON.parse(b);
    if (!(!b || "twocolumn" != layout_id && "twocolumn" != b["data-layout"])) {
      /** @type {string} */
      document.querySelector(".navbar-menu").innerHTML = inactiveButton;
      /** @type {string} */
      (tr = document.createElement("ul")).innerHTML = '<a href="#" class="logo"><img src="assets/images/logo-sm.png" alt="" height="22"></a>';
      document.getElementById("navbar-nav").querySelectorAll(".menu-link").forEach(function(e) {
        /** @type {string} */
        tr.className = "twocolumn-iconview";
        /** @type {!Element} */
        var group = document.createElement("li");
        /** @type {!Element} */
        var panel = e;
        panel.querySelectorAll("span").forEach(function(e) {
          e.classList.add("d-none");
        });
        if (e.parentElement.classList.contains("twocolumn-item-show")) {
          e.classList.add("active");
        }
        group.appendChild(panel);
        tr.appendChild(group);
        if (panel.classList.contains("nav-link")) {
          panel.classList.replace("nav-link", "nav-icon");
        }
        panel.classList.remove("collapsed", "menu-link");
      });
      if (b = (b = "/" == location.pathname ? "index.php" : location.pathname.substring(1)).substring(b.lastIndexOf("/") + 1)) {
        if (!!(b = document.getElementById("navbar-nav").querySelector('[href="' + b + '"]'))) {
          if (control = b.closest(".collapse.menu-dropdown")) {
            control.classList.add("show");
            control.parentElement.children[0].classList.add("active");
            control.parentElement.children[0].setAttribute("aria-expanded", "true");
            if (control.parentElement.closest(".collapse.menu-dropdown")) {
              control.parentElement.closest(".collapse").classList.add("show");
              if (control.parentElement.closest(".collapse").previousElementSibling) {
                control.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }
      /** @type {string} */
      document.getElementById("two-column-menu").innerHTML = tr.outerHTML;
      document.querySelector("#two-column-menu ul").querySelectorAll("li a").forEach(function(a) {
        /** @type {string} */
        var tagName = (tagName = "/" == location.pathname ? "index.php" : location.pathname.substring(1)).substring(tagName.lastIndexOf("/") + 1);
        a.addEventListener("click", function(obj) {
          var children;
          if ((tagName != "/" + a.getAttribute("href") || a.getAttribute("data-bs-toggle")) && document.body.classList.contains("twocolumn-panel")) {
            document.body.classList.remove("twocolumn-panel");
          }
          document.getElementById("navbar-nav").classList.remove("twocolumn-nav-hide");
          document.querySelector(".hamburger-icon").classList.remove("open");
          if (obj.target && obj.target.matches("a.nav-icon") || obj.target && obj.target.matches("i")) {
            if (null !== document.querySelector("#two-column-menu ul .nav-icon.active")) {
              document.querySelector("#two-column-menu ul .nav-icon.active").classList.remove("active");
            }
            (obj.target.matches("i") ? obj.target.closest("a") : obj.target).classList.add("active");
            if (0 < (children = document.getElementsByClassName("twocolumn-item-show")).length) {
              children[0].classList.remove("twocolumn-item-show");
            }
            obj = (obj.target.matches("i") ? obj.target.closest("a") : obj.target).getAttribute("href").slice(1);
            if (document.getElementById(obj)) {
              document.getElementById(obj).parentElement.classList.add("twocolumn-item-show");
            }
          }
        });
        if (!(tagName != "/" + a.getAttribute("href") || a.getAttribute("data-bs-toggle"))) {
          a.classList.add("active");
          document.getElementById("navbar-nav").classList.add("twocolumn-nav-hide");
          if (document.querySelector(".hamburger-icon")) {
            document.querySelector(".hamburger-icon").classList.add("open");
          }
        }
      });
      if ("horizontal" !== document.documentElement.getAttribute("data-layout")) {
        if (control = new SimpleBar(document.getElementById("navbar-nav"))) {
          control.getContentElement();
        }
        if (control = new SimpleBar(document.getElementsByClassName("twocolumn-iconview")[0])) {
          control.getContentElement();
        }
      }
    }
  }
  /**
   * @param {!Element} elem
   * @return {?}
   */
  function elementInViewport(elem) {
    if (elem) {
      var top = elem.offsetTop;
      var left = elem.offsetLeft;
      var width = elem.offsetWidth;
      var height = elem.offsetHeight;
      if (elem.offsetParent) {
        for (; elem.offsetParent;) {
          top = top + (elem = elem.offsetParent).offsetTop;
          left = left + elem.offsetLeft;
        }
      }
      return top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth;
    }
  }
  /**
   * @return {undefined}
   */
  function _init() {
    if ("vertical" == document.documentElement.getAttribute("data-layout")) {
      /** @type {string} */
      document.getElementById("two-column-menu").innerHTML = "";
      /** @type {string} */
      document.querySelector(".navbar-menu").innerHTML = inactiveButton;
      document.getElementById("scrollbar").setAttribute("data-simplebar", "");
      document.getElementById("navbar-nav").setAttribute("data-simplebar", "");
      document.getElementById("scrollbar").classList.add("h-100");
    }
    if ("twocolumn" == document.documentElement.getAttribute("data-layout")) {
      document.getElementById("scrollbar").removeAttribute("data-simplebar");
      document.getElementById("scrollbar").classList.remove("h-100");
    }
    if ("horizontal" == document.documentElement.getAttribute("data-layout")) {
      show();
    }
  }
  /**
   * @return {undefined}
   */
  function update() {
    feather.replace();
    /** @type {number} */
    var targetWidth = document.documentElement.clientWidth;
    if (targetWidth < 1025 && 767 < targetWidth) {
      document.body.classList.remove("twocolumn-panel");
      if ("twocolumn" == sessionStorage.getItem("data-layout")) {
        document.documentElement.setAttribute("data-layout", "twocolumn");
        if (document.getElementById("customizer-layout03")) {
          document.getElementById("customizer-layout03").click();
        }
        init();
        call();
        collapse();
      }
      if ("vertical" == sessionStorage.getItem("data-layout")) {
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }
      if (document.querySelector(".hamburger-icon")) {
        document.querySelector(".hamburger-icon").classList.add("open");
      }
    } else {
      if (1025 <= targetWidth) {
        document.body.classList.remove("twocolumn-panel");
        if ("twocolumn" == sessionStorage.getItem("data-layout")) {
          document.documentElement.setAttribute("data-layout", "twocolumn");
          if (document.getElementById("customizer-layout03")) {
            document.getElementById("customizer-layout03").click();
          }
          init();
          call();
          collapse();
        }
        if ("vertical" == sessionStorage.getItem("data-layout")) {
          document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
        }
        if (document.querySelector(".hamburger-icon")) {
          document.querySelector(".hamburger-icon").classList.remove("open");
        }
      } else {
        if (targetWidth <= 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.body.classList.add("twocolumn-panel");
          if ("twocolumn" == sessionStorage.getItem("data-layout")) {
            document.documentElement.setAttribute("data-layout", "vertical");
            draw("vertical");
            collapse();
          }
          if ("horizontal" != sessionStorage.getItem("data-layout")) {
            document.documentElement.setAttribute("data-sidebar-size", "lg");
          }
          if (document.querySelector(".hamburger-icon")) {
            document.querySelector(".hamburger-icon").classList.add("open");
          }
        }
      }
    }
    document.querySelectorAll("#navbar-nav > li.nav-item").forEach(function(e) {
      e.addEventListener("click", drop.bind(this), false);
      e.addEventListener("mouseover", drop.bind(this), false);
    });
  }
  /**
   * @param {!Event} event
   * @return {undefined}
   */
  function drop(event) {
    if (event.target && event.target.matches("a.nav-link span")) {
      if (0 == elementInViewport(event.target.parentElement.nextElementSibling)) {
        event.target.parentElement.nextElementSibling.classList.add("dropdown-custom-right");
        event.target.parentElement.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
        event.target.parentElement.nextElementSibling.querySelectorAll(".menu-dropdown").forEach(function(e) {
          e.classList.add("dropdown-custom-right");
        });
      } else {
        if (1 == elementInViewport(event.target.parentElement.nextElementSibling) && 1848 <= window.innerWidth) {
          /** @type {!NodeList<Element>} */
          var playbackSpeedClasses = document.getElementsByClassName("dropdown-custom-right");
          for (; 0 < playbackSpeedClasses.length;) {
            playbackSpeedClasses[0].classList.remove("dropdown-custom-right");
          }
        }
      }
    }
    if (event.target && event.target.matches("a.nav-link")) {
      if (0 == elementInViewport(event.target.nextElementSibling)) {
        event.target.nextElementSibling.classList.add("dropdown-custom-right");
        event.target.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
        event.target.nextElementSibling.querySelectorAll(".menu-dropdown").forEach(function(e) {
          e.classList.add("dropdown-custom-right");
        });
      } else {
        if (1 == elementInViewport(event.target.nextElementSibling) && 1848 <= window.innerWidth) {
          /** @type {!NodeList<Element>} */
          playbackSpeedClasses = document.getElementsByClassName("dropdown-custom-right");
          for (; 0 < playbackSpeedClasses.length;) {
            playbackSpeedClasses[0].classList.remove("dropdown-custom-right");
          }
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function open() {
    /** @type {number} */
    var targetWidth = document.documentElement.clientWidth;
    if (767 < targetWidth) {
      document.querySelector(".hamburger-icon").classList.toggle("open");
    }
    if ("horizontal" === document.documentElement.getAttribute("data-layout")) {
      if (document.body.classList.contains("menu")) {
        document.body.classList.remove("menu");
      } else {
        document.body.classList.add("menu");
      }
    }
    if ("vertical" === document.documentElement.getAttribute("data-layout")) {
      if (targetWidth < 1025 && 767 < targetWidth) {
        document.body.classList.remove("vertical-sidebar-enable");
        if ("sm" == document.documentElement.getAttribute("data-sidebar-size")) {
          document.documentElement.setAttribute("data-sidebar-size", "");
        } else {
          document.documentElement.setAttribute("data-sidebar-size", "sm");
        }
      } else {
        if (1025 < targetWidth) {
          document.body.classList.remove("vertical-sidebar-enable");
          if ("lg" == document.documentElement.getAttribute("data-sidebar-size")) {
            document.documentElement.setAttribute("data-sidebar-size", "sm");
          } else {
            document.documentElement.setAttribute("data-sidebar-size", "lg");
          }
        } else {
          if (targetWidth <= 767) {
            document.body.classList.add("vertical-sidebar-enable");
            document.documentElement.setAttribute("data-sidebar-size", "lg");
          }
        }
      }
    }
    if ("twocolumn" == document.documentElement.getAttribute("data-layout")) {
      if (document.body.classList.contains("twocolumn-panel")) {
        document.body.classList.remove("twocolumn-panel");
      } else {
        document.body.classList.add("twocolumn-panel");
      }
    }
  }
  /**
   * @return {undefined}
   */
  function link() {
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementsByClassName("code-switcher").forEach(function(a) {
        a.addEventListener("change", function() {
          /** @type {(Element|null)} */
          var _popOverContent = a.closest(".card");
          /** @type {(Element|null)} */
          var prettyPrintButton = _popOverContent.querySelector(".live-preview");
          /** @type {(Element|null)} */
          _popOverContent = _popOverContent.querySelector(".code-view");
          if (a.checked) {
            prettyPrintButton.classList.add("d-none");
            _popOverContent.classList.remove("d-none");
          } else {
            prettyPrintButton.classList.remove("d-none");
            _popOverContent.classList.add("d-none");
          }
        });
      });
      feather.replace();
    });
    window.addEventListener("resize", update);
    update();
    Waves.init();
    document.addEventListener("scroll", function() {
      var prettyPrintButton;
      if (prettyPrintButton = document.getElementById("page-topbar")) {
        if (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop) {
          prettyPrintButton.classList.add("topbar-shadow");
        } else {
          prettyPrintButton.classList.remove("topbar-shadow");
        }
      }
    });
    window.addEventListener("load", function() {
      var pipelets;
      ("twocolumn" == document.documentElement.getAttribute("data-layout") ? call : callback)();
      if (pipelets = document.getElementsByClassName("vertical-overlay")) {
        pipelets.forEach(function(e) {
          e.addEventListener("click", function() {
            document.body.classList.remove("vertical-sidebar-enable");
            if ("twocolumn" == sessionStorage.getItem("data-layout")) {
              document.body.classList.add("twocolumn-panel");
            } else {
              document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
            }
          });
        });
      }
      enter();
    });
    if (document.getElementById("topnav-hamburger-icon")) {
      document.getElementById("topnav-hamburger-icon").addEventListener("click", open);
    }
    var returnValue = sessionStorage.getItem("defaultAttribute");
    /** @type {*} */
    var returnType = JSON.parse(returnValue);
    /** @type {number} */
    returnValue = document.documentElement.clientWidth;
    if ("twocolumn" == returnType["data-layout"] && returnValue < 767) {
      document.getElementById("two-column-menu").querySelectorAll("li").forEach(function(e) {
        e.addEventListener("click", function(canCreateDiscussions) {
          document.body.classList.remove("twocolumn-panel");
        });
      });
    }
  }
  /**
   * @return {undefined}
   */
  function call() {
    feather.replace();
    var e;
    /** @type {string} */
    var t = "/" == location.pathname ? "index.php" : location.pathname.substring(1);
    if (t = t.substring(t.lastIndexOf("/") + 1)) {
      if (e = document.getElementById("navbar-nav").querySelector('[href="' + t + '"]')) {
        e.classList.add("active");
        /** @type {string} */
        t = (t = e.closest(".collapse.menu-dropdown")) && t.parentElement.closest(".collapse.menu-dropdown") ? (t.classList.add("show"), t.parentElement.children[0].classList.add("active"), t.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show"), t.parentElement.closest(".collapse.menu-dropdown").getAttribute("id")) : (e.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show"), t.getAttribute("id"));
        if (document.getElementById("two-column-menu").querySelector('[href="#' + t + '"]')) {
          document.getElementById("two-column-menu").querySelector('[href="#' + t + '"]').classList.add("active");
        }
      } else {
        document.body.classList.add("twocolumn-panel");
      }
    }
  }
  /**
   * @return {undefined}
   */
  function callback() {
    /** @type {string} */
    var t = "/" == location.pathname ? "index.php" : location.pathname.substring(1);
    if (!!(t = t.substring(t.lastIndexOf("/") + 1))) {
      if (t = document.getElementById("navbar-nav").querySelector('[href="' + t + '"]')) {
        t.classList.add("active");
        if (t = t.closest(".collapse.menu-dropdown")) {
          t.classList.add("show");
          t.parentElement.children[0].classList.add("active");
          t.parentElement.children[0].setAttribute("aria-expanded", "true");
          if (t.parentElement.closest(".collapse.menu-dropdown")) {
            t.parentElement.closest(".collapse").classList.add("show");
            if (t.parentElement.closest(".collapse").previousElementSibling) {
              t.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
            }
          }
        }
      }
    }
  }
  /**
   * @param {!Element} elem
   * @return {?}
   */
  function elementInViewport(elem) {
    if (elem) {
      var top = elem.offsetTop;
      var left = elem.offsetLeft;
      var width = elem.offsetWidth;
      var height = elem.offsetHeight;
      if (elem.offsetParent) {
        for (; elem.offsetParent;) {
          top = top + (elem = elem.offsetParent).offsetTop;
          left = left + elem.offsetLeft;
        }
      }
      return top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth;
    }
  }
  /**
   * @return {undefined}
   */
  function reset() {
    /**
     * @param {number} o
     * @return {?}
     */
    function callback(o) {
      return o.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    /** @type {!NodeList<Element>} */
    var pipelets = document.querySelectorAll(".counter-value");
    if (pipelets) {
      pipelets.forEach(function(self) {
        !function cb() {
          /** @type {number} */
          var n = +self.getAttribute("data-target");
          /** @type {number} */
          var j = +self.innerText;
          /** @type {number} */
          var i = n / 250;
          if (i < 1) {
            /** @type {number} */
            i = 1;
          }
          if (j < n) {
            /** @type {string} */
            self.innerText = (j + i).toFixed(0);
            setTimeout(cb, 1);
          } else {
            self.innerText = callback(n);
          }
          callback(self.innerText);
        }();
      });
    }
  }
  /**
   * @return {undefined}
   */
  function show() {
    /** @type {string} */
    document.getElementById("two-column-menu").innerHTML = "";
    /** @type {string} */
    document.querySelector(".navbar-menu").innerHTML = inactiveButton;
    document.getElementById("scrollbar").removeAttribute("data-simplebar");
    document.getElementById("navbar-nav").removeAttribute("data-simplebar");
    document.getElementById("scrollbar").classList.remove("h-100");
    /** @type {number} */
    var j = numPoints;
    /** @type {!NodeList<Element>} */
    var keys = document.querySelectorAll("ul.navbar-nav > li.nav-item");
    /** @type {string} */
    var result = "";
    /** @type {string} */
    var img = "";
    keys.forEach(function(elem, i) {
      if (i + 1 === j) {
        /** @type {!Element} */
        img = elem;
      }
      if (j < i + 1) {
        result = result + elem.outerHTML;
        elem.remove();
      }
      if (i + 1 === keys.length && img.insertAdjacentHTML) {
        img.insertAdjacentHTML("afterend", '<li class="nav-item">\t\t\t\t\t\t<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\t\t\t\t\t\t\t<i class="ri-briefcase-2-line"></i> More\t\t\t\t\t\t</a>\t\t\t\t\t\t<div class="collapse menu-dropdown" id="sidebarMore"><ul class="nav nav-sm flex-column">' + result + "</ul></div>\t\t\t\t\t</li>");
      }
    });
  }
  /**
   * @param {string} orient
   * @return {undefined}
   */
  function draw(orient) {
    if ("vertical" == orient) {
      /** @type {string} */
      document.getElementById("two-column-menu").innerHTML = "";
      /** @type {string} */
      document.querySelector(".navbar-menu").innerHTML = inactiveButton;
      if (document.getElementById("theme-settings-offcanvas")) {
        /** @type {string} */
        document.getElementById("sidebar-size").style.display = "block";
        /** @type {string} */
        document.getElementById("sidebar-view").style.display = "block";
        /** @type {string} */
        document.getElementById("sidebar-color").style.display = "block";
        /** @type {string} */
        document.getElementById("layout-position").style.display = "block";
        /** @type {string} */
        document.getElementById("layout-width").style.display = "block";
      }
      _init();
      callback();
      enter();
      updateUI();
    } else {
      if ("horizontal" == orient) {
        show();
        if (document.getElementById("theme-settings-offcanvas")) {
          /** @type {string} */
          document.getElementById("sidebar-size").style.display = "none";
          /** @type {string} */
          document.getElementById("sidebar-view").style.display = "none";
          /** @type {string} */
          document.getElementById("sidebar-color").style.display = "none";
          /** @type {string} */
          document.getElementById("layout-position").style.display = "block";
          /** @type {string} */
          document.getElementById("layout-width").style.display = "block";
        }
        callback();
      } else {
        if ("twocolumn" == orient) {
          document.getElementById("scrollbar").removeAttribute("data-simplebar");
          document.getElementById("scrollbar").classList.remove("h-100");
          if (document.getElementById("theme-settings-offcanvas")) {
            /** @type {string} */
            document.getElementById("sidebar-size").style.display = "none";
            /** @type {string} */
            document.getElementById("sidebar-view").style.display = "none";
            /** @type {string} */
            document.getElementById("sidebar-color").style.display = "block";
            /** @type {string} */
            document.getElementById("layout-position").style.display = "none";
            /** @type {string} */
            document.getElementById("layout-width").style.display = "none";
          }
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function enter() {
    document.getElementById("vertical-hover").addEventListener("click", function() {
      if ("sm-hover" === document.documentElement.getAttribute("data-sidebar-size")) {
        document.documentElement.setAttribute("data-sidebar-size", "sm-hover-active");
      } else {
        document.documentElement.getAttribute("data-sidebar-size");
        document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
      }
    });
  }
  /**
   * @param {!Object} name
   * @return {undefined}
   */
  function render(name) {
    if (name == name) {
      switch(name["data-layout"]) {
        case "vertical":
          add("data-layout", "vertical");
          sessionStorage.setItem("data-layout", "vertical");
          document.documentElement.setAttribute("data-layout", "vertical");
          draw("vertical");
          collapse();
          break;
        case "horizontal":
          add("data-layout", "horizontal");
          sessionStorage.setItem("data-layout", "horizontal");
          document.documentElement.setAttribute("data-layout", "horizontal");
          draw("horizontal");
          break;
        case "twocolumn":
          add("data-layout", "twocolumn");
          sessionStorage.setItem("data-layout", "twocolumn");
          document.documentElement.setAttribute("data-layout", "twocolumn");
          draw("twocolumn");
          break;
        default:
          if ("vertical" == sessionStorage.getItem("data-layout") && sessionStorage.getItem("data-layout")) {
            add("data-layout", "vertical");
            sessionStorage.setItem("data-layout", "vertical");
            document.documentElement.setAttribute("data-layout", "vertical");
            draw("vertical");
            collapse();
          } else {
            if ("horizontal" == sessionStorage.getItem("data-layout")) {
              add("data-layout", "horizontal");
              sessionStorage.setItem("data-layout", "horizontal");
              document.documentElement.setAttribute("data-layout", "horizontal");
              draw("horizontal");
            } else {
              if ("twocolumn" == sessionStorage.getItem("data-layout")) {
                add("data-layout", "twocolumn");
                sessionStorage.setItem("data-layout", "twocolumn");
                document.documentElement.setAttribute("data-layout", "twocolumn");
                draw("twocolumn");
              }
            }
          }
      }
      switch(name["data-topbar"]) {
        case "light":
          add("data-topbar", "light");
          sessionStorage.setItem("data-topbar", "light");
          document.documentElement.setAttribute("data-topbar", "light");
          break;
        case "dark":
          add("data-topbar", "dark");
          sessionStorage.setItem("data-topbar", "dark");
          document.documentElement.setAttribute("data-topbar", "dark");
          break;
        default:
          if ("dark" == sessionStorage.getItem("data-topbar")) {
            add("data-topbar", "dark");
            sessionStorage.setItem("data-topbar", "dark");
            document.documentElement.setAttribute("data-topbar", "dark");
          } else {
            add("data-topbar", "light");
            sessionStorage.setItem("data-topbar", "light");
            document.documentElement.setAttribute("data-topbar", "light");
          }
      }
      switch(name["data-layout-style"]) {
        case "default":
          add("data-layout-style", "default");
          sessionStorage.setItem("data-layout-style", "default");
          document.documentElement.setAttribute("data-layout-style", "default");
          break;
        case "detached":
          add("data-layout-style", "detached");
          sessionStorage.setItem("data-layout-style", "detached");
          document.documentElement.setAttribute("data-layout-style", "detached");
          break;
        default:
          if ("detached" == sessionStorage.getItem("data-layout-style")) {
            add("data-layout-style", "detached");
            sessionStorage.setItem("data-layout-style", "detached");
            document.documentElement.setAttribute("data-layout-style", "detached");
          } else {
            add("data-layout-style", "default");
            sessionStorage.setItem("data-layout-style", "default");
            document.documentElement.setAttribute("data-layout-style", "default");
          }
      }
      switch(name["data-sidebar-size"]) {
        case "lg":
          add("data-sidebar-size", "lg");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
          sessionStorage.setItem("data-sidebar-size", "lg");
          break;
        case "sm":
          add("data-sidebar-size", "sm");
          document.documentElement.setAttribute("data-sidebar-size", "sm");
          sessionStorage.setItem("data-sidebar-size", "sm");
          break;
        case "md":
          add("data-sidebar-size", "md");
          document.documentElement.setAttribute("data-sidebar-size", "md");
          sessionStorage.setItem("data-sidebar-size", "md");
          break;
        case "sm-hover":
          add("data-sidebar-size", "sm-hover");
          document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
          sessionStorage.setItem("data-sidebar-size", "sm-hover");
          break;
        default:
          if ("sm" == sessionStorage.getItem("data-sidebar-size")) {
            document.documentElement.setAttribute("data-sidebar-size", "sm");
            add("data-sidebar-size", "sm");
            sessionStorage.setItem("data-sidebar-size", "sm");
          } else {
            if ("md" == sessionStorage.getItem("data-sidebar-size")) {
              document.documentElement.setAttribute("data-sidebar-size", "md");
              add("data-sidebar-size", "md");
              sessionStorage.setItem("data-sidebar-size", "md");
            } else {
              if ("sm-hover" == sessionStorage.getItem("data-sidebar-size")) {
                document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
                add("data-sidebar-size", "sm-hover");
                sessionStorage.setItem("data-sidebar-size", "sm-hover");
              } else {
                document.documentElement.setAttribute("data-sidebar-size", "lg");
                add("data-sidebar-size", "lg");
                sessionStorage.setItem("data-sidebar-size", "lg");
              }
            }
          }
      }
      switch(name["data-layout-mode"]) {
        case "light":
          add("data-layout-mode", "light");
          document.documentElement.setAttribute("data-layout-mode", "light");
          sessionStorage.setItem("data-layout-mode", "light");
          break;
        case "dark":
          add("data-layout-mode", "dark");
          document.documentElement.setAttribute("data-layout-mode", "dark");
          sessionStorage.setItem("data-layout-mode", "dark");
          break;
        default:
          if (sessionStorage.getItem("data-layout-mode") && "dark" == sessionStorage.getItem("data-layout-mode")) {
            sessionStorage.setItem("data-layout-mode", "dark");
            document.documentElement.setAttribute("data-layout-mode", "dark");
            add("data-layout-mode", "dark");
          } else {
            sessionStorage.setItem("data-layout-mode", "light");
            document.documentElement.setAttribute("data-layout-mode", "light");
            add("data-layout-mode", "light");
          }
      }
      switch(name["data-layout-width"]) {
        case "fluid":
          add("data-layout-width", "fluid");
          document.documentElement.setAttribute("data-layout-width", "fluid");
          sessionStorage.setItem("data-layout-width", "fluid");
          break;
        case "boxed":
          add("data-layout-width", "boxed");
          document.documentElement.setAttribute("data-layout-width", "boxed");
          sessionStorage.setItem("data-layout-width", "boxed");
          break;
        default:
          if ("boxed" == sessionStorage.getItem("data-layout-width")) {
            sessionStorage.setItem("data-layout-width", "boxed");
            document.documentElement.setAttribute("data-layout-width", "boxed");
            add("data-layout-width", "boxed");
          } else {
            sessionStorage.setItem("data-layout-width", "fluid");
            document.documentElement.setAttribute("data-layout-width", "fluid");
            add("data-layout-width", "fluid");
          }
      }
      switch(name["data-sidebar"]) {
        case "light":
          add("data-sidebar", "light");
          sessionStorage.setItem("data-sidebar", "light");
          document.documentElement.setAttribute("data-sidebar", "light");
          break;
        case "dark":
          add("data-sidebar", "dark");
          sessionStorage.setItem("data-sidebar", "dark");
          document.documentElement.setAttribute("data-sidebar", "dark");
          break;
        default:
          if (sessionStorage.getItem("data-sidebar") && "light" == sessionStorage.getItem("data-sidebar")) {
            sessionStorage.setItem("data-sidebar", "light");
            add("data-sidebar", "light");
            document.documentElement.setAttribute("data-sidebar", "light");
          } else {
            sessionStorage.setItem("data-sidebar", "dark");
            add("data-sidebar", "dark");
            document.documentElement.setAttribute("data-sidebar", "dark");
          }
      }
      switch(name["data-layout-position"]) {
        case "fixed":
          add("data-layout-position", "fixed");
          sessionStorage.setItem("data-layout-position", "fixed");
          document.documentElement.setAttribute("data-layout-position", "fixed");
          break;
        case "scrollable":
          add("data-layout-position", "scrollable");
          sessionStorage.setItem("data-layout-position", "scrollable");
          document.documentElement.setAttribute("data-layout-position", "scrollable");
          break;
        default:
          if (sessionStorage.getItem("data-layout-position") && "scrollable" == sessionStorage.getItem("data-layout-position")) {
            add("data-layout-position", "scrollable");
            sessionStorage.setItem("data-layout-position", "scrollable");
            document.documentElement.setAttribute("data-layout-position", "scrollable");
          } else {
            add("data-layout-position", "fixed");
            sessionStorage.setItem("data-layout-position", "fixed");
            document.documentElement.setAttribute("data-layout-position", "fixed");
          }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function updateUI() {
    setTimeout(function() {
      var triangleOffset;
      var t;
      /** @type {(Element|null)} */
      var triangle = document.getElementById("navbar-nav");
      if (triangle) {
        /** @type {(Element|null)} */
        triangle = triangle.querySelector(".nav-item .active");
        if (300 < (triangleOffset = triangle ? triangle.offsetTop : 0)) {
          if ((t = document.getElementsByClassName("app-menu") ? document.getElementsByClassName("app-menu")[0] : "") && t.querySelector(".simplebar-content-wrapper")) {
            setTimeout(function() {
              t.querySelector(".simplebar-content-wrapper").scrollTop = 330 == triangleOffset ? triangleOffset + 85 : triangleOffset;
            }, 0);
          }
        }
      }
    }, 250);
  }
  /**
   * @param {string} key
   * @param {!Element} name
   * @return {undefined}
   */
  function add(key, name) {
    document.querySelectorAll("input[name=" + key + "]").forEach(function(event) {
      if (name == event.value) {
        /** @type {boolean} */
        event.checked = true;
      } else {
        /** @type {boolean} */
        event.checked = false;
      }
      event.addEventListener("change", function() {
        document.documentElement.setAttribute(key, event.value);
        sessionStorage.setItem(key, event.value);
        if ("data-layout-width" == key && "boxed" == event.value) {
          document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
          sessionStorage.setItem("data-sidebar-size", "sm-hover");
          /** @type {boolean} */
          document.getElementById("sidebar-size-small-hover").checked = true;
        } else {
          if ("data-layout-width" == key && "fluid" == event.value) {
            document.documentElement.setAttribute("data-sidebar-size", "lg");
            sessionStorage.setItem("data-sidebar-size", "lg");
            /** @type {boolean} */
            document.getElementById("sidebar-size-default").checked = true;
          }
        }
        if ("data-layout" == key) {
          if ("vertical" == event.value) {
            draw("vertical");
            collapse();
            feather.replace();
          } else {
            if ("horizontal" == event.value) {
              draw("horizontal");
              feather.replace();
            } else {
              if ("twocolumn" == event.value) {
                draw("twocolumn");
                document.documentElement.setAttribute("data-layout-width", "fluid");
                document.getElementById("layout-width-fluid").click();
                init();
                call();
                collapse();
                feather.replace();
              }
            }
          }
        }
      });
    });
  }
  /**
   * @param {string} e
   * @param {string} x
   * @param {string} a
   * @param {!Node} f
   * @return {undefined}
   */
  function dispatch(e, x, a, f) {
    /** @type {(Element|null)} */
    var _ref_a = document.getElementById(a);
    f.setAttribute(e, x);
    if (_ref_a) {
      document.getElementById(a).click();
    }
  }
  /**
   * @return {undefined}
   */
  function initialize() {
    if (!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)) {
      document.body.classList.remove("fullscreen-enable");
    }
  }
  /**
   * @return {undefined}
   */
  function refreshSections() {
    /** @type {number} */
    var tax_value = 0;
    document.getElementsByClassName("cart-item-price").forEach(function(e) {
      tax_value = tax_value + parseFloat(e.innerHTML);
    });
    if (document.getElementById("cart-item-total")) {
      document.getElementById("cart-item-total").innerHTML = "$" + tax_value.toFixed(2);
    }
  }
  /**
   * @return {undefined}
   */
  function check() {
    var authorSection;
    if ("horizontal" !== document.documentElement.getAttribute("data-layout")) {
      if (!!document.getElementById("navbar-nav")) {
        if (authorSection = new SimpleBar(document.getElementById("navbar-nav"))) {
          authorSection.getContentElement();
        }
      }
      if (!!document.getElementsByClassName("twocolumn-iconview")[0]) {
        if (authorSection = new SimpleBar(document.getElementsByClassName("twocolumn-iconview")[0])) {
          authorSection.getContentElement();
        }
      }
      clearTimeout(timer);
    }
  }
  var object;
  var t;
  var prettyPrintButton;
  var xupdateStatus;
  var obj;
  var ui;
  var e;
  var page;
  var list;
  var i;
  var timer;
  /** @type {string} */
  var inactiveButton = document.querySelector(".navbar-menu").innerHTML;
  /** @type {number} */
  var numPoints = 7;
  /** @type {string} */
  var item = "en";
  var result = localStorage.getItem("language");
  if (sessionStorage.getItem("defaultAttribute")) {
    (object = {})["data-layout"] = sessionStorage.getItem("data-layout");
    object["data-sidebar-size"] = sessionStorage.getItem("data-sidebar-size");
    object["data-layout-mode"] = sessionStorage.getItem("data-layout-mode");
    object["data-layout-width"] = sessionStorage.getItem("data-layout-width");
    object["data-sidebar"] = sessionStorage.getItem("data-sidebar");
    object["data-layout-position"] = sessionStorage.getItem("data-layout-position");
    object["data-layout-style"] = sessionStorage.getItem("data-layout-style");
    object["data-topbar"] = sessionStorage.getItem("data-topbar");
    render(object);
  } else {
    /** @type {!NamedNodeMap<Attr>} */
    list = document.documentElement.attributes;
    object = {};
    list.forEach(function(value) {
      var key;
      if (value && value.nodeName && "undefined" != value.nodeName) {
        key = value.nodeName;
        object[key] = value.nodeValue;
        sessionStorage.setItem(key, value.nodeValue);
      }
    });
    sessionStorage.setItem("defaultAttribute", JSON.stringify(object));
    render(object);
    if (list = document.querySelector('.btn[data-bs-target="#theme-settings-offcanvas"]')) {
      list.click();
    }
  }
  init();
  /** @type {(Element|null)} */
  t = document.getElementById("search-close-options");
  /** @type {(Element|null)} */
  prettyPrintButton = document.getElementById("search-dropdown");
  if (xupdateStatus = document.getElementById("search-options")) {
    xupdateStatus.addEventListener("focus", function() {
      if (0 < xupdateStatus.value.length) {
        prettyPrintButton.classList.add("show");
        t.classList.remove("d-none");
      } else {
        prettyPrintButton.classList.remove("show");
        t.classList.add("d-none");
      }
    });
    xupdateStatus.addEventListener("keyup", function(canCreateDiscussions) {
      var id;
      if (0 < xupdateStatus.value.length) {
        prettyPrintButton.classList.add("show");
        t.classList.remove("d-none");
        id = xupdateStatus.value.toLowerCase();
        document.getElementsByClassName("notify-item").forEach(function(e) {
          var activeSlots = e.getElementsByTagName("span") ? e.getElementsByTagName("span")[0].innerText.toLowerCase() : "";
          if (activeSlots) {
            /** @type {string} */
            e.style.display = activeSlots.includes(id) ? "block" : "none";
          }
        });
      } else {
        prettyPrintButton.classList.remove("show");
        t.classList.add("d-none");
      }
    });
    t.addEventListener("click", function() {
      /** @type {string} */
      xupdateStatus.value = "";
      prettyPrintButton.classList.remove("show");
      t.classList.add("d-none");
    });
    document.body.addEventListener("click", function(mutation) {
      if ("search-options" !== mutation.target.getAttribute("id")) {
        prettyPrintButton.classList.remove("show");
        t.classList.add("d-none");
      }
    });
  }
  /** @type {(Element|null)} */
  obj = document.getElementById("search-close-options");
  /** @type {(Element|null)} */
  ui = document.getElementById("search-dropdown-reponsive");
  /** @type {(Element|null)} */
  e = document.getElementById("search-options-reponsive");
  if (obj && ui && e) {
    e.addEventListener("focus", function() {
      if (0 < e.value.length) {
        ui.classList.add("show");
        obj.classList.remove("d-none");
      } else {
        ui.classList.remove("show");
        obj.classList.add("d-none");
      }
    });
    e.addEventListener("keyup", function() {
      if (0 < e.value.length) {
        ui.classList.add("show");
        obj.classList.remove("d-none");
      } else {
        ui.classList.remove("show");
        obj.classList.add("d-none");
      }
    });
    obj.addEventListener("click", function() {
      /** @type {string} */
      e.value = "";
      ui.classList.remove("show");
      obj.classList.add("d-none");
    });
    document.body.addEventListener("click", function(mutation) {
      if ("search-options" !== mutation.target.getAttribute("id")) {
        ui.classList.remove("show");
        obj.classList.add("d-none");
      }
    });
  }
  if (list = document.querySelector('[data-toggle="fullscreen"]')) {
    list.addEventListener("click", function(event) {
      event.preventDefault();
      document.body.classList.toggle("fullscreen-enable");
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else {
          if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else {
            if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            }
          }
        }
      } else {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else {
          if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else {
            if (document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          }
        }
      }
    });
  }
  document.addEventListener("fullscreenchange", initialize);
  document.addEventListener("webkitfullscreenchange", initialize);
  document.addEventListener("mozfullscreenchange", initialize);
  /** @type {!Element} */
  page = document.getElementsByTagName("HTML")[0];
  if ((list = document.querySelectorAll(".light-dark-mode")) && list.length) {
    list[0].addEventListener("click", function(canCreateDiscussions) {
      if (page.hasAttribute("data-layout-mode") && "dark" == page.getAttribute("data-layout-mode")) {
        dispatch("data-layout-mode", "light", "layout-mode-light", page);
      } else {
        dispatch("data-layout-mode", "dark", "layout-mode-dark", page);
      }
    });
  }
  link();
  reset();
  _init();
  if (document.getElementsByClassName("dropdown-item-cart")) {
    /** @type {number} */
    i = document.querySelectorAll(".dropdown-item-cart").length;
    document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn").forEach(function(e) {
      e.addEventListener("click", function(canCreateDiscussions) {
        i--;
        this.closest(".dropdown-item-cart").remove();
        document.getElementsByClassName("cartitem-badge").forEach(function(e) {
          e.innerHTML = i;
        });
        refreshSections();
        if (document.getElementById("empty-cart")) {
          /** @type {string} */
          document.getElementById("empty-cart").style.display = 0 == i ? "block" : "none";
        }
        if (document.getElementById("checkout-elem")) {
          /** @type {string} */
          document.getElementById("checkout-elem").style.display = 0 == i ? "none" : "block";
        }
      });
    });
    document.getElementsByClassName("cartitem-badge").forEach(function(e) {
      e.innerHTML = i;
    });
    if (document.getElementById("empty-cart")) {
      /** @type {string} */
      document.getElementById("empty-cart").style.display = "none";
    }
    if (document.getElementById("checkout-elem")) {
      /** @type {string} */
      document.getElementById("checkout-elem").style.display = "block";
    }
    refreshSections();
  }
  if (document.getElementsByClassName("notification-check")) {
    document.querySelectorAll(".notification-check input").forEach(function(e) {
      e.addEventListener("click", function(event) {
        event.target.closest(".notification-item").classList.toggle("active");
      });
    });
  }
  [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(data) {
    return new bootstrap.Tooltip(data);
  });
  [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(title) {
    return new bootstrap.Popover(title);
  });
  if (document.getElementById("reset-layout")) {
    document.getElementById("reset-layout").addEventListener("click", function() {
      sessionStorage.clear();
      window.location.reload();
    });
  }
  document.querySelectorAll("[data-toast]").forEach(function(B) {
    B.addEventListener("click", function() {
      var options = {};
      /** @type {!NamedNodeMap<Attr>} */
      var m = B.attributes;
      if (m["data-toast-text"]) {
        /** @type {string} */
        options.text = m["data-toast-text"].value.toString();
      }
      if (m["data-toast-gravity"]) {
        /** @type {string} */
        options.gravity = m["data-toast-gravity"].value.toString();
      }
      if (m["data-toast-position"]) {
        /** @type {string} */
        options.position = m["data-toast-position"].value.toString();
      }
      if (m["data-toast-className"]) {
        /** @type {string} */
        options.className = m["data-toast-className"].value.toString();
      }
      if (m["data-toast-duration"]) {
        /** @type {string} */
        options.duration = m["data-toast-duration"].value.toString();
      }
      if (m["data-toast-close"]) {
        /** @type {string} */
        options.close = m["data-toast-close"].value.toString();
      }
      if (m["data-toast-style"]) {
        /** @type {string} */
        options.style = m["data-toast-style"].value.toString();
      }
      if (m["data-toast-offset"]) {
        /** @type {!Attr} */
        options.offset = m["data-toast-offset"];
      }
      Toastify({
        newWindow : true,
        text : options.text,
        gravity : options.gravity,
        position : options.position,
        className : "bg-" + options.className,
        stopOnFocus : true,
        offset : {
          x : options.offset ? 50 : 0,
          y : options.offset ? 10 : 0
        },
        duration : options.duration,
        close : "close" == options.close,
        style : "style" == options.style ? {
          background : "linear-gradient(to right, #0AB39C, #405189)"
        } : ""
      }).showToast();
    });
  });
  document.querySelectorAll("[data-choices]").forEach(function(el) {
    var self = {};
    /** @type {!NamedNodeMap<Attr>} */
    var attributes = el.attributes;
    if (attributes["data-choices-groups"]) {
      /** @type {string} */
      self.placeholderValue = "This is a placeholder set in the config";
    }
    if (attributes["data-choices-search-false"]) {
      /** @type {boolean} */
      self.searchEnabled = false;
    }
    if (attributes["data-choices-search-true"]) {
      /** @type {boolean} */
      self.searchEnabled = true;
    }
    if (attributes["data-choices-removeItem"]) {
      /** @type {boolean} */
      self.removeItemButton = true;
    }
    if (attributes["data-choices-sorting-false"]) {
      /** @type {boolean} */
      self.shouldSort = false;
    }
    if (attributes["data-choices-sorting-true"]) {
      /** @type {boolean} */
      self.shouldSort = true;
    }
    if (attributes["data-choices-multiple-remove"]) {
      /** @type {boolean} */
      self.removeItemButton = true;
    }
    if (attributes["data-choices-limit"]) {
      /** @type {string} */
      self.maxItemCount = attributes["data-choices-limit"].value.toString();
    }
    if (attributes["data-choices-limit"]) {
      /** @type {string} */
      self.maxItemCount = attributes["data-choices-limit"].value.toString();
    }
    if (attributes["data-choices-editItem-true"]) {
      /** @type {boolean} */
      self.maxItemCount = true;
    }
    if (attributes["data-choices-editItem-false"]) {
      /** @type {boolean} */
      self.maxItemCount = false;
    }
    if (attributes["data-choices-text-unique-true"]) {
      /** @type {boolean} */
      self.duplicateItemsAllowed = false;
    }
    if (attributes["data-choices-text-disabled-true"]) {
      /** @type {boolean} */
      self.addItems = false;
    }
    if (attributes["data-choices-text-disabled-true"]) {
      (new Choices(el, self)).disable();
    } else {
      new Choices(el, self);
    }
  });
  document.querySelectorAll("[data-provider]").forEach(function(node) {
    var attributes;
    var options;
    var scope;
    if ("flatpickr" == node.getAttribute("data-provider")) {
      scope = {};
      if ((attributes = node.attributes)["data-date-format"]) {
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-enable-time"]) {
        /** @type {boolean} */
        scope.enableTime = true;
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString() + " H:i";
      }
      if (attributes["data-altFormat"]) {
        /** @type {boolean} */
        scope.altInput = true;
        /** @type {string} */
        scope.altFormat = attributes["data-altFormat"].value.toString();
      }
      if (attributes["data-minDate"]) {
        /** @type {string} */
        scope.minDate = attributes["data-minDate"].value.toString();
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-maxDate"]) {
        /** @type {string} */
        scope.maxDate = attributes["data-maxDate"].value.toString();
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-deafult-date"]) {
        /** @type {string} */
        scope.defaultDate = attributes["data-deafult-date"].value.toString();
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-multiple-date"]) {
        /** @type {string} */
        scope.mode = "multiple";
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-range-date"]) {
        /** @type {string} */
        scope.mode = "range";
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-inline-date"]) {
        /** @type {boolean} */
        scope.inline = true;
        /** @type {string} */
        scope.defaultDate = attributes["data-deafult-date"].value.toString();
        /** @type {string} */
        scope.dateFormat = attributes["data-date-format"].value.toString();
      }
      if (attributes["data-disable-date"]) {
        (options = []).push(attributes["data-disable-date"].value);
        /** @type {!Array<string>} */
        scope.disable = options.toString().split(",");
      }
      flatpickr(node, scope);
    } else {
      if ("timepickr" == node.getAttribute("data-provider")) {
        options = {};
        if ((scope = node.attributes)["data-time-basic"]) {
          /** @type {boolean} */
          options.enableTime = true;
          /** @type {boolean} */
          options.noCalendar = true;
          /** @type {string} */
          options.dateFormat = "H:i";
        }
        if (scope["data-time-hrs"]) {
          /** @type {boolean} */
          options.enableTime = true;
          /** @type {boolean} */
          options.noCalendar = true;
          /** @type {string} */
          options.dateFormat = "H:i";
          /** @type {boolean} */
          options.time_24hr = true;
        }
        if (scope["data-min-time"]) {
          /** @type {boolean} */
          options.enableTime = true;
          /** @type {boolean} */
          options.noCalendar = true;
          /** @type {string} */
          options.dateFormat = "H:i";
          /** @type {string} */
          options.minTime = scope["data-min-time"].value.toString();
        }
        if (scope["data-max-time"]) {
          /** @type {boolean} */
          options.enableTime = true;
          /** @type {boolean} */
          options.noCalendar = true;
          /** @type {string} */
          options.dateFormat = "H:i";
          /** @type {string} */
          options.minTime = scope["data-max-time"].value.toString();
        }
        if (scope["data-default-time"]) {
          /** @type {boolean} */
          options.enableTime = true;
          /** @type {boolean} */
          options.noCalendar = true;
          /** @type {string} */
          options.dateFormat = "H:i";
          /** @type {string} */
          options.defaultDate = scope["data-default-time"].value.toString();
        }
        if (scope["data-time-inline"]) {
          /** @type {boolean} */
          options.enableTime = true;
          /** @type {boolean} */
          options.noCalendar = true;
          /** @type {string} */
          options.defaultDate = scope["data-time-inline"].value.toString();
          /** @type {boolean} */
          options.inline = true;
        }
        flatpickr(node, options);
      }
    }
  });
  document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]').forEach(function(e) {
    e.addEventListener("click", function(event) {
      event.stopPropagation();
      bootstrap.Tab.getInstance(event.target).show();
    });
  });
  (function() {
    if ("null" != result && result !== item) {
      load(result);
    }
    /** @type {!NodeList<Element>} */
    var verbs = document.getElementsByClassName("language");
    if (verbs) {
      verbs.forEach(function(elem) {
        elem.addEventListener("click", function(canCreateDiscussions) {
          load(elem.getAttribute("data-lang"));
        });
      });
    }
  })();
  collapse();
  updateUI();
  window.addEventListener("resize", function() {
    if (timer) {
      clearTimeout(timer);
    }
    /** @type {number} */
    timer = setTimeout(check, 2E3);
  });
}();
/** @type {(Element|null)} */
var mybutton = document.getElementById("back-to-top");
/**
 * @return {undefined}
 */
function scrollFunction() {
  if (100 < document.body.scrollTop || 100 < document.documentElement.scrollTop) {
    /** @type {string} */
    mybutton.style.display = "block";
  } else {
    /** @type {string} */
    mybutton.style.display = "none";
  }
}
/**
 * @return {undefined}
 */
function topFunction() {
  /** @type {number} */
  document.body.scrollTop = 0;
  /** @type {number} */
  document.documentElement.scrollTop = 0;
}
/**
 * @return {undefined}
 */
window.onscroll = function() {
  scrollFunction();
};
