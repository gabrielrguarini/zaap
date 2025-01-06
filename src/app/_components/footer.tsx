const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 bg-black p-4 text-center text-white">
      <p>Gabriel Guarini © {year}</p>
    </footer>
  );
};

export default Footer;
