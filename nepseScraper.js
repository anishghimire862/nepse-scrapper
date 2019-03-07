const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.sharesansar.com/today-share-price';

rp(url) 
	.then(function(html) {

		// items[] array holds all the companies details
		// name[] array holds all the companies name
		// shareValue[] holds share value of the corresponding market price of companies

		let items = [];
		let name = [];
		let shareValue = [];
		
		// every <tr> text value is pushed into items[] array.	
		$('tr', html).each(function(i,e) {
			items[i] = $(this).text();
		});

		for(let i=1; i<10; i++) {
			let result = items[i];
			
			// split string on new line and concatenate , in place of new line
	    res = result.split("\n");

			// converting object into string to perform string manipulation
	    res = String(res);
		
			// removing \t special char for all occurances
			res = res.replace(/\t/g, '');
			
			// finding position of comma 
			let re = new RegExp(",", "ig");
    	let commasPos = [];
    	while ((match = re.exec(res))) {
      	commasPos.push(match.index);
   		}
    	name[i] = res.substring(commasPos[1]+1,commasPos[2]);
			shareValue[i] = res.substring(commasPos[6]+1, commasPos[7]);
		}
		for(let i=1; i<10; i++) {
			console.log(name[i]);
			console.log(shareValue[i]);
		}
	})
	.catch(function(err) {
		console.log(err);
	});
