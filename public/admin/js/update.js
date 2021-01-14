{
    let updateBtn = document.querySelector('.articles');

    let updateForm = document.querySelector('.update-post-form');
    let titleInp = document.querySelector('#update-title');
    let countryInp = document.querySelector('#update-country');
    let imageInp = document.querySelector('#update-image-url');
    let textInfo = document.querySelector('#update-text');
    let id;



    articlesBlock.addEventListener('click', async function(e){


        if(e.target.classList.contains('btn-update')){

           id = e.target.parentNode.parentNode.querySelector('.id').value;

           let postInfo = await fetch('http://localhost:4000/posts/'+ id)
            .then((resp) => resp.json())
            .then((data) =>  data)

            
            titleInp.value = postInfo.title;

            
            countryInp.value = postInfo.country;

            
            // imageInp.value = postInfo.imageURL;

            
            textInfo.value = postInfo.text;

            let articlesTab = document.getElementById('v-pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');
            
            let updateTab = document.getElementById('v-pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');

        
        };
    })


    updateForm.addEventListener('submit', function(e){
        e.preventDefault();
        fetch('http://localhost:4000/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInp.value,
                country: countryInp.value,
                // imageUrl: imageInp.value,
                text: textInfo.value,
                description: textInfo.value.substring(0, textInfo.value.indexOf('.') + 1 )
            })
        }).then((resp) => resp.text())
        .then(() => window.history.go())
    })

}