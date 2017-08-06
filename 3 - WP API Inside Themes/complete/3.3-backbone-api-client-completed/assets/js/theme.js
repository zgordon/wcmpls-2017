(function() {

    const   container = document.getElementById( 'main' );

    (function init(){
        getPosts();
    })();

    function getPosts() {

        // Set posts to: new wp.api.collections.Posts()
        let posts = new wp.api.collections.Posts();

        posts.fetch({
            data: {
                per_page: 3
            }
        })
        .done( () => {
            
            container.innerHTML = '';
            
            // Pass in post.attributes to createHeader()
            posts.each( post => {
                createHeader( post.attributes );
            });                        

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

        // Pass in the id to wp.api.models.Post
        let id = event.target.dataset.id,
            post = new wp.api.models.Post( { id } );

        post.fetch()
        .done( () => {
        
            container.innerHTML = '';            
            // Pass in post.attributes to showPost()            
            showPost( post.attributes );

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
})();
