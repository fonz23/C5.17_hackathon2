function clickHandler(btn){
    var genreId = parseInt($(btn).attr('id'));
    var tempUrl = 'https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=b09e8ebef5593dfec03034ec1ab31d35&language=en-US&include_adult=false&sort_by=created_at.desc'
    console.log(genreId);
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: tempUrl,
        success: function(result) {
            var random = Math.floor((Math.random() * 20) + 1);
            var movieTitle = result.results[random].original_title;
            var vote_average = result.results[random].vote_average;
            console.log('Click succeeded');
            youtubeApi(movieTitle, vote_average);
            itunesApi(movieTitle);
        },
        error: function(error) {
            console.log("There was an error for retrieval");
        }
    });
}
function youtubeApi(movie, average) {
    var movieTitle = movie;
    var vote_average = average;
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
            var url = "https://www.youtube.com/v/"+ result.video[0].id;
            var title = $('<h3>').attr('id', 'title').text(movieTitle);
            var embed = $('<embed>').attr("src", url).attr('id', 'movie');
            var new_div = $('<div>').attr('id', 'new_div');
            var vote = $('<h5>').text('IMDB Rating: ' + vote_average + ' / 10');
            $('#whole_container').replaceWith(new_div);
            $(new_div).append(title);
            $(new_div).append(embed);
            $(new_div).append(vote);
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
function itunesApi (title){
    $.ajax ({
        dataType: 'json',
        method: 'GET',
        data: title,
        url: 'https://itunes.apple.com/search?term=' + title + '+movie',
        success: function(){
            console.log("ITUNE'S WORKS")
        },
        error: function(){
            console.log("ITUNE'S ERROR")
        }
    })
}