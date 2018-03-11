$(function () {
    let database = firebase.database();
    //sets a variable to the firebase database so that we don't have to keep retyping it

    database.ref("trainArr/").orderByChild("dateAdded")
    .on("child_added", function(snapshot) {
        
        let currentTrain = snapshot.val();
        //sets a variable to the data recorded on each child append

        console.log("we have firebase reply!")



        //defining table to dynamically push with database
        var newRow = $("<tr class='tableRow'>");
        var trainName = $("<td class='name'>").text(currentTrain.name);
        var destination = $("<td class='dest'>").text(currentTrain.dest);
        var frequency = $("<td class='role'>").text(currentTrain.freq);
        var firstTrain = $("<td class='role'>").text(currentTrain.first);
        //need to define next arrival and min away with math
        var nextArrival = $("<td class='role'>").text("");
        var minAway = $("<td class='role'>").text("");

        //each new train will take data and place in this table
        newRow.append(trainName)
            .append(destination)
            .append(frequency)
            .append(firstTrain)
            .append(nextArrival)
            .append(minAway);
        
        $("#train-sched").append(newRow);
    })

    //pull data from your form
    $("form").off("submit").on("submit", function (e) {
        e.preventDefault();

        //pull the input into a var/let to create current train
        let name = $("#train-name").val().trim();
        let dest = $("#destination").val().trim();
        let freq = $("#frequency").val().trim();
        let first = $("#first-train").val().trim();

        //clear inputs
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-name").val("");
        $("#first-train").val("")
        $("#frequency").val("")

        //append latest train the the trainArr/ firebase.ref
        database.ref("trainArr").push({
            "name": name,
            "dest": dest,
            "freq": freq,
            "first": first

        });
    })
})