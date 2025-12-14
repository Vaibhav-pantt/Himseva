// Auto-trigger mountain rise animation on load
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo-3d');
    setTimeout(() => logo.classList.add('animate'), 500);
    
    // Mouse tilt interaction
    const container = document.querySelector('.logo-3d-container');
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (x - centerX) / 20;
        const rotateX = (y - centerY) / -20;
        
        logo.style.transform = `
            translateZ(80px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    });
    
    container.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateZ(80px) rotateX(10deg) rotateY(0deg)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('feed');

  function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    feed.innerHTML = "";

    if (videos.length === 0) {
      feed.innerHTML = `<p style="text-align:center; color:gray;">No videos uploaded yet 🎥</p>`;
      return;
    }

    // Ask for key to view
    const userKey = prompt("🔑 Enter your key to view your videos:");
    if (!userKey) {
      feed.innerHTML = `<p style="text-align:center; color:red;">No key entered. Access denied.</p>`;
      return;
    }

    // Filter videos for this key
    const filteredVideos = videos.filter(v => v.key === userKey);

    if (filteredVideos.length === 0) {
      feed.innerHTML = `<p style="text-align:center; color:gray;">No videos found for this key 🚫</p>`;
      return;
    }

    filteredVideos.forEach(video => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <strong style="color:#e50914; display:block; margin-bottom:10px;">${video.name}</strong>
        <video src="${video.video}" controls width="100%" style="border-radius:10px;"></video>
      `;
      feed.appendChild(card);
    });
  }

  loadVideos();
});
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video-item');

  // Load saved ratings from localStorage
  const savedRatings = JSON.parse(localStorage.getItem('videoRatings') || '{}');

  videos.forEach(video => {
    const videoId = video.getAttribute('data-video-id');
    const stars = video.querySelectorAll('.star');

    // Highlight previously saved rating
    const savedRating = savedRatings[videoId];
    if (savedRating) highlightStars(stars, savedRating);

    // Add event listeners to each star
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const ratingValue = parseInt(star.getAttribute('data-value'));

        // Save rating in localStorage
        savedRatings[videoId] = ratingValue;
        localStorage.setItem('videoRatings', JSON.stringify(savedRatings));

        highlightStars(stars, ratingValue);

        // Optional small animation or message
        showMessage(video, `⭐ You rated this ${ratingValue}/5`);
      });

      // Hover effect preview
      star.addEventListener('mouseover', () => {
        const hoverValue = parseInt(star.getAttribute('data-value'));
        highlightStars(stars, hoverValue);
      });

      // Reset to saved rating on mouse leave
      star.addEventListener('mouseleave', () => {
        const savedValue = savedRatings[videoId] || 0;
        highlightStars(stars, savedValue);
      });
    });
  });

  // Highlight stars up to a given value
  function highlightStars(stars, value) {
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      star.classList.toggle('active', starValue <= value);
    });
  }

  // Optional helper to show a small confirmation message
  function showMessage(video, text) {
    let msg = video.querySelector('.rating-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'rating-message';
      video.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.opacity = 1;
    setTimeout(() => msg.style.opacity = 0, 2000);
  }
});

  // ================== Hamburger Menu ==================
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const links = document.getElementById('primary-navigation');

  if (hamburger && nav && links) {
    function openMenu() {
      nav.classList.add('expanded');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      nav.classList.remove('expanded');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.contains('expanded') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('expanded') && !nav.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('expanded')) closeMenu();
    });

    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });
  }


const loginBtn = document.getElementById('loginBtn');

// Redirect to login.html when clicked
loginBtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});

let isHindi = false;

