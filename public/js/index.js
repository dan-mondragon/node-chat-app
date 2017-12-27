var socket = io();

socket.on('updateRoomList', function(rooms){
    var select = $('<select name=\"roomSelect\"></select>');
    rooms.forEach(function(room){
        select.append($('<option></option>').text(room).val(room));
    });
    $('#roomsDiv').html(select);
});