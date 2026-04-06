
      // Preloader
      window.addEventListener("load", () => {
        setTimeout(
          () => document.getElementById("preloader").classList.add("hide"),
          2000,
        );
      });

      // Custom cursor
      const cur = document.getElementById("cur"),
        ct = document.getElementById("cur-t");
      let mx = 0,
        my = 0,
        tx = 0,
        ty = 0;
      document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + "px";
        cur.style.top = my + "px";
      });
      function animateCursor() {
        tx += (mx - tx) * 0.12;
        ty += (my - ty) * 0.12;
        ct.style.left = tx + "px";
        ct.style.top = ty + "px";
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      document
        .querySelectorAll("a,button,.sk,.pcard,.svc,.cert,.tcard")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cur.style.transform = "translate(-50%,-50%) scale(3)";
            ct.style.opacity = ".5";
          });
          el.addEventListener("mouseleave", () => {
            cur.style.transform = "translate(-50%,-50%) scale(1)";
            ct.style.opacity = "1";
          });
        });

      // Scroll events
      window.addEventListener("scroll", () => {
        const p = document.getElementById("prog");
        p.style.width =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100 +
          "%";
        document
          .getElementById("nav")
          .classList.toggle("solid", window.scrollY > 60);
        document
          .getElementById("btt")
          .classList.toggle("show", window.scrollY > 300);
        document.querySelectorAll("section[id]").forEach((s) => {
          const r = s.getBoundingClientRect();
          if (r.top <= 80 && r.bottom >= 80) {
            document
              .querySelectorAll(".nav-links a")
              .forEach((a) => a.classList.remove("active"));
            const l = document.querySelector(`.nav-links a[href="#${s.id}"]`);
            if (l) l.classList.add("active");
          }
        });
      });

      // Back to top
      document.getElementById("btt").addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Nav mobile
      document.getElementById("tog").addEventListener("click", function () {
        this.classList.toggle("open");
        document.getElementById("nl").classList.toggle("open");
      });
      document.querySelectorAll("#nl a").forEach((a) =>
        a.addEventListener("click", () => {
          document.getElementById("tog").classList.remove("open");
          document.getElementById("nl").classList.remove("open");
        }),
      );

      // Typewriter
      const tw = new Typewriter(document.getElementById("tw"), {
        loop: true,
        delay: 55,
        deleteSpeed: 30,
      });
      tw.typeString("Full-Stack Python Developer")
        .pauseFor(1600)
        .deleteAll()
        .typeString("Django REST Framework Expert")
        .pauseFor(1600)
        .deleteAll()
        .typeString("Web Application Architect")
        .pauseFor(1600)
        .deleteAll()
        .typeString("API Developer &amp; Backend Engineer")
        .pauseFor(1600)
        .start();

      // Scroll reveal
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
      );
      document.querySelectorAll(".reveal").forEach((r, i) => {
        r.style.transitionDelay = (i % 5) * 0.1 + "s";
        obs.observe(r);
      });

      // Skills filter
      function fsk(cat, btn) {
        document
          .querySelectorAll(".filter-bar .fb")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".sk").forEach((c) => {
          c.classList.toggle("hide", cat !== "all" && c.dataset.cat !== cat);
        });
      }

      // Projects filter
      function fp(cat, btn) {
        document
          .querySelectorAll(".proj-grid .filter-bar .fb,.filter-bar .fb")
          .forEach(() => {});
        document
          .querySelectorAll("#projects .filter-bar .fb")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".pcard").forEach((c) => {
          c.classList.toggle(
            "phide",
            cat !== "all" && !c.dataset.pc.includes(cat),
          );
        });
      }

      // Confetti (lime colored)
      function fire() {
        const end = Date.now() + 3000;
        const cols = ["#B8FF35", "#D4FF7A", "#8ACC1A", "#fff"];
        (function f() {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: cols,
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: cols,
          });
          if (Date.now() < end) requestAnimationFrame(f);
        })();
      }
      document.getElementById("home").addEventListener("click", fire);

      // Contact form
      document.getElementById("cf").addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = this.querySelector(".fsubmit");
        btn.innerHTML = '<i class="bi bi-hourglass-split"></i>&nbsp;Sending...';
        btn.disabled = true;
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new FormData(this),
        })
          .then((r) => r.json())
          .then((d) => {
            if (d.success) {
              this.reset();
              const t = document.getElementById("toast");
              t.classList.add("show");
              setTimeout(() => t.classList.remove("show"), 3500);
            }
          })
          .catch(() => {})
          .finally(() => {
            btn.innerHTML = '<i class="bi bi-send-fill"></i>&nbsp;Send Message';
            btn.disabled = false;
          });
      });
   
