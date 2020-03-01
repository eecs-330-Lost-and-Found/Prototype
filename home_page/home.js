document.getElementById("user_name").innerHTML="Hi, Joe";

const loadCards = (photos) => {
    console.log(photos);

    for(const tem of photos){

    template = `
    	<div><h1>${tem[1]}</h1></div>
        <article>
            <div class="image" style="background-image:url('${tem[0]}')">
            </div>
            
        </article>
    `;
    document.querySelector('.cards').innerHTML += template;
    }
};

loadCards([
    ['images/pink_iphone.jpg','pink_iPhone'],
    ['images/yellow_backpack.jpg','yellow_backpack'],
    ['images/blue_watch.jpg','blue_watch']
]);