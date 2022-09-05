const loadCategoris = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    showCategoris(data.data.news_category)
        .catch(error => console.log(error));



}
const showCategoris = (catagoris) => {



    const newsItem = document.getElementById('news-item')
    newsItem.innerHTML = ''
    newsItem.classList.add('comon')
    catagoris.forEach(catagory => {
        const li = document.createElement('div')
        li.innerHTML = `
 
        <button onclick="loadNews()
        " >${catagory.category_name}</button>

        `
        newsItem.appendChild(li)

    });

}


const loadNews = () => {

    const url = `https://openapi.programming-hero.com/api/news/category/01
`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));


}
const displayNews = (newsToday) => {

    togglespinner(true)
    const newsContainer = document.getElementById('news-box');
    newsContainer.innerHTML = ''

    newsToday.forEach(news => {


        const newsDiv = document.createElement('div');
        newsDiv.className = "card mb-3 bg-white p-4 mx-auto";
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
            </div>
            <div class="col-md-10 container-fluid">
                <div class="card-body d-flex flex-column h-100 justify-content-between">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 400 ? news.details.slice(0, 200) + '...' : news.details}</p>
                    
                    <div class="d-flex justify-content-between">
                        <div class="d-flex gap-2 align-items-center">
                            <img  style="width: 40px; height: 40px; border-radius: 50%;" src="${news.author.img}" alt="">
                            <p class="mt-2">${news.author.name ? news.author.name : "No Author Name Found"}</p>
                        </div>
                        <div class="d-flex gap-2">
                            <p><i class="fa-regular fa-eye"></i></p>
                            <p>${news.total_view ? news.total_view : 'no view'}</p>
                        </div>
                        
                        </div>
        
        
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetalis" onclick='buttonModal("${news._id}")'>Details</button>

        
    
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        `;
        newsContainer.appendChild(newsDiv);
    })




    togglespinner(false)

}






//spinners srction
const togglespinner = isLoasing => {
    const loadingsection = document.getElementById('load-spinner')
    if (isLoasing) {
        loadingsection.classList.remove('d-none')
    } else {
        loadingsection.classList.add('d-none')
    }
}


//modal section

const buttonModal = (newsId) => {

    const url = `https:openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)


    .then(res => res.json())
        .then(data => displayModal(data.data))

    .catch(error => console.log(error))

}


const displayModal = (modaldetalis) => {
    console.log(modaldetalis)

    const modalField = document.getElementById('newsDetalis')
    modalField.innerHTML = '';
    modaldetalis.forEach(details => {
        const modal = document.createElement('div');
        modal.innerHTML = `
        <div class="modal-content container mt-5">
        <div class="modal-header">
        <h5 class="modal-title d-block" id="newsDetalisLabel">${details.title?details.title:'no taitel found'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <p>${details.details.slice(0, 200)}</p>
        <div class="modal-body d-flex">
        <img src="${details.author.img}" class='img-fluid img-width h-100 my-auto rounded-circle w-25' alt="">
        <div>
        <h3 class='m-3'>${details.author.name ?details.author.name:'no name found'}</h3>
        <p class='m-3'>${details.author.published_date} </p>
        <h3 class='m-3'>total_view:${details.total_view?details.total_view:'no view'}</h3>
       </div>
        
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
        </div>
        </div>
        `;
        modalField.appendChild(modal)

    })

}









loadCategoris()