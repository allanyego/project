//prevent reload
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
//select
$(function () {
  $('.select').each(function () {
    $(this).select2({
      theme: 'bootstrap4',
      width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
      placeholder: $(this).data('placeholder'),
      allowClear: Boolean($(this).data('allow-clear')),
    });
  });
});
// tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
//copy link
function copyToClipboard(text, el) {
  var copyTest = document.queryCommandSupported('copy');
  var elOriginalText = el.attr('data-original-title');

  if (copyTest === true) {
    var copyTextArea = document.createElement("textarea");
    copyTextArea.value = text;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'Copied!' : 'Whoops, not copied!';
      el.attr('data-original-title', msg).tooltip('show');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(copyTextArea);
    el.attr('data-original-title', elOriginalText);
  } else {
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}
$(document).ready(function() {
  $('.js-tooltip').tooltip();
  $('.js-copy').click(function() {
    var text = $(this).attr('data-copy');
    var el = $(this);
    copyToClipboard(text, el);
  });
});
//downline tree
$.fn.extend({
    treed: function (o) {
        var openedClass = "fas fa-minus";
        var closedClass = "fas fa-plus";

        if (typeof o != "undefined") {
            if (typeof o.openedClass != "undefined") {
                openedClass = o.openedClass;
            }
            if (typeof o.closedClass != "undefined") {
                closedClass = o.closedClass;
            }
        }

        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find("li")
            .has("ul")
            .each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='indicator " + closedClass + "'></i>");
                branch.addClass("branch");
                branch.on("click", function (e) {
                    if (this == e.target) {
                        var icon = $(this).children("i:first");
                        icon.toggleClass(openedClass + " " + closedClass);
                        $(this).children().children().toggle();
                    }
                });
                branch.children().children().toggle();
            });
        //fire event from the dynamically added icon
        tree.find(".branch .indicator").each(function () {
            $(this).on("click", function () {
                $(this).closest("li").click();
            });
        });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find(".branch>a").each(function () {
            $(this).on("click", function (e) {
                $(this).closest("li").click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find(".branch>button").each(function () {
            $(this).on("click", function (e) {
                $(this).closest("li").click();
                e.preventDefault();
            });
        });
    },
    generateItem: function () {
        var li = $("<li>");
    },
    generateTree: function () {
        var tree = $(this);
    },
});

//Initialization of treeviews

$("#tree1").treed();

//scrollspy

$(document).ready(function(){
  $('body').scrollspy({target: ".scrollspy", offset: 50});
});

//navbarCollapse
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "0px 0px";
    // document.getElementById("logo").style.height = "4.8rem";
  } else {
    document.getElementById("navbar").style.padding = "15px 0px";
    // document.getElementById("logo").style.height = "5.8rem";
  }
}
// connect mpesa
function connect() {
  var e = document.getElementById("connectMpesa");
  var f = document.getElementById("connectForm");
  if (f.style.display === "none") {
    f.style.display = "block";
    e.style.display = "none";
  }else {
    f.style.display = "none";
    e.style.display = "block";
  }
}
$("#phone").inputmask({"mask": "(+999) 999-999999"});
//verification CODE
const form = document.querySelector('#verification')
const inputs = form.querySelectorAll('input')
const KEYBOARDS = {
backspace: 8,
arrowLeft: 37,
arrowRight: 39,
}

function handleInput(e) {
const input = e.target
const nextInput = input.nextElementSibling
if (nextInput && input.value) {
  nextInput.focus()
  if (nextInput.value) {
    nextInput.select()
  }
}
}

function handlePaste(e) {
e.preventDefault()
const paste = e.clipboardData.getData('text')
inputs.forEach((input, i) => {
  input.value = paste[i] || ''
})
}

function handleBackspace(e) {
const input = e.target
if (input.value) {
  input.value = ''
  return
}

input.previousElementSibling.focus()
}

function handleArrowLeft(e) {
const previousInput = e.target.previousElementSibling
if (!previousInput) return
previousInput.focus()
}

function handleArrowRight(e) {
const nextInput = e.target.nextElementSibling
if (!nextInput) return
nextInput.focus()
}

form.addEventListener('input', handleInput)
inputs[0].addEventListener('paste', handlePaste)

inputs.forEach(input => {
input.addEventListener('focus', e => {
  setTimeout(() => {
    e.target.select()
  }, 0)
})

input.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case KEYBOARDS.backspace:
      handleBackspace(e)
      break
    case KEYBOARDS.arrowLeft:
      handleArrowLeft(e)
      break
    case KEYBOARDS.arrowRight:
      handleArrowRight(e)
      break
    default:
  }
})
})
// send otp CODE
$(document).ready(function(e) {
  $('#btn_Code').on('click', function(e) {
    e.preventDefault();
    $("#btn_Code").text("Sending...");
    var phone = $('#phone').val();
    var phoneuser = $('#phoneuser').val();
    var g = document.getElementById("verification");
    if (phone=="") {
      document.getElementById("phoneMsg").innerHTML = "<div class='alert alert-warning' role='alert'>Phone Number is Required!</div>";
      g.style.display = "none";
    }else {
      $.ajax({
        url: "process/send_code.php",
        type: "POST",
          data: {
            phone: phone,
            phoneuser:phoneuser,
          },
          cache: false,
          success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==0){
              $("#btn_Code").text("Sent");
              var code = dataResult.code;
              $("#btn_Code").attr("disabled", "disabled");
              g.style.display = "block";

              $('#btn_phone').on('click', function(e) {
                e.preventDefault();
                var a = $('#a').val();
                var b = $('#b').val();
                var c = $('#c').val();
                var d = $('#d').val();
                var newcode = a+b+c+d;
                if (a=="" || b=="" || c=="" || d=="") {
                  document.getElementById("phoneMsg").innerHTML = "<div class='alert alert-warning' role='alert'>Invalid OTP CODE!</div>";
                }else {

                  if (code == newcode) {
                    $.ajax({
                        url: "process/save_number.php",
                        type: 'post',
                        data: {
                          phone: phone,
                          phoneuser:phoneuser,
                        },
                        cache: false,
                        success: function(dataResult){
                          var dataResult = JSON.parse(dataResult);
                          if(dataResult.statusCode==0){
                             window.location.href = "profile_complete.php";
                          }
                          else if(dataResult.statusCode==1){
                            console.log("not saved") ;
                          }
                        }
                    });
                  }else {
                    document.getElementById("phoneMsg").innerHTML = "<div class='alert alert-warning' role='alert'>Invalid OTP CODE!</div>";
                  }
                }
                });
            }
            else if(dataResult.statusCode==1){
              g.style.display = "none";
               document.getElementById("phoneMsg").innerHTML = "<div class='alert alert-danger' role='alert'>Try again later an error occurred!</div>";
            }
        }
      });
    }
  });
});
// calculator
