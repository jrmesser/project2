var makeCard = function(urlObj) {

    return `<div class="w3-container w3-card-2 w3-white w3-round w3-margin"><br>
            <hr class="w3-clear">
            <p>Article/Video Title: ${urlObj.url}</p>
            <p>Content Type: ${urlObj.content_type}</p>
            <p>Length: ${urlObj.length}</p>
            
            <button onclick="document.getElementById('view_now').style.display='block'" class="w3-right w3-button w3-theme-d2 w3-margin-bottom">View Now</button></p>
            <button type="button" class="w3-right w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> &nbsp;View later</button> 
            </div>`;
};

var sessionId = Cookies.get("sessionId");
console.log("sessionId:", sessionId);

var displayArticles = function(maxLength) {

    $.get(`/api/urls/${sessionId}/${maxLength}`).done((results) => {
        $("#button_minutes").css("display", "none");
        results[0].urls.map((currentUrl) => {
            $("#articles").append(makeCard(currentUrl)); 
        });
    });
};
