// define store assosciative array to hold storeCodes
var stores = {	"ace":"ace", "aero":"aero", "babyu":"babyu", "bbw":"bbw", "bathandbodyworks":"bbw", "cbk":"cbk", 
				"christopherandbanks":"cbk", "bam":"bam", "cjb":"cjb", "cku":"cku", "calvinkleinunderwear":"cku", 
				"cpwm":"cpwm", "worldmarket":"cpwm", "deb":"deb", "ecko":"ecko", "etoys":"etoys", "fao":"fao", "flav":"flav", 
				"gnc":"gnc", "zgor":"zgor", "gordonsjewelers":"zgor", "irbt":"irbt", "irobot":"irbt", "kip":"kip", 
				"maur":"maur", "mlb":"mlb", "nascar":"nascar", "nau":"nau", "nfl":"nfl", "nhl":"nhl", "pbs":"qpbs", "aerops":"aerops", 
				"ps4u":"aerops", "rsk":"rsk", "radioshack":"rsk", "rckp":"rckp", "rockport":"rckp", "spdo":"spdo", 
				"speedousa":"spdo", "tsa":"tsa", "sportsauthority":"tsa", "wil":"wil", "zales":"zales", "greatestgifts":"ggfts" };
var host = window.location.host;
var storeCode = '';

// Search location.host for store to set StoreCode
for (key in stores) {
	if (host.indexOf(key) !=-1) {
		storeCode = stores[key];
		break;
	}
}

window.onload = function() {
	// add storeCode to body class
	var bodyClass = document.getElementsByTagName('body')[0].className;
	document.getElementsByTagName('body')[0].className = bodyClass + ' ' + storeCode; 
	
	// add urls to share
	document.getElementById('twitter').setAttribute('href', 'http://twitter.com/home?status=1 Day Only The Worlds Greatest Friends and Family Sale ' + window.location);
	document.getElementById('myspace').setAttribute('href', 'http://www.myspace.com/index.cfm?fuseaction=postto&amp;t=Greatest Gifts&amp;c=1 Day Only The Worlds Greatest Friends and Family Sale&amp;u=' + window.location);

	// add orso code to links
	links = document.getElementsByTagName('a');
	for (i = links.length - 1; i >= 0; i--) {
		if (links[i].className.indexOf('orso') != -1) {
			href = links[i].getAttribute('href');
			// Search href for store to append code for orso
			for (key in stores) {
				if (href.indexOf(key) !=-1) {
					orsoCode = stores[key];
					break;
				}
			}
			links[i].setAttribute('href', href + storeCode.toUpperCase() + '_WGFF_AD:Z:' + orsoCode.toUpperCase());
		}
	}
	
	//get user's date
	var userTime = new Date();
	// check day of month (1-31)
	// set to 14th of the month for this campaign
	if (userTime.getDate() == '14') {
		//check hour of day (12-15)
		if (userTime.getHours() == '12' || userTime.getHours() == '13' || userTime.getHours() == '14' || userTime.getHours() == '15') {
			//twelve hours left
			document.getElementById('remaining-time').setAttribute('class', 'twelve replace-text');
		//check hour of day (16-19)
		} else if (userTime.getHours() == '16' || userTime.getHours() == '17' || userTime.getHours() == '18' || userTime.getHours() == '19') {
			//eight hours left
			document.getElementById('remaining-time').setAttribute('class', 'eight replace-text');
		//check hour of day (20-23)
		} else if (userTime.getHours() == '20' || userTime.getHours() == '21' || userTime.getHours() == '22' || userTime.getHours() == '23' || userTime.getHours() == '24') {
			//four hours left
			document.getElementById('remaining-time').setAttribute('class', 'four replace-text');
		} else {
			//no hours left
			document.getElementById('remaining-time').setAttribute('class', 'less replace-text');
		}
	}
	
	
}

//hide addressbar on iPhone to show more ad space
addEventListener('load', function() { 
	setTimeout(hideAddressBar, 0); 
}, false);
function hideAddressBar() { 
	window.scrollTo(0, 1); 
}