import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const SendEmailTest = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
        var templateParams = {
          nombre_taller: 'taller test',
          link_catalogo_talleres: 'http://localhost:3000/catalogo-talleres',
          to_email: 'francogarza98@gmail.com'
      };
    emailjs.send('service_l68b4ed', 'template_jrfyyws', templateParams, '7VB8KWioxv21zM4iQ')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>from</label>
      <input type="text" name="from_name" />
      <label>to_email</label>
      <input type="email" name="to_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};


export default SendEmailTest