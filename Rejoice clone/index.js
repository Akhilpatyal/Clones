function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"

    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locoScroll();

function cursor() {
    const page1Content = document.querySelector("#page1-content")
    const cursor = document.querySelector("#cursor")
    // page1Content.addEventListener("mousemove",function(dec){
    //     cursor.style.left=dec.x+"px";
    //     cursor.style.top=dec.y+"px";
    // })

    // another way using Gsap

    page1Content.addEventListener("mousemove", function (dec) {
        gsap.to(cursor, {
            x: dec.x,
            y: dec.y
        })
    })
    page1Content.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })
    page1Content.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })
}
cursor();

function page2Animation() {
    gsap.from(".elem h1", {
        y: 120,
        stagger: 0.2,
        duration: 7,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 40%",
            end: "top 37%",
            scrub: 6
        }
    })
}
page2Animation();

function page4Animation() {
    gsap.from(".element h1", {
        x: 150,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 80%",
            end: "top 20%",
            scrub: 2
        }
    })
}
page4Animation()


function page6Animation() {
    gsap.from(".content h1 span", {
        y: -120,
        stagger: 0.5,
        duration: 5,
        scrollTrigger: {
            trigger: "#page6",
            scroller: "#main",
            start: "top 40%",
            end: "top 47%",
            scrub: 10
        }
    })
}
page6Animation()

function swiper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
    });
}
swiper()

var tl = gsap.timeline()
tl.from("#loader h3", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
})
tl.to("#loader h3", {
    x: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 1
})
tl.to("#loader", {
    opacity: 0,

})
tl.from("#page1-content h1 span", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    delay: -0.5
})
tl.to("#loader", {
    display: "none" 
})

  t1.fromTo(element+".content h4", {
    opacity:0, 
    y:90
  }, {
    duration: 2, 
    opacity:1, 
    y:0, 
    stagger: 0.03, 
    ease: "elastic(1.2, 0.5)",
    scrollTrigger: {
      trigger: element,
      start: "top 70%", // start when the top of the <h1> reaches 70% down from the top of the viewport
      toggleActions: "restart none none reverse"
    }
  });
