$(document).ready(
  function (){
    //  al submit(click tasto invio) della input dentro il my_form
    // prendo il valore della input e faccio eseguire la funzione di ricerca dei film
    $('.my_form').on('submit', function(){
      var testoRicerca = $('.my_input').val();
      risultatiRicercaFilm(testoRicerca);
    });

    // funzione di ricerca tramite chiamata ajax
    function risultatiRicercaFilm(testoRicerca){
      $.ajax({
        url:'https://api.themoviedb.org/3/search/movie',
        method:'GET',
        data:{
          api_key:'7017856c6f87176e78043e5d12639259',
          query:testoRicerca,
          language:'it-IT'
        },
        // in caso di successo libera la ul, fa partire la funzione
        // di stampa dei risultati e ripristina la input
        success: function(dataFilm) {
          $('.my_film_list').html('');
          stampa(dataFilm.results);
          testoRicerca;
        },
        error: function (richiesta, stato, errori) {
          alert('Errore');
        }
      });
    }

    //funzione che stampa ogni singolo risultato inerente al valore dell'input
    function stampa(films) {
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);

      for (var i = 0; i < films.length; i++) {
        var singoloFilm = films[i];
        var html = template(singoloFilm);
        var listaFilm = $('.my_film_list');
        listaFilm.append(html);
      }
    }
  }
);
