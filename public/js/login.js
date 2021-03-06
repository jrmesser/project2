const login = function() {
    const username = $("#username").val();
    const password = $("#password").val();
    const data = {username: username, password: password};
    $.ajax({
        url: "/api/login",
        method: "PUT",
        data: data,
        error: (error) => {$("#message").html("Username or Password Incorrect");}
    })
        .done((response) => {
            if (response.sessionId) {
                document.cookie = `sessionId= ${response.sessionId}; path=/`;
                location.href = "/home";
            } else {
                $("#message").innerHtml = "Username or Password Incorrect";
            }
        });
};
