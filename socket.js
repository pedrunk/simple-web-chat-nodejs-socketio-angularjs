// export function for listening to the socket on the connection
var users = [];

module.exports = function (socket) {	

    socket.on('disconnect', function () {
		socket.broadcast.emit('send:message', {message : new_user.name + ' a quitté la discussion'});
		users.splice(new_user.id-1, new_user.id-1);
    });

    var new_user = {id : (users.length+1), name : generateGuestName()};
    users.push(new_user);
    console.log("**********************");
    console.log(users);
    console.log("**********************");

    socket.emit('send:message', {message  : '*** Bienvenue sur le chat ' + new_user.name + ' ***' });

	socket.broadcast.emit('send:message', {message : new_user.name + ' a rejoint la discussion'});

    socket.emit('user:join', {list : users, new_one : new_user});
    socket.broadcast.emit('user:join', {list : users});

	socket.on('send:message', function (data) {
    	socket.broadcast.emit('send:message', data);
    });

    socket.on('user:join', function (data) {
    	
    });
};


//Try to generate unique name
function generateGuestName() {
	return 'Guest_' + (users.length+1);
}