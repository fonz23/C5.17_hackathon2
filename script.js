var flag = 0;
var genreId;
var button;

function clickHandler(btn){
    if(flag===0){
    flag+=1;
    button = btn;
    genreId = parseInt($(btn).attr('id'));
    var tempUrl = 'https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=b09e8ebef5593dfec03034ec1ab31d35&language=en-US&include_adult=false&sort_by=created_at.desc';
    $('body').css('background-image','url("https://images4.alphacoders.com/113/thumb-1920-113576.jpg")');
    
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: tempUrl,
        success: function(result) {
            var random = Math.floor((Math.random() * 20) + 1);
            var movieTitle = result.results[random].original_title;
            var vote_average = result.results[random].vote_average;
            var release = result.results[random].release_date;
            youtubeApi(movieTitle, vote_average, release);

        },
        error: function(error) {
            console.log("There was an error for retrieval");
        }
    });
    }
}

function showGenre(img) {
    var id = $(img).attr('id');
    switch (id) {
        case '28':
            $('body').css("background-image", 'url("Assets/action.jpg")');
            break;
        case '35':
            $('body').css('background-image', 'url("Assets/comedy.png")');
            break;
        case '27':
            $('body').css('background-image', 'url("Assets/horror.jpg")');
            break;
        case '53':
            $('body').css('background-image', 'url("Assets/thriller.png")');
            break;
        case '878':
            $('body').css('background-image', 'url("Assets/Scifi.jpg")');
            break;
        case '16':
            $('body').css('background-image', 'url("Assets/animation.jpg")');
            break;
        case '37':
            $('body').css('background-image', 'url("Assets/Western.jpg")');
            break;
        case '10751':
            $('body').css('background-image', 'url("Assets/family.jpg")');
            break;
        case '9648':
            $('body').css('background-image', 'url("Assets/msty.jpg")');
            break;
        case '10749':
            $('body').css('background-image', 'url("Assets/romance.jpg")');
            break;
        case '18':
            $('body').css('background-image', 'url("Assets/darama.jpg")');
            break;
    }
}

function hideVideo() {
    $('body').css('background-image', '');
    $('section').html('');

}

function youtubeApi(movie, average, release) {
    var movieTitle = movie;
    var vote_average = average;
    var releaseDate = release;
    var title = {
        q : '' + movieTitle + 'trailer',
        maxResults: 1
    };

    $.ajax({
        dataType: 'json',
        method: 'POST',
        data: title,
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function(result) {
            var container = $('<div>').attr('id', 'description_container');
            var url = "https://www.youtube.com/v/"+ result.video[0].id;
            var title = $('<h3>').attr('id', 'title').text(movieTitle);
            var date = $('<h5>').attr('id', 'release').text('Release Date: ' + releaseDate);
            var embed = $('<embed>').attr("src", url).attr('id', 'movie');
            var new_div = $('<div>').attr('id', 'new_div');
            var vote = $('<h5>').text('IMDB Rating: ' + vote_average + ' / 10');
            $('#whole_container').replaceWith(new_div);
            $('#new_div').replaceWith(new_div);
            $(new_div).append(title);
            $(new_div).append(embed);
            $(new_div).append(container);
            $('#description_container').append(vote);
            $('#description_container').append(date);
            itunesApi(movieTitle);
        },
        error: function(err) {
            console.log("There was an error");
        }
    });
}

function itunesApi(title){
    var url2 = 'https://itunes.apple.com/search?term=';
    var arr = title.split(' ');
    var url=arr[0];
    for(var i = 1; i < arr.length; i++) {
        url2 = url2 + url + '+' + arr[i];
    }
    $.ajax ({
    dataType: 'json',
    method: 'GET',
    data: url2,
    url: 'https://itunes.apple.com/search?term=' + title + '+movie',
    success: function(result){
        var price = result.results[0].trackPrice;
        var longDescription = result.results[0].longDescription;
        var descript = $('<h5>').attr('id','longDescription').text(longDescription);
        var rating = result.results[0].contentAdvisoryRating;
        var ratingDisplay = $('<h5>').text('Parental Advisory: ' + rating);
        var priceDisplay = $('<h5>').text("Available on Itune's $" + price);
        var bigBtn = $('<button>').text('SOMETHING ELSE!').on('click',redoSearchWithinGenre);
        var bigBtn1 = $('<button>').text('GO BACK!').on('click',reloadHome);
        
        $('#description_container').append(priceDisplay);
        $('#description_container').append(descript);
        $('#description_container').append(bigBtn);
        $('#description_container').append(ratingDisplay);
        $('#description_container').append(bigBtn1);
        
    },
    error: function(){
        console.log("ITUNE'S ERROR");
    }
});
}

function redoSearchWithinGenre(){
    flag = 0;
    clickHandler(button);
}

function reloadHome(){
    window.location.reload();
}