$(document).ready(
  function (){
    // variabili per far partire la funzione di ricerca
    var bottone = $('.my_button');
    var enter = $('.my_input');
    ricerca(bottone,enter);

    // funzione di ricerca che al click su enter o sul bottone
    //  mostra i risultati della chiamata ajax in base al valore della input
    function ricerca(bottone,enter){
      bottone.on('click',
      function(){
        var testoRicerca = $('.my_input').val();
        risultatiRicercaFilm(testoRicerca);
      });
      enter.keypress(
      function(){
        if (event.which === 13) {
          var testoRicerca = $('.my_input').val();
          risultatiRicercaFilm(testoRicerca);
        }
      });
    }

    // funzione di ricerca tramite chiamata ajax
    function risultatiRicercaFilm(testoRicerca){
      $.ajax({
        url:'https://api.themoviedb.org/3/search/movie',
        url:'https://api.themoviedb.org/3/search/tv',
        method:'GET',
        data:{
          api_key:'7017856c6f87176e78043e5d12639259',
          query:testoRicerca,
        },
        // in caso di successo libera la ul, fa partire la funzione
        // di stampa dei risultati
        success: function(dataFilm) {
          var lista = $('.my_film_list');
          liberaLista(lista);
          stampa(dataFilm.results);
        },
        error: function (richiesta, stato, errori) {
          alert('Errore');
        }
      });
    }

    // funzione per liberare la listaFilm
    function liberaLista(lista){
      lista.html('');
    }

    //funzione che stampa ogni singolo risultato inerente al valore dell'input
    function stampa(films) {
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);

      for (var i = 0; i < films.length; i++) {
        var singoloFilm = films[i];
        // context è un oggetto con dentro i valori da stampare tramite handlebars
        var context = {
          poster_path: singoloFilm.poster_path,
          title_film:singoloFilm.title,
          title_tv_series:singoloFilm.name,
          original_name_tv_series:singoloFilm.original_name,
          original_title_film:singoloFilm.original_title,
          original_language:stampaBandiera(singoloFilm.original_language),
          vote_average:stelle(singoloFilm.vote_average),
          overview: singoloFilm.overview
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
        } else {
            stelle += '<i class="far fa-star"></i>';
          }
      }
      return stelle;
    }

    // funzione che stampa una bandiera
    // se la lingua presente nell'array corrisponde al nome del file png
    function stampaBandiera(bandiera){
      var lingue = ['ad','ae','af','ag','ai','al','am','ao','aq','ar','as','at','au','aw','ax','az','ba','bb','bd','be','bf','bg',
      'bh','bi','bj','bl','bm','bn','bo','bq','br','bs','bt','bv','bw','by','bz','ca','cc','cd','cf','cg','ch','ci','ck','cl','cm','cn','co','cr',
      'cu','cv','cw','cx','cy','cz','de','dj','dk','dm','do','dz','ec','ee','eg','eh','er','es','et','fi','fj','fk','fm','fo','fr','ga','en','gd',
      'ge','gf','gg','gh','gi','gl','gm','gn','gp','gq','gr','gs','gt','gu','gw','gy','hk','hm','hn','hr','ht','hu','id','ie','il','im','hi','io',
      'iq','ir','is','it','je','jm','jo','ja','ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz','la','lb','lc','li','lk','lr','ls','lt','lu',
      'lv','ly','ma','mc','md','me','mf','mg','mh','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nc','ne',
      'nf','ng','ni','nl','no','np','nr','nu','nz','om','pa','pe','pf','pg','ph','pk','pl','pm','pn','pr','ps','pt','pw','py','qa','re','ro','rs',
      'ru','rw','sa','sb','sc','sd','se','sg','sh','si','sj','sk','sl','sm','sn','so','sr','ss','st','sv','sx','sy','sz','tc','td','tf','tg','th',
      'tj','tk','tl','tm','tn','to','tr','tt','tv','tw','tz','ua','ug','um','us','uy','uz','va','vc','ve','vg','vi','vn','vu','wf','ws','ye','yt',
      'za','zm','zw'];
      if (lingue.includes(bandiera)) {
        bandiera = '<img src="img/' + bandiera + '.png" alt="bandiera">';
      }
      return bandiera;
    }
  }
);
