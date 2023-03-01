// news category
const newsCategoryFetch = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories').then(res => res.json()).then(data => categories(data.data.news_category));
};
const categories = data => {
  // console.log(data);
  const container = document.getElementById('category-container');
  data.forEach(element => {
    // console.log(element.category_name);
    container.innerHTML += `<li><a class="btn btn-ghost text-xl" href="#">${element.category_name}</a></li>`;
  });
};
// news category call
newsCategoryFetch();

// all news
const allNewsFetch = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/news/category/08');
  const data = await res.json();
  showNews(data.data);
};
const showNews = data => {
  console.log(data);
  const cardContainer = document.getElementById('card-container');
  data.forEach(element => {
    cardContainer.innerHTML += `
    <div class="my-8">
      <div class="card lg:card-side bg-base-300 shadow-xl">
        <img class="rounded-none" src="https://i.ibb.co/QnwC4sG/unsplash-Eh-Tc-C9s-YXsw-11.png" alt="Album" />
        <div class="card-body flex flex-col gap-16">
          <div>
            <h2 class="card-title text-3xl">Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid
              Package Yet</h2>
            <p>Wednesday, August 24, 2022 | Tag Cloud Tags: Biden, EU, Euro, Europe, Joe Biden, Military, News, Russia,
              Security, UK, Ukraine, United States, Worthy News (Worthy News) - U.S. President Joe Biden...</p>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-4 items-center">
              <img class="rounded-full w-16" src="https://xsgames.co/randomusers/avatar.php?g=male" alt="author" />
              <div>
                <p>Jimmy Dane</p>
                <p>2022-08-24 17:27:34</p>
              </div>
            </div>
            <div>
              <i class="fa-regular fa-eye"></i><span class="ml-2">488</span>
            </div>
            <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star-half-stroke"></i><span> 4.5</span>
            </div>
            <button id="modal-btn" class="text-4xl btn btn-ghost"><i class="fa-solid fa-arrow-right-to-bracket"></i></button>
          </div>
        </div>
      </div>
    </div>
    `;
  });
};

allNewsFetch();

