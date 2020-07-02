$(document).ready(
  function (){
    //  al submit(click tasto invio) della input dentro il my_form
    // prendo il valore della input e faccio eseguire la funzione di ricerca dei film
    $('.my_button').on('click', function(){
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
        // di stampa dei risultati
        success: function(dataFilm) {
          $('.my_film_list').html('');
          stampa(dataFilm.results);
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
        // context è un oggetto con dentro i valori da stampare tramite handlebars
        var context = {
          title:singoloFilm.title,
          original_title:singoloFilm.original_title,
          original_language: singoloFilm.original_language,
          vote_average:stelle(singoloFilm.vote_average)
        }
        var html = template(context);
        var listaFilm = $('.my_film_list');
        listaFilm.append(html);
      }
    }
    // funzione che mette in scala 1 a 5 la media voto e assegna
    // una stellina piena per ogni punto, una vuota per i punti mancanti
    function stelle(mediaVoto) {
    var voto = Math.ceil(mediaVoto / 2);
    var stelle = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= voto) {
          stelle += '<i class="fas fa-star"></i>';
        }else {
          stelle += '<i class="far fa-star"></i>';
        }
    }
    return stelle;
  }
  }
);
