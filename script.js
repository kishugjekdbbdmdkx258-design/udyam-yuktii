/* =========================================================
   UDYAM YUKTI - MAIN SCRIPT
========================================================= */


/* =========================================================
   LOGIN
========================================================= */

function loginUser(event) {
    event.preventDefault();

    const mobile = document.getElementById("mobile")?.value.trim();
    const password = document.getElementById("password")?.value;
    const message = document.getElementById("loginMessage");

    if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "कृपया 10 अंकों का मोबाइल नंबर डालें।";
        }
        return;
    }

    if (!password || password.length < 4) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "पासवर्ड कम से कम 4 अक्षर का होना चाहिए।";
        }
        return;
    }

    const savedUser = localStorage.getItem("udyamUser");

    if (!savedUser) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "पहले अपना खाता बनाएं।";
        }
        return;
    }

    let user;

    try {
        user = JSON.parse(savedUser);
    } catch (error) {
        console.error("User data error:", error);
        return;
    }

    if (
        user.mobile !== mobile ||
        user.password !== password
    ) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "मोबाइल नंबर या पासवर्ड गलत है।";
        }
        return;
    }

    window.location.href = "dashboard.html";
}


/* =========================================================
   SIGNUP
========================================================= */

function showSignup() {
    window.location.href = "register.html";
}


/* =========================================================
   REGISTER
========================================================= */

function registerUser(event) {
    event.preventDefault();

    const name =
        document.getElementById("fullName")?.value.trim() || "";

    const age =
        document.getElementById("age")?.value || "";

    const state =
        document.getElementById("state")?.value || "";

    const district =
        document.getElementById("district")?.value.trim() || "";

    const village =
        document.getElementById("village")?.value.trim() || "";

    const business =
        document.getElementById("business")?.value || "";

    const mobile =
        document.getElementById("registerMobile")?.value.trim() || "";

    const password =
        document.getElementById("registerPassword")?.value || "";

    const message =
        document.getElementById("registerMessage");


    if (!name) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "कृपया अपना नाम डालें।";
        }
        return;
    }


    if (mobile.length !== 10 || isNaN(mobile)) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "कृपया सही 10 अंकों का मोबाइल नंबर डालें।";
        }
        return;
    }


    if (password.length < 4) {
        if (message) {
            message.style.color = "#dc2626";
            message.textContent =
                "पासवर्ड कम से कम 4 अक्षर का होना चाहिए।";
        }
        return;
    }


    const userData = {
        name: name,
        age: age,
        state: state,
        district: district,
        village: village,
        business: business,
        mobile: mobile,
        password: password
    };


    localStorage.setItem(
        "udyamUser",
        JSON.stringify(userData)
    );


    if (message) {
        message.style.color = "#15803d";
        message.textContent =
            "खाता सफलतापूर्वक बन गया!";
    }


    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
}


/* =========================================================
   LOAD USER DATA
========================================================= */

function loadUserData() {

    const savedUser =
        localStorage.getItem("udyamUser");

    if (!savedUser) {
        return;
    }

    let user;

    try {
        user = JSON.parse(savedUser);
    } catch (error) {
        console.error("User data error:", error);
        return;
    }


    const welcomeName =
        document.getElementById("welcomeName");

    const userLocation =
        document.getElementById("userLocation");


    if (welcomeName) {
        welcomeName.textContent =
            "Namaste " +
            (user.name || "Udyami") +
            " Ji! 🙏";
    }


    if (userLocation) {
        userLocation.textContent =
            "Aapka business: " +
            (user.business || "Business") +
            " | " +
            (user.village || "") +
            ", " +
            (user.district || "") +
            ", " +
            (user.state || "");
    }
}


/* =========================================================
   OPEN FEATURE
========================================================= */

