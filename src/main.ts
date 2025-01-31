import ky from "ky";

//interfaces für Data
interface newsData {
    status: string,
    totalResults: number,
    articles: Article []
};

interface Article {
    source: {
        id: string | null,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
};

//fetch with paramaeters and ky
async function fetchNewsData (searchTerm:string, sortBy: string, language:string) {
    try {
        const newsData = await ky.get<newsData>(`https://newsapi.org/v2/everything?q=${searchTerm}&sorttBy=${sortBy}&${language}=en&apiKey=92ac5028ac31406c8f5489d027804072`).json();
        return newsData.articles;
        //console.log(articlesData);
        
    } catch (err) {
        console.log(err);
        //um das undefined vom Promie loszuwerden
        return []
    };
};



//HTML Elemente installieren
const inputElement = document.querySelector<HTMLInputElement>("#search-input");
const selectLanguageElement = document.querySelector<HTMLSelectElement>("#language");
const selectSortByElement = document.querySelector<HTMLSelectElement>("#sort");
const buttonElement = document.querySelector("#search-button");
const outputSectionElement = document.querySelector("#output-news");


//Funktion, die Elemente in die Dom rendert
function renderNewsData(articles: Article []) {
    if (inputElement && selectLanguageElement && selectSortByElement  && outputSectionElement) {
        articles.forEach((article: Article) =>{
            const newArticleElement = document.createElement("article")
            newArticleElement.className = `bg-amber-100 p-6 rounded-b-sm flex flex-col items-center`
            newArticleElement.innerHTML = `
            <h2 class="text-2xl">${article.title}</h2>
            <p class="text-[0.9rem]">${article.author}</p>
            <p>${article.description}</p>
            <div class="h-70 w-100">
                <img class="object-cover rounded-sm" src="${article.urlToImage}" alt="picture of the article">
            </div>
            <a href="${article.url}">link to the article</a>`

            outputSectionElement.appendChild(newArticleElement)
        })
    };
}; 


// Eventlistener, der renderNewsData auslöst
if (buttonElement && inputElement && selectLanguageElement && selectSortByElement && outputSectionElement) {
    buttonElement.addEventListener("click", async (event)=> {
        event.preventDefault();
        outputSectionElement.innerHTML = "";
        const inputValue = inputElement.value;
        const selectLanguageValue = selectLanguageElement.value;
        const selectSortByValue = selectSortByElement.value;

        const newsData = await fetchNewsData(inputValue, selectSortByValue, selectLanguageValue)

        renderNewsData(newsData);
    });
};