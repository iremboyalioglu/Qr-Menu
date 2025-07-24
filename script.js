// data.json dosyasını çek ve menüyü oluştur
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const menuDiv = document.getElementById('menu');
    data.forEach(item => {
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
  })
  .catch(err => console.error('Veri yükleme hatası:', err));
