$(document).ready(function() {

  // Search for github users profile by username
  $("#search").on("keyup",function(e) {
    var username = e.target.value;

    // request user info
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: 'bd27811095169a2986c8',
        client_secret: '775086d2ce6236f285bdc437f96a3cb2ca210f21'
      }
    }).done(function(user) { // main template
      // output data
      if (user.name === null || user.name === undefined ) {
        // error handler for username not found
        $("#profile").html(`
          <div class="container text-center error">
            <h1>404!</h1>
            <h4>File not found</h4>
          </div> <!-- end container -->
        `);
      } else {
        // render the profile information
        $("#profile").html(`
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
            </div> <!-- end panel-heading -->
            <div class="panel-body">
              <div class="row">

                <div class="col-md-3">
                  <img class="thumbnail avatar" src="${user.avatar_url}">
                  <a class="btn btn-default btn-block" href="${user.html_url}" target="_blank">
                    View Full Profile <span class="glyphicon glyphicon-share"></span>
                  </a>
                  <br>
                  <button id="add-note" class="btn btn-default btn-block" data-toggle="modal" data-target="#myModal">
                     Add a Note <span class="glyphicon glyphicon-edit"></span>
                  </button> 
                  <br>
                </div>

                <div class="col-md-9">
                  <span class="label label-primary">Public Repos: ${user.public_repos}</span>
                  <span class="label label-danger">Public Gists: ${user.public_gists}</span>
                  <span class="label label-default">Following: ${user.following}</span>
                  <span class="label label-default">Followers: ${user.followers}</span>
                  <br><br>
                  <ul class="list-group">
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Email: ${user.email}</li>
                    <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank"> ${user.blog}</a></li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                  </ul>
                </div>

              </div> <!-- end row -->
            </div> <!-- end panel-body -->
          </div> <!-- end panel -->
          
          <h3 class="page-header">Repositories</h3>

          <div id="repos"></div>

          <nav class="text-center" aria-label="Page navigation">
            <ul class="pagination">
              <li>
                <a href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li>
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> <!-- end pagination nav -->
        `);
      }

       // request repos info
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: 'bd27811095169a2986c8',
          client_secret: '775086d2ce6236f285bdc437f96a3cb2ca210f21',
          per_page: 3
        }
      }).done(function(repos) {
        // output data
        $.each(repos, function(index, repo) {
          $("#repos").append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>
                  <br><br>
                  ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-warning">Stars: ${repo.stargazers_count}</span>
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                </div>
                <div class="col-md-2">
                  <br>
                  <a class="btn btn-default" href="${repo.html_url}" target="_blank">
                    Visit Repository <span class="glyphicon glyphicon-share"></span>
                  </a>
                </div>
              </div> <!-- end row -->
            </div> <!-- end well -->
          `);
        }); // end repos output
      });
    }); // end main template
  });

  // Create an anotation on localStorage
  $('#add-note').on('submit', function(e){
    addNote(e);
	});
});

// Function to add a note
function addNote(e){
  // create an unique ID
  var newDate = new Date();
  id = newDate.getTime();

  var note = $('#note').val();

  // New note Object
    var new_note = {
      "id": id,
      "note": note
    };

    var noteList = JSON.parse(localStorage.getItem('notes'));

  // Simple Validation
  if(note === ''){
    alert('note is required');
    e.preventDefault();
  } else {
    var notes = JSON.parse(localStorage.getItem('notes'));

    // Check notes
    if(notes === null){
      notes = [];
    }

    notes.push(new_note);
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('Note Added');
  }
}