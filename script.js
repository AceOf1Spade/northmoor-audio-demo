/* ==================================================
   NORTHMOOR AUDIO
   Website Design & Development by SPADE ♠
   AceOfEntertainment — © 2026
=================================================== */

"use strict";

const quoteForm = document.getElementById("quote-form");
const submitButton = document.getElementById("quote-submit");
const formStatus = document.getElementById("form-status");
const eventDate = document.getElementById("event-date");

/* Earliest event date, based on the visitor's local time. */

if (eventDate) {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  eventDate.min = `${year}-${month}-${day}`;
}

/* Send quote requests through Formspree. */

if (quoteForm && submitButton && formStatus) {
  let isSubmitting = false;

  quoteForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isSubmitting || !quoteForm.reportValidity()) {
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    quoteForm.setAttribute("aria-busy", "true");

    formStatus.textContent = "Sending your quote request...";
    formStatus.style.color = "";

    const formData = new FormData(quoteForm);

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        quoteForm.reset();

        formStatus.textContent =
          "Your quote request was submitted successfully! " +
          "Northmoor Audio will follow up about availability and pricing.";

        formStatus.style.color = "#b7efc5";
      } else {
        let message =
          "Your request could not be submitted. Please try again.";

        try {
          const result = await response.json();

          if (Array.isArray(result.errors)) {
            const errors = result.errors
              .map((error) => error.message)
              .filter((text) => typeof text === "string");

            if (errors.length > 0) {
              message = errors.join(" ");
            }
          }
        } catch {
          // Keep the default message if the response isn't JSON.
        }

        formStatus.textContent = message;
        formStatus.style.color = "#ffb4b4";
      }
    } catch {
      /*
        A connection failure can leave submission status uncertain.
        Keep the entered details so the visitor can retry.
      */

      formStatus.textContent =
        "We couldn't confirm your submission. Please check your " +
        "connection and try again, or email Julian@northmooraudio.com.";

      formStatus.style.color = "#ffb4b4";
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.textContent = "Send Quote Request";
      quoteForm.removeAttribute("aria-busy");
    }
  });
}