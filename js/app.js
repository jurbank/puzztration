var gridster;
var puzzleComplete = false;

$(document).ready(function() {



	/* GET WIDTH OF PUZZLE CONTAINER
	--------------------------------------- */
	puzzleContainerWidth = $('.right').width();
	newSize = Math.floor(puzzleContainerWidth/9);



	/* INIT GRIDSTER
	--------------------------------------- */
  gridster = $(".gridster ul").gridster({
      widget_margins: [0, 0],
      widget_base_dimensions: [newSize, newSize],
      extra_rows: 0,
      extra_cols: 0,
      max_cols: 4,
      max_rows: 5,
      autogenerate_stylesheet: true,
      avoid_overlapped_widgets: true,
      shift_larger_widgets_down: true,
      serialize_params: function($w, wgd) {
      	return { 
      		id: $w.attr('id'),
      		col: wgd.col, 
      		row: wgd.row, 
      		size_x: wgd.size_x, 
      		size_y: wgd.size_y }
      },
      draggable: {
      	// handle: '.handle',
        stop: function(ui, $widget) {
        	var newPos = gridster.serialize();
        	checkIds(newPos);
        },
        start: function() {
        	// Prevents container resizing
        	$('.gridster ul').css({'height':  (newSize * 5) });
        }
      }

  }).data('gridster');



  var totalBoxes = 20;



	/* CACHE START ORDER
	--------------------------------------- */
  var startOrder = gridster.serialize();



	/* SHUFFLE
	--------------------------------------- */
	var toShuffle = gridster.serialize();

	function shuffle(array) {
	  var copy = [], n = array.length, i;

	  while (n) {

	    // Pick a remaining element
	    i = Math.floor(Math.random() * n--);

	    // And move it to the new array
	    copy.push(array.splice(i, 1)[0]);
	  }
	  return copy;
	}



	/* CACHE END ORDER
	--------------------------------------- */
	var endOrder = shuffle(toShuffle);



	/* ADD WIDGETS BASED ON SHUFFLE
	--------------------------------------- */
	gridster.remove_all_widgets();
  $.each(endOrder, function(i) {
      gridster.add_widget('<li style="background-position: '+((startOrder[i].col-1) * -newSize)+'px '+((startOrder[i].row-1) * -newSize)+'px;">', this.size_x, this.size_y, this.col, this.row);
  })


	$('.gridster li').each(function(index){
		$(this).attr('id', index-totalBoxes+1);
	});



	/* APPLY BG SIZE BASED ON W & H
	--------------------------------------- */
	var concatNewSize = [newSize * 4 + 'px', newSize * 5 + 'px'],
			concatJoin = concatNewSize.join(" ");

	$('.gridster li').css({'background-size':  concatJoin });

	$('.gridster').css({'width':  newSize * 4 });




	/* CHECK PUZZLE
	--------------------------------------- */
	function checkIds(data) {
		// for testing only

		// if (JSON.stringify(data) === JSON.stringify(startOrder)) {
		if (puzzleComplete) {
			console.log("complete");
			// puzzleComplete = true;
			gameOver();

			if(minutes < 3) {
				console.log("great job!, you completed it in under 3 minutes!");
			} else if(minutes >= 3) {
				console.log("You just misted it!")
			}
		}else {
			for(var i = 0; i<data.length; i++) {
				// need to make ids match row/cols
				console.log(startOrder[i].id);
				$($('.gridster li').get(i)).removeClass('js--correct');
				if(JSON.stringify(data[i]) === JSON.stringify(startOrder[i])) {
					console.log("match!")
					$($('.gridster li').get(i)).addClass('js--correct');
					// .addClass('js--correct');

				} else {
					console.log("not match!")
				}
			}
			console.log("incomplete");
		}


	}



	/* TIMER
	--------------------------------------- */
	var secconds = 0,
			minutes = 0,
			prependZero;

	var startTimer = function() {

		var countDownCLock = function() {
			if(secconds === 60) {
				if (minutes === 3) {
					clearInterval(countDownCLock);
					return;
				}
				minutes++;
				secconds = 0;
			}

			if(secconds < 9) {
				prependZero = '0';
			} else {
				prependZero = '';
			}

			secconds++;
			$('.time-bar').removeClass('js--hide');

			console.log(secconds);

			$('.js--time').text('' + minutes +':' + prependZero + '' + secconds);
		};



		var interval = setInterval(countDownCLock, 1000);		
	}



	/* GAME START
	--------------------------------------- */
	console.log("ready");
	var init = false;

	var $playBtn = $('.js--btn');

	$playBtn.on('click', function(e){
		e.preventDefault();
		gameStart();
		removeOverlay();
	});

	var removeOverlay = function() {
		$('.overlay-screen').fadeOut(function(){
			$(this).removeClass('js--show');
		});
	}

	var gameStart = function() {
		console.log("starting!");
		startTimer();
	};

	var gameOver = function() {
		$('.js--game-over').fadeIn(function(){
			$(this).removeClass('js--hide');
			$(this).addClass('js--show');
		});		
	};


});


