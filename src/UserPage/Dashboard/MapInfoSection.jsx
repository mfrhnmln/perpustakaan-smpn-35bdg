const MapInfoSection = () => {
  return (
    <div className="bg-[var(--background_component)] py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6">
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1333155412544!2d107.61399497499609!3d-6.874625993124141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6e36d488819%3A0x6d3b56647462bc52!2sSMP%20Negeri%2035%20Kota%20Bandung!5e0!3m2!1sid!2sid!4v1758858058887!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Library Location"
          ></iframe>
        </div>

        <div className="flex flex-col text-paragraph gap-2">
          <h2 className="text-subtitle font-bold">PERPUSTAKAAN - SMPN35BDG</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et nunc mi...
          </p>
          <p className="mb-1">No Telp. (021) 9172638</p>
          <p className="mb-4">Fax. (021) 9172638</p>

          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              className="bg-blue-600 p-2 rounded text-white"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="bg-gray-800 p-2 rounded text-white"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              className="bg-red-600 p-2 rounded text-white"
            >
              <i className="ri-youtube-fill"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="bg-purple-600 p-2 rounded text-white"
            >
              <i className="ri-instagram-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInfoSection;
