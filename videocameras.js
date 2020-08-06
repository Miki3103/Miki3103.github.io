// Анимация машинок
let seekInput = document.querySelector('.seek');
// 1 машинка
let carAnimation = anime.timeline({
	duration: 3000,
	easing: 'steps(80)',
	loop: true,
	autoplay: false,
});

carAnimation.add({
	targets:['#car'],
	translateX: '13%',
	translateY: '9%',
}).add({
	targets:['#car'],
	translateX: '21%',
	translateY: '-2%',
});
// 2 машинка
let secondCarAnimation = anime.timeline({
	duration: 3000,
	easing: 'steps(80)',
	loop: true,
	autoplay: false,
});

secondCarAnimation.add({
	targets:['#secondCar'],
	translateX: '40%',
	translateY: '2%',
	delay: 3000,
}).add({
	targets:['#secondCar'],
	translateX: '80%',
	translateY: '-2%',
});
// 3 машинка
let evacuatorAnimation = anime.timeline({
	duration: 3000,
	easing: 'steps(80)',
	autoplay: false,
});

evacuatorAnimation.add({
	targets:['#evacuator'],
	translateY: '-17%',
}).add({
	targets:['#evacuator'],
	translateX: '5%',
	translateY: '-22%',
});
// 4 машинка
let secondEvacuatorAnimation = anime.timeline({
	duration: 3000,
	easing: 'steps(80)',
	autoplay: false,
	update: function(anim) {
    	seekInput.value = secondEvacuatorAnimation.progress;
 	},
 	complete: function(anim) {
 		cars.forEach( item => item.pause() );
 	}
});

secondEvacuatorAnimation.add({
	targets:['#secondEvacuator'],
	translateX: '9%',
	translateY: '8%',
	delay: 4000,
}).add({
	targets:['#secondEvacuator'],
	translateX: '17%',
	translateY: '-3%',
});
// События кнопок
let cars = [ carAnimation, secondCarAnimation, evacuatorAnimation, secondEvacuatorAnimation ];

$('#play').click(() => {
	$('.hidden').css('display', 'block');
	cars.forEach( item => item.play()); 
});

$('#pause').click( () => cars.forEach( item => item.pause() ) ); 

$('#stop').click(() => {
	$('.hidden').css('display', 'block');
	cars.forEach( item => item.restart() );
	cars.forEach( item => item.pause() ); 
});

$('#forward').click( () => {
	$('.hidden').css('display', 'block');
	cars.forEach( item => item.pause() );
	seekInput.value = +seekInput.value + 5;
	cars.forEach( item => item.seek( item.duration * seekInput.value/100 ) );
	
	if ( seekInput.value == 100 ) {
		document.querySelector('#forward').disabled = true;
	} else {
		document.querySelector('#forward').disabled = false;
	}

	if ( seekInput.value == 0 ) {
		document.querySelector('#backward').disabled = true;
	} else {
		document.querySelector('#backward').disabled = false;
	}
});

$('#backward').click( () => {
	$('.hidden').css('display', 'block');
	cars.forEach( item => item.pause() );
	seekInput.value = +seekInput.value - 5;
	cars.forEach( item => item.seek(item.duration * seekInput.value/100 )  );
	
	if ( seekInput.value == 100 ) {
		document.querySelector('#forward').disabled = true;
	} else {
		document.querySelector('#forward').disabled = false;
	}

	if ( seekInput.value == 0 ) {
		document.querySelector('#backward').disabled = true;
	} else {
		document.querySelector('#backward').disabled = false;
	}
});
// События бегунка
seekInput.addEventListener('input', function() {
 	cars.forEach( item => item.seek( item.duration * (seekInput.value / 100) ) );

  	if ( seekInput.value == 100 ) {
		document.querySelector('#forward').disabled = true;
	} else {
		document.querySelector('#forward').disabled = false;
	}

	if ( seekInput.value == 0 ) {
		document.querySelector('#backward').disabled = true;
	} else {
		document.querySelector('#backward').disabled = false;
	}

});

seekInput.addEventListener('click', function() {
	cars.forEach( item => item.pause() );
	cars.forEach( item => item.seek( item.duration * (seekInput.value / 100) ) );

  	if ( seekInput.value == 100 ) {
		document.querySelector('#forward').disabled = true;
	} else {
		document.querySelector('#forward').disabled = false;
	}

	if ( seekInput.value == 0 ) {
		document.querySelector('#backward').disabled = true;
	} else {
		document.querySelector('#backward').disabled = false;
	}

});



