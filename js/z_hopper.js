var imageData = '';
var imagePath = '';
var offerings = {};
var sponsorArray = [];

	
<div class="top-content">
	<div id="paginationTop"></div>
	<div id="activeFilters"></div>
</div>

<div class="row results">

	<!-- Display filter and sort controls -->
	<div class="col-12 col-md-4 col-lg-3" id="filterSort">
		
		<nav class="navbar navbar-expand-md d-md-block navbar-light bg-light">
			
			<span class="navbar-brand">Filter &amp; sort results</span>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#expandFilters" aria-controls="expandFilters" aria-expanded="false" aria-label="Toggle filter and sort options">
				<span class="navbar-toggler-icon"></span>
			</button>
			
			<div class="collapse navbar-collapse" id="expandFilters">
				
				<!-- Sorting, "low" is bottom to top/ascending, "high" is top to bottom/descending -->
				<p><label for="sortBy">Sort results by</label></p>
				<div class="form-group">
					<select class="form-control filter-sort" id="sortBy">
						<option value="title-low">Title (A &rarr; Z)</option>
						<option value="title-high">Title (Z &rarr; A)</option>
						<option value="date-low">Start date (Earliest &rarr; Latest)</option>
						<option value="date-high">Start date (Latest &rarr; Earliest)</option>
					</select>
				</div>
				<hr>
				
				<!-- Filter by what type of educational offering it is -->
				<p><label for="filterType">Educational Offering Type</label></p>
				<div class="form-group">
					<select class="form-control filter-sort" id="filterType">
						<option value="--">--</option>
						<option value="certificate">Certificate</option>
						<option value="executive-short-course">Executive Short Courses</option>
						<option value="lecture-series">Lecture Series</option>
						<option value="masters">Master&rsquo;s</option>
						<option value="phd">Ph.D.</option>
						<option value="short-course">Short Courses</option>
					</select>
				</div>
				
				<!-- Filter by Sponsor/AOR (dynamically popualted from what values are present in the data) -->
				<p><label for="filterSponsorAOR">AOR</label></p>
				<div class="form-group">
					<select class="form-control filter-sort" id="filterSponsorAOR">
						<option value="--">--</option>
					</select>
				</div>
				
				<!-- Filter by what program area it is part of -->
				<p><label for="filterProgramArea">Program Area</label></p>
				<div class="form-group">
					<select class="form-control filter-sort" id="filterProgramArea">
						<option value="--">--</option>
						<option value="combat-systems">Combat Systems</option>
						<option value="cyber-and-information-systems">Cyber and Information Systems</option>
						<option value="data-science-and-decisions">Data Science and Decisions</option>
						<option value="defense-systems-management">Defense Systems Management</option>
						<option value="global-security-and-strategic-competition">Global Security and Strategic Competition</option>
						<option value="maritime-battlespace-environments">Maritime Battlespace Environments</option>
						<option value="modeling-visualization-and-simulation">Modeling, Visualization, and Simulation</option>
						<option value="naval-engineering">Naval Engineering</option>
						<option value="space-technology-and-operations">Space Technology and Operations</option>
					</select>
				</div>
				
				<!-- Filter by who is eligible -->
				<p><label for="filterEligibility">Eligibility</label></p>
				<div class="form-group">
					<select class="form-control filter-sort" id="filterEligibility">
						<option value="--">--</option>
						<option value="naval-officer">Naval Officers</option>
						<option value="naval-enlisted">Naval Enlisted</option>
						<option value="non-naval-officer">Non-Naval Officers</option>
						<option value="non-naval-enlisted">Non-Naval Enlisted</option>
						<option value="don-civilians">DON Civilians</option>
						<option value="dod-civilians">DOD Civilians</option>
						<option value="defense-contractors">Defense Contractors</option>
						<option value="non-dod-federal">Non-DOD Federal Employees</option>
						<option value="state-local-gov">State and Local Government Employees</option>
						<option value="international-military">International military personnel</option>
						<option value="international-non-military">International non-military personnel</option>
						<option value="us-civilians">US Civilians</option>
                        <option value="other">Other</option>
					</select>
				</div>
				
				<!-- Filter by modality -->
				<p><label for="filterModality">Modality</label></p>
				<div class="form-group">
					<select class="form-control filter-sort" id="filterModality">
						<option value="--">--</option>
						<option value="resident">Resident</option>
						<option value="distance">Distance Learning</option>
                        <option value="hybrid">Hybrid</option>
					</select>
				</div>
				
			</div>
		</nav>
		
		<div class="reset-button">
			<button type="button" class="btn btn-sm btn-outline-primary" id="resetButton">Reset filters</button>
		</div>

	</div>
	
	<!-- Iterate through the available Web Content Articles, pull their data from the XML source, push into the offerings object -->
	<#list articles as article>
		<#assign docXml = saxReaderUtil.read(article.getContent())
			docRoot = docXml.getRootElement()
			title = docRoot.selectSingleNode("dynamic-element[@name='Title']/dynamic-content").getText()
			type = docRoot.selectSingleNode("dynamic-element[@name='Type']/dynamic-content").getData()
			certType = docRoot.selectSingleNode("dynamic-element[@name='CertificateType']/dynamic-content").getData()
			sponsorAOR = docRoot.selectSingleNode("dynamic-element[@name='SponsorAOR']/dynamic-content").getStringValue()?trim
			programArea = docRoot.selectSingleNode("dynamic-element[@name='ProgramArea']/dynamic-content").getStringValue()?trim
			curriculum = docRoot.selectSingleNode("dynamic-element[@name='Number']/dynamic-content").getText()
			starts = docRoot.selectSingleNode("dynamic-element[@name='Starts']/dynamic-content").getStringValue()?trim
			startDate = ''
			eligibility = docRoot.selectSingleNode("dynamic-element[@name='Eligibility']/dynamic-content").getStringValue()?trim
			modality = docRoot.selectSingleNode("dynamic-element[@name='Modality']/dynamic-content").getData()
			timeNum = docRoot.selectSingleNode("dynamic-element[@name='TimeNumber']/dynamic-content").getText()
			timeUnit = docRoot.selectSingleNode("dynamic-element[@name='TimeUnit']/dynamic-content").getData()
			imageNode = docRoot.selectSingleNode("dynamic-element[@name='Image']/dynamic-content").getData() />
		
		<!-- Needs null-state check since this field has been added post-launch -->
		<#if (docRoot.selectSingleNode("dynamic-element[@name='ProgramGroup']/dynamic-content").getData())??>
			<#assign programGroup = docRoot.selectSingleNode("dynamic-element[@name='ProgramGroup']/dynamic-content").getData() />
		<#else>
			<#assign programGroup = '' />
		</#if>
		
		<!-- Checks whether an offering has both a) Searchable enabled, and b) Hidden checkbox unchecked -->
		<#assign searchable = article.isIndexable()?c />
		<#if (docRoot.selectSingleNode("dynamic-element[@name='Hidden']/dynamic-content").getData())??>
			<#assign hidden = docRoot.selectSingleNode("dynamic-element[@name='Hidden']/dynamic-content").getData() />
		<#else>
			<#assign hidden = "false" />
		</#if>
			
		<!-- If the offering is labeled Searchable and is not set to Hidden, add it to the offerings array -->
		<#if searchable == 'true' && (hidden == 'false' || hidden == '')>

			<!-- Remove whitespace from multi-select field data strings and comma-separate the values (will be split into arrays by commas later) -->
			<#assign
				type = type?replace("\n\t\t\t", ",")
				sponsorAOR = sponsorAOR?replace("\n\t\t\t", ",")
				programArea = programArea?replace("\n\t\t\t", ",")
				starts = starts?replace("\n\t\t\t", ",")
				eligibility = eligibility?replace("\n\t\t\t", ",") />

			<!-- If a start date is specified, access the nodes of the repeatable StartDate field -->
			<#if starts == 'specific'>
				<#assign dates = docRoot.selectNodes("dynamic-element[@name='StartDate']/dynamic-content")?sort />
				<!-- Scan through the array of nodes and only display the first upcoming date, ignoring any past dates -->
				<#list dates as date>
					<#assign currentDate_Data = getterUtil.getString(date.getData())>
					<#if validator.isNotNull(currentDate_Data)>
						<#assign currentDate_DateObj = dateUtil.parseDate("yyyy-MM-dd", currentDate_Data, locale)
							todayCompare = dateUtil.getDate(.now, "yyyyMMddHHmm", locale)
							currentCompare = dateUtil.getDate(currentDate_DateObj, "yyyyMMddHHmm", locale) />
						<#if currentCompare?number gt todayCompare?number>
							<#assign startDate = dateUtil.getDate(currentDate_DateObj, "dd MMM yyyy", locale) />
							<#break>
						</#if>
					</#if>
				</#list>
			</#if>

			<script>
				// Import data from XML read for the offering and create an object for it within the offerings parent object
				if ('${imageNode}'.length) { // If the image XML data is not empty
					imageData = JSON.parse('${imageNode}'); // parse the JSON data
					imagePath = "/documents/" + imageData.groupId + "/139029636/" + imageData.name; // Generate the image path
				} else { // If the image XML data is empty
					imagePath = "/documents/138897965/140399807/"; // Set the image path base to the correct folder
					
					var courseFormat = /[A-Z]{2}[0-9]{4}/; // This is the format of course numbers, in a regular expression.  Two capital letters followed by four numbers
					var degreeFormat = /[0-9]{3}$/; // This is the format of degree numbers, in a regular expression.  Three numbers
					
					if (courseFormat.test('${curriculum}')) { // Compare their HTML content against the course format regex.  If it matches,
						const programArea = '${programArea}'.split(",")[0]; // Get the first program area in the list
						if (programArea.length > 0) { // If it isn't blank
							const imageNumber = (parseFloat('${curriculum}'.substring(2)) % 9) + 1; // Take the remainder of the curriculum number divided by 9
							imagePath += programArea + '-' + imageNumber + '.jpg'; // And select that image
						} else {
							const imageNumber = (parseFloat('${curriculum}'.substring(2)) % 18) + 1; // Take the remainder of the curriculum number divided by 18
							imagePath += 'none-' + imageNumber + '.jpg'; // And select that image
						}
					} else if (degreeFormat.test('${curriculum}')) { // Compare their HTML content against the course format regex.  If it matches,
						const programArea = '${programArea}'.split(",")[0];  // Get the first program area in the list
						if (programArea.length > 0) { // If it isn't blank
							const imageNumber = (parseFloat('${curriculum}') % 9) + 1; // Take the remainder of the curriculum number divided by 9
							imagePath += programArea + '-' + imageNumber + '.jpg'; // And select that image
						} else {
							const imageNumber = (parseFloat('${curriculum}') % 18) + 1; // Take the remainder of the curriculum number divided by 18
							imagePath += 'none-' + imageNumber + '.jpg'; // And select that image
						}
					} else { // If the offering doesn't have a valid curriculum number, use the Liferay Article ID instead
						const programArea = '${programArea}'.split(",")[0]; // Get the first program area in the list
						if (programArea.length > 0) { // If it isn't blank
							const imageNumber = (parseFloat('${article.articleId}') % 9) + 1; // Take the remainder of the curriculum number divided by 9
							imagePath += programArea + '-' + imageNumber + '.jpg'; // And select that image
						} else {
							const imageNumber = (parseFloat('${article.articleId}') % 18) + 1; // Take the remainder of the curriculum number divided by 18
							imagePath += 'none-' + imageNumber + '.jpg'; // And select that image
						}
					}
				}
				offerings["prog-${curriculum}-${title}"] = {
					title:      	"${title}",
					type:			"${type}",
					certType:		"${certType}",
					sponsorAOR:		"${sponsorAOR}".split(","),
					programArea: 	"${programArea}".split(","),
					programGroup: 	"${programGroup}",
					curriculum:     "${curriculum}",
					starts:     	"${starts}",
					startDate:     	"${startDate}",
					startSort:		"",
					eligibility:	"${eligibility}".split(","),
					modality:		"${modality}",
					timeNum:     	"${timeNum}",
					timeUnit:     	"${timeUnit}",
					timeSort:		"",
					imagePath:		imagePath
				};

				// Add values to the sponsorAOR array for populating the drop-down filter
				offerings["prog-${curriculum}-${title}"].sponsorAOR.forEach(sponsor => {
					if (!sponsorArray.includes(sponsor) && sponsor != '') {
						sponsorArray.push(sponsor);
					}
				});
			</script>
		</#if>
	</#list>

	<!-- Containing div for displaying the offering cards, filtered/sorted or not -->
	<div class="col-12 col-md-8 col-lg-9">
		<div class="row" id="cardContainer" aria-live="polite"><noscript>Please enable JavaScript to use this tool.</noscript></div>
	
		<div>
			<nav aria-label="Page navigation example"><ul class="pagination justify-content-center" id="paginationBottom"></ul></nav>
		</div>
	</div>
	
