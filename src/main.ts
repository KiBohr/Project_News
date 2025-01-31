import ky from "ky";


//https://newsapi.org/v2/everything?q=bitcoin&sorttBy=publishedAt&language=en&apiKey=92ac5028ac31406c8f5489d027804072

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
        const articlesData = newsData.articles;
    } catch (err) {
        console.log(err);
    }
};