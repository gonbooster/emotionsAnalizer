
        $(document).ready(function() {    
        $("#volver").attr("href", $(location).attr('href'));
        document.getElementById('files').addEventListener('change', archivo, false);
    // bind 'myForm' and provide a simple callback function 
     $('#myForm').ajaxForm(function(r) { 
        var head = JSON.parse(r);
        //console.log(head);
		if (head.found =='0')
			$( "main" ).append( '<em>No se detecta ninguna cara.</BR>Prueba girando el smartphone.</em>' );
		else
			$( "main" ).append('<em>Número de caras detectadas: '+(head.found)+'.</em>' );
        var i ;
        for (i=0;i<head.found;i++){
            
            
        //var detectionConfidence = Math.round(head.faces[0].detectionConfidence*100;
        //var blurredLikelihood = head.faces[0].blurredLikelihood*100;
        var angerLikelihood = head.faces[i].angerLikelihood*100;
        var headwearLikelihood = head.faces[i].headwearLikelihood*100;
        var joyLikelihood = head.faces[i].joyLikelihood*100;
        var sorrowLikelihood = head.faces[i].sorrowLikelihood*100;
        var surpriseLikelihood = head.faces[i].surpriseLikelihood*100;
        
		$( "main" ).append( '<h1>cara:'+(i+1)+'<h1>' );
        //if (detectionConfidence > 20)
            //$("#detectionConfidence .avatar-container.p-0" ).removeClass('p-0').addClass('p-'+detectionConfidence);
        //if (blurredLikelihood > 20)
            //$("#blurredLikelihood .avatar-container.p-0" ).removeClass('p-0').addClass('p-'+blurredLikelihood);
        if (angerLikelihood > 20){        	
            $( "main" ).append( '<p>Enfadado:</p><div id="progressBar" class="angerLikelihood tiny-green"><div></div></div>' );
            progress(angerLikelihood, $('.angerLikelihood'));
        }
        if (headwearLikelihood > 20){
            $( "main" ).append( '<p>Usa sombrero:</p><div id="progressBar" class="headwearLikelihood tiny-green"><div></div></div>' );
            progress(headwearLikelihood, $('.headwearLikelihood'));
        }
        if (joyLikelihood > 20){
            $( "main" ).append( '<p>Alegre:</p><div id="progressBar" class="joyLikelihood tiny-green"><div></div></div>' );
            progress(joyLikelihood, $('.joyLikelihood'));
        }
        if (sorrowLikelihood > 20){
            $( "main" ).append( '<p>Triste:</p><div id="progressBar" class="sorrowLikelihood tiny-green"><div></div></div>' );
            progress(sorrowLikelihood, $('.sorrowLikelihood'));
        }
         if (surpriseLikelihood > 20){
            $( "main" ).append( '<p>Sorprendido:</p><div id="progressBar" class="surpriseLikelihood tiny-green"><div></div></div>' );
            progress(surpriseLikelihood, $('.surpriseLikelihood'));
         }
		 if ((angerLikelihood <= 20) && (headwearLikelihood <= 20) && (joyLikelihood <= 20) && (sorrowLikelihood <= 20) && (surpriseLikelihood <= 20))
			$( "main" ).append('<em>Ponle más sentimiento!</BR>Las emociones que reconoce son: alegria, tristeza, sorpresa, enfado y ¡hasta si se usa sombrero!</em>' );
         
         }

    } );
  });
  $('input[type=file]').change(function () {
      $("upload").hide();
      $("#empleo").hide();
      $("#volver").show();
      $('#myForm').submit();
      
});

 function archivo(evt) {
                  var files = evt.target.files; // FileList object
             
                  // Obtenemos la imagen del campo "file".
                  for (var i = 0, f; f = files[i]; i++) {
                    //Solo admitimos imágenes.
                    if (!f.type.match('image.*')) {
                        continue;
                    }
             
                    var reader = new FileReader();
             
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         document.getElementById("list").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
                        };
                    })(f);
             
                    reader.readAsDataURL(f);
                  }
              }
              
              function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
}