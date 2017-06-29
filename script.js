/**
 * Created by sunoobertsch on 6/28/17.
 */
function clickHandler(btn){
    var genreId = parseInt($(btn).attr('id'));

    var tempUrl = 'https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=b09e8ebef5593dfec03034ec1ab31d35&language=en-US&include_adult=false&sort_by=created_at.desc';

    console.log(genreId);
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: tempUrl,
        success: function(result) {

            console.log('Retrieval Success');
            console.log(result);

            var random = Math.floor((Math.random() * 20) + 1);
            var movieTitle = result.results[random].original_title;
            var vote_average = result.results[random].vote_average;
            var release = result.results[random].release_date;
            console.log('Click succeeded');
            youtubeApi(movieTitle, vote_average, release);


        },
        error: function(error) {
            console.log("There was an error for retrieval");
        }
    });
}

function showGenre(img) {
    var id = $(img).attr('id');
    switch (id) {
        case '28':
            $('body').css("background-image", 'url("https://images5.alphacoders.com/611/thumb-1920-611946.jpg")')
            break;
        case '35':
            $('body').css('background-image', 'url("http://images.fanpop.com/images/image_uploads/dodgeball-dodgeball-3A-a-true-underdog-story-200345_900_600.jpg")')
            break;
        case '27':
            $('body').css('background-image', 'url("https://images8.alphacoders.com/801/thumb-1920-801032.jpg")')
            break;
        case '53':
            $('body').css('background-image', 'url("https://images6.alphacoders.com/524/thumb-1920-524997.jpg")')
            break;
        case '878':
            $('body').css('background-image', 'url("http://www.hdwallpapers.in/walls/alien_vs_predator-HD.jpg")')
            break;
        case '16':
            $('body').css('background-image', 'url("http://www.hdwallpapersfreedownload.com/uploads/large/cartoons/disney-toy-story-1-2-3-free-hd-wallpaper.jpg")')
            break;
        case '37':
            $('body').css('background-image', 'url("http://images4.fanpop.com/image/photos/18000000/Christian-Bale-as-Dan-Evans-3-10-to-yuma-18071755-2560-1700.jpg")')
            break;
        case '10751':
            $('body').css('background-image', 'url("http://images6.fanpop.com/image/photos/36300000/Home-Alone-2-Lost-in-New-York-image-home-alone-2-lost-in-new-york-36366311-1280-688.jpg")')
            break;
        case '9648':
            $('body').css('background-image', 'url("http://theredlist.com/media/database/films/cinema/1990/seven/001-seven-theredlist.jpg")')
            break;
        case '10749':
            $('body').css('background-image', 'url("https://umad.com/img/2015/8/the-notebook-desktop-wallpaper-8038-8385-hd-wallpapers.jpg")')
            break;
        case '80':
            $('body').css('background-image', 'url("http://media5.starkinsider.com/wordpress/wp-content/uploads/2015/03/Goodfellas-Tribeca-Film-Festival-screening.jpg")')
            break;
        case '18':
            $('body').css('background-image', 'url("https://s-media-cache-ak0.pinimg.com/originals/33/e0/a5/33e0a567f8328114da0dc27174d28eb1.jpg")')
            break;
        case '36':
            $('body').css('background-image', 'url("https://assets.epix.com/41385e6234648f2ccae4151d95773b76.jpg")')
            break;
        case '10752':
            $('body').css('background-image', 'url("http://cdn26.us1.fansshare.com/photo/platoon/platoon-wallpapers-wallpaper-941689370.jpg")')
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
    console.log('Youtube worked');
    console.log(movieTitle);
    $.ajax({
        dataType: 'json',
        method: 'POST',
        data: title,
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function(result) {
            console.log('Youtube2 worked');
            var container = $('<div>').attr('id', 'description_container');
            var url = "https://www.youtube.com/v/"+ result.video[0].id;
            var title = $('<h3>').attr('id', 'title').text(movieTitle);
            var date = $('<h5>').attr('id', 'release').text('Release Date: ' + releaseDate);
            var embed = $('<embed>').attr("src", url).attr('id', 'movie');
            var new_div = $('<div>').attr('id', 'new_div');
            var vote = $('<h5>').text('IMDB Rating: ' + vote_average + ' / 10');
            $('#whole_container').replaceWith(new_div);
            $(new_div).append(title);
            $(new_div).append(embed);
            $('#description_container').append(vote);
            $('#description_container').append(date);
            $(new_div).append(container);
            itunesApi(movieTitle);
        },
        error: function(err) {
            console.log("There was an error");
        }
    });
}
function appendDescription(description){
    console.log('Description appended');
    $('#description').text(description);
}
function itunesApi(title){
    var url2 = 'https://itunes.apple.com/search?term=';
    var title = 'The Dark Knight';
    var arr = title.split(' ');
    var url=arr[0];
    for(var i = 1; i < arr.length; i++) {
        url2 = url2 + url + '+' + arr[i];
    }
    console.log(url2)
    $.ajax ({
    dataType: 'json',
    method: 'GET',
    data: url2,
    url: 'https://itunes.apple.com/search?term=' + title + '+movie',
    success: function(result){
        console.log("ITUNE'S WORKS");
        var price = result.results[0].trackPrice;
        var longDescription = result.results[0].longDescription;
        var descript = $('<h5>').text(longDescription);
        var priceDisplay = $('<h5>').text('Price: ' + price);
        $('#description_container').append(priceDisplay);
        $('#description_container').append(descript);
    },
    error: function(){
        console.log("ITUNE'S ERROR")
    }
})

}

