var edges = [];
var corners = [];

function new_solved_cube() {
	edges = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
	corners = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
}

function is_solved(edge_array, corner_array) {
	for (var i = 1; i < 25; i++) {
		if (edge_array[i - 1] != i || corner_array[i - 1] != i) {
			return false;
		}
	}
	
	return true;
}

// magnitude = 1, 2, 3
// e1-e4 = the four edge stickers on the face being turned, going clockwise
// e5-e8 = the four edge stickers connected to the face being turned, going clockwise
// c1-c4 = the four corner stickers that haven't been accounted for by e1-e8, going clockwise
function do_move(magnitude,e1,e2,e3,e4,e5,e6,e7,e8,c1,c2,c3,c4) {
	
	var first_edge = edges[e1];
	edges[e1] = edges[e4];
	edges[e4] = edges[e3];
	edges[e3] = edges[e2];
	edges[e2] = first_edge;
	
	first_edge = edges[e5];
	edges[e5] = edges[e6];
	edges[e6] = edges[e7];
	edges[e7] = edges[e8];
	edges[e8] = first_edge;
	
	var first_corner = corners[e1];
	corners[e1] = corners[e4];
	corners[e4] = corners[e3];
	corners[e3] = corners[e2];
	corners[e2] = first_corner;
	
	first_corner = corners[e5];
	corners[e5] = corners[e6];
	corners[e6] = corners[e7];
	corners[e7] = corners[e8];
	corners[e8] = first_corner;
	
	first_corner = corners[c1];
	corners[c1] = corners[c2];
	corners[c2] = corners[c3];
	corners[c3] = corners[c4];
	corners[c4] = first_corner;
	
	if(magnitude > 1) {
		magnitude -= 1;
		do_move(magnitude,e1,e2,e3,e4,e5,e6,e7,e8,c1,c2,c3,c4);
	}
}

// Executes an algorithm in which the moves are separated by spaces
function execute(moves) {
	moves = moves.split(" ");
	for (var m = 0; m < moves.length; m++) {
		move(moves[m]);
	}
}

function len(moves) {
	return moves.split(" ").length;
}

function move(raw_move) {
	var move = convert_to_move(raw_move);
	var face = move[0];
	var magnitude = move[1];
	
	switch(face) {
		case "U":	do_move(magnitude, 0, 1, 2, 3, 4, 8, 12, 16, 5, 9, 13, 17);
					break;
		case "R":	do_move(magnitude, 12, 13, 14, 15, 1, 9, 21, 19, 2, 10, 22, 16);
					break;
		case "F":	do_move(magnitude, 8, 9, 10, 11, 2, 5, 20, 15, 3, 6, 21, 12);
					break;
		case "L":	do_move(magnitude, 4, 5, 6, 7, 3, 17, 23, 11, 0, 18, 20, 8);
					break;
		case "B":	do_move(magnitude, 16, 17, 18, 19, 13, 22, 7, 0, 14, 23, 4, 1);
					break;
		case "D":	do_move(magnitude, 20, 21, 22, 23, 6, 18, 14, 10, 7, 19, 15, 11);
					break;
		default:	break;
	}
}

function convert_to_move(raw_move) {
	var face = raw_move.substring(0,1);
	var magnitude = (raw_move + " ").substring(1,2);
	
	if (magnitude == "'") {
		magnitude = 3;
	} else if (magnitude == "2") {
		magnitude = 2;
	} else {
		magnitude = 1;
	}
	
	return [face, magnitude];
}

// Returns an array of length 48 of the 24 edge stickers and 24 corner stickers
function get_colors(edge_array, corner_array) {
	var colors = [];
	
	var all_colors = ["white","orange","green","red","blue","yellow"];
	
	for (var i = 0; i < 24; i++) {
		var color_code = Math.floor((edge_array[i] - 1)/4);
		colors.push(all_colors[color_code]);
	}
	
	for (var i = 0; i < 24; i++) {
		var color_code = Math.floor((corner_array[i] - 1)/4);
		colors.push(all_colors[color_code]);
	}
	
	return colors;
}

function get_edges() {
	return edges;
}

function get_corners() {
	return corners;
}