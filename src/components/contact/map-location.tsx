export default function MapLocation() {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0512978536663!2d106.77872270172065!3d10.883703015734353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d98a1e71d64d%3A0xf218bf8e52205975!2zS8O9IHTDumMgeMOhIGtodSBCIMSQ4bqhaSBo4buNYyBxdeG7kWMgZ2lhIChuaMOgIEM2KQ!5e0!3m2!1svi!2s!4v1757336650648!5m2!1svi!2s"
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