const translations = {
  // Hero
  "logo-3d-title": { en: "HIMALAY DARSHAN", hi: "हिमालय दर्शन" },
  "subtitle": { en: "Social Service Organization", hi: "सामाजिक सेवा संस्थान" },
  "logo-subtitle": { en: "Strength •  Social Service •Trust", hi: "सेवा • समर्पण• विश्वास" },

  // About
  "about-title": { en: "About Himalay Darshan", hi: "हिमालय दर्शन सामाजिक सेवा संस्थान के उद्देश्य " },
  "about-p1": { 
    en: "  On 30th September 2025, the Himalaya Darshan Social Service Organization (charitable trust) was established in Danya, Almora (Uttarakhand) with the objective of promoting Indian culture, human values, health, and education in society. The trust works towards the overall development of underprivileged women and children, health and environmental protection, soil and water conservation, and providing information and relief efforts related to natural and man-made disasters.It also aims to inspire children in schools to develop love for the nation and the country, as well as moral and human values, conduct awareness programs, organize groups of women and children, and encourage them to work together. Through positive initiatives and meaningful programs, the organization seeks to bring change in lives, address social challenges, and promote human welfare.",
    hi: "30 सितंबर 2025 को  दन्या अल्मोड़ा (उत्तराखंड) स्थापित हिमालय दर्शन सामाजिक सेवा संस्थान (charitable trust) के उद्देश्य समाज में भारतीय संस्कृति, मानव मूल्य, स्वास्थ्य, शिक्षा, गरीब महिला एवं बच्चों के सर्वांगीण विकास , स्वास्थ्य एवं पर्यावरण संरक्षण , मृदा संरक्षण , जल संरक्षण एवं प्राकृतिक एवं मानव जनित आपदाओ से संबंधित जानकारी एवं बचाव राहत कार्य करने एवं विद्यालय मैं बच्चों को राष्ट्र प्रेम देश प्रेम नैतिक एवं मानव मूल्यों पर कार्य करने हेतु प्रेरित करना जनजागरुकता कार्यक्रम करना एवं बच्चों एवं महिलाओं के समूह बनाकर उन्हें संगठित करना तथा सकारात्मक पहलू और सार्थक कार्यक्रमों के माध्यम से जीवन में बदलाव लाने सामाजिक चुनौतियों का सामना करने और मानव कल्याण को बढ़ावा देने के लिए प्रेरित / कार्य करता है"
  },



  // User Info
  "user-info-title": { en: "👤 Manager Information", hi: "👤 प्रबंधक जानकारी" },
  "label-fullname": { en: "Full Name", hi: "पूरा नाम" },
  "label-email": { en: "Email", hi: "ईमेल" },
  "label-phone": { en: "Phone", hi: "फ़ोन" },
  "label-country": { en: "Country", hi: "देश" },
  "label-role": { en: "Account Type", hi: "खाता प्रकार" },

  // Footer
  "footer-doodle-brand": { en: "VisionCast", hi: "विजनकास्ट" },
  "footer-doodle-rights": { en: "All rights are reserved", hi: "सर्वाधिकार सुरक्षित हैं" },
  "footer-doodle-team": { en: "by the VisionCast Team", hi: "VisionCast टीम द्वारा" },

  //latest news
   "trusted-users-text": { en: "Plus 253 Trusted users!", hi: "253+ विश्वसनीय उपयोगकर्ता!" },
  "hero-title": { en: "Latest <br><em> Updates</em>", hi: "नवीनतम <br><em> अपडेट्स</em>" },
  "hero-subtitle": { 
    en: "Inspiring lecture for 6th-12th graders on mastering life skills, sharpening focus, achieving academic goals, and embracing social responsibility.<br><br> Recognition and prizes for students demonstrating outstanding communication.", 
    hi: "Modivation lecture for class 6th to 12th.अपने जीवन को किस प्रकार बेहतर बनाए, एकाग्रता कैसे लाएं, शिक्षा का उद्देश्य, अपनी संस्कृति और समाज के लिए हमारा दायित्व आदि विषयों पर बच्चों को जागरूक किया।"
  },
  "explore-btn": { en: "Explore", hi: "अधिक जानकारी" },
  "product-text": { 
    en: "<br>Inspiring lecture<br>for 6th-12th graders", 
    hi: "6वीं से 12वीं<br>कक्षा के विद्यार्थियों<br>  के लिए प्रेरक व्याख्यान"
  },   "uploaded-title": { en: "Uploaded by HimSeva social service organization", hi: "हिमालय दर्शन सामाजिक सेवा संस्थान द्वारा अपलोड किया गया" },
    "uploaded-description": { 
        en: "All videos are verified and uploaded by the HIMALAYA DARSHAN social service organization Team — your trusted source for content.", 
        hi: "सभी वीडियो  हिमालय दर्शन एडमिन टीम द्वारा सत्यापित और अपलोड किए जाते हैं — आपका विश्वसनीय स्रोत।" 
    },
       
  
   
  // SECTION TITLE
  "meet-minds-title": { 
    en: "Meet the Minds Behind HIMALAYA DARSHAN<br>social service organization", 
    hi: "हिमालय दर्शन<br>सामाजिक सेवा संस्थान  के प्रेरक लोग" 
  },

  // TEAM MEMBERS
  "muna-name": { en: "BIPIN  PANDEY", hi: "बिपिन पांडे" },
  "muna-role": { en: "Founder & CEO", hi: "संस्थापक एवं प्रबंधक " },

  "mukul-name": { en: "MANOJ PANT", hi: "मनोज पंत" },
  "mukul-role": { en: "Secretary", hi: "सचिव" },

  "pooja-name": { en: "POOJA PANDEY", hi: "पूजा पांडे " },
  "pooja-role": { en: "Kosa President", hi: "कोसा अध्यक्ष" },

  // BRAND
  "brand-heading": { en: "HIMALAYA DARSHAN", hi: "हिमालय दर्शन" },
  "brand-tagline": { 
    en: "Serving humanity with hope, help & harmony", 
    hi: "मानवता की सेवा — आशा, सहायता और सौहार्द के साथ" 
  },


  // QUICK LINKS
  "quick-links-title": { en: "Quick Links", hi: "त्वरित लिंक" },

  "link-dashboard": { en: "Dashboard", hi: "डैशबोर्ड" },
  "link-feed": { en: "Feed", hi: "फ़ीड" },
  "link-upload": { en: "Upload", hi: "अपलोड" },
  "link-settings": { en: "Settings", hi: "सेटिंग्स" },

  // SUPPORT SECTION
  "support-title": { en: "Support", hi: "सहायता" },

  "support-himseva": { en: "HimSeva", hi: "हिमसेवा" },
  "support-report": { en: "Report an Issue", hi: "समस्या दर्ज करें" },
  "support-helpcenter": { en: "Help Center", hi: "सहायता केंद्र" },

  // COPYRIGHT
  "copyright-text": { 
    en: "© 2025 Himalaya Darshan. All rights reserved ❤️ by our dedicated team.",
    hi: "© 2025 हिमालय दर्शन। सभी अधिकार सुरक्षित ❤️ हमारी समर्पित टीम द्वारा।" 
  },

};




