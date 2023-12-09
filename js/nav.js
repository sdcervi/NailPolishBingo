// Set up primary nav contents
const primaryNav = document.getElementById('primaryNav');

let primaryNavContents = '<div class="container-fluid">';
primaryNavContents += '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>';
primaryNavContents += '<a class="navbar-brand" href="/">Nail Polish <img src="/assets/logo.svg" alt="" /> Bingo<span class="d-none d-lg-inline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</span></a>';
primaryNavContents += '<div class="collapse navbar-collapse" id="navbarCollapse">';
primaryNavContents += '<ul class="navbar-nav mr-auto">';
primaryNavContents += '<li class="nav-item" id="nav-home"><a class="nav-link" href="/">Home</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-stash"><a class="nav-link" href="/stash/">Stash</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-library"><a class="nav-link" href="/library/">Library</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-combos"><a class="nav-link" href="/combos/">Combos</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-about"><a class="nav-link" href="/about/">About</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-faq"><a class="nav-link" href="/faq/">FAQ</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-feedback"><a class="nav-link" href="/feedback/">Feedback</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-news"><a class="nav-link" href="/news/">News</a></li>';
primaryNavContents += '<li class="nav-item" id="nav-donate"><a class="nav-link" href="/donate/">Donate</a></li>';
primaryNavContents += '</ul></div>';
	
primaryNavContents += '<div class="data-loading" id="data-loading"><div class="spinner-border text-primary" role="status"></div><span class="loading-text">&nbsp;Loading</span></div>';
primaryNavContents += '<div class="dropdown" id="profileDropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Toggle profile drop-down"><img src="/assets/icons/profile.svg"><span id="profileUserNavbar"></span></button>';
primaryNavContents += '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">';
primaryNavContents += '<li><a class="dropdown-item" href="/profile/">Profile &amp; Settings</a></li>';
primaryNavContents += '<li><hr class="dropdown-divider"></li>';
primaryNavContents += '<li><a class="dropdown-item" onclick="logout()" href="#">Sign out</a></li>';
primaryNavContents += '</ul></div>';
primaryNavContents += '<a href="/signin/" id="signin-button"><button class="btn btn-primary btn-sm signin" type="button">Sign in</button></a>';
primaryNavContents += '</div>';
primaryNavContents += '</div>';


primaryNav.innerHTML = primaryNavContents;

// Set up footer contents
const footer = document.getElementById('footer');
let footerContents = '<div class="container">';
footerContents += '<p class="small text-center">Site design and layout by <a href="https://stephaniecervi.design" target="_blank">Stephanie Cervi</a>. <a href="/privacy-policy.html">Privacy Policy</a> - <a href="/terms-of-service.html">Terms of Service</a> - <a href="/feedback/">Contact us</a><br>Nail Polish Bingo is a fan-run project, and we are not sponsored by or affiliated with any of the brands featured. All products named are owned by their respective brands. All rights belong to the image holder&nbsp;credited.</p></div>';

footer.innerHTML = footerContents;

// Get the active page and set CSS class
const currentPage = document.location.pathname;

let filename = currentPage.slice(1, -1);
if (!filename) {
	filename = 'home';
}
let navID = `nav-${filename}`;

const navElement = document.getElementById(navID);
if (navElement) {
	navElement.classList.add('active');
}