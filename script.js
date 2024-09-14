const apiUrls = {
    topStories: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    newStories: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
    bestStories: 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty',
    askStories: 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty',
    jobStories: 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty'
};

let currentIndex = 0;
let tbody = document.getElementById('posts');

async function fetchAndDisplayStories(url) {
    try {
        const response = await fetch(url);
        const storyIds = await response.json();


        const storyPromises = storyIds.slice(currentIndex, currentIndex + 10).map(storyId =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
            .then(res => res.json())
        );
        const stories = await Promise.all(storyPromises);
        for (let i = 0; i < stories.length; i++) {
            const story = stories[i];
            const row = document.createElement("div");
            row.innerHTML = `
                <div class="post">
                    <h3><a href="${story.url}" target="_blank">${story.title}</a></h3>
                    <p>${story.text || ''}</p>
                    <p>By ${story.by} | Score: ${story.score}</p>
                    <p>Type: ${story.type}</p>
                </div>`;
            tbody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching stories:', error);
    }
}


document.getElementById('topStories').addEventListener('click', () => {
    currentIndex = 0;
    tbody.innerHTML = '';
    fetchAndDisplayStories(apiUrls.topStories);
});
document.getElementById('newStories').addEventListener('click', () => {
    currentIndex = 0;
    tbody.innerHTML = '';
    fetchAndDisplayStories(apiUrls.newStories);
});
document.getElementById('bestStories').addEventListener('click', () => {
    currentIndex = 0;
    tbody.innerHTML = '';
    fetchAndDisplayStories(apiUrls.bestStories);
});
document.getElementById('askStories').addEventListener('click', () => {
    currentIndex = 0;
    tbody.innerHTML = '';
    fetchAndDisplayStories(apiUrls.askStories);
});
document.getElementById('jobStories').addEventListener('click', () => {
    currentIndex = 0;
    tbody.innerHTML = '';
    fetchAndDisplayStories(apiUrls.jobStories);
});
document.getElementById('load-more').addEventListener('click', () => {
    currentIndex += 10;
    fetchAndDisplayStories(apiUrls.topStories, currentIndex);
});

fetchAndDisplayStories(apiUrls.topStories);