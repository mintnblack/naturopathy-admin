
export const phoneNumberValidator = (countrycode,phone) => {
    let isvalid = true;
    const number = countrycode + phone;
    if (!number.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
      isvalid = false;
    }
    return isvalid;
  };
  
  export const emailValidator = (email) => {
    let formIsvalid = true;
    if (typeof email) {
      let lastAtPos = email.lastIndexOf("@");
      let lastDotPos = email.lastIndexOf(".");
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf("@@") === -1 && lastDotPos > 2 && email.length - lastDotPos > 2)) {
        formIsvalid = false;
      }
    } else {
      formIsvalid = true;
    }
    return formIsvalid;
  }

  export const containsOnlyNumbers = (inputString)=>{
    var pattern = /^\d+$/;
    return pattern.test(inputString);
  }

  export const passwordValidator = (password) => {
    let formIsvalid = true;
    if (typeof password) {
      if (password.length < 8) {
        formIsvalid = false;
      }
    } else {
      formIsvalid = true;
    }
    return formIsvalid;
  }

  export const websiteLinkValidator = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return pattern.test(url);
  };