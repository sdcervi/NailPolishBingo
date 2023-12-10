const libraryDiv = document.getElementById('libraryContent');

function writeProduct (brand, productID) {
	let productContent;
	productContent = `<p>${brand} ${productID}`;
	return productContent;
}

function writeLibrary (products) {
	// products will come in as a pre-sorted array
	
	// Get the HTML div
	const libraryDiv = document.getElementById('libraryContent');
	let libraryDivContents;
	
	// Generate the content
	products.forEach(product => {
		console.log (product);
	});
}

const productArray = [];
for (const brandIndex in library) {
	const brand = library[brandIndex];
	console.log (brandIndex);
	for (const productIndex in brand) {
		const product = brand[productIndex];
		productArray.push([brandIndex, productIndex, product]);
	}
}

// Sort by: alphabetica A-Z, alphabetical Z-A, release date earliest, release date latest











// Grab marketplaces
/*const marketplaceArray = Object.entries(data.channels.marketplaces).sort(function (a, b) {
	if (a[0] < b[0]) {
		return -1;
	} else if (a[0] > b[0]) {
		return 1;
	} else {
		return 0;
	}
});
const marketplaceChannels = ['cults3d', 'pinshape', 'thangs', 'printables', 'patreon', 'creality'];
marketplaceArray.forEach(channel => {
	if (channel[1] && marketplaceChannels.includes(channel[0])) {
		marketplaceNames.push(channel[0]);
	}
});*/

// Write products to page
/*productArray.forEach(product => {
	writeProduct (product[0], product[1]);
});*/