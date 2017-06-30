function clickHandler(btn){
    var genreId = parseInt($(btn).attr('id'));
    var tempUrl = 'https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=b09e8ebef5593dfec03034ec1ab31d35&language=en-US&include_adult=false&sort_by=created_at.desc';
    console.log(genreId);
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: tempUrl,
        success: function(result) {
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
function appendDescription(description){
    console.log('Description appended');
    $('#description').text(description);
}
function itunesApi(title){
    var url2 = 'https://itunes.apple.com/search?term=';
    var title = '';
    var arr = title.split(' ');
    var url=arr[0];
    for(var i = 1; i < arr.length; i++) {
        url2 = url2 + url + '+' + arr[i];
    }
    console.log(url2);
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
            var rating = result.results[0].contentAdvisoryRating;
            var ratingDisplay = $('<h5>').text('Parental Advisory: ' + rating);
            var priceDisplay = $('<h5>').text('Price: ' + price);
            $('#description_container').append(priceDisplay);
            $('#description_container').append(descript);
            $('#description_container').append(ratingDisplay);
        },
        error: function(){
            console.log("ITUNE'S ERROR")
        }
    })
}