// Language toggle with font support
document.getElementById("langBtn").addEventListener("click", () => {
  isHindi = !isHindi;
  const lang = isHindi ? "hi" : "en";

  for (const id in translations) {
    const elem = document.getElementById(id);
    if (elem) {
        elem.innerHTML = translations[id][lang];

      // Apply font classes
      if (lang === "hi") {
        elem.classList.add("hindi-text");
        elem.classList.remove("english-text");
      } else {
        elem.classList.add("english-text");
        elem.classList.remove("hindi-text");
      }
    }
  }
});

document.querySelectorAll(".user").forEach(user => {

  user.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `<strong>${user.dataset.name}</strong><br>${user.dataset.role}`;
    document.body.appendChild(tooltip);
    user._tooltip = tooltip;
  });

  user.addEventListener("mousemove", (e) => {
    const tooltip = user._tooltip;
    if (!tooltip) return;

    // Smooth mouse follow 
    const x = e.pageX;
    const y = e.pageY - 60;

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    
    tooltip.style.opacity = 1;
    tooltip.style.transform = "translateY(0px) scale(1) rotateX(0deg)";
  });

  user.addEventListener("mouseleave", () => {
    const tooltip = user._tooltip;
    if (!tooltip) return;

    tooltip.style.opacity = 0;
    tooltip.style.transform = "translateY(12px) scale(0.85) rotateX(25deg)";
    
    setTimeout(() => tooltip.remove(), 300);
  });

});





const modal = document.getElementById("team-modal");
const closeBtn = document.querySelector(".close-modal");

