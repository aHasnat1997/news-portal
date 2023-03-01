// news category
const newsCategoryFetch = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories').then(res => res.json()).then(data => categories(data.data.news_category));
};
// news category call
newsCategoryFetch();
const categories = data => {
  const container = document.getElementById('category-container');
  data.forEach(element => {
    container.innerHTML += `<li><a onclick="categoriesNews('${element.category_id}')" class="btn btn-ghost text-xl" href="#">${element.category_name}</a></li>`;
  });
};

// default news
const defaultNewsFetch = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/news/category/08');
  const data = await res.json();
  showNews(data.data);
};
// call default news
defaultNewsFetch();

// show categories news
const categoriesNews = category_id => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url).then(res => res.json()).then(data => showNews(data.data));
  console.log(url);
};


// card function
const showNews = data => {
  console.log(data.length);

  // if (data.length <= 0) {
  //   document.getElementById('news-not-found').classList.remove = 'hidden';
  // } else {
  //   document.getElementById('news-not-found').classList.add = 'hidden';
  // }

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  // data = data.slice(0, 2);

  data.forEach(element => {
    const { thumbnail_url, title, details, author, total_view, rating } = element;
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
            <button id="modal-btn" class="text-4xl btn btn-ghost"><i class="fa-solid fa-arrow-right-to-bracket"></i></button>
          </div>
        </div>
      </div>
    </div>
    `;
  });
};



