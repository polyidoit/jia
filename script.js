function popShow() {
	var pop = document.getElementById("Pop");
	pop.classList.toggle("show");
}

const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
 
/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
         
        // adds the menu (hamburger) icon
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
         
        // adds the close (x) icon
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}
 
/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);


function populateDigest() {
    $(async function () {
        const monthsArray = ["January","February","March","April","May", "June", "July",
                           "August","September","October","November","December"];
        const currentMonth = new Date().getMonth();               
        for (let i = currentMonth; i > 7 ; i--) {
            try {
                var JSONObject = await $.getJSON("json/2022_"+monthsArray[i]+".json", function(data){
                    var divDigest = document.getElementById("div-digest");
                    var monthBanner = document.createElement( "h5" );
                    var bannerSpan = document.createElement( "span" );
                    var bannerText = document.createTextNode(monthsArray[i]);
                    bannerSpan.appendChild(bannerText);
                    monthBanner.appendChild(bannerSpan);
                    divDigest.appendChild(monthBanner);
                    var len = data.length;
                    for (let j = 0; j < len; j++) {
                        var dataID = data[len-j-1].id;
                        var dataLink = data[len-j-1].link;
                        var dataTitle = data[len-j-1].title;
                        var dataAuthors = data[len-j-1].authors;
                        var dlDigest = document.createElement("dl");
                        var dt = document.createElement( "dt" );
                        var spanID = document.createElement( "span" );
                        spanID.className = "span-id";
                        var a = document.createElement('a');
                        var tt = document.createElement('tt');
                        var linkText = document.createTextNode(dataID);
                        tt.appendChild(linkText);
                        a.appendChild(tt);
                        a.title = dataID;
                        a.href = dataLink;
                        document.body.appendChild(a);
                        spanID.appendChild(a);
                        dt.appendChild(spanID);
                        dt.appendChild(document.createTextNode(" | "));
                        var spanAuthors = document.createElement( "span" );
                        spanAuthors.className = "span-authors";
                        spanAuthors.appendChild(document.createTextNode(dataAuthors));
                        dt.appendChild(spanAuthors);
                        dlDigest.appendChild(dt);
                        var dd = document.createElement( "dd" );
                        var spanTitle = document.createElement( "span" );
                        spanTitle.className = "span-title";
                        spanTitle.appendChild(document.createTextNode(dataTitle));
                        dd.appendChild(spanTitle);
                        dlDigest.appendChild(dd);
                        divDigest.appendChild(dlDigest);
                        if (dataTitle.includes('\(')){
                            MathJax.typeset();
                        }
                    }
                }); 
            } 
            catch (e) {
            }
        }
    });
}
