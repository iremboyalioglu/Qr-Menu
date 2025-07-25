// data.json dosyasını çek ve menüyü oluştur
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const menuDiv = document.getElementById('menu');
    const categoryDiv = document.getElementById('category-container');

    const categories = [...new Set(data.map(item => item.category))];
    categories.unshift("All");

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.className = 'category-button';
      if (cat === "All") btn.classList.add("active");
      btn.addEventListener('click', () => {
        document.querySelectorAll(".category-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        showMenu(cat === "All" ? data : data.filter(i => i.category === cat));
      });
      categoryDiv.appendChild(btn);
    });

    function showMenu(items) {
      menuDiv.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.innerHTML = `
          <img src="images/${item.image}" alt="${item.tr}">
          <div class="info">
            <h3>${item.tr}</h3>
            <p>${item.en}</p>
          </div>
          <div class="price">${item.price}</div>
        `;
        menuDiv.appendChild(card);
      });
    }

    showMenu(data);
  })
  .catch(err => console.error('Veri yükleme hatası:', err));
