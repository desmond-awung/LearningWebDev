// node execrcise 1

function echo(stringToPrint, num) {
	if(num < 0){
		console.log("Invalid second arg: " + num);
		return;		
	}
	else
		for(let i=0; i < num; i++) {
			console.log(stringToPrint);
		}
}

echo("Great Day", 5);
echo("Echo in my soul!", 6)
