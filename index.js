gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  lerp:0.1
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// let looder = gsap.timeline()

// looder.to('.looder',{
//   scale:1,
//   opacity:0,
//   duration:2,
//   display: "none",
// })



let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.airpod-img-con img',
        scroller: ".main",
        start: 'top 200',
        // end: 'top 100%',
        // markers: true,
        scrub: 2
    },

    
});


tl.to('.airpod-img-con img', {
    scale: 2.5,
    y:-300,
    // opacity: .1,
    filter:"blur(5px)",
    
});


let tl2 = gsap.timeline({
    
    scrollTrigger: {
        trigger: '.airpod-max-con img',
        scroller: ".main",
        start: 'top 200',
        // end: 'top 100%',
        // markers: true,
        scrub: 2
    }
});

tl2.to('.airpod-max-con img', {
    scale: 2.8,
    y:-300,

    // opacity: .1,
    filter:"blur(5px)",
    
});



