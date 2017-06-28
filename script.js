/**
 * Created by sunoobertsch on 6/28/17.
 */
function clickHandler(btn){
    var genreId = parseInt($(btn).attr('id'));
    var tempUrl = 'https://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=b09e8ebef5593dfec03034ec1ab31d35&language=en-US&include_adult=false&sort_by=created_at.desc'
    console.log(genreId);
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: tempUrl,
        success: function(result) {
            console.log('Retrieval Success');
            console.log(result);
        },
        error: function(error) {
            console.log("There was an error for retrieval");
        }
    });
}