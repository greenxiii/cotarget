function checkForm(form) {
	var error;
	if(form.className === 'first-form') {
		error = document.getElementById('error1');
	}else{
		error = document.getElementById('error2');
	}
	if(form.email.value == '' || !validateEmail(form.email.value)) {
		error.innerHTML = 'Email is not valid';
		form.email.focus();
		return false;
	}
	if(form.companyName.value == '') {
		error.innerHTML = 'Company name is required';
		form.companyName.focus();
		return false;
	}
	if(form.targetAudience.value == '') {
		error.innerHTML = 'Target audience is required';
		form.targetAudience.focus();
		return false;
	}
	return false;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}