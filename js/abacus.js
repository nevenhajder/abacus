/*
	Add a tooltip when the user clicks on the display.
	"Type in a number (< 111110) and watch the abacus go!"
*/
function main() {
	var $row10000 = document.getElementsByClassName('row10000')[0],
	$row10000beads = $row10000.getElementsByClassName('bead');

	var $row1000 = document.getElementsByClassName('row1000')[0],
	$row1000beads = $row1000.getElementsByClassName('bead');

	var $row100 = document.getElementsByClassName('row100')[0],
	$row100beads = $row100.getElementsByClassName('bead');

	var $row10 = document.getElementsByClassName('row10')[0],
	$row10beads = $row10.getElementsByClassName('bead');

	var $row1 = document.getElementsByClassName('row1')[0],
	$row1beads = $row1.getElementsByClassName('bead');

	var $display = document.getElementById('numDisplay');

	var $tip = document.getElementsByClassName("tool-tip")[0];


	function count() {
		/* Formula: (a * 1) + (b * 10) + (c * 100) + (d * 1000) + (e * 10000) */
		var a = $row1.getElementsByClassName('counted').length,
				b = $row10.getElementsByClassName('counted').length,
				c = $row100.getElementsByClassName('counted').length,
				d = $row1000.getElementsByClassName('counted').length,
				e = $row10000.getElementsByClassName('counted').length;

		return (a * 1) + (b * 10) + (c * 100) + (d * 1000) + (e * 10000);
	}

	function moveBeads(bead) {

		if (!bead.classList.contains('counted')) {
			// if the clicked bead is not .counted then add .counted to it and to subsequent beads
			bead.classList.add('counted');
			var nextSibling = bead.nextElementSibling;
			 
			for ( var i=0; i<9; i++ ) {
				if ( nextSibling.classList.contains('counted') || nextSibling.classList.contains('rail') ) {
					break;
				} else {
					nextSibling.classList.add('counted');
				}
				nextSibling = nextSibling.nextElementSibling;
			}
		} else {
			// if the clicked bead is .counted then remove .counted from it and preceding beads
			bead.classList.remove('counted');
			var prevSibling = bead.previousElementSibling;

			for ( var j=0; j<9; j++ ) {
				if ( !prevSibling || !prevSibling.classList.contains('counted') ){
					break;
				} else {
					prevSibling.classList.remove('counted');
				}
				prevSibling = prevSibling.previousElementSibling;
			}
		}

	}

	function beadClick() {
		moveBeads(this);
		$display.value = count();
	}

	function resetTip() {
		$tip.classList.remove('warning');

		function resetText() { $tip.innerHTML = '<p>Type in a number and watch the abacus go!</p>'; }
		window.setTimeout( resetText, 2000);
	}

	function validateInput() {
		/* Check for an empty $display */
		if ( $display.value === "" ) {
				$display.value = 0;
				updateAbacus(0);
			/* Check for a number > 111110 */
		} else if ( parseInt($display.value, 10) > 111110 ) {
				$display.value = 111110;
				showWarning("This abacus only goes up to 111,110.");
				updateAbacus(111110);
		} else {
				updateAbacus( parseInt($display.value, 10) );
		}
	}

	function showWarning(warn) {

		$tip.innerHTML = '<p>' + warn + '</p>';
		$tip.classList.add('warning');
	}

	function validateKeys(key) {
		var character = key.keyCode;
		/*	keyCodes 
				Numbers = 48-57 
				Backspace = 8
				Enter = 13
				Delete = 46
				Arrow keys = 37 (left), 39 (right)
		*/

		/* update abacus to reflect user input */
		if ( (character >= 48 && character <= 57) ||
				character === 8 ||
				character === 46 ||
				character === 37 ||
				character === 39 ) {
				/* Do nothing/allow default */
				if ( $tip.classList.contains('warning') ) {
					$tip.classList.remove('warning');
					$tip.innerHTML = "<p>Type in a number and watch the abacus go!</p>";
				}
		}
		else if ( character === 13 ) {
			$display.blur();
		}
		/* Prevent from typing anything but numbers */
		else {
			key.preventDefault();
			showWarning("Numbers only please!");
		}
	}
	/* Useful event type: blur (element loses focus) */
	/* Useful event type: input (value of element changes) */

	function resetAbacus() {
		
		for( var i=0; i<10; i++ ) {
			$row10000beads[i].classList.remove('counted');
			$row1000beads[i].classList.remove('counted');
			$row100beads[i].classList.remove('counted');
			$row10beads[i].classList.remove('counted');
			$row1beads[i].classList.remove('counted');
		}
	}

	function updateAbacus(userNum) {
		$updatingNum = userNum;
		resetAbacus();

		/*	Calculate the number of times userNum is divisible by 10,000,
				if the answer is greater than or equal to the number of beads
				then count all of the beads in the row. If the number is less
				than the number of beads, but greater than 0 then count the
				appropriate number of beads.
		 */
		$10000s = Math.floor( $updatingNum / 10000 );
		if ( $10000s >= 10 ) {
			$row10000beads[0].click();
			$updatingNum -= 10 * 10000;
		} else if ( $10000s > 0 ) {
			$row10000beads[ (10 - $10000s) ].click();
			$updatingNum -= $10000s * 10000;
		}
		
		$1000s = Math.floor( $updatingNum / 1000 );
		if ( $1000s >= 10 ) {
			$row1000beads[0].click();
			$updatingNum -= 10 * 1000;
		} else if ( $1000s > 0 ) {
			$row1000beads[ (10 - $1000s) ].click();
			$updatingNum -= $1000s * 1000;
		}

		$100s = Math.floor( $updatingNum / 100 );
		if ( $100s >= 10 ) {
			$row100beads[0].click();
			$updatingNum -= 10 * 100;
		} else if ( $100s > 0 ) {
			$row100beads[ (10 - $100s) ].click();
			$updatingNum -= $100s * 100;
		}

		$10s = Math.floor( $updatingNum / 10 );
		if ( $10s >= 10 ) {
			$row10beads[0].click();
			$updatingNum -= 10 * 10;
		} else if ( $10s > 0 ) {
			$row10beads[ (10 - $10s) ].click();
			$updatingNum -= $10s * 10;
		}

		$1s = Math.floor( $updatingNum / 1 );
		if ( $1s >= 10 ) {
			$row1beads[0].click();
			$updatingNum -= 10;
		} else if ( $1s > 0 ) {
			$row1beads[ (10 - $1s) ].click();
			$updatingNum -= $1s;
		}
	}

	function showToolTip() {
		$tip.classList.add("show-tip");
	}
	function hideToolTip() {
		$tip.classList.remove("show-tip");
		$tip.classList.remove('warning');
		resetTip();
	}

	/* Add click event listener to the beads in each row */
	for( var i=0; i < 10; i++) {
		$row10000beads[i].addEventListener( 'click', beadClick );
		$row1000beads[i].addEventListener( 'click', beadClick );
		$row100beads[i].addEventListener( 'click', beadClick );
		$row10beads[i].addEventListener( 'click', beadClick );
		$row1beads[i].addEventListener( 'click', beadClick );
	}

	/* Add $display.focus listener to show tool tip */
	$display.addEventListener('focus', showToolTip);

	/* Add $display keypress listener */
	$display.addEventListener('keydown', validateKeys);

	/* Add $display blur() listener */
	$display.addEventListener('blur', function() {
		validateInput();
		
		if ( $tip.classList.contains('warning') ) {
			window.setTimeout( hideToolTip, 1500 );
		} else {
			hideToolTip();
		}

	});

}

main();