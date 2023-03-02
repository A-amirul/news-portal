let fetchData = [];

const loadCategories = () => {
	const url = "https://openapi.programming-hero.com/api/news/categories"
	fetch(url).then(res => res.json())
		.then(data => showCatagories(data.data.news_category));
}

const showCatagories = (data) => {
	// console.log(data);
	data.forEach(element => {
		// console.log(element.category_name);

		const newsContainer = document.getElementById('news-container');
		const newsDiv = document.createElement('div');
		newsDiv.innerHTML = `
		 <a href="#" onclick="fetchCategoriesNews('${element.category_id}','${element.category_name}')" class="text-decoration-none">${element.category_name}</a>
		`;
		newsContainer.appendChild(newsDiv);
	});
}


const fetchCategoriesNews = (category_id, category_name) => {
	const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
	fetch(url).then(res => res.json())
		.then(data => {
			fetchData = data;
			showCategoriesNews(data.data, category_name)
		});
}

const showCategoriesNews = (data, category_name) => {
	// console.log(data, category_name);
	// news count according to category
	const newsCount = document.getElementById('news-count').innerText = data.length;
	// dynamic category name
	const categoryName = document.getElementById('category-name').innerText = category_name;
	// all news container
	const allNews = document.getElementById('all-news');
	allNews.innerHTML = "";
      console.log(data);
	   data.forEach(singleNews => {
		// console.log(singleNews.author.image_url);
		// const { image_url, title, details, author, total_view } = singleNews; //singleNews নিচের থেকে বাদ দিতে পারি।
		const card = document.createElement('div', 'mb-3');
		card.innerHTML = `
         <div class="row g-3 mb-2 mt-3">
          <div class="col-md-4">
            <img class="img-fluid h-100" src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${singleNews.title}</h5>
              <p class="card-text">${singleNews.details.slice(0, 300)}...</p>

            </div>

			<section class="d-flex justify-content-between">

			  <div class="d-flex gap-2">
				<img src="${singleNews.author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">

				<div>
				    <p class="m-0 p-0">${singleNews.author.name? singleNews.author.name:"not available"}</p>
		            <p class="m-0 p-0"><small>${singleNews.author.published_date}</small></p>

				</div>

			  </div>

			  <div class="d-flex align-items-center gap-2">
			     <i class="fas fa-eye"></i>
				 <p class="m-0 p-0">${singleNews.total_view? singleNews.total_view:"not available"}</p>
			  </div>
			  <div class="d-flex align-items-center">
			      <i class="fas fa-star"></i>
			  </div>
			  <div class="d-flex align-items-center">
			      <i class="fas fa-arrow-right" onclick="fetchNewsDetails('${singleNews._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
			  </div>

			  </section>
          </div>
        </div>
		`;
		allNews.appendChild(card);




	})

}

const fetchNewsDetails = news_id => {
	const url = `https://openapi.programming-hero.com/api/news/${news_id}`
	fetch(url).then(res => res.json())
		.then(data => showNewsDetail(data.data[0]));
}

const showNewsDetail = newsDetail => {
	console.log(newsDetail);
	const modalBOdy = document.getElementById('exampleModal');
	const modalDiv = document.createElement('div');
	modalDiv.classList.add('modal-dialog');
	modalDiv.innerHTML = `
	<div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              ${newsDetail.title}<span class="badge text-bg-warning">${newsDetail.others_info.is_trending?"trending":"not trending"}</span>
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body">
		  <div class="col-md-12">
            <img class="img-fluid h-100" src="${newsDetail.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
		  <p>${newsDetail.details}</p> 
		  <section class="d-flex justify-content-between">

			  <div class="d-flex gap-2">
				<img src="${newsDetail.author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">

				<div>
				    <p class="m-0 p-0">${newsDetail.author.name? newsDetail.author.name:"not available"}</p>
		            <p class="m-0 p-0"><small>${newsDetail.author.published_date}</small></p>

				</div>

			  </div>

			  <div class="d-flex align-items-center gap-2">
			     <i class="fas fa-eye"></i>
				 <p class="m-0 p-0">${newsDetail.total_view? newsDetail.total_view:"not available"}</p>
			  </div>
			  <div class="d-flex align-items-center">
			      <i class="fas fa-star"></i>
			      
			  </div>

			  </section>

		  
		  </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            
          </div>
        </div>
	
	`;
	modalBOdy.appendChild(modalDiv);	

}

const showTrending = () => {
	console.log(fetchData);
	const trendingNews = fetchData.data.filter(singleData => singleData.others_info.is_trending === true);
	const categoryName = document.getElementById("category-name").innerText;
	showCategoriesNews(trendingNews,categoryName);
}

loadCategories();