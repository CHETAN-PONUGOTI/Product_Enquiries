const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Product Showcase & Enquiry | Built with React & Node.js</p>
      </div>
    </footer>
  );
};

export default Footer;