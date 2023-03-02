let selectedCategoryName = 'All News';
let selectedCategoryId = '08';

// spinner
const spin = isSpin => {
  if (isSpin) {
    document.getElementById('spinner').classList.remove('hidden');
  } else {
    document.getElementById('spinner').classList.add('hidden');
  }
};

// news category
const newsCategoryFetch = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories').then(res => res.json()).then(data => categories(data.data.news_category));
};

// news category call
newsCategoryFetch();


const categories = data => {
  const container = document.getElementById('category-container');
  data.forEach(element => {
    container.innerHTML += `<li><a onclick="categoriesNews('${element.category_id}', '${element.category_name}', '5')" class="btn btn-ghost text-xl" href="#">${element.category_name}</a></li>`;
  });
};

// show categories news
const categoriesNews = (category_id, category_name, limit) => {
  selectedCategoryName = category_name;
  selectedCategoryId = category_id;
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url).then(res => res.json()).then(data => {
    let news = data.data;
    console.log(limit);
    if (limit) {
      news = news.slice(0, +limit);
    }
    showNews(news, category_name);
  });
  spin(true);
  // loadMore(data, category_name);
  console.log(url, category_id, category_name);
};
// default news call
categoriesNews('08', 'All News', 5);

// card function
const showNews = (data, category_name) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  console.log(data.length, category_name);

  document.getElementById('number-of-news').innerText = data.length;
  document.getElementById('name-of-category').innerText = category_name;

  if (data.length == 0) {
    document.getElementById('news-not-found').classList.remove('hidden');
  } else {
    document.getElementById('news-not-found').classList.add('hidden');
  }


  if (data.length >= 5) {
    document.getElementById('load-more-btn').classList.remove('hidden');
  } else {
    document.getElementById('load-more-btn').classList.add('hidden');
  }


  data.forEach(element => {
    // console.log(element);
    const { thumbnail_url, title, details, author, total_view, rating, _id } = element;
    // const date = Date(author.published_date);

    // format date
    const date = new Date(author.published_date);
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T");

    cardContainer.innerHTML += `
    <div class="my-8">
      <div class="card lg:card-side bg-base-300 shadow-xl">
        <img class="rounded-none" src="${thumbnail_url}" alt="Album" />
        <div class="card-body flex flex-col gap-16">
          <div>
            <h2 class="card-title text-3xl">${title}</h2>
            <p>${details.slice(0, 300)}...</p>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-4 items-center">
              <img class="rounded-full w-16" src="${author.img ? author.img : 'https://xsgames.co/randomusers/avatar.php?g=female'}" alt="author" />
              <div>
                <p>${author.name ? author.name : 'No info'}</p>
                <p>${dateString ? dateString : 'No info'}</p>
              </div>
            </div>
            <div>
              <i class="fa-regular fa-eye"></i><span class="ml-2">${total_view ? total_view : 'No Info'}</span>
            </div>
            <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star-half-stroke"></i><span> ${rating.number ? rating.number : 'No Info'}</span>
            </div>
            <label for="my-modal-3" onclick="modalBtn('${_id}')" class="text-4xl btn btn-ghost"><i class="fa-solid fa-arrow-right-to-bracket"></i></label>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  spin(false);
};


// Load More
const loadMore = () => {
  
  categoriesNews(selectedCategoryId, selectedCategoryName);

};


// Modal 
function modalBtn(news_id) {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url).then(res => res.json()).then(data => loadModal(data.data[0]));

  // console.log(url);
}
// load modal
const loadModal = data => {
  console.log(data);
  const { image_url, title, details, author, total_view, rating } = data;
  const date = new Date(author.published_date);
  const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T");
  document.getElementById('modal-container').innerHTML = `
    <div class="modal-box max-w-5xl">
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div class="my-8">
        <div class="card">
          <img class="rounded-none" src="${image_url}" alt="Album" />
          <div class="card-body flex flex-col gap-16">
            <div>
              <h2 class="card-title text-3xl">${title}</h2>
              <p>${details}</p>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-4 items-center">
                <img class="rounded-full w-16"
                  src="${author.img ? author.img : 'https://xsgames.co/randomusers/avatar.php?g=female'}"
                  alt="author" />
                <div>
                  <p>${author.name ? author.name : 'No info'}</p>
                  <p>${dateString ? dateString : 'No info'}</p>
                </div>
              </div>
              <div>
                <i class="fa-regular fa-eye"></i><span class="ml-2">${total_view ? total_view : 'No Info'}</span>
              </div>
              <div>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star-half-stroke"></i>
                <span> ${rating.number ? rating.number : 'NoInfo'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
