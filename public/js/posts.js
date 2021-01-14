async function getPosts() {
    return await fetch('http://localhost:4000/posts')
     .then((response) => response.json())
     .then((data) => data);
 }