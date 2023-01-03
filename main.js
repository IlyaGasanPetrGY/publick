function createRadioElement(name, checked) {
  var radioHtml = '<input type="radio" name="' + name + '"';
  if ( checked ) {
      radioHtml += ' checked="checked"';
  }
  radioHtml += '/>';
  var radioFragment = document.createElement('div');
  radioFragment.innerHTML = radioHtml;
  return radioFragment.firstChild;
}


$(document).ready(function (e) 
{
  $(".create__markColor").click(function(e){
    e.preventDefault();

    var name = $(".name_imput").val();
    var rbga = $(".calor_input").val()
    var objectRad = '<input type="radio"  name="' + name + '"/>' + '<div>' + name +'</div>'
    var objectInput = $('<input>', {
          'type': 'radio',
          'value': rbga,
          'class': 'colorsCL',
          'name': 'color_selector'
        })

    var objectLable = $('<lable>', {
        'class': 'lable__color',
      })
      $(objectLable).html(name)
    var objectRow = $('<div>',{
      'class': 'rowRad',
      'id': 'name'
    })
    $(objectRow).css('color', rbga)
    $(objectInput).appendTo(objectRow);
    $(objectLable).appendTo(objectRow);
    
   $(objectRow).appendTo('.radio_buttons__wrapper');

  })

    const img = new Image(); 
    img.src = "./dog.jpg";
    img.onload = function() {
      
    }
    $(".canvas").css("width", img.width);
    $(".canvas").css("height", img.height);


    var startcoordX = 0
    var startcoordY = 0
    
    var distX = 0
    var distY = 0
    var counter = 0
    var flag = false
    var id = ''
    var curenid

    var newstartX;
    var newstartY;

    let infoImage = {
      name: "default1",
      position: [0,0],
      nameMark: ""
    }




    function getRandomColor() {
        var radios = $('input[name=color_selector]:checked').val();
        return radios;
      }
    $(".canvas").mousedown(function (e) {
        console.log(e);
        startcoordX =  e.originalEvent.layerX/scale
        startcoordY = e.originalEvent.layerY/scale
        console.log(e.originalEvent.layerX, e.originalEvent.layerY)
        
        var object = $('<div>', {
            'class': 'square',
          })
        id = '#square' + counter
        curenid = id
        startcoordX = parseInt($(".canvas").css("width"))/2 + startcoordX;
        startcoordY = parseInt($(".canvas").css("height"))/2 + startcoordY;
        newstartX =  startcoordX;
        newstartY =  startcoordY;

        
        $(object).attr('id', 'square' + counter)
        $(".canvas").append(object)
        $(id).css('top', startcoordY)
        $(id).css('left', startcoordX)
        $(id).css('width', 0)
        $(id).css('height', 0)
        $(id).css('color', getRandomColor())
        flag = true
        startcoordX =  e.clientX
        startcoordY = e.clientY
        
        counter += 1

    });
    $(".canvas").mousemove(function (e) {
        if (flag) {
          var width_current = (e.originalEvent.clientX - startcoordX)/scale;
          var height_current = (e.originalEvent.clientY - startcoordY)/scale;
          

          if (width_current >= 0 && height_current >= 0) {
            $(id).css('left', newstartX)
            $(id).css('top', newstartY)
            $(id).css('width', (width_current))
            $(id).css('height', (height_current))
          }
          else {
            if (width_current < 0 && height_current < 0) {
              var a =  parseInt($(".canvas").css("width"))/2 + e.originalEvent.layerX/scale
              var b = parseInt($(".canvas").css("height"))/2 + e.originalEvent.layerY/scale

              $(id).css('left', parseInt(a))
              $(id).css('top', parseInt(b ))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            if (width_current < 0 && height_current > 0) {
              var a =  parseInt($(".canvas").css("width"))/2 + e.originalEvent.layerX/scale
              var b = newstartY;

              $(id).css('left', parseInt(a))
              $(id).css('top', parseInt(b))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            if (width_current > 0 && height_current < 0) {
              var a =  newstartX
              var b = parseInt($(".canvas").css("height"))/2 + e.originalEvent.layerY/scale

              $(id).css('left', parseInt(a))
              $(id).css('top', parseInt(b))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
          }
            
        }
    })
    $('.canvas').mouseup(function () { 
        flag = false;
        if (parseInt($(curenid).css('width')) < 20 && parseInt($(curenid).css('height')) < 20){
          $(curenid).css('width', 20)
          $(curenid).css('height', 20)

          $(curenid).css('border-radius', "50%")
          $(curenid).css('top', parseInt($(curenid).css('top')) - parseInt($(curenid).css('height'))/2)
          $(curenid).css('left', parseInt($(curenid).css('left')) - parseInt($(curenid).css('width'))/2)
          
        }
        $(id).css('width', (e.clientX - startcoordX)/scale )
        $(id).css('height', (e.clientY - startcoordY)/scale)
        if (scale >= 1){
          if (parseInt($(curenid).css('width')) < 8 || parseInt($(curenid).css('height')) < 8 ){
            $(curenid).remove();
          }
        }
        else {
          if (parseInt($(curenid).css('width'))*scale < 30 || parseInt($(curenid).css('height'))*scale < 30 ){
            $(curenid).remove();
          }
        }
    });
    



    function addOnWheel(elem, handler) {
      if (elem.addEventListener) {
        if ('onwheel' in document) {
          // IE9+, FF17+
          elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
          // устаревший вариант события
          elem.addEventListener("mousewheel", handler);
        } else {
          // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
          elem.addEventListener("MozMousePixelScroll", handler);
        }
      } else { // IE8-
        text.attachEvent("onmousewheel", handler);
      }
    }

    var scale = 1;

    addOnWheel(text, function(e) {

      var delta = e.deltaY || e.detail || e.wheelDelta;

      // отмасштабируем при помощи CSS
      if (delta > 0) scale += 0.05;
      else scale -= 0.05;
      
      img.height = img.height * scale
      img.width = img.width * scale
      text.style.transform = text.style.WebkitTransform = text.style.MsTransform = 'scale(' + scale + ')';

      // отменим прокрутку
      e.preventDefault();
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#photoInput").change(function() {
      readURL(this);
    });


    
    $( ".photo__input__wrapper" ).on( "click", ".img__prev", function(e) {
      $(".canvas").css('background', `url(${toString($(this).attr('src'))})`);
    });

    
})
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      AddToPrev(e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}
function AddToPrev(src_img) {
  var objectimgprev = $('<img>', {
    'class': 'img__prev',
    'id': 'penis',
    'src': src_img
  })
  $(".wrapper__photo__prev").append(objectimgprev);
}