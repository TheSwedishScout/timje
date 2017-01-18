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
		image.src = 'images/photos/'+data[i].DISPLAY_IMG; //sök väg Thumnail
		image.classList.add("photo");
		image.alt = data[i].TITEL;
		aria.appendChild(image);

		image.addEventListener('click', function () {
			let backdrop = document.createElement('div');
			let bigImageAria = document.createElement('div');

			//Rubrik
			let rubrik = document.createElement("h2");
			rubrik.innerText = data[i].TITEL;
			bigImageAria.appendChild(rubrik);
			
			//Bilden
			let bigImage = document.createElement("img");
			bigImage.src = 'images/photos/'+data[i].DISPLAY_IMG;  //Sökväg stor bild
			bigImage.alt = data[i].TITEL;
			bigImageAria.appendChild(bigImage);
			backdrop.classList.add('bigg-image-aria');
			bigImage.classList.add('display');


			if (bigImage.naturalHeight > bigImage.naturalWidth){
				bigImageAria.classList.add("standing");
			}
			//debugger;
			//EV text
			if(data[i].TEXT != "NULL"){
				let text = document.createElement("p");
				text.innerText = data[i].TEXT;
				bigImageAria.appendChild(text);			
			}
			
			backdrop.appendChild(bigImageAria);
			aria.appendChild(backdrop);
			backdrop.addEventListener('click', function (){
				backdrop.parentNode.removeChild (backdrop);
			})
		})
	}
}
document.addEventListener('DOMContentLoaded', init)