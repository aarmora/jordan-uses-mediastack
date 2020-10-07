import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// For specifics such as allows countries, languages see documentation - https://mediastack.com/documentation

(async () => {
    const keyword = 'javascript';

    await getLiveNews(keyword);


})();

/**
 * Available on: All plans.
 * View all options here - https://mediastack.com/documentation#live_news
 * categories has specific categories that must be used. See above documentation.
 * countries listed here - https://mediastack.com/sources
 * 
 * @param keyword string Can be comma separated and have negative keyword "tennis,-pizza"
 * @param categories string Optional. Can be comma separated and have negative keyword "sports,-business"
 */
async function getLiveNews(keyword: string, categories?: string) {
    let url = `http://api.mediastack.com/v1/news?access_key=${process.env.mediaStackAccessKey}&keywords=${keyword}
        &countries=us`;

    if (categories) {
        url += `&categories=${categories}`;
    }

    const axiosResponse = await axios.get(url);

    console.log('Axios response from getting live news', axiosResponse.data.data.length,
        axiosResponse.data.data[0], axiosResponse.data.data[7]);

    return axiosResponse.data;
}



/**
 * Available on: Standard Plan and higher.
 * This allows you to search a specific endpoint.
 * View all options here - https://mediastack.com/documentation#historical_news
 * 
 * @param keyword string Can be comma separated and have negative keyword "tennis,-pizza"
 * @param date string YYYY-MM-DD "2020-07-04"
 * @param categories string Optional. Can be comma separated and have negative keyword "tennis,-pizza"
 */
async function getHistoricalNews(keyword: string, date: string, categories?: string) {
    let url = `http://api.mediastack.com/v1/news?access_key=${process.env.mediaStackAccessKey}&keywords=${keyword}
        &countries=us&date=${date}`;

    if (categories) {
        url += `&categories=${categories}`;
    }

    const axiosResponse = await axios.get(url);

    console.log('Axios response from getting live news', axiosResponse.data.data.length,
        axiosResponse.data.data[0], axiosResponse.data.data[7]);

    return axiosResponse.data;
}

/** 
 * Available on: All Plans.
 * This allows you to specify the sources from which you wish query.
 * View all options here - https://mediastack.com/documentation#news_sources
 * 
 * Currently this function here only returns the first result
 * @param search string 
 */
async function getNewsSource(search: string) {
    const url = `http://api.mediastack.com/v1/sources?access_key=${process.env.mediaStackAccessKey}&search=${search}
        &countries=us`;
    const axiosResponse = await axios.get(url);


    // Only returning the first result
    return axiosResponse.data.data[0];

}