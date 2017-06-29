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
            $('body').css("background-image", 'url("http://wallpapercave.com/wp/wp1945909.jpg")')
            break;
        case '35':
            $('body').css('background-image', 'url("http://1.bp.blogspot.com/-L-kWcYMBMQ4/UrA6xdXTtdI/AAAAAAAAAEo/_sb66aX2ayM/s1600/Media%2Bcollage.png")')
            break;
        case '27':
            $('body').css('background-image', 'url("https://i0.wp.com/indianghoststories.com/wp-content/uploads/2012/11/Horror-Movies.jpg?resize=1024%2C614")')
            break;
        case '53':
            $('body').css('background-image', 'url("http://www.bang2write.com/wp-content/uploads/2015/11/psych-thriller-collage-paint.png")')
            break;
        case '878':
            $('body').css('background-image', 'url("http://kosmosaicbooks.com/wp-content/uploads/2011/10/20_Favorite_Sci-Fi_Films.jpg")')
            break;
        case '16':
            $('body').css('background-image', 'url("https://meghanmblogs.files.wordpress.com/2015/03/pvr-disney-fest-collage.jpg?w=982")')
            break;
        case '37':
            $('body').css('background-image', 'url("http://filmschoolhooligans.com/wp-content/uploads/2015/08/Top-10-Western-Films-800x445.jpg")')
            break;
        case '10751':
            $('body').css('background-image', 'url("https://kassyapple.files.wordpress.com/2013/12/untitled-001.jpg")')
            break;
        case '9648':
            $('body').css('background-image', 'url("http://topyaps.com/wp-content/uploads/2013/04/enhanced-buzz-17264-1365490707-0.jpg")')
            break;
        case '10749':
            $('body').css('background-image', 'url("https://i.ytimg.com/vi/XiLac5mr8pw/maxresdefault.jpg")')
            break;
        case '80':
            $('body').css('background-image', 'url("http://images.amcnetworks.com/sundancechannel.com/wp-content/uploads/2016/08/gomorrah_10-ruthless-movie-mobsters_01_700x384.jpg")')
            break;
        case '18':
            $('body').css('background-image', 'url("http://az616578.vo.msecnd.net/files/2016/01/05/6358755938115513421557804808_movis.jpg")')
            break;
        case '36':
            $('body').css('background-image', 'url("https://s-media-cache-ak0.pinimg.com/736x/d7/76/66/d77666d383b85e8458fa907af28fd689--the-patriot-movie-mel-gibson.jpg")')
            break;
        case '10752':
            $('body').css('background-image', 'url("http://www.warbitz.com/wp-content/uploads/2017/04/warmoviesintro.jpg")')
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

