// Github API
var Github = function(clientId, secret) {
  this.baseUrl = 'https://api.github.com';
  this.clientId = clientId;
  this.secret = secret;
};

Github.prototype.request = function(endpoint, params, callback) {
  var data = jQuery.extend({
    client_id: this.clientId,
    secret: this.secret
  }, params);

  jQuery.ajax({
    url: this.baseUrl + endpoint,
    data: data
  }).done(function(result) {
    callback(result);
  }).fail(function(){
    callback();
  });
};

Github.prototype.getUser = function(username, callback) {
  var endpoint = '/users/' + username;
  this.request(endpoint, {}, callback);
};

Github.prototype.getUserRepos = function(username, params, callback) {
  var endpoint = '/users/' + username + '/repos';
  this.request(endpoint, params, callback);
};

(function($) {
  // Github
  var GITHUB_CLIENT_ID = 'bd27811095169a2986c8';
  var GITHUB_SECRET = '775086d2ce6236f285bdc437f96a3cb2ca210f21';
  var github = new Github(GITHUB_CLIENT_ID, GITHUB_SECRET);

  function loadRepos(user, page) {
    var limit = 3;
    github.getUserRepos(user.login, {per_page: limit, page: page}, function (repos) {
      if(repos && repos.length > 0) {
        $('#repos').html($.templates('#repoTemplate').render(repos));
        $('#pagination').twbsPagination({
          totalPages: Math.ceil(user.public_repos / limit),
          visiblePages: limit,
          prev: '&laquo',
          next: '&raquo',
          onPageClick: function (event, page) {
            loadRepos(user, page);
          }
        });
      }
    });    
  }

  function addNote(e) {
    var newDate = new Date(),
    id = newDate.getTime(),
    note = $('#note').val(),
    new_note = {
      "id": id,
      "note": note
    },
    noteList = JSON.parse(localStorage.getItem('notes'));

    if (note === '') {
      alert('note is required');
      e.preventDefault();
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
      if (notes === null) {
        notes = [];
      }
      notes.push(new_note);
      localStorage.setItem('notes', JSON.stringify(notes));
      $(".modal-body").html('Done!');
    }
  } 

  $(document).ready(function () {
    var delay;
    $('#search').on('keydown', function () {
      clearTimeout(delay);
      delay = setTimeout(function() {
        var username = $(this).val();
        if (username) {
          github.getUser(username, function (user) {
            if (user) {
              $('#profile').html($.templates('#userTemplate').render(user));
              loadRepos(user, 1);
            } else {
              $('#profile').html($.templates('#userNotFoundTemplate').render());
            }
          });
        } else {
          $('#profile').html('');
        }
      }.bind(this), 500);
    });

    $('#add-note').on('submit', function (e) {
      addNote(e);
    });
  });
})(jQuery);