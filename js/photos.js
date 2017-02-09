function JSONPRequest(url) {
    let s = document.createElement('script');
    s.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(s);
}

function init(){
	JSONPRequest("http://timje.se/test/php/getPhotos.php?callback=pritImages");
}
function pritImages(data) {
	
	
	
	let aria = document.getElementById('photos');
	for (let i = 0; i < data.length; i++) {
		let image = document.createElement("img");
		image.src = 'http://timje.se//nybild/Photos/'+data[i].DISPLAY_IMG; //sök väg Thumnail
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
			
			var text;
			//Bilden
			var bigImage = new Image();
			bigImage.onload = function () {
				if (bigImage.naturalHeight > bigImage.naturalWidth){
					bigImageAria.classList.add("standing");
					text.style.width = bigImage.width + "px";
					
				}
			}
			bigImage.src = 'http://timje.se//nybild/images/'+data[i].THUMB_IMG;  //Sökväg stor bild
			bigImage.alt = data[i].TITEL;
			bigImageAria.appendChild(bigImage);
			backdrop.classList.add('bigg-image-aria');
			bigImage.classList.add('display');

			//debugger;
			//EV text
			if(data[i].TEXT != "NULL"){
				text = document.createElement("p");
				
				
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