function JSONPRequest(url) {
    let s = document.createElement('script');
    s.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(s);
}

function init(){
	JSONPRequest("php/getPhotos.php?callback=pritImages");
}
function pritImages(data) {
	let aria = document.getElementById('photos');
	for (let i = 0; i < data.length; i++) {
		let image = document.createElement("img");
		image.src = 'images/photos/'+data[i].DISPLAY_IMG; //Thumnail
		image.classList.add("photo");
		image.alt = data[i].TITEL;
		aria.appendChild(image);

		image.addEventListener('click', function () {
			let backdrop = document.createElement('div');
			let bidImageAria = document.createElement('div');

			let bigImage = document.createElement("img");
			bigImage.src = 'images/photos/'+data[i].DISPLAY_IMG;
			bigImage.alt = data[i].TITEL;
			bidImageAria.appendChild(bigImage);
			backdrop.classList.add('bigg-image-aria');
			bigImage.classList.add('display');
			backdrop.appendChild(bidImageAria);
			aria.appendChild(backdrop);
			backdrop.addEventListener('click', function (){
				backdrop.parentNode.removeChild (backdrop);
			})
		})
	}
}
document.addEventListener('DOMContentLoaded', init)