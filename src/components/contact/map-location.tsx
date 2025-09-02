export default function MapLocation() {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1522.404962278344!2d106.66447996608458!3d10.950965101645304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d6c4cb106ffb%3A0x3855be36dacef355!2zMTM2OSBMw6ogSOG7k25nIFBob25nLCBQaMO6IFRo4buNLCBUaOG7pyBE4bqndSBN4buZdCwgQsOsbmggRMawxqFuZyA4MjAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1756690747173!5m2!1svi!2s"
        width="600"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
