var delay_Open_ContactWindow = 4*1000;
var delay_read_Contact = 7*1000;


var contact_selector = '#top-card-text-details-contact-info';







var currentDate = Date.now();

function closeOpenedWindow() {
	window.close();
}

function Current_Date_Time_Sec() {
	try {
		let currentDateTime = new Date();
		let hrs = currentDateTime.getHours();
		let mnts = currentDateTime.getMinutes();
		let dt = currentDateTime.getDate().toString();

		dt = dt.length < 2 ? `0` + dt : dt;

		let mt = (currentDateTime.getMonth() + 1).toString();
		mt = mt.length < 2 ? `0` + mt : mt;

		let TodayDate = dt + `_` + mt + `_` + currentDateTime.getFullYear();

		currDate = dt + `/` + mt + `/` + currentDateTime.getFullYear();

		currTime = hrs + ':' + mnts + ':' + currentDateTime.getSeconds();

		let AMPM = hrs >= 12 ? `PM` : `AM`;
		hrs = hrs - 12 * parseInt(hrs / 12);
		hrs = hrs ? hrs : 12;
		mnts = mnts < 10 ? `0` + mnts : mnts;

		let result = '';
		result =
			TodayDate +
			`  ` +
			hrs +
			`_` +
			mnts +
			` ` +
			AMPM +
			`  ` +
			currentDateTime.getSeconds() +
			` sec `;

		let AMPM2 = AMPM == `AM` ? `Morning` : `Evening`;
		return result;
	} catch (err) {
		console.log(err);
	}
}

function Open_ContactWindow() {
	try {
		document.querySelector(contact_selector).click();
	} catch (e) {
		console.log(e);
	}
}

var arrParam = ['profile', 'website', 'phone', 'email'];
var profile = '';
var website = '';
var phone = '';
var email = '';
var llocation = '';
var nname = '';

function extract_set_value(element, head) {
	var vvalue = '';

	if (element.nodeName == 'DIV') {
		vvalue = element.innerText;
	} else if (element.nodeName == 'UL') {
		element.querySelectorAll('li').forEach((lstElement) => {
			vvalue = lstElement.innerText + ', ' + vvalue;
		});

		var lastindx = vvalue.lastIndexOf(',');
		vvalue = vvalue.substring(0, lastindx);
	}

	//console.log(vvalue);

	// if(vvalue.trim!=""){
	switch (head) {
		case 'profile':
			profile = vvalue;
			break;

		case 'website':
			website = vvalue;
			break;

		case 'phone':
			phone = vvalue;
			break;

		case 'email':
			email = vvalue;
			break;

		default:
			website = vvalue;
			break;
	}
	// }
}

function read_value(ele) {
	var titleElement = ele.querySelector('h3');
	var key = titleElement.innerText.toLowerCase();

	arrParam.forEach((head) => {
		if (key.includes(head)) {
			//console.log(key);
			var element = titleElement.nextElementSibling;
			//console.log(element);
			//console.log(element.nodeName);
			extract_set_value(element, head);
		}
	});
}

function read_Location() {
	try {
		var Main_Ele = document.querySelector(
			'.top-card-background-hero-image'
		).nextElementSibling;
		llocation = Main_Ele.querySelector(
			'.text-body-small.inline.t-black--light.break-words'
		).innerText;
		console.log(llocation);
	} catch (e) {
		console.log(e);
	}
}

function read_Name() {
	try {
		var Main_Ele = document.querySelector(
			'.top-card-background-hero-image'
		).nextElementSibling;
		nname = Main_Ele.querySelector('h1').innerText;
		console.log(nname);
	} catch (e) {
		console.log(e);
	}
}

function read_Contact() {
	document.querySelectorAll('.pv-contact-info__contact-type').forEach((ele) => {
		try {
			read_value(ele);
		} catch (e) {
			console.log(e);
		}
	});

	download_Contact();
}

class cls_contact {
	constructor(profile, website, email, phone, location, recordcreated) {
		this.profile = profile;
		this.website = website;
		this.email = email;
		this.phone = phone;
		this.recordcreated = recordcreated;
	}

	toJSON() {
		return {
			Profile: this.profile,
			Website: this.website,
			Email: this.email,
			Phone: this.phone,
			Location: llocation.trim(),
			Name: nname.trim(),
			Record_Created: this.recordcreated,
		};
	}
}

function download_Contact() {
	console.log('profile is  ' + profile);
	console.log('website is  ' + website);
	console.log('email is  ' + email);
	console.log('phone is  ' + phone);
	console.log('location is  ' + llocation);

	let filename = '';
	try {
		filename = Current_Date_Time_Sec();
	} catch (e) {
		console.log(e);
	}

	let recordcreated = new Date();
	
	
	if(email.trim()=="" && 	phone.trim()=="")
	{
		return;
	}
	
	

	var cls_contact_Obj = new cls_contact(
		profile.trim(),
		website.trim(),
		email.trim(),
		phone.trim(),
		recordcreated
	);

	try {
		filename = 'Linkedin ' + filename + ' .json';
		if (typeof cls_contact_Obj === 'object') {
			cls_contact_Obj = JSON.stringify(cls_contact_Obj, undefined, 4);
		}
		var tempLink = document.createElement('a');
		let textArea = document.querySelector('textarea');
		var taBlob = new Blob([cls_contact_Obj], { type: 'text/json' });
		tempLink.setAttribute('href', URL.createObjectURL(taBlob));
		tempLink.setAttribute('download', `${filename}`);
		tempLink.click();
		URL.revokeObjectURL(tempLink.href);
	} catch (e) {
		console.log(e);
	}

	closeOpenedWindow();
}

window.addEventListener('load', function () {
	
	currURL = window.location.href.toLowerCase().trim();

	if (currURL.indexOf('keywords') == -1) {

		read_Name();

		read_Location();

		setTimeout(() => {
			Open_ContactWindow();
		}, delay_Open_ContactWindow);

		setTimeout(() => {
			read_Contact();
		}, delay_read_Contact);
	}

	
	
	
	
	
	
	
	
	
	
});