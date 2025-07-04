import React from "react"
import GV_BonW_img from '../assets/GV_BonW.jpg'
import style from './SignUpPage.module.css'

export default function SignUpPage(props) {
    // Initialize users in localStorage if not exists
    React.useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('serviceProviders')) {
            localStorage.setItem('serviceProviders', JSON.stringify([]));
        }
    }, []);

    function isValidInputs() {
        return (
            setFirstNameError() &&
            setLastNameError() &&
            setAddressError() &&
            setDOBError() &&
            setNationalityError() &&
            setGenderError() &&
            setPhoneNumberError() &&
            setEmailError() &&
            setPasswordError() &&
            setAccountTypeError()
        )
    }

    function getInputs() {
        return {
            firstName: getFirstName(),
            lastName: getLastName(),
            address: getAddr(),
            dob: getDOB(),
            nationality: getNationality(),
            gender: getGender(),
            phoneNumber: getPhoneNumber(),
            email: getEmail(),
            password: getPassword(),
            accountType: getAccountType()
        }
    }

    function accountExists(email) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
        
        return users.some(user => user.email === email) || 
               serviceProviders.some(sp => sp.email === email);
    }

    function createAccount() {
        const inputs = getInputs();
    
        if (!isValidInputs()) {
            return;
        }
    
        if (accountExists(inputs.email)) {
            alert("Account already exists!");
            return;
        }
    
        const newAccount = {
            ...inputs,
            registration_date: new Date().toISOString()
        };
    
        if (inputs.accountType === "user") {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(newAccount);
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
            serviceProviders.push(newAccount);
            localStorage.setItem('serviceProviders', JSON.stringify(serviceProviders));
        }
    
        localStorage.setItem("email", inputs.email);
        localStorage.setItem("password", inputs.password);
        
        if (inputs.accountType === "user") {
            props.goToUserPortal();
        } else {
            props.goToServiceProviderPortal();
        }
    }

function handleSignInClick() {
    //if (isUserInDB()) {
    //    alert("Please choose a different username and try again!")
    //}
}

function getFirstName() {
    return document.getElementById("fName").value;
}

function getLastName() {
    return document.getElementById("lName").value;
}

function getAddr() {
    return document.getElementById("addr").value;
}

function getDOB() {
    return new Date(document.getElementById("dob").value);
}

function getNationality() {
    return document.getElementById("nationality").value;
}

function getGender() {
    if (document.getElementById("male").checked) {
        return "male"
    }
    else if (document.getElementById("female").checked) {
        return "female"
    }
    else if (document.getElementById("other").checked) {
        return "other"
    }
    else {
        document.getElementById("male").setCustomValidity("Gender cannot be empty!")
        return null
    }
}

function getPhoneNumber() {
    return document.getElementById("phoneNum").value;
}

function getEmail() {
    return document.getElementById("email").value;
}

function getPassword() {
    return document.getElementById("password").value;
}

function getAccountType() {
    if (document.getElementById("user").checked) {
        return "user"
    }
    else if (document.getElementById("serviceProvider").checked) {
        return "serviceProvider"
    }
    else {
        document.getElementById("user").setCustomValidity("Account type cannot be empty!")
        return null
    }
}

function isStrongPassword() {
    const password = getPassword();
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
    const numberCount = (password.match(/[0-9]/g) || []).length;

    return (
        uppercaseCount >= 2 &&
        specialCharCount >= 2 &&
        numberCount >= 2
    );
}

function setFirstNameError() {
    const fName = getFirstName()
    if (!fName) {
        document.getElementById("fName").setCustomValidity("First name cannot be empty!")
        return false
    }
    else {
        document.getElementById("fName").setCustomValidity("")
        return true
    }
}

function setLastNameError() {
    const lName = getLastName()
    if (!lName) {
        document.getElementById("lName").setCustomValidity("Last name cannot be empty!")
        return false
    }
    else {
        document.getElementById("lName").setCustomValidity("")
        return true
    }
}

function setAddressError() {
    const addr = getAddr()
    if (!addr) {
        document.getElementById("addr").setCustomValidity("Address cannot be empty!")
        return false
    }
    else {
        document.getElementById("addr").setCustomValidity("")
        return true
    }
}

function setDOBError() {
    const dob = getDOB();

    if (!dob || isNaN(dob.getTime())) {
        document.getElementById("dob").setCustomValidity("Date of Birth cannot be empty or invalid!");
        return false;
    } else {
        document.getElementById("dob").setCustomValidity("");
        return true;
    }
}

