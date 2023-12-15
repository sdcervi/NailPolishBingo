const libraryDiv = document.getElementById('libraryContent');
const dateOptions = {
	year: 'numeric',
	month: 'short',
	day: 'numeric'
};

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
		const launchDate = new Date(Date.parse(productDetails.launchdate));
		productContent += `<p class="product-date"><img src="/assets/icons/launch.svg" alt="Launched" /> ${launchDate.toLocaleDateString('en-US', dateOptions)}`;
		if (!(productDetails.retiredate == "") && !productDetails.restocked) {
			productContent += `<br>`;
			const retireDate = new Date(Date.parse(productDetails.retiredate));
			productContent += `<img src="/assets/icons/retire.svg" alt="Retired" /> ${retireDate.toLocaleDateString('en-US', dateOptions)}</p>`;
			productContent += `<p class="alternatives">Alternatives: `;
			productDetails.alternatives.forEach(alternative => {
				productContent += `<a href="${alternative[1]}">${alternative[0]}</a>`;
			});
			productContent += `</p>`;
		} else {
			if (productDetails.restocked) {
				productContent += `<br>`;
				const retireDate = new Date(Date.parse(productDetails.retiredate));
				productContent += `<img src="/assets/icons/retire.svg" alt="Retired" /> ${retireDate.toLocaleDateString('en-US', dateOptions)} (restocked)</p>`;
			}
			productContent += `</p>`;
			productContent += `<p class="product-link">`;
			productContent += `<a href="${productDetails.link}" class="btn btn-primary btn-sm" target="_blank">Shop now</a>`;
			if (productDetails.video != "") {
				productContent += `&nbsp;<a href="${productDetails.video}" class="btn btn-primary btn-sm" target="_blank"><img src="/assets/icons/video.svg" alt="" /> Watch video</a>`;
			}
			productContent += `</p>`;
		}
		productContent += `<p class="product-collections"><strong>In collections:</strong></p>`;
		productContent += `<ul class="product-collections">`;
		productDetails.collections.forEach(collection => {
			productContent += `<li>${library[brand][collection].name}</li>`;
		});
		productContent += `</ul>`;
	} else if (productType === "collection") {
		productContent += `<p class="accessories">Includes collectible box</p>`;
		const launchDate = new Date(Date.parse(productDetails.launchdate));
		productContent += `<p class="product-date"><img src="/assets/icons/launch.svg" alt="Launched" /> ${launchDate.toLocaleDateString('en-US', dateOptions)}`;
		if (!(productDetails.retiredate == "") && !productDetails.restocked) {
			productContent += `<br>`;
			const retireDate = new Date(Date.parse(productDetails.retiredate));
			productContent += `<img src="/assets/icons/retire.svg" alt="Retired" /> ${retireDate.toLocaleDateString('en-US', dateOptions)}</p>`;
			productContent += `<p class="product-link"><a href="${productDetails.video}" class="btn btn-primary btn-sm" target="_blank"><img src="/assets/icons/video.svg" alt="" /> Watch video</a></p>`;
		} else {
			productContent += `</p>`;
			productContent += `<p class="product-link">`;
			productContent += `<a href="${productDetails.link}" class="btn btn-primary btn-sm" target="_blank">Shop now</a>`;
			if (productDetails.video != "") {
				productContent += `&nbsp;<a href="${productDetails.video}" class="btn btn-primary btn-sm" target="_blank">Watch launch video</a>`;
			}
			productContent += `</p>`;
		}
		productContent += `<p class="product-collections"><strong>Featuring:</strong></p>`;
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