document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".contact-btn");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const productGrid = document.querySelector(".product-grid");
    const searchInput = document.getElementById("productSearch");
  
    // WhatsApp Order Logic
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".product-card");
        const name = card.dataset.name;
        const id = card.dataset.id;
  
        const phone = "+2348110237267"; // Replace with your real WhatsApp number
        const message = `Hi, I'm interested in ordering *${name}* (ID: #${id}). Is it still available?`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
        window.open(url, "_blank");
      });
    });
  
    // Category Filter Logic
    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        const category = button.dataset.category;
  
        productCards.forEach(card => {
          const match = card.dataset.category === category || category === "all";
          card.style.display = match ? "block" : "none";
        });
      });
    });
  
    // Search Logic - Move Matches to Top
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const cards = Array.from(productCards);
      const matched = [];
      const unmatched = [];
  
      cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        if (name.includes(query)) {
          card.style.display = "block";
          matched.push(card);
        } else {
          card.style.display = "none";
          unmatched.push(card);
        }
      });
  
      // Reorder the product grid: matches on top
      productGrid.innerHTML = "";
      matched.forEach(card => productGrid.appendChild(card));
      unmatched.forEach(card => productGrid.appendChild(card));
    });
      // Auto-count categories and update the buttons
const updateCategoryCounts = () => {
    const categoryCounts = {
      all: productCards.length,
    };
  
    productCards.forEach(card => {
      const category = card.dataset.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  
    categoryButtons.forEach(button => {
      const category = button.dataset.category;
      const countSpan = button.querySelector(".count");
      if (countSpan) {
        countSpan.textContent = `(${categoryCounts[category] || 0})`;
      }
    });
  };
  
  // Call this after everything loads
  updateCategoryCounts();
  
  });