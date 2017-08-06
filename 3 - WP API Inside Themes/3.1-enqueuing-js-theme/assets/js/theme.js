// Set the URL equal to jsforwp_globals.rest_url
const   container = document.getElementById( 'main' ),
        wpRestUrl = jsforwp_globals.rest_url;

(function init(){

    getPosts();

})();

function getPosts() {

axios({
    method: 'get',
    url: wpRestUrl + 'wp/v2/posts',
    params: {
        per_page: 3
    }
})
    .then( function( response ) {

        container.innerHTML = '';

        for( post of response.data ) {
            createHeader( post );
        }

        let links = document.querySelectorAll( '#main h2 a' );        
        for( link of links ) {
            link.addEventListener( 'click', getPost );
        }        

    }); 

}

function createHeader( post ) {

    let h2 = document.createElement( 'h2' ),
        markup = '';        

    markup += `<a href="#${post.link}" data-id="${post.id}">`;
    markup += post.title.rendered;
    markup += '</a>';

    h2.innerHTML = markup;
    container.appendChild( h2 );  

}

function getPost( event ) {

    let id = event.target.dataset.id;

    axios({
        method: 'get',
        url: wpRestUrl + 'wp/v2/posts/' + id
    })
        .then( function( response ) {   

            // Clear the page
            container.innerHTML = '';              

            // Pass response.data as a parameter to the showPost function
            showPost( response.data );                
        }); 

}        

function showPost( post ) {

    let article = document.createElement('article'),
        markup = '';
    
    article.classList.add( 'post' );
    
    markup += '<p><a class="back" href="#">Go Back</a></p>';
    markup += `<h1>${post.title.rendered}</h1>`;
    markup += `<div class="entry-content">${post.content.rendered}</div>`;                        

    article.innerHTML = markup;

    article.querySelector( '.back' ).addEventListener( 'click', getPosts );

    container.appendChild( article );

}