$(function(){

    
    $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("it worked")
    
    var newBurger = {
        burger_name: $("#ca").val().trim()
        
    };
    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function(){
            console.log("Created New Burger!");
            location.reload();
        }
        );
    });
    $(".delete-burger").on("click", function(event){
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function(){
                console.log("Devouring Burger ", id);
                location.reload();
            }
        )
    })
});