function setNationalityError() {
    const nationality = getNationality()
    if (!nationality) {
        document.getElementById("nationality").setCustomValidity("Please select a nationality!")
        return false
    }
    else {
        document.getElementById("nationality").setCustomValidity("")
        return true
    }
}

function setGenderError() {
    const gender = getGender()
    if (!gender) {
        document.getElementById("male").setCustomValidity("Please select a gender!")
        return false
    }
    else {
        document.getElementById("male").setCustomValidity("")
        return true
    }
}

function setPhoneNumberError() {
    const phoneNumber = getPhoneNumber()
    if (!phoneNumber) {
        document.getElementById("phoneNum").setCustomValidity("Phone number cannot be empty!")
        return false
    }
    else {
        document.getElementById("phoneNum").setCustomValidity("")
        return true
    }
}

function setAccountTypeError() {
    const accountType = getAccountType()
    if (!accountType) {
        document.getElementById("user").setCustomValidity("Please select an account type!")
        return false
    }
    else {
        document.getElementById("user").setCustomValidity("")
        return true
    }
}

function setEmailError() {
    const email = getEmail()
    if (!email) {
        document.getElementById("email").setCustomValidity("Email cannot be empty!")
        return false
    }
    else {
        document.getElementById("email").setCustomValidity("")
        return true
    }
}

function setPasswordError() {
    const password = getPassword();
    if (!password) {
        document.getElementById("password").setCustomValidity("Password cannot be empty!")
        return false
    }
    else if (!isStrongPassword(password)) {
        document.getElementById("password").setCustomValidity(
            "Password must have at least 2 uppercase letters, 2 special characters, and 2 numbers."
        );
        return false
    }
    else {
        document.getElementById("password").setCustomValidity(""); // Clear error
        return true
    }
}

