
// press start
const $start_btn = document.querySelector('#start-btn');
$start_btn.addEventListener('click', function(){
    start();
});
function start(){
    const $$home_bg1 = document.querySelector('.home-bg1');
    const $$home_bg2 = document.querySelector('.home-bg2');
    const $$home_bg3 = document.querySelector('.home-bg3');
    const $$homep = document.querySelector('.homep');
    const $$homeTitle = document.querySelector('.homeTitle');
    const intro = document.querySelector('.intro');
    // const $$intro_bg = document.querySelectorAll('.intro-bg');
    $$home_bg1.classList.add('start');
    $$home_bg2.classList.add('start');
    $$home_bg3.classList.add('start');
    $start_btn.classList.add('start');
    $$homep.classList.add('start');
    $$homeTitle.classList.add('start');
    intro.style.zIndex = 2;
    $('.home_bg').addClass('start'); 
    setTimeout(function(){
        $$home_bg1.style.display = 'none';
        $$home_bg2.style.display = 'none';
        $$home_bg1.classList.remove('start');
        intro.classList.add('start');
        $('.intro-bg, .intro-title, .moon').addClass('start');
        $('.showTxt, #begin-btn').addClass('show');
        // $('#begin-btn').addClass('show');
    },500)
};

// begin
const $$begin_btn = document.querySelector('#begin-btn');
let page = 0;
$$begin_btn.addEventListener('click',function(){
    begin();
    page++;
});
function begin(){
    const $$intro_title = document.querySelector('.intro-title');

    if(page == 0){
        $('.intro-title').text('Quest one')
        $('.intro-txt').addClass('disappear');
        $('.home-bg3').animate({
            opacity:0,
        },50);
        $('.section1').css('zIndex',3);
        $('.hands, .guide-txt, .select-menu').addClass('begin');
        $('#begin-btn').text('Continue');
    }else if(page == 1){
        $('.home-bg3').css('display','none');
        // $('#begin-btn').css('width','auto');
        $('.guide-txt1').text('Select your soul');
        $('.hands').animate({
            right: '100vw',
            transform:'scale(0.6)',
            opacity: 0
        },100);
        setTimeout(function(){
            // $('.hands').css('display','none');
            $('.hands2').css('display','block');
        },100);
        $('.select-menu-wrapper').animate({
            opacity:0,
            marginTop:20
        },400,function(){
            $('.select-menu-wrapper').css('display','none');
        });
        $('.select-menu-wrapper2').css('display','flex');
        setTimeout(function(){
            $('.select-menu-wrapper2').animate({
                opacity:1,
                marginTop:0
            },1000);
            $('.hands2').addClass('begin');
            setTimeout(function(){
                $('.hand-line, .arrow1, .arrow2, .arrow3').addClass('active');
                
            },500)
            
        },400);
        

    }else if(page == 2){
        $('#begin-btn').removeClass('show');
        $('.section1').addClass('bye');
        $('.hands2').animate({
            right: '100vw',
            transform:'scale(0.6)',
            opacity: 0
        },100);
        $('.select-menu-wrapper2').animate({
            opacity:0,
            marginTop:20
        },400,function(){
            $('.select-menu-wrapper2').css('display','none');
            $('.section1').css('display','none');
            $('.section2').css('zIndex',2);
            $('.section2').addClass('show');
            setTimeout(function(){
                $('.rotateBox,.card,.select-card').addClass('active');
                // $('.card').addClass('active');

            },100);
        });
        $('#begin-btn').addClass('or');
        $('#begin-btn').addClass('disabled');

    }else if(page == 3){
        $('.rotateBox').addClass('bye');
        $('.card, .select-card').removeClass('active');
        $('#begin-btn').animate({
            bottom: 70,
            opacity:0
        },200);
        setTimeout(function(){
            $('#begin-btn').css('display', 'none');
        },200)
        $('.section2').removeClass('show');
        setTimeout(function(){
            $('.section3').css('zIndex',3);
            $('.section3, .fingerprint, .gage, .fingerprint-txt').addClass('show');
        },200);
        
    }
    
}


$('#left-btn').click(function(){
    $('#left-btn, .hand-left').addClass('active');
    $('#right-btn, .hand-right').removeClass('active');
});
$('#right-btn').click(function(){
    $('#right-btn, .hand-right').addClass('active');
    $('#left-btn, .hand-left').removeClass('active');
});
$('#heart-btn').click(function(){
    $('#heart-btn, .arrow1').addClass('active');
    $('#life-btn, #health-btn').removeClass('active');
    $('.arrow1').css({
        fontSize:'1.3rem'
    })
});
$('#life-btn').click(function(){
    $('#life-btn, .arrow2').addClass('active');
    $('#heart-btn, #health-btn').removeClass('active');
});
$('#health-btn').click(function(){
    $('#health-btn, .arrow3').addClass('active');
    $('#heart-btn, #life-btn').removeClass('active');
});

$('.selected-card').each(function(index){
    $(this).attr('data-index',index);
})


let cardSelect = false;
$('.card').each(function(index){
    $(this).attr('data-index',index);
}).click(function(){
    cardSelect = true;
    var el = $(this).attr('data-index');
    
    $('.card').eq(el).addClass('select');
    // $('.selected-card').eq(el).removeClass('select');
    $('.selected-card').eq(el).css({
        opacity:1,
        marginTop:0,
        zIndex:1
    })
    $('.selected-card').eq(el).fadeIn(800);
    $('.card[data-index != '+el+']').removeClass('select');
    // $('.selected-card[data-index != '+el+']').addClass('select');
    $('.selected-card[data-index != '+el+']').css('zIndex',2);
    $('.selected-card[data-index != '+el+']').animate({
        opacity:0,
        marginTop:120
    },600,function(){
        $('.selected-card[data-index != '+el+']').fadeOut(50);
    })


    if(cardSelect){
        $('#begin-btn').removeClass('disabled');
    }
})

const $thumb = document.querySelector('.fingerprint');
const $gage = document.querySelector('.gage');
$thumb.addEventListener('mousedown', pressing);
$thumb.addEventListener('mouseup', notPressing);
$thumb.addEventListener('touchstart', pressing);
$thumb.addEventListener('touchend', notPressing);
let timePress = 0;
let curGage = 90;
let press = false;
let done = false;

function counter(){
    if (press){
        timePress++;
        gage();
    }else if(done) {
        $gage.style.height = '0%';
        showResult();
    } else {
        timePress = 0;
        resetGage();
    }
    requestAnimationFrame(counter);
}
counter();

function pressing(e) {
    press = true;
}
function notPressing(e) {
    press = false;
}
function gage() {
    // let progress = timePress;
    $gage.style.height = (curGage - timePress) + '%';
    $gage.style.transitionDuration = '0.4s';
    $gage.style.transitionDelay = '0s';
    if($gage.clientHeight == 0){
        press = false;
        done = true;
    }
}
function resetGage() {
    $gage.style.transitionDuration = '1s';
    $gage.style.height = '90%';
}

function showResult() {
    $('.fingerprint, .intro-bg').addClass('disappear');
    $('.section3').removeClass('show');
    $('.fingerprint-txt').addClass('bye');
    setTimeout(function(){
        $('.section2, .section3').css('display', 'none');
        $('.result-section').slideDown(1200);
    },1000);
    $('.intro').removeClass('start');
}

$('.goHome-btn').click(function(){
    console.log('새로고침')
    location.reload();
})