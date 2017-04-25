$(document).ready(function () {

  // Search for github users profile by $username
  $("#search").on("keyup", function (e) {
    var username = e.target.value;
    getUser(username);
  });

  // Create an anotation on localStorage
  $('#add-note').on('submit', function (e) {
    addNote(e);
  });

});

////////////////////////////////////////
//             variables             //
//////////////////////////////////////

var itemOnPage = 3;

////////////////////////////////////////
//             functions             //
//////////////////////////////////////

function getUser(username) {
  // request user info
  $.ajax({
    url: 'https://api.github.com/users/' + username,
    data: {
      client_id: 'bd27811095169a2986c8',
      client_secret: '775086d2ce6236f285bdc437f96a3cb2ca210f21'
    },
    success: (function (user) {
      // output data
      if (user.name === null || user.name === undefined) {
        error(user);
      } else {
        // render the profile information
        getUserInfo(user);
        getRepos(username);
      }
      pagination(user);
    })
  });
}  // end getUser()

function getRepos(username) {
  // default value
  itemOnPage = 3;

  $.ajax({
    url: 'https://api.github.com/users/' + username + '/repos',
    data: {
      client_id: 'bd27811095169a2986c8',
      client_secret: '775086d2ce6236f285bdc437f96a3cb2ca210f21',
      per_page: itemOnPage
    },
    success: (function (repos) {
      // output data
      $.each(repos, function (index, $repo) {
        getReposInfo($repo);
      });
    })
  });

} // end getRepos()

function pagination(user) {
  $('#pagination-demo').twbsPagination({
    totalPages: Math.ceil(user.public_repos / itemOnPage),
    startPage: 1,
    visiblePages: 3,
    next: '&raquo;',
    prev: '&laquo;',
    onPageClick: function(event, page) {
      // aqui é treta
    }
  });
} // end pagination()

function addNote(e) { // Function to add a note
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
  if (note === '') {
    alert('note is required');
    e.preventDefault();
  } else {
    var notes = JSON.parse(localStorage.getItem('notes'));

    // Check notes
    if (notes === null) {
      notes = [];
    }

    notes.push(new_note);
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('Note Added');
  }
} // end addNote()

////////////////////////////////////////
//             templates             //
//////////////////////////////////////

function error() { // error template
  // error handler for username not found
  $("#profile").html(`
    <div class="text-center error">
      <h2>404!</h2>
      <h4>User not found</h4>
    </div> <!-- end error -->
  `);
} // end error()

function getUserInfo(user) { // user profile template
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
            <span class="label label-default">Public Gists: ${user.public_gists}</span>
            <span class="label label-primary">Public Repos: ${user.public_repos}</span>
            <span class="label label-default">Following: ${user.following}</span>
            <span class="label label-default">Followers: ${user.followers}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Location: <p class="info">${user.location}</p></li>
              <li class="list-group-item">Company: <p class="info">${user.company}</p></li>
              <li class="list-group-item">Email: <p class="info">${user.email}</p></li>
              <li class="list-group-item">Website | blog: <a href="${user.blog}" target="_blank"> ${user.blog}</a></li>
              <li class="list-group-item">Member Since: <p class="info">${user.created_at.slice(0, 10)}</p></li>
            </ul>
          </div>

        </div> <!-- end row -->
      </div> <!-- end panel-body -->
    </div> <!-- end panel -->
    
    <h3 class="page-header">Repositories</h3>
    <div id="repos"></div>

    <nav class="text-center" aria-label="Page navigation">
      <div id="pagination-demo" class="pagination-sm"></div>
    </nav> <!-- end pagination nav -->
  `);
} // end getUserInfo() pagination and repos markup are here...

function getReposInfo(repo) { // repos template
  $("#repos").append(`
    <div class="well" id="content">
      <div class="row">
        <div class="col-md-7">
          <h4 class="repo-name">${repo.name}</h4>
          <br><br>
          <p class="description">${repo.description}</p>
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
} // end getReposInfo()