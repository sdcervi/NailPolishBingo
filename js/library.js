const libraryDiv = document.getElementById('libraryContent');

function writeProduct (brand, productID, productDetails) {
	// Get the human-readable brand name from the brand ID
	const brandName = brand.replace("_", " ").replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
	const productType = productDetails.type;
	const productName = productDetails.name;
	const productLaunch = productDetails.launchdate;
	
	// Set up the product image, with a default fail-over if the image doesn't exist
	let productImage = "";
	if (productType === "product") {
		// If the product image can have variants such as skin tone and nail length
		productImage = `/assets/products/${brand}/${productID}.jpg`;
	} else {
		// If the product image doesn't have any variants
		productImage = `/assets/products/${brand}/${productID}.jpg`;
	}
	
	let productContent = "";
	
	productContent += `<img src="${productImage}" onerror="this.src='/assets/comingsoon.png';" alt="" />`;
	productContent += `<p>${brandName}</p>`;
	productContent += `<p>${productName}</p>`;
	
	if (productType === "product") {
		productContent += `<p>${productDetails.formula}</p>`;
		productContent += `<p>Launched ${productDetails.launchdate}</p>`;
		if (productDetails.retireDate && !productDetails.restocked) {
			productContent += `<p>Retired ${productDetails.retireDate}</p>`;
			productContent += `<p>Alternatives: `;
			productDetails.alternatives.forEach(alternative => {
				productContent += `<a href="${alternative[1]}">${alternative[0]}</a>`;
			});
			productContent += `</p>`;
		} else {
			productContent += `<p><a href="${productDetails.link}" class="btn btn-primary btn-sm">Shop now</a></p>`;
		}
		productContent += `<p>In collections: `;
		console.log (productDetails.collections);
		productDetails.collections.forEach(collection => {
			productContent += `${library[brand][collection].name}`;
		});
		productContent += `</p>`;
	}
	
	return productContent;
}

function writeLibrary () {
	const productArray = [];
	for (const brandIndex in library) {
		const brand = library[brandIndex];
		for (const productIndex in brand) {
			const product = brand[productIndex];
			productArray.push([brandIndex, productIndex, product]);
		}
	}
	
	// Sort by: alphabetica A-Z, alphabetical Z-A, release date earliest, release date latest
	
	let libraryDivContents = "";
	
	// Generate the content
	productArray.forEach(product => {
		const productHTML = writeProduct(product[0], product[1], product[2]);
		libraryDivContents += productHTML;
	});
	
	libraryDiv.innerHTML = libraryDivContents;
}

writeLibrary();









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