return (
    <div>
        <div className={style.logoHeader}>
            <img src={GV_BonW_img} alt="Company Logo" className={style.logo} />
            <h1 className={style.companyName}>Grand Voyage</h1>
        </div>
        <form className={style.container} onSubmit={handleSignInClick}>
            <div className={style.header}>
                <div className={style.text}>Sign Up</div>
                <div className={style.underline}></div>
            </div>
            <div className={style.inputs}>
                <div className={style.input}>
                    <label htmlFor="fName">First Name:</label>
                    <input id="fName" type="text" placeholder="John" />
                </div>
                <div className={style.input}>
                    <label htmlFor="lName">Last Name:</label>
                    <input id="lName" type="text" placeholder="Doe" />
                </div>
                <div className={style.input}>
                    <label htmlFor="addr">Address:</label>
                    <input id="addr" type="text" placeholder="Beirut, Lebanon" />
                </div>
                <div className={style.input}>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input id="dob" type="date" placeholder="2005/08/15" />
                </div>
                <div className={style.input}>
                    <label htmlFor="nationality">Nationality:</label>
                    <select id="nationality" name="nationality">
                        <option value="">--SELECT--</option>
                        <option value="afghan">Afghan</option>
                        <option value="albanian">Albanian</option>
                        <option value="algerian">Algerian</option>
                        <option value="american">American</option>
                        <option value="andorran">Andorran</option>
                        <option value="angolan">Angolan</option>
                        <option value="antiguans">Antiguans</option>
                        <option value="argentinean">Argentinean</option>
                        <option value="armenian">Armenian</option>
                        <option value="australian">Australian</option>
                        <option value="austrian">Austrian</option>
                        <option value="azerbaijani">Azerbaijani</option>
                        <option value="bahamian">Bahamian</option>
                        <option value="bahraini">Bahraini</option>
                        <option value="bangladeshi">Bangladeshi</option>
                        <option value="barbadian">Barbadian</option>
                        <option value="barbudans">Barbudans</option>
                        <option value="batswana">Batswana</option>
                        <option value="belarusian">Belarusian</option>
                        <option value="belgian">Belgian</option>
                        <option value="belizean">Belizean</option>
                        <option value="beninese">Beninese</option>
                        <option value="bhutanese">Bhutanese</option>
                        <option value="bolivian">Bolivian</option>
                        <option value="bosnian">Bosnian</option>
                        <option value="brazilian">Brazilian</option>
                        <option value="british">British</option>
                        <option value="bruneian">Bruneian</option>
                        <option value="bulgarian">Bulgarian</option>
                        <option value="burkinabe">Burkinabe</option>
                        <option value="burmese">Burmese</option>
                        <option value="burundian">Burundian</option>
                        <option value="cambodian">Cambodian</option>
                        <option value="cameroonian">Cameroonian</option>
                        <option value="canadian">Canadian</option>
                        <option value="cape verdean">Cape Verdean</option>
                        <option value="central african">Central African</option>
                        <option value="chadian">Chadian</option>
                        <option value="chilean">Chilean</option>
                        <option value="chinese">Chinese</option>
                        <option value="colombian">Colombian</option>
                        <option value="comoran">Comoran</option>
                        <option value="congolese">Congolese</option>
                        <option value="costa rican">Costa Rican</option>
                        <option value="croatian">Croatian</option>
                        <option value="cuban">Cuban</option>
                        <option value="cypriot">Cypriot</option>
                        <option value="czech">Czech</option>
                        <option value="danish">Danish</option>
                        <option value="djibouti">Djibouti</option>
                        <option value="dominican">Dominican</option>
                        <option value="dutch">Dutch</option>
                        <option value="east timorese">East Timorese</option>
                        <option value="ecuadorean">Ecuadorean</option>
                        <option value="egyptian">Egyptian</option>
                        <option value="emirian">Emirian</option>
                        <option value="equatorial guinean">Equatorial Guinean</option>
                        <option value="eritrean">Eritrean</option>
                        <option value="estonian">Estonian</option>
                        <option value="ethiopian">Ethiopian</option>
                        <option value="fijian">Fijian</option>
                        <option value="filipino">Filipino</option>
                        <option value="finnish">Finnish</option>
                        <option value="french">French</option>
                        <option value="gabonese">Gabonese</option>
                        <option value="gambian">Gambian</option>
                        <option value="georgian">Georgian</option>
                        <option value="german">German</option>
                        <option value="ghanaian">Ghanaian</option>
                        <option value="greek">Greek</option>
                        <option value="grenadian">Grenadian</option>
                        <option value="guatemalan">Guatemalan</option>
                        <option value="guinea-bissauan">Guinea-Bissauan</option>
                        <option value="guinean">Guinean</option>
                        <option value="guyanese">Guyanese</option>
                        <option value="haitian">Haitian</option>
                        <option value="herzegovinian">Herzegovinian</option>
                        <option value="honduran">Honduran</option>
                        <option value="hungarian">Hungarian</option>
                        <option value="icelander">Icelander</option>
                        <option value="indian">Indian</option>
                        <option value="indonesian">Indonesian</option>
                        <option value="iranian">Iranian</option>
                        <option value="iraqi">Iraqi</option>
                        <option value="irish">Irish</option>
                        <option value="israeli">Israeli</option>
                        <option value="italian">Italian</option>
                        <option value="ivorian">Ivorian</option>
                        <option value="jamaican">Jamaican</option>
                        <option value="japanese">Japanese</option>
                        <option value="jordanian">Jordanian</option>
                        <option value="kazakhstani">Kazakhstani</option>
                        <option value="kenyan">Kenyan</option>
                        <option value="kittian and nevisian">Kittian and Nevisian</option>
                        <option value="kuwaiti">Kuwaiti</option>
                        <option value="kyrgyz">Kyrgyz</option>
                        <option value="laotian">Laotian</option>
                        <option value="latvian">Latvian</option>
                        <option value="lebanese">Lebanese</option>
                        <option value="liberian">Liberian</option>
                        <option value="libyan">Libyan</option>
                        <option value="liechtensteiner">Liechtensteiner</option>
                        <option value="lithuanian">Lithuanian</option>
                        <option value="luxembourger">Luxembourger</option>
                        <option value="macedonian">Macedonian</option>
                        <option value="malagasy">Malagasy</option>
                        <option value="malawian">Malawian</option>
                        <option value="malaysian">Malaysian</option>
                        <option value="maldivan">Maldivan</option>
                        <option value="malian">Malian</option>
                        <option value="maltese">Maltese</option>
                        <option value="marshallese">Marshallese</option>
                        <option value="mauritanian">Mauritanian</option>
                        <option value="mauritian">Mauritian</option>
                        <option value="mexican">Mexican</option>
                        <option value="micronesian">Micronesian</option>
                        <option value="moldovan">Moldovan</option>
                        <option value="monacan">Monacan</option>
                        <option value="mongolian">Mongolian</option>
                        <option value="moroccan">Moroccan</option>
                        <option value="mosotho">Mosotho</option>
                        <option value="motswana">Motswana</option>
                        <option value="mozambican">Mozambican</option>
                        <option value="namibian">Namibian</option>
                        <option value="nauruan">Nauruan</option>
                        <option value="nepalese">Nepalese</option>
                        <option value="new zealander">New Zealander</option>
                        <option value="ni-vanuatu">Ni-Vanuatu</option>
                        <option value="nicaraguan">Nicaraguan</option>
                        <option value="nigerien">Nigerien</option>
                        <option value="north korean">North Korean</option>
                        <option value="northern irish">Northern Irish</option>
                        <option value="norwegian">Norwegian</option>
                        <option value="omani">Omani</option>
                        <option value="pakistani">Pakistani</option>
                        <option value="palauan">Palauan</option>
                        <option value="panamanian">Panamanian</option>
                        <option value="papua new guinean">Papua New Guinean</option>
                        <option value="paraguayan">Paraguayan</option>
                        <option value="peruvian">Peruvian</option>
                        <option value="polish">Polish</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="qatari">Qatari</option>
                        <option value="romanian">Romanian</option>
                        <option value="russian">Russian</option>
                        <option value="rwandan">Rwandan</option>
                        <option value="saint lucian">Saint Lucian</option>
                        <option value="salvadoran">Salvadoran</option>
                        <option value="samoan">Samoan</option>
                        <option value="san marinese">San Marinese</option>
                        <option value="sao tomean">Sao Tomean</option>
                        <option value="saudi">Saudi</option>
                        <option value="scottish">Scottish</option>
                        <option value="senegalese">Senegalese</option>
                        <option value="serbian">Serbian</option>
                        <option value="seychellois">Seychellois</option>
                        <option value="sierra leonean">Sierra Leonean</option>
                        <option value="singaporean">Singaporean</option>
                        <option value="slovakian">Slovakian</option>
                        <option value="slovenian">Slovenian</option>
                        <option value="solomon islander">Solomon Islander</option>
                        <option value="somali">Somali</option>
                        <option value="south african">South African</option>
                        <option value="south korean">South Korean</option>
                        <option value="spanish">Spanish</option>
                        <option value="sri lankan">Sri Lankan</option>
                        <option value="sudanese">Sudanese</option>
                        <option value="surinamer">Surinamer</option>
                        <option value="swazi">Swazi</option>
                        <option value="swedish">Swedish</option>
                        <option value="swiss">Swiss</option>
                        <option value="syrian">Syrian</option>
                        <option value="taiwanese">Taiwanese</option>
                        <option value="tajik">Tajik</option>
                        <option value="tanzanian">Tanzanian</option>
                        <option value="thai">Thai</option>
                        <option value="togolese">Togolese</option>
                        <option value="tongan">Tongan</option>
                        <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                        <option value="tunisian">Tunisian</option>
                        <option value="turkish">Turkish</option>
                        <option value="tuvaluan">Tuvaluan</option>
                        <option value="ugandan">Ugandan</option>
                        <option value="ukrainian">Ukrainian</option>
                        <option value="uruguayan">Uruguayan</option>
                        <option value="uzbekistani">Uzbekistani</option>
                        <option value="venezuelan">Venezuelan</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="welsh">Welsh</option>
                        <option value="yemenite">Yemenite</option>
                        <option value="zambian">Zambian</option>
                        <option value="zimbabwean">Zimbabwean</option>
                    </select>
                </div>
                <div className={style.inputRadio}>
                    <label>Gender:</label>
                    <input type="radio" id="male" name="gender" value="male" className={style.inputRadio} />
                    <label htmlFor="male">Male</label>

                    <input type="radio" id="female" name="gender" value="female" className={style.inputRadio} />
                    <label htmlFor="female">Female</label>

                    <input type="radio" id="other" name="gender" value="other" className={style.inputRadio} />
                    <label htmlFor="other">Other</label>
                </div>
                <div className={style.input}>
                    <label htmlFor="phoneNum">Phone Number:</label>
                    <input id="phoneNum" type="tel" placeholder="+777 77 777 777" />
                </div>
                <div className={style.input}>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" placeholder="Email" />
                </div>
                <div className={style.input}>
                    <label htmlFor="password">Password:</label>
                    <input onInput={setPasswordError} id="password" type="password" placeholder="Password" required minLength={8} />
                </div>
                <div className={style.inputRadio}>
                    <label>Account Type:</label>
                    <input type="radio" id="user" name="accountType" value="user" className={style.inputRadio} />
                    <label htmlFor="user">User</label>

                    <input type="radio" id="serviceProvider" name="accountType" value="serviceProvider" className={style.inputRadio} />
                    <label htmlFor="serviceProvider">Service Provider</label>
                </div>
            </div>
            <div className={style.submitContainer}>
                <button className={style.submit} onClick={createAccount}>Sign Up</button>
            </div>
            <div className={style.login}>Already have an account? <span onClick={props.switchToLogin}>Login here!</span></div>
        </form>
    </div>
)
}