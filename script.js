/* ==================================================
   NORTHMOOR AUDIO
   Basic Quote Email
   Built by Spade ♠
   © 2026
=================================================== */

const quoteForm = document.getElementById("quote-form");

quoteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(quoteForm);

  const name = formData.get("Name") || "";
  const email = formData.get("Email") || "";
  const phone = formData.get("Phone") || "";
  const date = formData.get("Event Date") || "";
  const venue = formData.get("Venue / Location") || "";
  const audience = formData.get("Estimated Audience Size") || "";
  const service = formData.get("Service Needed") || "";
  const details = formData.get("Event Details") || "";

  const subject = `Northmoor Audio Quote Request - ${name}`;

  const body = `
NEW NORTHMOOR AUDIO QUOTE REQUEST

Name:
${name}

Email:
${email}

Phone:
${phone}

Event Date:
${date}

Venue / Location:
${venue}

Estimated Audience Size:
${audience}

Service Needed:
${service}

Event Details:
${details}

Please send this email to complete your quote request.
`;

  const mailtoLink =
    "mailto:Julian@northmooraudio.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  alert(
    "Your email app will open next. Please press Send to submit your quote request."
  );

  window.location.href = mailtoLink;
});