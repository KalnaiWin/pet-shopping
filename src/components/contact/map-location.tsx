export default function MapLocation() {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1094.7052670971625!2d106.66616946694889!3d10.94954129072959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175272fe8c69f4d%3A0xc6489fb0822b78a8!2sTiddy%20Pet%20Shop!5e0!3m2!1svi!2s!4v1756870396436!5m2!1svi!2s"
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
