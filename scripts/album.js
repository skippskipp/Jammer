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
    
    return template;
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var albums = [albumPicasso, albumMarconi, albumVeracity];

var setCurrentAlbum = function(album) {
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
     albumSongList.innerHTML = '';
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

//find the parent classname of an element
//take two arguments, an element and its parent class.
//check that the element matches the targetClass
//if element's parentClass doesn't match target..go up DOM tree
//differences:  my original did not account for currentParent.className being null, and I used !== instead of != for comparing parent to target
var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    if (currentParent.className !== null) {
        while (currentParent.className != targetClass) {
            currentParent = parent.parentElement;
        }
    return currentParent;
    } else if (currentParent.className == null) {
        alert('No parent found');
    } else if (currentParent.className !== targetClass) {
        alert('No parent found with that class name');
    }
};

//should take an element and, based on that element's class name(s), use a switch statement that returns the element with the .song-item-number class.
//Assuming this means that I should *change* the element's class to '.song-item-number'.
//This is 'enabled' by the findParentClassName function above..but what is being returned here, the element? I think it is returning the <td></td> element, the songRow. 
//Why class references are sometimes just the string as in 'song-item-number' and other times with a period as in the return statement of 'song-item-duration' with querySelector('.song-item-number') ?
//My function had not included the case of the pause button, has this been referenced already? May have missed it?
//Forgot that 'data-song-number' is an attribute, not a class..

var getSongItem = function (element) {
    switch(element.className) {
        case 'song-item-number':
            console.log(element);
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'ion-play':
        case 'album-song-button':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        default:
            return;
    }
}

//This clickHandler will first get the element of the songItem. It will then check to see if the state of the song currently playing at the time of the click event. If no song is playing, the click event will set 'currentlyPlaying' to the songItem clicked, and change the button template to pause. If the songItem clicked was already playing, the click event will change the button template to play and will set the value of 'currentlyPlaying' to null.
var clickHandler = function(tagetElement) {
    var songItem = getSongItem(targetElement);
    
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        sontItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};

//Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0]; 
var songRows = document.getElementsByClassName('album-view-song-item');

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null;

var albumRefresh = function() {
         songListContainer.addEventListener('mouseover', function(event) {
        //Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             //Change the content from the number to the play button's HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             var songItem = getSongItem(event.target);
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
                 songItem.innerHTML = playButtonTemplate;
             }
         }
            for (var i = 0; i < songRows.length; i++) {
            songRows[i].addEventListener('mouseleave', function(event) {
             //#1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
             //#2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
         
         songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         })
     }
     });
};

 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     var activeAlbum = 1;
      albumImage.addEventListener("click", function(event) {
          setCurrentAlbum(albums[activeAlbum]);
          activeAlbum++;
         if (activeAlbum == albums.length) {
             activeAlbum = 0;
         }
     });
     albumRefresh();
 };






