var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});


$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextbox =  $('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(){
        messageTextbox.val('')
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location.');
    }, function(){
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location.');
    });
});