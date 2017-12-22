var socket = io();

function scrollToBottom(){
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeigth = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeigth >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('no error');
        }
    });
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
    scrollToBottom();
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
    scrollToBottom();
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