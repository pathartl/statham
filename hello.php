<?php
/**
 * @package Hello_Turkish
 * @version 1.6
 */
/*
Plugin Name: Hello Turkish
Version: 1.0
Author URI: https://pathar.tl/
*/

function hello_turkish_get_quote() {
	$quotes = "A word of advice, girls. If you're picking the wrong fight... At least pick the right weapon.
Where's my fucking pumper?
Good judgment comes from experience, experience comes from bad judgment.
I don't steal from anyone who can't afford it, and I don't hurt anyone who doesn't deserve it.
There's a school for gifted children up in Seattle. It's a nice drive... If you like trees and shit.
We've lost gorgeous George
Tommy, the tit, is praying. And if he isn't, he fucking should be.
This, lads, is a hurley. Used in the Irish game of hurling - a cross between hockey and murder.
You always have to be dead sure. Dead sure or dead.
Get a cell phone, honey, please.
How'd you like that one, tough guy? How fricking awesome was that, huh?
You don't understand, I'm really fucking dying.
Bonjour, douchebag. I thought you might be interested in a little deal.
Don't pop a blood vessel, you little penis.
See you later sunshine.
Urinary sphincter? Check!
It may actually be the last thing I do
Maybe you could fry me up a waffle or something, kay?
I wonder how many steaks I could make out of you? 
Wanna hold hands?
Who's got my fucking strawberry tart?
You know my fourth rule? Never make a promise you can't keep.
Do I look like a man who came half-way across Europe to die on a bridge?
Transportation is a precise business.
Rule #1. Never change the deal.";

	// Here we split it into lines
	$quotes = explode( "\n", $quotes );

	// And then randomly choose a line
	return wptexturize( $quotes[ mt_rand( 0, count( $quotes ) - 1 ) ] );
}

// This just echoes the chosen line, we'll position it later
function hello_turkish() {
	$chosen = hello_turkish_get_quote();
	echo "<p id='turkish'>$chosen</p>";
}

// Now we set that function up to execute when the admin_notices action is called
add_action( 'admin_notices', 'hello_turkish' );

// We need some CSS to position the paragraph
function turkish_css() {
	// This makes sure that the positioning is also good for right-to-left languages
	$x = is_rtl() ? 'left' : 'right';

	echo "
	<style type='text/css'>
	#turkish {
		float: $x;
		padding-$x: 15px;
		padding-top: 5px;		
		margin: 0;
		font-size: 11px;
	}
	</style>
	";
}

add_action( 'admin_head', 'turkish_css' );

?>
