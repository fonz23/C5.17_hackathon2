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

function showAction() {
    $('body').addClass('show_video')
        .css("background-image", 'url("https://images5.alphacoders.com/611/thumb-1920-611946.jpg")')
        .css("background-size", 'cover')
}

function showComedy() {
    $('body')
        .css('background-image', 'url("http://images.fanpop.com/images/image_uploads/dodgeball-dodgeball-3A-a-true-underdog-story-200345_900_600.jpg")')
        .css("background-size", 'cover')
}

function showHorror() {
    $('body')
        .css('background-image', 'url("https://images8.alphacoders.com/801/thumb-1920-801032.jpg")')
        .css("background-size", 'cover')
}

function showThriller() {
    $('body')
        .css('background-image', 'url("https://images6.alphacoders.com/524/thumb-1920-524997.jpg")')
        .css("background-size", 'cover')
}

function showSciFi() {
    $('body')
        .css('background-image', 'url("http://www.hdwallpapers.in/walls/alien_vs_predator-HD.jpg")')
        .css("background-size", 'cover')
}

function showAnimation() {
    $('body')
        .css('background-image', 'url("http://www.hdwallpapersfreedownload.com/uploads/large/cartoons/disney-toy-story-1-2-3-free-hd-wallpaper.jpg")')
        .css("background-size", 'cover')
}

function showWestern() {
    $('body')
        .css('background-image', 'url("http://images4.fanpop.com/image/photos/18000000/Christian-Bale-as-Dan-Evans-3-10-to-yuma-18071755-2560-1700.jpg")')
        .css("background-size", 'cover')
}

function showFamily() {
    $('body')
        .css('background-image', 'url("http://wallpapersin4k.net/wp-content/uploads/2017/02/Cheaper-by-the-Dozen-Movie-Wallpapers-3.jpg")')
        .css("background-size", 'cover')
}

function showMystery() {
    $('body')
        .css('background-image', 'url("http://theredlist.com/media/database/films/cinema/1990/seven/001-seven-theredlist.jpg")')
        .css("background-size", 'cover')
}

function showRomance() {
    $('body')
        .css('background-image', 'url("https://umad.com/img/2015/8/the-notebook-desktop-wallpaper-8038-8385-hd-wallpapers.jpg")')
        .css("background-size", 'cover')
}

function showDocumentary() {
    $('body')
        .css('background-image', 'url("https://scdn.nflximg.net/images/6989/3126989.jpg")')
        .css("background-size", 'cover')
}

function hideVideo() {
    $('body').css('background-image', '');
}