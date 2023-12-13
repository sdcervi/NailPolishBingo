const libraryDiv = document.getElementById('libraryContent');

function writeProduct (brand, productID, productDetails) {
	// Get the human-readable brand name from the brand ID
	const brandName = brand.replaceAll("_", " ").replace(
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
	
	productContent += `<div class="col library-product"><div class="card h-100">`;
	productContent += `<div class="card-body"><div class="row row-cols-2">`;
	productContent += `<div class="col">`;
	productContent += `<img src="${productImage}" onerror="this.src='/assets/comingsoon.png';" alt="" />`;
	productContent += `</div>`;
	productContent += `<div class="col">`;
	productContent += `<h3 class="product-brand">${brandName}</h3>`;
	productContent += `<h3 class="product-name">${productName}</h3>`;
	
	if (productType === "product") {
		if (productDetails.formula === "creme") {
			productContent += `<p class="product-formula">cr&egrave;me</p>`;
		} else {
			productContent += `<p class="product-formula">${productDetails.formula}</p>`;
		}
		productContent += `<p class="product-date"><img src="/assets/icons/launch.svg" alt="Launched" /> ${productDetails.launchdate}`;
		if (!(productDetails.retiredate == "") && !productDetails.restocked) {
			productContent += `<br>`;
			productContent += `<img src="/assets/icons/retire.svg" alt="Retired" /> ${productDetails.retiredate}</p>`;
			productContent += `<p class="alternatives">Alternatives: `;
			productDetails.alternatives.forEach(alternative => {
				productContent += `<a href="${alternative[1]}">${alternative[0]}</a>`;
			});
			productContent += `</p>`;
		} else {
			productContent += `</p>`;
			if (productDetails.restocked) {
				productContent += `<p class="product-link"><a href="${productDetails.link}" class="btn btn-primary btn-sm" target="_blank">Shop now</a></p>`;
			}
		}
		productContent += `<p class="product-collections"><strong>In collections:</strong></p>`;
		productContent += `<ul class="product-collections">`;
		productDetails.collections.forEach(collection => {
			productContent += `<li>${library[brand][collection].name}</li>`;
		});
		productContent += `</ul>`;
	} else if (productType === "collection") {
		productContent += `<p class="accessories">Includes collectible box</p>`;
		productContent += `<p class="product-date"><img src="/assets/icons/launch.svg" alt="Launched" /> ${productDetails.launchdate}`;
		if (!(productDetails.retiredate == "") && !productDetails.restocked) {
			productContent += `<br>`;
			console.log (productDetails);
			productContent += `<img src="/assets/icons/retire.svg" alt="Retired" /> ${productDetails.retiredate}</p>`;
		} else {
			productContent += `</p>`;
			if (productDetails.restocked) {
				productContent += `<p class="product-link"><a href="${productDetails.link}" class="btn btn-primary btn-sm" target="_blank">Shop now</a></p>`;
			}
		}
		productContent += `<p class="product-collections"><strong>In collection:</strong></p>`;
		productContent += `<ul class="product-collections">`;
		productDetails.products.forEach(product => {
			productContent += `<li>${library[brand][product].name}</li>`;
		});
		productContent += `</ul>`;
	}
	
	productContent += `</div></div></div></div></div>`;
	
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
	
	libraryDiv.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3">${libraryDivContents}</div>`;
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