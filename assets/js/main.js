$(document).ready(function() {

  $("#search").on("keyup",function(e) {
    var username = e.target.value;

    // request user info
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: 'bd27811095169a2986c8',
        client_secret: '775086d2ce6236f285bdc437f96a3cb2ca210f21'
      }
    }).done(function(user) {
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
        $("#profile").html(`
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
            </div> <!-- end panel-heading -->
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3">
                  <img class="thumbnail avatar" src="${user.avatar_url}">
                  <a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
                  <br>
                </div>
                <div class="col-md-9">
                  <span class="label label-default">Public Repos: ${user.public_repos}</span>
                  <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                  <span class="label label-success">Following: ${user.following}</span>
                  <span class="label label-info">Followers: ${user.followers}</span>
                  <br><br>
                  <ul class="list-group">
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Email: ${user.email}</li>
                    <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                  </ul>
                </div>
              </div> <!-- end row -->
            </div> <!-- end panel-body -->
          </div> <!-- end panel -->
          
          <h3 class="page-header">Latest Repos</h3>

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
          sort: 'created: asc',
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
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <br>
                  <a class="btn btn-primary" href="${repo.html_url}" target="_blank">Visit</a>
                </div>
              </div> <!-- end row -->
            </div> <!-- end well -->
          `);
        });
      });

    });
  });

});