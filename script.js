/* ==================================================
   NORTHMOOR AUDIO
   Website Design & Development by SPADE ♠
   AceOfEntertainment — © 2026
=================================================== */

"use strict";

const quoteForm = document.getElementById("quote-form");
const eventDate = document.getElementById("event-date");

const recipientEmail = "Julian@northmooraudio.com";

/* Set the earliest event date using the visitor's local date. */

if (eventDate) {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  eventDate.min = `${year}-${month}-${day}`;
}

/* Format the event date without timezone shifts. */

function formatEventDate(value) {
  if (!value) {
    return "Not provided";
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

/* Build and open the Gmail quote draft. */

if (quoteForm) {
  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!quoteForm.reportValidity()) {
      return;
    }

    const formData = new FormData(quoteForm);

    function getField(fieldName) {
      const value = formData.get(fieldName);

      return typeof value === "string"
        ? value.trim()
        : "";
    }

    const name = getField("Name");
    const email = getField("Email");
    const phone = getField("Phone");
    const date = getField("Event Date");
    const venue = getField("Venue / Location");
    const audience = getField("Estimated Audience Size");
    const service = getField("Service Needed");
    const details = getField("Event Details");

    const subject = `Northmoor Audio Quote Request — ${name}`;

    const body = [
      "NORTHMOOR AUDIO QUOTE REQUEST",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      `Event Date: ${formatEventDate(date)}`,
      `Venue / Location: ${venue || "Not provided"}`,
      `Estimated Audience Size: ${audience || "Not provided"}`,
      `Service Needed: ${service}`,
      "",
      "Event Details:",
      details || "Not provided",
      "",
      "Please reply with availability and a quote.",
      "",
      `Thank you,`,
      name
    ].join("\n");

    const gmailUrl = new URL("https://mail.google.com/mail/");

    gmailUrl.searchParams.set("view", "cm");
    gmailUrl.searchParams.set("fs", "1");
    gmailUrl.searchParams.set("to", recipientEmail);
    gmailUrl.searchParams.set("su", subject);
    gmailUrl.searchParams.set("body", body);

    /*
      Open directly during the submit action.
      Fall back to the current tab if pop-ups are blocked.
    */

    const draftWindow = window.open("about:blank", "_blank");

    if (draftWindow) {
      draftWindow.opener = null;
      draftWindow.location.replace(gmailUrl.toString());
    } else {
      window.location.assign(gmailUrl.toString());
    }
  });
}