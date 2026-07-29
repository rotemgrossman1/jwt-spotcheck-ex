$(document).ready(function() {
    $('.getFavAnimal').on('click', function() {
      $.ajax({
        url: `/favorites/animals`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
          
        },
        success: function(response) {
          console.log("jwt token: ", localStorage.getItem('token'));
          $(".animal").append(`<h2>${response.animal}!</h2>`)
          console.log(response);
     
          
        },
        error: function(res, status, error) {
          location.href = "/"
        }
      });
      
    });
  });