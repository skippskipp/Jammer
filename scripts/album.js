var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
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
	   var songNumber = parseInt($(this).attr('data-song-number'));
	   if (currentlyPlayingSongNumber !== null) {
           var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
           currentlyPlayingCell.html(currentlyPlayingSongNumber);
	   }
	   if (currentlyPlayingSongNumber !== songNumber) {
           setSong(songNumber);
           currentSoundFile.play();
           $(this).html(pauseButtonTemplate);
           currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
           updatePlayerBarSong();
	   } else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
           } else {
               $(this).html(playButtonTemplate);
               $('.main-controls .play-pause').html(playerBarPlayButton);
               currentSoundFile.pause();
           }     
	   }
    };
    
    var onHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
             } else if (currentSoundFile && currentSoundFile.isPaused()) {
                 songNumberCell.html(playButtonTemplate);
             }
    };
    
    var offHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
            }
         if (currentSoundFile && currentSoundFile.isPaused()) {
            songNumberCell.html(songNumber);
         }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};



var albums = [albumPicasso, albumMarconi, albumVeracity];

var setCurrentAlbum = function(album) {
    currentAlbum = album;
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

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
}

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        if (index == 0) {
            return currentAlbum.songs.length;
        } else {
            return index;
        }
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    var getLastSongNumber = function(index) {
        if (index == (currentAlbum.songs.length - 1)) {
            return 1
        } else {
            return index + 2
        }
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = parseInt(getLastSongNumber(currentSongIndex));
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var toggleFromPlayerBar = function() {
    if (!currentlyPlayingSongNumber) {
        setSong(1);
        updatePlayerBarSong();
    }
    var songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    if (currentSoundFile.isPaused()) {
        songNumberCell.html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();
    } else {
        songNumberCell.html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
    }
};


var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';



//Store state of playing songs

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var $playPauseButton = $('.main-controls .play-pause');
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(toggleFromPlayerBar);
    var activeAlbum = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[activeAlbum]);
        activeAlbum++;
        if (activeAlbum == albums.length) {
            activeAlbum = 0;
        }
     });     
});