</div>

<script>
	// Global variables for accessing the HTML page and the offering data
	var cardContainer = document.getElementById('cardContainer'); // Div where the filter/sort results will be populated
	var filterSponsorAOR = document.getElementById('filterSponsorAOR'); // Div containing the Sponsor/AOR filter dropdown
	var offeringsArray = Object.entries(offerings); // Map the offerings object of objects into an array of objects to allow sorting
	var pageArray = []; // Initialize the array used to hold cards before pagination
	var paginationTop = document.getElementById('paginationTop'); // This is the "Showing X-Y of Z offerings" section
	var activeFilters = document.getElementById('activeFilters');
	var pageNumList = document.getElementById('paginationBottom'); // This is the Previous - 1 ... X - Next section
	var cardsPerPage = 12; // Number of cards per page
	
	var resetButton = document.getElementById('resetButton');
	resetButton.addEventListener('click', resetFilters, false);
	
	// Reset all filters to empty
	function resetFilters () {
		type = null;
		sponsor = null;
		area = null;
		eligibility = null;
		modality = null;
		
		selectType.value = '--';
		selectSponsor.value = '--';
		selectArea.value = '--';
		selectEligibility.value = '--';
		selectModality.value = '--';
		
		// Update the URL with new parameters without refreshing the page (to allow people to return to a custom filtered search)
		const url = new URL(window.location.href);
		url.searchParams.set('sort', sort);
		url.searchParams.delete('offeringType');
		url.searchParams.delete('sponsorAOR');
		url.searchParams.delete('programArea');
		url.searchParams.delete('eligibility');
		url.searchParams.delete('modality');
		
		window.history.replaceState(null, null, url); // Replaces URL without refreshing page
		
		writeCards();
	}
	
	// Dynamic sorting function based on passed parameter.  "low" will sort ascending order (bottom to top) and "high" will sort descending order (top to bottom)
	function dynamicSort (sort) {
		let sortOrder = 1; // Set default to ascending order
		let property;
		switch (sort) {
			case "title-low":
				property = "title";
				break;
             case "title-high":
				property = "-title";
				break;
             case "date-low":
				property = "startDate";
				break;
             case "date-high":
				property = "-startDate";
				break;
		}
		if (property[0] === '-') { // Flag sort order switch based on whether "high" sort has "-" preceding sort parameter
			sortOrder = -1; // Set to descending order
			property = property.substr(1); // Remove "-" flag
		}
		if (property === 'title') { // If sorting alphabetically, either ascending or descending
			return function (a, b) {
				if (a[1][property] < b[1][property]) { // If a comes before b alphabetically
					return -1 * sortOrder;
				} else if (a[1][property] > b[1][property]) { // If a comes after b alphabetically
					return sortOrder;
				} else { // If a and b are equal alphabetically
					return 0;
				}
			}
		} else {
			return function (a, b) {				
				if (a[1][property].length > 0 && b[1][property].length > 0) { // If both properties have a date specified
					if (a[1][property] < b[1][property]) { // If a comes before b
						return sortOrder;
					} else if (a[1][property] > b[1][property]) { // If a comes after b
						return -1 * sortOrder;
					} else { // If a and b are on the same day
						return 0;
					}
				} else if (a[1][property].length == 0 && b[1][property].length == 0 && a[1]['starts'].length == 0 && b[1]['starts'].length == 0) { // If both properties have neither a start quarter nor a start date, sort alphabetically
					if (a[1]['title'] < b[1]['title']) { // If a comes before b alphabetically
						return -1;
					} else if (a[1]['title'] > b[1]['title']) { // If a comes after b alphabetically
						return 1;
					} else { // If a and b are equal alphabetically
						return 0;
					}
				} else {
					// Check to see which quarters each offering starts in
					const quarterOptions = ['fall', 'winter', 'spring', 'summer', 'quarterly'];
					const quarterDates = [fallStart, winterStart, springStart, summerStart, new Date(Math.min(fallStart, winterStart, springStart, summerStart))];
					// the "new Date(Math.min(...)) is to calculate the soonest upcoming quarterly start by taking the minimum date of known quarterly starts)
					let aDates = [];
					let bDates = [];
					quarterOptions.forEach(quarter => {
						if (a[1]['starts'].includes(quarter)) { // Push all valid quarterly starts to the array
							aDates.push(quarterDates[quarterOptions.indexOf(quarter)]);
						}
						if (a[1][property].length > 0) { // Add any specific start dates
							aDates.push(new Date(a[1][property]));
						}
						if (b[1]['starts'].includes(quarter)) { // Push all valid quarterly starts to the array
							bDates.push(quarterDates[quarterOptions.indexOf(quarter)]);
						}
						if (b[1][property].length > 0) { // Add any specific start dates
							bDates.push(new Date(b[1][property]));
						}
					});
					const aDate = new Date(Math.min(...aDates)); // Calculate the soonest upcoming date from the array of start dates
					const bDate = new Date(Math.min(...bDates)); // Calculate the soonest upcoming date from the array of start dates
					if (isNaN(aDate.getTime()) && isNaN(bDate.getTime())) { // If neither has a valid date, sort alphabetically
						if (a[1]['title'] < b[1]['title']) { // If a comes before b alphabetically
							return -1;
						} else if (a[1]['title'] > b[1]['title']) { // If a comes after b alphabetically
							return 1;
						} else { // If a and b are equal alphabetically
							return 0;
						}
					} else if (isNaN(aDate.getTime()) && !(isNaN(bDate.getTime()))) { // If a's date is invalid, sort b higher up
						return 1;
					} else if (isNaN(bDate.getTime()) && !(isNaN(aDate.getTime()))) { // If b's date is invalid, sort a higher up
						return -1;
					} else { // If both have valid dates
						if (aDate < bDate) { // If a comes before b
							return -1 * sortOrder;
						} else if (aDate > bDate) { // If a comes after b
							return sortOrder;
						} else { // If a and b are on the same day, sort alphabetically
							if (a[1]['title'] < b[1]['title']) { // If a comes before b alphabetically
								return -1;
							} else if (a[1]['title'] > b[1]['title']) { // If a comes after b alphabetically
								return 1;
							} else { // If a and b are equal alphabetically
								return 0;
							}
						}
					}
				}
			}
		}
	}
	
	function writePage (currentPage) {
		const pageCount = Math.ceil(pageArray.length / cardsPerPage); // Calculate the number of pages and round up to the next whole number
		let currentFirst = ((currentPage - 1) * 12) + 1; // Index number of first card on page
		let currentLast = Math.min(currentFirst + cardsPerPage - 1, pageArray.length); // Index number of last card on page, or the number of cards if less than one page
		// Remove old page numbers, create new page numbers, and add them to the pagination at the bottom of the page
		pageNumList.innerHTML = '';
		const previousPage = document.createElement("li");
		previousPage.className = "page-item";
		previousPage.innerHTML = '<a class="page-link">Previous</a>';
		previousPage.setAttribute("aria-label", "Previous page");
		previousPage.id = 'previousPage';
		previousPage.title = 'Previous page';
		pageNumList.appendChild(previousPage);
		document.getElementById(previousPage.id).addEventListener('click', getPage, false); // Add an event listener for button click
		if (pageCount < 12) { // If there are less than 12 total pages (because 11 pages is the maximum that will display with current page in the middle)
			for (let index = 1; index <= pageCount; index++) {
				const pageNumber = document.createElement("li");
				pageNumber.className = "page-item";
				pageNumber.innerHTML = '<a class="page-link">' + index + '</a>';
				pageNumber.setAttribute("aria-label", "Page " + index);
				pageNumber.id = 'pageNumber' + index;
				pageNumList.appendChild(pageNumber);
				document.getElementById(pageNumber.id).addEventListener('click', getPage, false); // Add an event listener for button click
			}
		} else { // If there are 12 or more pages
			let ellipsis = false; // Flag for whether an ellipsis has been written yet
			for (let index = 1; index <= pageCount; index++) {
				// If the in-progress page is in range (either 1, 2, within 2 pages of currentPage, or max-1 or max) set the flag to false
				if (index <= 2 || (index >= currentPage - 2 && index <= currentPage + 2) || index >= pageCount - 1) {
					ellipsis = false;
					const pageNumber = document.createElement("li");
					pageNumber.className = "page-item";
					pageNumber.innerHTML = '<a class="page-link">' + index + '</a>';
					pageNumber.setAttribute("aria-label", "Page " + index);
					pageNumber.id = 'pageNumber' + index;
					pageNumList.appendChild(pageNumber);
					document.getElementById(pageNumber.id).addEventListener('click', getPage, false); // Add an event listener for button click
				} else {
					if (!ellipsis) {
						const pagePlaceholder = document.createElement("li");
						pagePlaceholder.className = "page-item disabled";
						pagePlaceholder.innerHTML = '<a class="page-link">...</a>';
						//pagePlaceholder.setAttribute("aria-label", "Page " + index);
						//pagePlaceholder.id = 'pagePlaceholder' + index;
						pageNumList.appendChild(pagePlaceholder);
						//document.getElementById(pagePlaceholder.id).addEventListener('click', getPage, false); // Add an event listener for button click
						ellipsis = true; // Makes it so we only add "..." once per out-of-range set
					}
				}
			}
		}
		const nextPage = document.createElement("li");
		nextPage.className = "page-item";
		nextPage.innerHTML = '<a class="page-link">Next</a>';
		nextPage.setAttribute("aria-label", "Next page");
		nextPage.id = 'nextPage';
		nextPage.title = 'Next page';
		pageNumList.appendChild(nextPage);
		document.getElementById(nextPage.id).addEventListener('click', getPage, false); // Add an event listener for button click
		const currentFirstCard = ((currentPage - 1) * cardsPerPage) + 1;
		const currentLastCard = currentFirstCard + 11;
		let lastInSet = Math.min(currentLastCard, pageArray.length); // This makes sure we don't keep iterating past the end of the array
		// Show how many cards are on the page and how many there are total
		paginationTop.innerHTML = '<p>Showing ' + currentFirstCard + '&ndash;' + lastInSet + ' of ' + pageArray.length + ' offerings<br>Page ' + currentPage + ' of ' + Math.ceil(pageArray.length / cardsPerPage) +'</p>';
		
		// Remove any active or disabled classes from the pagination list
		const previousPageButton = document.getElementById('previousPage');
		const nextPageButton = document.getElementById('nextPage');
		for (let index = 0; index < pageNumList.children.length; index++) {
			pageNumList.children[index].classList.remove("activePage");
		}
		previousPageButton.classList.remove("disabled");
		nextPageButton.classList.remove("disabled");
		
		// Set the currently active page
		const currentPageButton = document.getElementById('pageNumber' + currentPage);
		currentPageButton.classList.add("activePage");
		
		// Add the currently active page number into the URL query
		const url = new URL(window.location.href);
		url.searchParams.set('page', currentPage);
		window.history.replaceState(null, null, url); // Replaces URL without refreshing page
		
		// Disable the Previous or Next buttons if the current page is first or last
		if (currentPage == 1) {
			previousPageButton.classList.add("disabled");
		}
		if (currentPage == Math.ceil(pageArray.length / cardsPerPage)) {
			nextPageButton.classList.add("disabled");
		}
		
		// Display that page's cards
		let pageContent = '';
		for (let index = currentFirst - 1; index < lastInSet; index++) {
			pageContent += pageArray[index];
		}
		cardContainer.innerHTML = pageContent;
		
		// Generate the active filters text string
		let activeFiltersContent = '<p>Showing ';
		if (area != null && area != 'null' && area != '') {
			let programName = area.replace(/-/g, ' ').replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() }); // Capture the program area name, capitalize it, and remove the dashes
			programName = programName.replace(/And/gi, 'and'); // Un-capitalize "and"
			if (programName === 'Modeling Visualization and Simulation') { // Add commas to this particular instance
				programName = 'Modeling, Visualization, and Simulation';
			}
			activeFiltersContent += programName + ' ';
		} else {
			activeFiltersContent += 'all ';
		}
		if (type != null && type != 'null' && type != '') {
			if (type.length > 1 && typeof(type) != 'string') {
				for (let counter = 0; counter < type.length; counter++) {
					if (counter > 0 && counter < type.length - 1 && type.length != 2) {
						activeFiltersContent += ', ';
					}
					if (counter == type.length - 1 && type.length != 2) {
						activeFiltersContent += ', and ';
					}
					if (counter == type.length - 1 && type.length == 2) {
						activeFiltersContent += ' and ';
					}
					if (type[counter] == 'phd') {
						activeFiltersContent += 'PhD';
					} else if (type[counter] == 'masters') {
						activeFiltersContent += 'master\'s degrees';
					} else {
						activeFiltersContent += type[counter].replace(/-/g, ' ');
					}
					if (type[counter][type[counter].length - 1] != 's') {
						activeFiltersContent += 's';
					}
				}
			} else if (type.length == 1 && typeof(type) != 'string') {
				if (type[0] == 'phd') {
					activeFiltersContent += 'PhD';
				} else if (type[0] == 'masters') {
					activeFiltersContent += 'master\'s degrees';
				} else {
					activeFiltersContent += type[0].replace(/-/g, ' ');
				}
				if (type[0][type[0].length - 1] != 's') {
					activeFiltersContent += 's';
				}
			} else if (typeof(type) == 'string') {
				if (type == 'phd') {
					activeFiltersContent += 'PhD';
				} else if (type == 'masters') {
					activeFiltersContent += 'master\'s degrees';
				} else {
					activeFiltersContent += type.replace(/-/g, ' ');
				}
				if (type[type.length - 1] != 's') {
					activeFiltersContent += 's';
				}
			} else {
				activeFiltersContent += 'offerings';
			}
		} else {
			activeFiltersContent += 'offerings';
		}
		if (sponsor != null && sponsor != 'null' && sponsor != '') {
			let activeSponsor = '';
			if (acronyms.includes(sponsor)) { // If the entire sponsor name is one of the specified all-caps acronyms (further down in this file)
				activeSponsor = sponsor.replace(/-/g, " ").toUpperCase(); // Remove dashes and fully capitalize the sponsor name
			} else {
				let sponsorAcronym;
				acronyms.forEach(acronym => { // For each instance of an acronym within a sponsor name, capitalize just those letters
					sponsorAcronym = sponsor.replace(new RegExp('\\b' + acronym + '\\b', 'g'), acronym.toUpperCase());
				});
				let sponsorArray = sponsorAcronym.split("-"); // Split into an array for capitalization
				sponsorArray.forEach(word => { // Capitalize the first letter of each word
					word = word[0].toUpperCase() + word.substring(1) + ' ';
					activeSponsor += word;
				});
			}
			activeFiltersContent += ' for ' + activeSponsor;
		}
		if ((eligibility != null && eligibility != 'null' && eligibility != '') || (modality != null && modality != 'null' && modality != '')) {
			activeFiltersContent += ' (filtered by ';
			if (eligibility != null && eligibility != 'null' && eligibility != '') {
				activeFiltersContent += 'eligibility';
			}
			if ((eligibility != null && eligibility != 'null' && eligibility != '') && (modality != null && modality != 'null' && modality != '')) {
				activeFiltersContent += ' and ';
			}
			if (modality != null && modality != 'null' && modality != '') {
				activeFiltersContent += 'modality';
			}
			activeFiltersContent += ')';
		}
		activeFiltersContent += '</p>';
		activeFilters.innerHTML = activeFiltersContent;
	}
	
	// Handles click events on the page buttons and fetches the page number to pass to writePage
	function getPage (event) {
		event = event || window.event;
		event.target = event.target || event.srcElement;
		let element = event.target;
		let pageNumber = parseFloat(element.innerHTML); // Try to convert the button text into a number
		if (!isNaN(pageNumber)) { // If it is a number
			writePage (pageNumber); // Write that page
		} else { // If it is not a number, we need to get the current page number and then pass the appropriate number to writePage
			const currentPage = parseFloat(document.getElementsByClassName('activePage')[0].firstChild.innerHTML);
			if (element.innerHTML === 'Previous' && !(element.parentElement.classList.contains('disabled'))) {
				writePage(currentPage - 1);
			}
			if (element.innerHTML === 'Next' && !(element.parentElement.classList.contains('disabled'))) {
				writePage(currentPage + 1);
			}
		}
	}
	
	// Display the offering cards; default sort without any query parameters from URL is by curriculum number ("non-degree" if empty)
	function writeCards () {
		pageArray = []; // Set to empty to avoid duplicating content
		// Sort the cards according to the selected parameter
		offeringsArray.sort(dynamicSort(sort));
		
		let displayCard; // Flag for whether a card should display or not, based on the active filters.  Initialized empty
		let anyResults = false; // Flag for whether any cards satisfy the active filters
		
		// Write the cards to the webpage
		offeringsArray.forEach(offeringIndex => {
			let cardContent = ''; // Initialize to empty so that we don't repeat the data each time and replace it instead
			const offering = offerings[offeringIndex[0]]; // Grab the current offering into a varaible for easier access
			
			// Generate friendly URL
			let friendlyUrl;
			if (offering.curriculum.toLowerCase() != 'non-degree' && offering.curriculum.toLowerCase() != 'nondegree' && offering.curriculum.toLowerCase() != 'non degree' && offering.curriculum.toLowerCase() != '')
			{
				friendlyUrl = '/web${layout.getGroup().friendlyURL}/-/' + offering.curriculum + '-' + offering.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/-&-/g,"-").replace(/\(/g,"").replace(/\)/g,"");
			} else {
				friendlyUrl = '/web${layout.getGroup().friendlyURL}/-/' + offering.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/-&-/g,"-").replace(/\(/g,"").replace(/\)/g,"");
			}
			
			// Filter results based on query
			displayCard = false; // Assume a card will not display, until proven otherwise
			displayCardType = false;
			displayCardSponsor = false;
			displayCardArea = false;
			displayCardEligibility = false;
			displayCardModality = false;
			if (type) { // If a type filter is defined
				if (typeof type == 'object') { // And that filter has multiple active values (i.e. coming from the "Degrees" link on the homepage)
					for (index in type) {
						if (type[index] === offering.type) { // And the offering matches one of the active types
							displayCardType = true;
						}
					}
				} else { // And that filter only has a single active value
					if (type === offering.type) { // And the offering matches the filter
						displayCardType = true;
					}
				}
			} else { // If no type filter is defined
				displayCardType = true;
			}
			if (sponsor) { // If a sponsor filter is defined
                for (index in offering.sponsorAOR) {
                    if (sponsor == offering.sponsorAOR[index]) { // And the offering matches the filter
                        displayCardSponsor = true;
                    }
                }
			} else { // If no sponsor filter is defined
				displayCardSponsor = true;
			}
			if (area) { // If an area filter is defined
                for (index in offering.programArea) {
                    if (area == offering.programArea[index]) { // And the offering matches the filter
                        displayCardArea = true;
                    }
                }
			} else { // If no area filter is defined
				displayCardArea = true;
			}
			if (eligibility) { // If an eligibility filter is defined
                for (index in offering.eligibility) {
					// And the offering matches the filter or is empty
					if (eligibility == offering.eligibility[index] || offering.eligibility[index] == '' || offering.eligibility[index] == null) {
						displayCardEligibility = true;
					}
                }
			} else { // If no eligibility filter is defined
				displayCardEligibility = true;
			}
			if (modality) { // If a modality filter is defined
				if (modality == offering.modality) { // And the offering matches the filter
					displayCardModality = true;
				}
			} else { // If no modality filter is defined
				displayCardModality = true;
			}
			if (displayCardType && displayCardSponsor && displayCardArea && displayCardEligibility && displayCardModality) { // Check all the filter display flags
				displayCard = true;
			}
			if (displayCard) { // If all the checks have passed and displayCard is still true, display the offering
				cardContent += '<div class="col-12 col-sm-6 col-md-6 col-lg-4  list-card">';
				cardContent += '<div class="list-card-container">';
				cardContent += '<div class="list-img-container">';
				if (offering.programGroup.length > 0) {
					cardContent += '<div class="program-group-overlay">' + offering.programGroup.toUpperCase().replace("-", " ") + '</div>';
				}
				cardContent += '<img class="list-card-img" alt="" src="' + offering.imagePath + '" /></div>';
				cardContent += '<h5>'
				if (offering.title.lastIndexOf(' ') > offering.title.length - 5) {
					const lastSpace = offering.title.lastIndexOf(' ');
					let titleFix = offering.title.substring(0, lastSpace) + '&nbsp;' + offering.title.substring(lastSpace + 1);
					titleFix = titleFix.replace('PhD', 'Ph.D.');
					cardContent += titleFix;
				} else {
					cardContent += offering.title;
				}
				cardContent += '</h5>';
				cardContent += '<p class="program-area">';
				let numPrograms = 0; // Initialize the counter for number of program areas attached to this card to 0
				if (offering.programArea.length == 9) {
					cardContent += 'All program areas';
				} else {
					offering.programArea.forEach(program => { // For each program area attached to this card
						let programName = program.replace(/-/g, ' ').replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() }); // Capture the program area name, capitalize it, and remove the dashes
						programName = programName.replace(/And/gi, 'and'); // Un-capitalize "and"
						if (programName === 'Modeling Visualization and Simulation') { // Add commas to this particular instance
							programName = 'Modeling, Visualization, and Simulation';
						}
						if (numPrograms > 0) { // If this isn't the first program area added
							cardContent += '; '; // Add a semicolon to the string before adding the program area name
						}
						cardContent += programName; // Add the program area name
						numPrograms++; // Increment the number of program areas attached to this card
					});
				}
				cardContent += '</p>';
				if (offering.type == 'phd') {
					cardContent += '<p class="curriculum">Ph.D.';
				} else if (offering.type == 'masters') {
					cardContent += '<p class="curriculum">Master\'s';
				} else {
					cardContent += '<p class="curriculum">' + offering.type[0].toUpperCase() + offering.type.slice(1).replace(/-/g, ' ');
				}
				//if (offering.type == 'certificate' && offering.certType.length > 0) {
				//	cardContent += ' (' + offering.certType + ')';
				//}
				cardContent += '</p>';
				cardContent += '<p>';
				if (offering.timeNum && offering.timeUnit) {
					cardContent += '<strong>Est. completion:</strong> ' + offering.timeNum + ' ' + offering.timeUnit + '<br>';
				}
				if (offering.startDate && offering.starts === 'specific') { // If the user specified that it starts on a specific date, AND a date is added that is upcoming
					const printDate = new Date(offering.startDate).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}); // Make the date human-readable
					cardContent += '<strong>Starts:</strong> ' + printDate + '</p>';
				} else if (!offering.startDate && offering.starts === 'specific') { // If the user specified that it starts on a specific date, but there are no upcoming start dates
					cardContent += '<strong>Starts:</strong> No upcoming dates</p>';
				} else if (!(offering.starts === 'open-enrollment') && !(offering.starts === 'quarterly')) { // If one or more quarters is specified
					let quarters = '';
					// If all four quarters are specified, set to 'Quarterly'
					if (offering.starts === 'fall,winter,spring,summer') {
						quarters = 'Quarterly';
					} else { // Otherwise, display all specified quarters
						if (offering.starts != '') {
							const quarterSource = offering.starts.split(",");
							for (let index = 0; index < quarterSource.length; index++) {
								quarters += quarterSource[index][0].toUpperCase() + quarterSource[index].slice(1).replace('-', ' '); // Capitalize the quarter name
								if (index != quarterSource.length - 1) { // And add commas between quarters
									quarters += ', ';
								}
							}
						}
					}
					if (quarters != '') {
						cardContent += '<strong>Starts:</strong> ' + quarters + '</p>';
					} else {
						cardContent += '</p>';
					}
				} else { // Otherwise, just display "Open enrollment" or "Quarterly"
					cardContent += '<strong>Starts:</strong> ' + offering.starts[0].toUpperCase() + offering.starts.slice(1).replace('-', ' ') + '</p>';
				}
				cardContent += '<p><a href="' + friendlyUrl + '" class="stretched-link">More information &gt;</a></p>';
				cardContent += '</div>';
				cardContent += '</div>';
				anyResults = true; // Now that we've successfully added a card, make sure that this flag is set to true
				pageArray.push(cardContent); // Add the card to the array used for pagination
			}
		});
		if (!anyResults) { // If there aren't any results, display this message instead
			cardContainer.innerHTML = '<div class="col-12"><p>There are no offerings that meet your filter criteria.</p></div>';
			activeFilters.innerHTML = '';
			paginationTop.innerHTML = '<p>No results</p>';
			pageNumList.innerHTML = '';
		} else { // Otherwise, add the generated content to the page
			var queryPage = parameters.get('page');
			if (queryPage > Math.floor(pageArray.length / 12)) {
				queryPage = Math.floor(pageArray.length / 12);
			}
			let currentPage = parseFloat(queryPage) || 1; // Always start on the first page if the query parameter is invalid
			cardContainer.innerHTML = '';
			writePage(currentPage);
		}
	}
	
	// Dynamically updates the page's content and the URL to reflect filter and sort choices without refreshing the page
	function changeQuery (event) {
		// Grab the event object (data generated by user click)
		event = event || window.event;
		event.target = event.target || event.srcElement;
		let element = event.target;
		while (element) {
			// Sets sort and filter parameters to the values from user interface; selecting "--" in the drop-downs will reset parameter to null
			if (element.id === 'sortBy') { sort = element.value; }
			if (element.id === 'filterType') { if (element.value != '--') { type = element.value; } else { type = null; } }
			if (element.id === 'filterSponsorAOR') { if (element.value != '--') { sponsor = element.value; } else { sponsor = null; } }
			if (element.id === 'filterProgramArea') { if (element.value != '--') { area = element.value; } else { area = null; } }
			if (element.id === 'filterEligibility') { if (element.value != '--') { eligibility = element.value; } else { eligibility = null; } }
			if (element.id === 'filterModality') { if (element.value != '--') { modality = element.value; } else { modality = null; } }
			
			// Update the URL with new parameters without refreshing the page (to allow people to return to a custom filtered search)
			const url = new URL(window.location.href);
			url.searchParams.set('sort', sort);
			if (type) {
				url.searchParams.set('offeringType', type);
			} else {
				url.searchParams.delete('offeringType');
			}
			if (sponsor) {
				url.searchParams.set('sponsorAOR', sponsor);
			} else {
				url.searchParams.delete('sponsorAOR');
			}
			if (area) {
				url.searchParams.set('programArea', area);
			} else {
				url.searchParams.delete('programArea');
			}
			if (eligibility) {
				url.searchParams.set('eligibility', eligibility);
			} else {
				url.searchParams.delete('eligibility');
			}
			if (modality) {
				url.searchParams.set('modality', modality);
			} else {
				url.searchParams.delete('modality');
			}
			
			window.history.replaceState(null, null, url); // Replaces URL without refreshing page
			
			writeCards (); // Rewrites page content
			break;
		}
	}
	
	// Dynamically popualte Sponsor/AOR filter dropdown (sorted alphabetically and properly capitalized), since that's the only one likely to change regularly
	sponsorArray.sort();
	var acronyms = ['nps']; // Defines a list of acronyms that should be all-caps
	sponsorArray.forEach(sponsor => {
		const optionNode = document.createElement("option");
		let nodeText;
		if (acronyms.includes(sponsor)) { // If the entire sponsor name is one of the specified all-caps acronyms
			nodeText = document.createTextNode(sponsor.replace(/-/g, " ").toUpperCase()); // Remove dashes and fully capitalize the sponsor name
		} else {
			let sponsorAcronym;
			acronyms.forEach(acronym => { // For each instance of an acronym within a sponsor name, capitalize just those letters
				sponsorAcronym = sponsor.replace(new RegExp('\\b' + acronym + '\\b', 'g'), acronym.toUpperCase());
			});
			nodeText = document.createTextNode(sponsorAcronym.replace(/-/g, " ")); // Remove dashes
		}
		// Add the option into the dropdown
		optionNode.appendChild(nodeText);
		optionNode.value = sponsor;
		filterSponsorAOR.appendChild(optionNode); 
	});
	
	// Fetch query parameters from URL
	var queryString = window.location.search;
	var parameters = new URLSearchParams(queryString);
	var sort = parameters.get('sort') || 'title-low'; // Only one value possible for sorting; default is sorting by offering title, ascending
	var type = parameters.getAll('offeringType'); // This is an array; default is no filters active
	var sponsor = parameters.get('sponsorAOR'); // This is a single value; default is no filters active
	if (sponsor == 'nps-makalapa') {
		sponsor = 'nps-hawaii';
		const url = new URL(window.location.href);
		url.searchParams.set('sponsorAOR', 'nps-hawaii');
		window.history.replaceState(null, null, url); // Replaces URL without refreshing page
	}
	var area = parameters.get('programArea'); // This is a single value; default is no filters active
	var eligibility = parameters.get('eligibility'); // This is a single value; default is no filters active
	var modality = parameters.get('modality'); // This is a single value; default is no filters active
	
	// Programmatically populate the allowed values based on what's in the actual page
	var selectSort = document.getElementById('sortBy');
	var selectType = document.getElementById('filterType');
	var selectSponsor = document.getElementById('filterSponsorAOR');
	var selectArea = document.getElementById('filterProgramArea');
	var selectEligibility = document.getElementById('filterEligibility');
	var selectModality = document.getElementById('filterModality');
	var allowedSorts = [];
	var allowedTypes = [];
	var allowedSponsors = [];
	var allowedAreas = [];
	var allowedEligibilities = [];
	var allowedModalities = [];
	for (let i=1; i<selectSort.length; i++) { allowedSorts.push(selectSort[i].value); }
	for (let i=1; i<selectType.length; i++) { allowedTypes.push(selectType[i].value); }
	for (let i=1; i<selectSponsor.length; i++) { allowedSponsors.push(selectSponsor[i].value); }
	for (let i=1; i<selectArea.length; i++) { allowedAreas.push(selectArea[i].value); }
	for (let i=1; i<selectEligibility.length; i++) { allowedEligibilities.push(selectEligibility[i].value); }
	for (let i=1; i<selectModality.length; i++) { allowedModalities.push(selectModality[i].value); }
	
	// Verify that query parameters are expected values and reset to default if not (to prevent exploits)
	if (!(allowedSorts.includes(sort))) { sort = 'title-low'; }
    if (type.length > 0) {
        for (index in type) {
            if (!allowedTypes.includes(type[index])) { type.splice(index, 1); }
        }
    } else {
        type = null;
    }
	if (!(allowedSponsors.includes(sponsor))) { sponsor = null; }
	if (!(allowedAreas.includes(area))) { area = null; }
	if (!(allowedEligibilities.includes(eligibility))) { eligibility = null; }
	if (!(allowedModalities.includes(modality))) { modality = null; }
	
	// Set select dropdowns to values from query parameters
	selectSort.value = sort || '--';
	selectType.value = type || '--';
	selectSponsor.value = sponsor || '--';
	selectArea.value = area || '--';
	selectEligibility.value = eligibility || '--';
	selectModality.value = modality || '--';
	
	// Add event listeners to the drop-downs
	if (selectSort.addEventListener) { selectSort.addEventListener("change", changeQuery, false); }
		else if (selectSort.attachEvent) { selectSort.attachEvent("onchange", changeQuery); }
	if (selectType.addEventListener) {selectType.addEventListener("change", changeQuery, false); }
		else if (selectType.attachEvent) { selectType.attachEvent("onchange", changeQuery); }
	if (selectSponsor.addEventListener) {selectSponsor.addEventListener("change", changeQuery, false); }
		else if (selectSponsor.attachEvent) { selectSponsor.attachEvent("onchange", changeQuery); }
	if (selectArea.addEventListener) {selectArea.addEventListener("change", changeQuery, false); }
		else if (selectArea.attachEvent) { selectArea.attachEvent("onchange", changeQuery); }
	if (selectEligibility.addEventListener) {selectEligibility.addEventListener("change", changeQuery, false); }
		else if (selectEligibility.attachEvent) { selectEligibility.attachEvent("onchange", changeQuery); }
	if (selectModality.addEventListener) {selectModality.addEventListener("change", changeQuery, false); }
		else if (selectModality.attachEvent) { selectModality.attachEvent("onchange", changeQuery); }
	
	// Normalize time values so that they can be sorted correctly
	offeringsArray.forEach(offering => {
		const timeNum = parseInt(offering[1].timeNum);
		let timeUnit = offering[1].timeUnit;
		switch (timeUnit) { // Convert all times into hours for effective sorting
			case "hours":
				break;
             case "days":
				offering[1].timeSort = timeNum * 24; // 24 hours in a day
				break;
             case "weeks":
				offering[1].timeSort = timeNum * 24 * 7; // 7 days in a week
				break;
             case "months":
				offering[1].timeSort = timeNum * 24 * 30.4167; // Average 30.4167 days in a month
				break;
             case "years":
				offering[1].timeSort = timeNum * 24 * 365; // 365 days in a year
				break;
		}
		if (timeNum == 1) { // If something only takes 1 month/1 year etc., then make the unit singular instead of plural
			offering[1].timeUnit = timeUnit.substr(0,timeUnit.length-1);
		}
	});
	
	// Normalize date values so they can be sorted correctly
	offeringsArray.forEach(offering => {
		const starts = offering[1].starts;
		const startDate = offering[1].startDate;
		if (startDate && starts === 'specific') {
			offering[1].startSort = new Date(startDate);
		} else {
			offering[1].startSort = starts;
		}
	});
	
	writeCards ();  // Generate page content (this is called on page load; every additional call happens from user interaction after load)
</script>