function openModal(data) {
  // LEFT SIDE
  const imgEl = document.getElementById("modal-img");
  if (data.img) imgEl.src = data.img;
  else imgEl.removeAttribute('src');

  // social links (defensive)
  const fb = document.getElementById("modal-facebook");
  const ig = document.getElementById("modal-instagram");
  const li = document.getElementById("modal-linkedin");
  if (fb) fb.href = data.facebook || "#";
  if (ig) ig.href = data.instagram || "#";
  if (li) li.href = data.linkedin || "#";

  // RIGHT SIDE (name fallback to fullname)
  document.getElementById("modal-name").textContent = data.name || data.fullname || "";
  document.getElementById("modal-fullname").textContent = data.fullname || "";
  document.getElementById("modal-role").textContent = data.role || "";

  document.getElementById("modal-email").textContent = data.email || "";
  document.getElementById("modal-phone").textContent = data.phone || "";
  document.getElementById("modal-location").textContent = data.location || "";
  document.getElementById("modal-education").textContent = data.education || "";

  // BIO (typewriter — simple restart by toggling class)
  const bio = document.getElementById("modal-bio");
  bio.textContent = data.bio || "";
  // restart CSS typewriter if present
  bio.classList.remove("typewriter");
  void bio.offsetWidth;
  bio.classList.add("typewriter");

  // show modal (use flex-like centering)
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
}

/* TEAM DATA */
const teamMembers = {
  1: {
    img: "images\\bipin pandey.jpg",
    fullname: "Mr. Bipin chnadra pandey",
    role: "Founder/ Manager",
    email: "bipinpuja27@gmail.com",
    phone: "+91 9149677383",
    location: "Almora, Uttarakhand",
    education: "Bachelor of Arts in Social Science (BA)",
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/munajoshi",
    bio: " EX- CENTRAL RESERVE POLICE FORCE."
  },
  2: {
    img: "images\\mukul pant.jpg",
    fullname: "Mr. Manoj  kumar Pant",
    role: " Secretary ",
    email: "mukulmanojpant@gmail.com",
    phone: "+91 9456172997",
    location: "Almora, Uttarakhand",
    education: "Master of Science (Msc)",
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/mukulpant",
   
  },
  3: {
    img: "images\\pooja bhabhi.jpg",
    fullname: "Mrs. Pooja Pandey ",
    role: "Kosa President",
    email: "bipinpuja27@gmail.com",
    phone: "+91 9528604154",
    location: "Almora, Uttarakhand",
    education: "BA in Social Science",
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/riyasharma",
   
  }
};

/* Open modal on card click */
document.querySelectorAll(".team-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-member");
    if (teamMembers[id]) openModal(teamMembers[id]);
  });
});

/* Close modal */
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

/* Close when clicking outside content */
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* keyboard esc to close */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});
/* -------------------------------------------
      Smooth Apple-style Scroll Reveal
   ------------------------------------------- */
(function () {
  const revealElements = document.querySelectorAll("[data-reveal], .reveal");

  function revealOnScroll() {
    const winH = window.innerHeight;

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();

      // Reveal earlier for smoother Apple feel
      if (rect.top < winH - 80) {
        el.classList.add("visible");
      }
    });
  }

  // Run on scroll, resize, and initial load
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("resize", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  revealOnScroll();
})();

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".events-carousel");
  const cards = document.querySelectorAll(".event-card");

  if (!carousel || cards.length === 0) return;

  let index = 0;
  let autoSlide;

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index = (index + 1) % cards.length;
      carousel.scrollTo({
        left: cards[index].offsetLeft,
        behavior: "smooth"
      });
    }, 4000); // Change card every 4 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Start auto slide on mobile or desktop
  startAutoSlide();

  // Pause on hover (desktop)
  cards.forEach(card => {
    card.addEventListener("mouseenter", stopAutoSlide);
    card.addEventListener("mouseleave", startAutoSlide);
  });

  // Pause on touch (mobile)
  carousel.addEventListener("touchstart", stopAutoSlide);
  carousel.addEventListener("touchend", startAutoSlide);
});
