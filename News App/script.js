const API_KEY = "2e9413571ade47ac9f05338f61e31167";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));//load hote hain fetchNews wala function ko call kar dega

function reload() {
    window.location.reload();
}



async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);//fetch ek operator hain jo news api ke server par baitha hua hain aur hume news la ke deta hain
     const data = await res.json();//jo data mil raha hain usko json format main convert kar diya
     //actually promise hain na isliye async await ka use kar raha hain
     bindData(data.articles);
}

//basically hum chahate hain ki jitni news articles aaye utni cards bane...(clone)
//basically cards ka clone bana ke cards-container main daal rahe hongey
function bindData(articles){
      const cardsContainer = document.getElementById('cards-container');
      const newsCardTemplate = document.getElementById('template-news-id')

      cardsContainer.innerHTML = "";//html ko empty kar raha hu api call ke baad ..nahi toh sab news ek jagah pe ekhtta hota rahega
      //and will create a mess....after every api call
      articles.forEach((article) => {
        if(!article.urlToImage)return;//jo news jismain img nahi hain woh nahi show hoga
        const cardClone = newsCardTemplate.content.cloneNode(true);//deep cloning ho raha hain ..card ki andar jitne bhi elements hain sabka cloning hoga
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });

}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name}  ${date}`;

    //when we click on a card it should take us to that prticluar website
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");//blank matlab new tab
    });
}

let curSelectedNav = null;//cricket,finance,politics
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');//agar curSelectedNav null nahi hain toh usme se classList ko remove kardenge
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
    //taki we can click on other navItems...
}


const searchButton = document.getElementById("search-button");
const searchText =  document.getElementById("search-text");


searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query)return;//agar user ne kuch nahi likh ke search button pe click kar diya
    fetchNews(query);
    //jab main search bar main kuch search kar raha hu tab main nahi chahata ki navItems highlight ho..so I will remove the active class and make it null
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})

