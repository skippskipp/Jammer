// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' },
    ]
};

//Another Example
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'},
    ]
};

//My ALbum
var albumVeracity = {
    title: 'Veracious',
    artist: 'Baz Suufla',
    label: 'CAD',
    year: '1999',
    albumArtUrl: 'assets/images/album_covers/19.png',
    songs: [
        { title: 'Electrons', duration: '3:01' },
        { title: 'Splicing Your Genes', duration: '2:10' },
        { title: 'We Are Atomic', duration: '3:33' },
        { title: 'Rapture of Light', duration: '4:19' },
        { title: 'Molecular Catastrophe', duration: '5:54'},
    ]
};


var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
     +  '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     +  '   <td class="song-item-title">' + songName + '</td>'
     +  '   <td class="song-item-duration">' + songLength + '</td>'
     +  '</tr>'
     ;
    
    var $row = $(template);
    
    var clickHandler = function() {
	   var songNumber = $(this).attr('data-song-number');
	   if (currentlyPlayingSong !== null) {
           var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]'); currentlyPlayingCell.html(currentlyPlayingSong);
	   }
	   if (currentlyPlayingSong !== songNumber) {
           $(this).html(pauseButtonTemplate);
           currentlyPlayingSong = songNumber;
	   } else if (currentlyPlayingSong === songNumber) {
           $(this).html(playButtonTemplate);
           currentlyPlayingSong = null;
	   }
    };
    
    var onHover = function(event){
        var $songItem = $(this).find('.song-item-number');
        var $songNumber = $songItem.attr('data-song-number');
        
        if ($songNumber !== currentlyPlayingSong) {
            $songItem.html(playButtonTemplate);
             }
    };
    
    var offHover = function(event){
        var $songItem = $(this).find('.song-item-number');
        var $songItemNumber = $songItem.attr('data-song-number');
        if ($songItemNumber !== currentlyPlayingSong) {
            $songItem.html($songItemNumber);
            }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};



var albums = [albumPicasso, albumMarconi, albumVeracity];

var setCurrentAlbum = function(album) {
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);    
     }
 };



var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null;


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    var activeAlbum = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[activeAlbum]);
        activeAlbum++;
        if (activeAlbum == albums.length) {
            activeAlbum = 0;
        }
     });     
});







