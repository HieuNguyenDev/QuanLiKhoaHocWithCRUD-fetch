let postApi = 'https://jsonplaceholder.typicode.com/posts'

fetch(postApi)
    .then(response => {
        return response.json()
    })
    .then(posts => {
        let htmls = posts.map(post => {
            return `<li>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </li>`
        })
        document.querySelector('#posts-block').innerHTML = htmls.join('')
    })