function openFeature(featureName) {

    const result =
        document.getElementById("featureResult");

    const title =
        document.getElementById("featureTitle");

    const text =
        document.getElementById("featureText");


    if (!result || !title || !text) {
        return;
    }


    title.textContent = featureName;


    /* =====================================================
       BUSINESS LOAN
    ===================================================== */

    if (featureName === "Business Loan Advisory") {

        text.innerHTML = `

            <div class="advice-box loan-advisory">

                <h3>
                    💰 व्यवसाय लोन सहायता / Business Loan Advisory
                </h3>

                <p>
                    अपने व्यवसाय का कुल बजट और
                    अपना योगदान डालें।
                    हम आपको अनुमानित लोन की जानकारी देंगे।
                </p>


                <label for="loanBudget">
                    कुल व्यवसाय बजट (₹)
                </label>

                <input
                    type="number"
                    id="loanBudget"
                    placeholder="जैसे 100000"
                    min="1"
                >


                <label for="ownMoney">
                    आप खुद कितना पैसा लगा सकते हैं? (₹)
                </label>

                <input
                    type="number"
                    id="ownMoney"
                    placeholder="जैसे 10000"
                    min="0"
                >


                <button onclick="calculateLoan()">
                    लोन की गणना करें / Calculate Loan
                </button>


                <div id="loanResult"></div>

            </div>
        `;
    }


    /* =====================================================
       GOVERNMENT SCHEMES
    ===================================================== */

    else if (featureName === "Government Schemes") {

        text.innerHTML = `

            <div class="advice-box">

                <h3>
                    🏛️ सरकारी योजनाएँ / Government Schemes
                </h3>

                <p>
                    अपने व्यवसाय के लिए नीचे दी गई
                    सरकारी योजनाओं की आसान जानकारी देखें।
                </p>


                <div class="scheme-card">

                    <h3>
                        💰 प्रधानमंत्री मुद्रा योजना / PMMY
                    </h3>

                    <p>
                        छोटे व्यवसाय, दुकान, सिलाई,
                        खेती से जुड़े काम, पशुपालन
                        और अन्य छोटे कारोबार के लिए
                        उपयोगी हो सकती है।
                    </p>

                    <p>
                        <strong>किसके लिए:</strong>
                        छोटे व्यवसाय शुरू या बढ़ाने वाले लोग
                    </p>

                    <button onclick="showSchemeInfo('mudra')">
                        जानकारी देखें / Learn More
                    </button>

                </div>


                <div class="scheme-card">

                    <h3>
                        🏭 PMEGP योजना
                    </h3>

                    <p>
                        नया छोटा व्यवसाय या रोजगार
                        शुरू करने के लिए सहायता और
                        सब्सिडी की जानकारी मिल सकती है।
                    </p>

                    <p>
                        <strong>किसके लिए:</strong>
                        नया व्यवसाय शुरू करने वाले लोग
                    </p>

                    <button onclick="showSchemeInfo('pmegp')">
                        जानकारी देखें / Learn More
                    </button>

                </div>


                <div class="scheme-card">

                    <h3>
                        👩‍💼 महिला उद्यमी सहायता
                    </h3>

                    <p>
                        महिलाओं और ट्रांसजेंडर उद्यमियों
                        के लिए अलग-अलग सरकारी योजनाओं
                        की जानकारी।
                    </p>

                    <p>
                        <strong>किसके लिए:</strong>
                        महिला और ट्रांसजेंडर उद्यमी
                    </p>

                    <button onclick="showSchemeInfo('women')">
                        जानकारी देखें / Learn More
                    </button>

                </div>


                <div id="schemeInfo"
                     class="scheme-info">
                </div>


                <p class="small-note">
                    ध्यान दें: योजना की पात्रता,
                    राशि और मंजूरी संबंधित सरकारी
                    नियमों और संस्था पर निर्भर करती है।
                </p>

            </div>
        `;
    }


    /* =====================================================
       LOCAL MARKET
    ===================================================== */

    else if (featureName === "Local Market") {

        text.innerHTML = `

            <div class="advice-box">

                <h3>
                    📍 स्थानीय बाजार / Local Market
                </h3>

                <p>
                    यहां आप अपने आसपास के बाजार,
                    ग्राहकों और प्रतियोगिता को
                    समझ सकेंगे।
                </p>

                <button onclick="window.location.href='market.html'">
                    बाजार की जानकारी भरें / Explore Market
                </button>

            </div>
        `;
    }


    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   GOVERNMENT SCHEME DETAILS
========================================================= */

function showSchemeInfo(schemeName) {

    const box =
        document.getElementById("schemeInfo");

    if (!box) {
        return;
    }


    let content = "";


    /* PMMY */

    if (schemeName === "mudra") {

        content = `

            <div class="advice-box">

                <h3>
                    💰 मुद्रा योजना / PMMY
                </h3>

                <p>
                    प्रधानमंत्री मुद्रा योजना छोटे
                    गैर-कॉरपोरेट और गैर-कृषि व्यवसायों
                    के लिए loan support से जुड़ी योजना है।
                </p>

                <ul>
                    <li>छोटे व्यवसाय के लिए उपयोगी हो सकती है।</li>
                    <li>दुकान, service और छोटे कारोबार के लिए जानकारी लें।</li>
                    <li>Loan की शर्तें बैंक और पात्रता पर निर्भर करती हैं।</li>
                    <li>आवेदन से पहले official जानकारी जरूर देखें।</li>
                </ul>

                <a
                    href="https://www.mudra.org.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="call-button">
                    🌐 Official Website
                </a>

            </div>
        `;
    }


    /* PMEGP */

    else if (schemeName === "pmegp") {

        content = `

            <div class="advice-box">

                <h3>
                    🏭 PMEGP योजना
                </h3>

                <p>
                    PMEGP नए micro enterprise शुरू करने
                    से जुड़ी सरकारी सहायता योजना है।
                </p>

                <ul>
                    <li>नया business शुरू करने वाले लोग जानकारी ले सकते हैं।</li>
                    <li>Project cost और eligibility महत्वपूर्ण होती है।</li>
                    <li>Margin money subsidy के नियम लागू हो सकते हैं।</li>
                    <li>अंतिम मंजूरी संबंधित संस्था के नियमों पर निर्भर करती है।</li>
                </ul>

                <a
                    href="https://www.kviconline.gov.in/pmegpeportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="call-button">
                    🌐 Official Portal
                </a>

            </div>
        `;
    }


    /* WOMEN */

    else if (schemeName === "women") {

        content = `

            <div class="advice-box">

                <h3>
                    👩‍💼 महिला उद्यमी सहायता
                </h3>

                <p>
                    महिलाओं के लिए केंद्र और राज्य सरकार
                    की अलग-अलग business और entrepreneurship
                    योजनाएं उपलब्ध हो सकती हैं।
                </p>

                <p>
                    बिहार की महिला उद्यमी बिहार सरकार की
                    मुख्यमंत्री महिला उद्यमी योजना जैसी
                    योजनाओं की official eligibility भी देख सकती हैं।
                </p>

                <a
                    href="https://udyami.bihar.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="call-button">
                    🌐 Bihar Udyami Portal
                </a>

            </div>
        `;
    }


    box.innerHTML = content;

    box.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================================================
   LOAN CALCULATOR
========================================================= */

function calculateLoan() {

    const budgetInput =
        document.getElementById("loanBudget");

    const ownMoneyInput =
        document.getElementById("ownMoney");

    const result =
        document.getElementById("loanResult");


    if (!budgetInput || !ownMoneyInput || !result) {

        alert(
            "Loan form load nahi hua. Dashboard refresh karein."
        );

        return;
    }


    const budget =
        Number(budgetInput.value);

    const ownMoney =
        Number(ownMoneyInput.value);


    if (!budget || budget <= 0) {

        result.innerHTML = `
            <p style="color:#dc2626;">
                कृपया सही व्यवसाय बजट डालें।
            </p>
        `;

        return;
    }


    if (
        ownMoney < 0 ||
        ownMoney > budget
    ) {

        result.innerHTML = `
            <p style="color:#dc2626;">
                आपका अपना योगदान कुल बजट
                से ज्यादा नहीं हो सकता।
            </p>
        `;

        return;
    }


    const possibleLoan =
        budget - ownMoney;


    result.innerHTML = `

        <div class="advice-box">

            <h3>
                📊 आपकी लोन योजना
            </h3>


            <p>
                <strong>
                    कुल व्यवसाय बजट:
                </strong>
                ₹${budget.toLocaleString("en-IN")}
            </p>


            <p>
                <strong>
                    आपका अपना योगदान:
                </strong>
                ₹${ownMoney.toLocaleString("en-IN")}
            </p>


            <p>
                <strong>
                    अनुमानित लोन राशि:
                </strong>
                ₹${possibleLoan.toLocaleString("en-IN")}
            </p>


            <hr>


            <h3>
                ✅ लोन आवेदन से पहले तैयारी
            </h3>


            <div class="checklist-box">

                <label>
                    <input type="checkbox">
                    व्यवसाय का उद्देश्य तय है?
                </label>

                <label>
                    <input type="checkbox">
                    अपना योगदान उपलब्ध है?
                </label>

                <label>
                    <input type="checkbox">
                    Aadhaar Card उपलब्ध है?
                </label>

                <label>
                    <input type="checkbox">
                    बैंक खाता उपलब्ध है?
                </label>

                <label>
                    <input type="checkbox">
                    व्यवसाय का पता उपलब्ध है?
                </label>

                <label>
                    <input type="checkbox">
                    छोटा business plan तैयार है?
                </label>

            </div>


            <div class="call-section">

                <h3>
                    📞 अधिक जानकारी के लिए कॉल करें
                </h3>

                <p>
                    लोन से जुड़ी अधिक जानकारी के लिए
                    सहायता प्रतिनिधि से संपर्क करें।
                </p>

                <p>
                    <strong>
                        सहायता नंबर:
                    </strong>
                    9507808055
                </p>

                <a
                    href="tel:9507808055"
                    class="call-button">
                    📞 अभी कॉल करें
                </a>

            </div>


            <hr>


            <h3>
                ⚠️ जरूरी जानकारी
            </h3>

            <p>
                यह केवल demo calculation है।
                वास्तविक loan amount बैंक,
                योजना, पात्रता, documents और
                credit assessment पर निर्भर करेगा।
            </p>

        </div>
    `;
}


/* =========================================================
   BACK
========================================================= */

function goBack() {

    const result =
        document.getElementById("featureResult");

    if (result) {
        result.classList.add("hidden");
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    stopVoiceRecognition();

    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }

    window.location.href = "index.html";
}


/* =========================================================
   AI CHAT OPEN
========================================================= */

function openAIChat() {

    const chatBox =
        document.getElementById("aiChatBox") ||
        document.getElementById("aiChat");

    if (!chatBox) {
        return;
    }

    chatBox.classList.remove("hidden");

    chatBox.style.display = "block";

    chatBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   AI CHAT CLOSE
========================================================= */

function closeAIChat() {

    const chatBox =
        document.getElementById("aiChatBox") ||
        document.getElementById("aiChat");

    if (chatBox) {
        chatBox.style.display = "none";
    }

    stopVoiceRecognition();

    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }
}


/* =========================================================
   QUICK QUESTION
========================================================= */
/* =========================================================
   QUICK QUESTION
========================================================= */

function askQuickQuestion(question) {
    const input = document.getElementById("userQuestion");
    if (!input) return;

    // 1️⃣ Business शुरू करना
    if (question === "इस बिज़नेस में ग्राहक कैसे बढ़ाएं?") {
        input.value = "इस बिज़नेस को शुरू कैसे करें?";
    }

    // 2️⃣ ग्राहक + मुनाफा
    else if (question === "इस बिज़नेस में मुनाफा कैसे बढ़ाएं?") {
        input.value = "ज्यादा ग्राहक और मुनाफा कैसे बढ़ाएं?";
    }

    // 3️⃣ Loan
    else if (question === "इस बिज़नेस के लिए लोन कैसे मिलेगा?") {
        input.value = "इस बिज़नेस के लिए लोन कैसे मिलेगा?";
    }

    else {
        input.value = question;
    }

    sendAIMessage();
}
function getBusinessAdvice(question, selectedBusiness = "") {

    const q = question.toLowerCase().trim();

    const categoryElement =
        document.getElementById("businessCategory");

    const budgetElement =
        document.getElementById("businessBudget") ||
        document.getElementById("budget");

    const businessCategory =
        selectedBusiness ||
        (categoryElement ? categoryElement.value : "");

    const selectedBudget =
        budgetElement
            ? Number(budgetElement.value) || 0
            : 0;


    /* =====================================================
       1️⃣ BUSINESS START
       केवल इसी option में budget table आएगी
    ===================================================== */

    const isStartQuestion =
        q.includes("शुरू कैसे करें") ||
        q.includes("शुरू करे") ||
        q.includes("start") ||
        q.includes("ग्राहक कैसे बढ़ाएं");


    if (isStartQuestion) {

        let items = "";
        let location = "";

        if (businessCategory === "किराना दुकान") {

            items = `
                आटा, चावल, दाल, तेल, नमक, चीनी, साबुन,
                बिस्कुट, चाय और रोजमर्रा का सामान रखें।
            `;

            location = `
                दुकान ऐसी जगह रखें जहाँ आसपास घर और
                रोज आने-जाने वाले ग्राहक हों।
            `;
        }

        else if (businessCategory === "चाय और नाश्ता") {

            items = `
                चाय, दूध, चीनी, गैस/चूल्हा, कप-प्लेट,
                समोसा, पकौड़ी और बिस्कुट रखें।
            `;

            location = `
                स्कूल, बाजार, बस स्टैंड, ऑफिस या
                ज्यादा भीड़ वाली जगह के पास दुकान रखें।
            `;
        }

        else if (businessCategory === "डेयरी बिज़नेस") {

            items = `
                अच्छे पशु, चारा, पानी की व्यवस्था,
                दूध रखने के बर्तन और साफ जगह रखें।
            `;

            location = `
                ऐसी जगह चुनें जहाँ पानी और चारा आसानी
                से मिल सके और आसपास दूध के ग्राहक हों।
            `;
        }

        else if (businessCategory === "सिलाई सेंटर") {

            items = `
                सिलाई मशीन, धागे, कैंची, कपड़े नापने का
                सामान, कुर्सी और जरूरी सिलाई सामग्री रखें।
            `;

            location = `
                घर के पास या ऐसी जगह काम शुरू करें
                जहाँ महिलाएं और परिवार आसानी से पहुँच सकें।
            `;
        }

        else if (businessCategory === "मोबाइल रिपेयर") {

            items = `
                Repairing tools, screwdriver set, tester,
                spare parts, charger, cover और tempered glass रखें।
            `;

            location = `
                बाजार, मोबाइल दुकानों या ऐसी जगह दुकान रखें
                जहाँ लोगों की आवाजाही ज्यादा हो।
            `;
        }

        else if (businessCategory === "खेती से जुड़ा बिज़नेस") {

            items = `
                बीज, खाद, कृषि उपकरण और जरूरत के अनुसार
                खेती से जुड़ा सामान रखें।
            `;

            location = `
                किसानों के पास और स्थानीय बाजार के
                नजदीक काम शुरू करना उपयोगी रहेगा।
            `;
        }

        else if (businessCategory === "मुर्गी पालन") {

            items = `
                चूजे, दाना, पानी की व्यवस्था, साफ शेड,
                दवा और vaccination की व्यवस्था रखें।
            `;

            location = `
                साफ और हवादार जगह चुनें जहाँ पानी
                और जरूरी सामान आसानी से मिल सके।
            `;
        }

        else if (businessCategory === "बकरी पालन") {

            items = `
                स्वस्थ बकरियां, चारा, पानी, सुरक्षित शेड
                और जरूरी दवा की व्यवस्था रखें।
            `;

            location = `
                ऐसी जगह चुनें जहाँ पर्याप्त जगह,
                पानी और चारा आसानी से मिल सके।
            `;
        }

        else {

            items = `
                अपने बिज़नेस के जरूरी सामान और
                शुरुआत में सबसे ज्यादा बिकने वाली चीजें रखें।
            `;

            location = `
                ऐसी जगह चुनें जहाँ आपके संभावित ग्राहक
                आसानी से पहुँच सकें।
            `;
        }


        let budgetTable = "";

        if (selectedBudget > 0) {

            const itemsAmount =
                Math.round(selectedBudget * 0.60);

            const setupAmount =
                Math.round(selectedBudget * 0.20);

            const marketingAmount =
                Math.round(selectedBudget * 0.10);

            const emergencyAmount =
                selectedBudget -
                itemsAmount -
                setupAmount -
                marketingAmount;


            budgetTable = `
                <br><br>

                <b>📊 आपके बजट की योजना:</b>

                <table class="budget-table">

                    <tr>
                        <th>खर्च</th>
                        <th>रकम</th>
                    </tr>

                    <tr>
                        <td>📦 सामान / Items</td>
                        <td>₹${itemsAmount.toLocaleString("en-IN")}</td>
                    </tr>

                    <tr>
                        <td>🏪 Setup</td>
                        <td>₹${setupAmount.toLocaleString("en-IN")}</td>
                    </tr>

                    <tr>
                        <td>📢 Marketing</td>
                        <td>₹${marketingAmount.toLocaleString("en-IN")}</td>
                    </tr>

                    <tr>
                        <td>🛡️ Emergency Fund</td>
                        <td>₹${emergencyAmount.toLocaleString("en-IN")}</td>
                    </tr>

                </table>
            `;
        }


        return `
            <b>🚀 ${escapeHTML(businessCategory || "आपके बिज़नेस")} को शुरू करने की योजना</b>

            <br><br>

            <b>📦 क्या-क्या सामान रखें?</b>

            <br><br>

            ${items}

            <br><br>

            <b>📍 जगह कैसी हो?</b>

            <br><br>

            ${location}

            ${budgetTable}

            <br><br>

            <b>💡 शुरुआत की सलाह:</b>

            <br><br>

            पहले छोटे स्तर से शुरुआत करें।
            रोज की बिक्री और खर्च का हिसाब रखें।
            ग्राहक की जरूरत देखकर धीरे-धीरे सामान बढ़ाएं।
        `;
    }


    /* =====================================================
       2️⃣ PROFIT + CUSTOMER
       इसमें कोई table नहीं
    ===================================================== */

    const isProfitQuestion =
        q.includes("मुनाफा") ||
        q.includes("कमाई") ||
        q.includes("profit") ||
        q.includes("लाभ") ||
        q.includes("ग्राहक कैसे बढ़ाएं") ||
        q.includes("ज्यादा ग्राहक");


    if (isProfitQuestion) {

        let tips = "";

        if (businessCategory === "किराना दुकान") {

            tips = `
                1. ज्यादा बिकने वाला सामान हमेशा stock में रखें।<br>
                2. ग्राहकों को UPI और home delivery की सुविधा दें।<br>
                3. रोजमर्रा की चीजों के छोटे combo बनाएं।<br>
                4. आसपास के घरों तक दुकान की जानकारी पहुँचाएं।<br>
                5. कम बिकने वाले सामान में पैसा ज्यादा न लगाएं।<br>
                6. ग्राहकों से पूछें कि उन्हें कौन-सा सामान चाहिए।<br>
                7. साफ-सफाई और सही कीमत रखें।
            `;
        }

        else if (businessCategory === "चाय और नाश्ता") {

            tips = `
                1. चाय के साथ छोटे snacks और combo रखें।<br>
                2. सुबह और शाम के समय ज्यादा ध्यान दें।<br>
                3. साफ-सफाई का विशेष ध्यान रखें।<br>
                4. स्वाद और quality एक जैसी रखें।<br>
                5. आसपास के दुकानदारों और कर्मचारियों को regular customer बनाएं।<br>
                6. छोटे offers दे सकते हैं।<br>
                7. रोज का खर्च और बिक्री लिखें।
            `;
        }

        else if (businessCategory === "डेयरी बिज़नेस") {

            tips = `
                1. दूध की quality अच्छी रखें।<br>
                2. घर तक दूध पहुँचाने की सुविधा दें।<br>
                3. रोज के regular customers बनाएं।<br>
                4. दूध के साथ दही और पनीर भी बेच सकते हैं।<br>
                5. पशुओं के चारे और स्वास्थ्य पर ध्यान दें।<br>
                6. दूध की बिक्री और खर्च का हिसाब रखें।
            `;
        }

        else if (businessCategory === "सिलाई सेंटर") {

            tips = `
                1. समय पर कपड़े तैयार करें।<br>
                2. अच्छी fitting और finishing दें।<br>
                3. त्योहार और शादी के orders पर ध्यान दें।<br>
                4. पुराने ग्राहकों से नए customers की जानकारी लें।<br>
                5. WhatsApp पर अपने designs और काम के samples दिखाएं।<br>
                6. स्कूल dress और alteration की service भी दें।
            `;
        }

        else if (businessCategory === "मोबाइल रिपेयर") {

            tips = `
                1. Repair का खर्च पहले साफ बताएं।<br>
                2. Charger, cover और tempered glass भी बेचें।<br>
                3. जरूरी spare parts available रखें।<br>
                4. काम जल्दी और सही करें।<br>
                5. छोटे repair work की सुविधा दें।<br>
                6. ग्राहकों के data की privacy रखें।
            `;
        }

        else {

            tips = `
                1. अपने सबसे ज्यादा बिकने वाले products पर ध्यान दें।<br>
                2. ग्राहकों की जरूरत समझें।<br>
                3. अच्छी quality रखें।<br>
                4. सही और साफ कीमत बताएं।<br>
                5. WhatsApp और local marketing का इस्तेमाल करें।<br>
                6. पुराने ग्राहकों को दोबारा खरीदने के लिए encourage करें।<br>
                7. रोज की बिक्री और खर्च का हिसाब रखें।
            `;
        }


        return `
            <b>📈 ग्राहक और मुनाफा बढ़ाने के तरीके</b>

            <br><br>

            ${tips}

            <br>

            <b>💡 सबसे जरूरी:</b>
            ग्राहक को अच्छी quality, सही कीमत और
            अच्छा व्यवहार मिलेगा तो वह दोबारा आएगा।
        `;
    }


    /* =====================================================
       3️⃣ LOAN
       इसमें कोई table नहीं
    ===================================================== */

    const isLoanQuestion =
        q.includes("लोन") ||
        q.includes("loan") ||
        q.includes("ऋण");


    if (isLoanQuestion) {

        return `
            <b>💰 बिज़नेस लोन कैसे मिलेगा?</b>

            <br><br>

            <b>1️⃣ अपना बिज़नेस तय करें</b><br>
            पहले यह तय करें कि कितना पैसा चाहिए
            और पैसा कहाँ इस्तेमाल होगा।

            <br><br>

            <b>2️⃣ Business Plan बनाएं</b><br>
            सामान, दुकान/setup, खर्च, बिक्री और
            अनुमानित कमाई की जानकारी तैयार रखें।

            <br><br>

            <b>3️⃣ जरूरी Documents तैयार रखें</b><br>
            Aadhaar, PAN, bank account और
            बिज़नेस से जुड़े जरूरी documents तैयार रखें।

            <br><br>

            <b>4️⃣ Loan Scheme देखें</b><br>
            अपने बिज़नेस के हिसाब से उपलब्ध
            loan/government schemes की जानकारी देखें।

            <br><br>

            <b>5️⃣ Bank या Official Portal पर Apply करें</b><br>
            आवेदन करने से पहले interest, EMI,
            repayment और eligibility की शर्तें समझें।

            <br><br>

            <b>6️⃣ Documents और जानकारी सही दें</b><br>
            गलत जानकारी देने से बचें और
            सभी documents सही रखें।

            <br><br>

            <b>📌 ज्यादा जानकारी के लिए</b><br><br>

            आप इसी website के
            <b>Business Loan Advisory</b> section में
            जाकर loan calculation देख सकते हैं।

            <br><br>

            साथ ही <b>Government Schemes</b> section में
            उपलब्ध योजनाओं की जानकारी देख सकते हैं।
        `;
    }


    /* =====================================================
       DEFAULT
    ===================================================== */

    return `
        <b>${escapeHTML(businessCategory || "आपके बिज़नेस")} के लिए सलाह:</b>

        <br><br>

        अपने बिज़नेस की शुरुआत छोटे स्तर से करें।
        पहले ग्राहक और स्थानीय बाजार को समझें।

        <br><br>

        रोज की बिक्री, खर्च और कमाई का हिसाब रखें।

        <br><br>

        आप ग्राहक बढ़ाने, मुनाफा बढ़ाने,
        बिज़नेस शुरू करने या लोन से जुड़ा सवाल पूछ सकते हैं।
    `;
}
/* =========================================================
   SEND AI MESSAGE
   LOCAL BUSINESS ADVICE
========================================================= */

async function sendAIMessage(fromVoice = false) {

    const input = document.getElementById("userQuestion");
    const messages = document.getElementById("chatMessages");

    const category =
        document.getElementById("businessCategory");

    const budget =
        document.getElementById("businessBudget") ||
        document.getElementById("budget");

    if (!input || !messages) {
        return;
    }

    /* =====================================================
       GET QUESTION
    ===================================================== */

    const question = input.value.trim();

    if (!question) {

        if (!fromVoice) {
            alert("कृपया अपना सवाल लिखें।");
        }

        return;
    }

    /* =====================================================
       GET BUSINESS + BUDGET
    ===================================================== */

    let selectedBusiness =
        category ? category.value : "";

    let selectedBudget =
        budget ? budget.value : "";

    /* =====================================================
       VOICE MODE
    ===================================================== */

    if (fromVoice) {

        if (!selectedBusiness) {
            selectedBusiness =
                detectBusinessFromQuestion(question);
        }

        if (!selectedBudget) {

            const detectedBudget =
                extractBudgetFromText(question);

            if (detectedBudget) {
                selectedBudget =
                    String(detectedBudget);
            }
        }

        if (!selectedBusiness) {
            selectedBusiness = "अन्य बिज़नेस";
        }
    }

    /* =====================================================
       NORMAL TEXT MODE
    ===================================================== */

    if (!fromVoice && selectedBusiness === "") {

        alert(
            "कृपया पहले अपना बिज़नेस चुनें।"
        );

        return;
    }

    if (!fromVoice && selectedBudget === "") {

        alert(
            "कृपया पहले अपना बजट चुनें।"
        );

        return;
    }

    const budgetNumber =
        Number(selectedBudget) || 0;

    /* =====================================================
       SHOW USER MESSAGE
    ===================================================== */

    let userMessageHTML = `

        <div class="user-message">

            <b>बिज़नेस:</b>
            ${escapeHTML(selectedBusiness)}

            <br>

    `;

    if (budgetNumber > 0) {

        userMessageHTML += `

            <b>बजट:</b>
            ₹${budgetNumber.toLocaleString("en-IN")}

            <br>

        `;
    }

    userMessageHTML += `

            <b>सवाल:</b>
            ${escapeHTML(question)}

        </div>

    `;

    messages.innerHTML += userMessageHTML;

    /* Clear input */

    input.value = "";

    /* =====================================================
       SHOW TYPING MESSAGE
    ===================================================== */

    messages.innerHTML += `

        <div id="typingMessage"
             class="bot-message">

            🤖 आपकी मदद के लिए जवाब तैयार हो रहा है...

        </div>

    `;

    messages.scrollTop =
        messages.scrollHeight;

    /* =====================================================
       USER DATA
    ===================================================== */

    let userData = {};

    try {

        userData =
            JSON.parse(
                localStorage.getItem("udyamUser")
            ) || {};

    } catch (error) {

        console.log(
            "User data error:",
            error
        );
    }

    const userName =
        userData.name ||
        "Udyami";

    /* =====================================================
       GET LOCAL BUSINESS ADVICE
    ===================================================== */

    try {

        const answer =
            getBusinessAdvice(
                question,
                selectedBusiness,
                budgetNumber
            );

        /* =================================================
           TYPING MESSAGE
        ================================================= */

        const typingMessage =
            document.getElementById(
                "typingMessage"
            );

        /* =================================================
           FINAL ANSWER
        ================================================= */

        const finalAnswer = `

            नमस्ते <b>
            ${escapeHTML(userName)}
            </b> जी 🙏

            <br><br>

            <b>बिज़नेस:</b>
            ${escapeHTML(selectedBusiness)}

            ${budgetNumber > 0
                ? `
                    <br>
                    <b>बजट:</b>
                    ₹${budgetNumber.toLocaleString("en-IN")}
                `
                : ""
            }

            <br><br>

                ${answer}
            <br><br>

            <small>

                💡 यह सलाह आपके बिज़नेस की
                सामान्य जानकारी के आधार पर दी गई है।
                स्थानीय बाजार और आपकी स्थिति के अनुसार
                निर्णय लें।

            </small>

        `;

        /* =================================================
           SHOW ANSWER
        ================================================= */

        if (typingMessage) {

            typingMessage.innerHTML =
                finalAnswer;

            typingMessage.removeAttribute(
                "id"
            );
        }

        messages.scrollTop =
            messages.scrollHeight;

        /* =================================================
           VOICE RESPONSE
        ================================================= */

        if (fromVoice) {

            speakText(
                stripHTML(finalAnswer)
            );
        }

    } catch (error) {

        console.error(
            "❌ Business Advice Error:",
            error
        );

        const typingMessage =
            document.getElementById(
                "typingMessage"
            );

        if (typingMessage) {

            typingMessage.innerHTML = `

                ❌ माफ कीजिए, अभी जवाब तैयार
                नहीं हो पाया।

                <br><br>

                कृपया दोबारा कोशिश करें।

            `;

            typingMessage.removeAttribute(
                "id"
            );
        }

        if (fromVoice) {

            speakText(
                "माफ कीजिए, अभी जवाब तैयार नहीं हो पाया।"
            );
        }
    }

    messages.scrollTop =
        messages.scrollHeight;
}
/* =========================================================
   DETECT BUSINESS FROM VOICE QUESTION
========================================================= */

function detectBusinessFromQuestion(question) {

    const q =
        question.toLowerCase();


    const businesses = [

        {
            words: ["किराना", "grocery", "general store"],
            name: "किराना दुकान"
        },

        {
            words: ["चाय", "नाश्ता", "tea", "snacks"],
            name: "चाय और नाश्ता"
        },

        {
            words: ["डेयरी", "दूध", "milk", "dairy"],
            name: "डेयरी बिज़नेस"
        },

        {
            words: ["सिलाई", "tailor", "कपड़े सिल"],
            name: "सिलाई सेंटर"
        },

        {
            words: ["मोबाइल", "mobile", "repair"],
            name: "मोबाइल रिपेयर"
        },

        {
            words: ["खेती", "कृषि", "agriculture", "farm"],
            name: "खेती से जुड़ा बिज़नेस"
        },

        {
            words: ["मुर्गी", "poultry", "chicken"],
            name: "मुर्गी पालन"
        },

        {
            words: ["बकरी", "goat"],
            name: "बकरी पालन"
        }
    ];


    for (const business of businesses) {

        for (const word of business.words) {

            if (q.includes(word)) {
                return business.name;
            }
        }
    }


    return "";
}


/* =========================================================
   EXTRACT BUDGET FROM VOICE
========================================================= */

function extractBudgetFromText(text) {

    if (!text) {
        return null;
    }


    const q =
        text
            .toLowerCase()
            .replace(/,/g, "");


    /* Lakh */

    const lakhMatch =
        q.match(
            /(\d+(?:\.\d+)?)\s*(lakh|लाख)/
        );


    if (lakhMatch) {

        return Math.round(
            parseFloat(lakhMatch[1]) * 100000
        );
    }


    /* Thousand */

    const thousandMatch =
        q.match(
            /(\d+(?:\.\d+)?)\s*(k|thousand|हजार)/
        );


    if (thousandMatch) {

        return Math.round(
            parseFloat(thousandMatch[1]) * 1000
        );
    }


    /* Direct rupee number */

    const numberMatch =
        q.match(
            /(?:₹|rs\.?|रुपये|रुपए)?\s*(\d{4,8})/
        );


    if (numberMatch) {

        return parseInt(
            numberMatch[1],
            10
        );
    }


    return null;
}


/* =========================================================
   BUDGET PLAN
========================================================= */

function createBudgetPlan(budget) {

    budget = Number(budget) || 0;


    if (budget <= 0) {
        return "";
    }


    const stock =
        Math.round(budget * 0.60);

    const setup =
        Math.round(budget * 0.20);

    const marketing =
        Math.round(budget * 0.10);

    const emergency =
        budget -
        stock -
        setup -
        marketing;


    return `

        <div class="budget-plan-box">

            <div class="budget-plan-row">

                <span>
                    📦 सामान / Stock
                </span>

                <b>
                    ₹${stock.toLocaleString("en-IN")}
                </b>

            </div>


            <div class="budget-plan-row">

                <span>
                    🏪 दुकान / Setup
                </span>

                <b>
                    ₹${setup.toLocaleString("en-IN")}
                </b>

            </div>


            <div class="budget-plan-row">

                <span>
                    📢 Marketing
                </span>

                <b>
                    ₹${marketing.toLocaleString("en-IN")}
                </b>

            </div>


            <div class="budget-plan-row">

                <span>
                    🛡️ Emergency Fund
                </span>

                <b>
                    ₹${emergency.toLocaleString("en-IN")}
                </b>

            </div>

        </div>
    `;
}


/* =========================================================
   BUSINESS ADVICE
========================================================= */


/* =========================================================
   VOICE ASSISTANT
========================================================= */

let recognition = null;

let isListening = false;

let isSpeaking = false;


const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


/* =========================================================
   GET ALL VOICE BUTTONS
========================================================= */

function getVoiceButtons() {

    return document.querySelectorAll(
        ".floating-mic, #voiceButton"
    );
}


/* =========================================================
   UPDATE VOICE BUTTON UI
========================================================= */
function updateVoiceButtons(state) {

    const buttons = getVoiceButtons();

    buttons.forEach(function (button) {

        button.classList.remove(
            "listening",
            "speaking"
        );

        if (state === "listening") {
            button.classList.add("listening");
        }

        else if (state === "speaking") {
            button.classList.add("speaking");
        }

    });
}

/* =========================================================
   VOICE STATUS
========================================================= */

function setVoiceStatus(text) {

    const status =
        document.getElementById("voiceStatus");

    if (status) {
        status.textContent = text;
    }
}


/* =========================================================
   START VOICE
========================================================= */

function startVoiceAssistant() {

    if (!SpeechRecognition) {

        alert(
            "Voice recognition इस browser में available नहीं है। Chrome browser में try करें।"
        );

        return;
    }


    /* If already listening */

    if (isListening) {

        stopVoiceRecognition();

        return;
    }


    /* If AI speaking */

    if (isSpeaking) {

        if ("speechSynthesis" in window) {
            speechSynthesis.cancel();
        }

        isSpeaking = false;

        updateVoiceButtons("idle");

        setVoiceStatus(
            "Mic दबाकर अपना अगला सवाल पूछें"
        );

        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.lang =
        "hi-IN";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.maxAlternatives =
        1;


    isListening =
        true;


    updateVoiceButtons("listening");


    setVoiceStatus(
        "🎤 सुन रहा हूँ... बोलिए"
    );


    try {

        recognition.start();

    } catch (error) {

        console.log(
            "Mic start error:",
            error
        );

        isListening = false;

        updateVoiceButtons("idle");

        setVoiceStatus(
            "Mic start नहीं हो पाया। फिर try करें।"
        );

        return;
    }


    /* =====================================================
       RESULT
    ===================================================== */

    recognition.onresult =
        function (event) {

            const transcript =
                event.results[0][0].transcript.trim();


            if (!transcript) {

                stopVoiceRecognition();

                return;
            }


            console.log(
                "User said:",
                transcript
            );


            isListening =
                false;


            updateVoiceButtons("idle");


            setVoiceStatus(
                "🧠 समझ रहा हूँ..."
            );


            /* Put voice text in input */

            const questionBox =
                document.getElementById(
                    "userQuestion"
                );


            if (questionBox) {

                questionBox.value =
                    transcript;
            }


            /* Open AI section */

            const aiChat =
                document.getElementById("aiChat") ||
                document.getElementById("aiChatBox");


            if (aiChat) {

                aiChat.classList.remove(
                    "hidden"
                );

                aiChat.style.display =
                    "block";


                setTimeout(function () {

                    aiChat.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 200);
            }


            /* Direct voice AI */

            setTimeout(function () {

                sendAIMessage(true);

            }, 600);
        };


    /* =====================================================
       ERROR
    ===================================================== */

    recognition.onerror =
        function (event) {

            console.log(
                "Voice recognition error:",
                event.error
            );


            isListening =
                false;


            updateVoiceButtons("idle");


            if (event.error === "not-allowed") {

                setVoiceStatus(
                    "⚠️ Mic permission allow करें"
                );

            }

            else if (
                event.error === "no-speech"
            ) {

                setVoiceStatus(
                    "कुछ सुनाई नहीं दिया, फिर बोलें"
                );

            }

            else if (
                event.error === "network"
            ) {

                setVoiceStatus(
                    "🌐 Internet connection check करें"
                );

            }

            else {

                setVoiceStatus(
                    "Mic में समस्या हुई, फिर try करें"
                );
            }
        };


    /* =====================================================
       END
    ===================================================== */

    recognition.onend =
        function () {

            isListening =
                false;


            if (!isSpeaking) {

                updateVoiceButtons("idle");

                setVoiceStatus(
                    "Mic दबाकर अपना अगला सवाल पूछें"
                );
            }
        };
}


/* =========================================================
   STOP VOICE
========================================================= */

function stopVoiceRecognition() {

    isListening =
        false;


    if (recognition) {

        try {

            recognition.stop();

        } catch (error) {

            console.log(error);
        }


        recognition =
            null;
    }


    if (!isSpeaking) {

        updateVoiceButtons("idle");

        setVoiceStatus(
            "Mic दबाकर अपना अगला सवाल पूछें"
        );
    }
}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    if (!text) {
        return;
    }


    /* Stop previous speech */

    speechSynthesis.cancel();


    /* Clean text */

    const cleanText =
        text
            .replace(/\n/g, " ")
            .replace(/\*/g, "")
            .replace(/₹/g, " रुपये ")
            .replace(/:/g, " ")
            .replace(/\s+/g, " ")
            .trim();


    if (!cleanText) {
        return;
    }


    const utterance =
        new SpeechSynthesisUtterance(
            cleanText
        );


    utterance.lang =
        "hi-IN";


    utterance.rate =
        0.9;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    isSpeaking =
        true;


    updateVoiceButtons(
        "speaking"
    );


    setVoiceStatus(
        "🔊 विकास जवाब बता रहा है..."
    );


    utterance.onstart =
        function () {

            isSpeaking =
                true;

            updateVoiceButtons(
                "speaking"
            );
        };


    utterance.onend =
        function () {

            isSpeaking =
                false;

            updateVoiceButtons(
                "idle"
            );

            setVoiceStatus(
                "Mic दबाकर अपना अगला सवाल पूछें"
            );
        };


    utterance.onerror =
        function (event) {

            console.log(
                "Speech error:",
                event
            );

            isSpeaking =
                false;

            updateVoiceButtons(
                "idle"
            );

            setVoiceStatus(
                "Mic दबाकर अपना अगला सवाल पूछें"
            );
        };


    speechSynthesis.speak(
        utterance
    );
}


/* =========================================================
   REMOVE HTML FOR VOICE
========================================================= */

function stripHTML(html) {

    const temp =
        document.createElement("div");


    temp.innerHTML =
        html;


    return (
        temp.textContent ||
        temp.innerText ||
        ""
    );
}


/* =========================================================
   SAFE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}

/* =========================================================
   LOAD USER ON DASHBOARD
========================================================= */

loadUserData();

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("show");
    }
}