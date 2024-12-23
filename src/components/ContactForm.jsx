'use client'
import { useState } from 'react';
import DOMPurify from 'dompurify';
import Form from 'next/form'

const FIELDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  MESSAGE: 'message',
};

export default function ContactForm({ sendEmail }) {
  const [formSucceeded, setFormSucceeded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validate = (formData) => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        errors[key] = 'Please fill out this field';
      }
      if (key === FIELDS.EMAIL) {
        if (!formData[key].includes('@') || !formData[key].includes('.')) {
          errors[key] = 'Please include a valid email address';
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      return true;
    }
    setFormErrors(errors);
    return false;
  }

  const handleSubmit = () => {
    const formData = {
      firstName: DOMPurify.sanitize(firstName),
      lastName: DOMPurify.sanitize(lastName),
      email: DOMPurify.sanitize(email),
      message: DOMPurify.sanitize(message),
    };

    const isValid = validate(formData);

    if (!isValid) {
      return;
    }
    try {
      sendEmail(formData);
      setFormSubmitted(true);
      setFormSucceeded(true);
    } catch (error) {
      setFormSubmitted(true);
      setFormSucceeded(false);
    }
  }

  const inputClasses = 'rounded-md border-lightGray border-solid border py-2 pl-4 focus:rounded-md focus:ring-1 bg-cream';

  return (
    <div className='basis-2/3'>
      {formSubmitted && formSucceeded && (
        <div>
          Thanks for reaching out! We'll be in touch soon.
        </div>
      )}

      {formSubmitted && !formSucceeded && (
        <div>There was a problem sending your message. Please try again</div>
      )}

      {!formSubmitted && (
        <Form action={handleSubmit} className="flex flex-col px-8 py-8 border-8 border-black">
          <label htmlFor={FIELDS.FIRST_NAME} className="mt-8 font-heading pb-2">First name*</label>
          <input
            required
            type="text"
            value={firstName}
            name={FIELDS.FIRST_NAME}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClasses}
          />
          {formErrors.firstName && <div className='text-darkRed'>{formErrors.firstName}</div>}

          <label htmlFor={FIELDS.LAST_NAME} className="mt-8 font-heading pb-2">Last name*</label>
          <input
            required
            type="text"
            value={lastName}
            name={FIELDS.LAST_NAME}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClasses}
          />
          {formErrors.lastName && <div className='text-darkRed'>{formErrors.lastName}</div>}

          <label htmlFor={FIELDS.EMAIL} className="mt-4 font-heading pb-2">E-mail*</label>
          <input
            required
            type="email"
            value={email}
            name={FIELDS.EMAIL}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
          {formErrors.email && <div className='text-darkRed'>{formErrors.email}</div>}

          <label htmlFor={FIELDS.MESSAGE} className="mt-4 font-heading pb-2">Message*</label>
          <textarea
            required
            name={FIELDS.MESSAGE}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClasses}
          ></textarea>
          {formErrors.message && <div className='text-darkRed'>{formErrors.message}</div>}

          <div className="flex justify-start">
            <button type="submit" className="px-10 mt-8 py-2 bg-paleBlue text-gray-50 text-lg rounded-md">
              Send
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}
