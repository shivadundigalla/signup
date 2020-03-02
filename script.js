function onSignIn(user)
{
    var profile=user.getBasicProfile();
    console.log("ASDASDSAD");
    $(".g-signin2").css("display","none");
    $(".data").css("display","block");
    $("#pic").attr('src',profile.getImageUrl());
    $("#email").text(profile.getEmail());
}
function signout()
{
    var auth=gapi.auth2.getAuthInstance();
    auth.signout().then(function(){
     alert("Signed out");
     $(".g-signin2").css("display","block");
     $(".data").css("display","none");
    });
}