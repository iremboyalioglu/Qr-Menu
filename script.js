// script.js

// Global değişkenler
let menuData = [];
let selectedCategory = null;
let selectedSubcategory = null;

// DOM öğelerini seç
const categoryContainer = document.getElementById("category-buttons");
const subcategoryContainer = document.getElementById("subcategory-buttons");
const menuContainer = document.getElementById("menu-container");
const searchInput = document.getElementById("search");

// Başlangıçta veri yükle
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    menuData = data;
    renderCategoryButtons();
    renderMenuItems(menuData);
  });

// Ana kategori butonlarını oluştur
function renderCategoryButtons() {
  const categories = [...new Set(menuData.map((item) => item.category))];
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.onclick = () => {
      selectedCategory = category;
      selectedSubcategory = null;
      renderSubcategoryButtons();
      filterAndRender();
    };
    categoryContainer.appendChild(btn);
  });
}

// Alt kategori butonlarını oluştur
function renderSubcategoryButtons() {
  const subcategories = [
    ...new Set(
      menuData
        .filter((item) => item.category === selectedCategory)
        .map((item) => item.subcategory)
    ),
  ];
  subcategoryContainer.innerHTML = "";
  subcategories.forEach((subcategory) => {
    const btn = document.createElement("button");
    btn.textContent = subcategory;
    btn.onclick = () => {
      selectedSubcategory = subcategory;
      filterAndRender();
    };
    subcategoryContainer.appendChild(btn);
  });
}

// Türkçe karakterleri normalize eden fonksiyon
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/İ/g, 'i')
    .trim();
}

// Arama inputu her değiştiğinde çalışır
searchInput.addEventListener("input", filterAndRender);

// Filtreleme ve menü öğelerini render etme
function filterAndRender() {
  const keyword = normalize(searchInput.value);
  let filtered = menuData;

  if (selectedCategory) {
    filtered = filtered.filter((item) => item.category === selectedCategory);
  }

  if (selectedSubcategory) {
    filtered = filtered.filter(
      (item) => item.subcategory === selectedSubcategory
    );
  }

  if (keyword) {
    filtered = filtered.filter((item) => {
      const tr = item.tr ? normalize(item.tr) : "";
      const en = item.en ? normalize(item.en) : "";
      return tr.includes(keyword) || en.includes(keyword);
    });
  }

  renderMenuItems(filtered);
}

// Menü öğelerini kart olarak render et
function renderMenuItems(items) {
  menuContainer.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-card fade-in";

    card.innerHTML = `
      <img src="images/${item.image}" alt="${item.tr}" />
      <div class="menu-info">
        <strong>${item.tr}</strong><br />
        <em>${item.en}</em>
      </div>
      <div class="price">${item.price}</div>
    `;

    menuContainer.appendChild(card);
  });
}
