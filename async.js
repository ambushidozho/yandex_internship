function solution({ urls, fetcher, maximumRetryCount }) {

    const MAX_SIMULTANEOUS_REQUESTS = 10;
    const RATE_LIMIT = 100;
    let results = [];
    let batches = [];

    for (let i = 0; i < urls.length; i += MAX_SIMULTANEOUS_REQUESTS) {
        batches.push(urls.slice(i, i + MAX_SIMULTANEOUS_REQUESTS));
    }

    async function makeRequest(url, maximumRetryCount) {
        try {
            return await fetcher(url);
        } catch (error) {
            if (maximumRetryCount > 0) {
                return makeRequest(url, maximumRetryCount - 1);
            } else {
                return null;
            }
        }
    }

    async function processBatch(batch, results) {
        for (const url of batch) {
            const result = await makeRequest(url, maximumRetryCount);
            if (result) {
                results.push(result);
            }
        }
        await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT));
    }

    async function executeBatches() {
        for (const batch of batches) {
            await processBatch(batch, results);
        }
    }

    return new Promise((resolve, reject) => {
        executeBatches()
            .then(() => resolve(results))
            .catch((error) => reject(error));
    });
}

// solution({
//     urls: ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2', 'https://jsonplaceholder.typicode.com/posts/3'],
//     fetcher: (url) => Promise.resolve(url),
//     maximumRetryCount: 1
// })
// .then((result) => console.log(result));

solution({
    urls: ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2', 'https://jsonplaceholder.typicode.com/posts/3'],
    fetcher: (url) => {
        return url.includes("2") ? Promise.reject(url) : Promise.resolve(url);
    },
    maximumRetryCount: 3
})
    .then((result) => console.log(result));


    // todo проверять одинаковые урлы и обработку ошибок