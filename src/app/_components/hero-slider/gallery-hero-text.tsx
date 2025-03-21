const GalleryHeroText = ({
  string1,
  string2,
  span,
  subString,
}: {
  string1: string;
  string2: string;
  span: string;
  subString: string;
}) => {
  return (
    <>
      <h3 className="whitespace-pre-line text-3xl font-semibold leading-none">
        {string1}
        <span className="font-bold text-primary">{span}</span>
        {string2}
      </h3>
      <p className="text-xl">{subString}</p>
    </>
  );
};

export default GalleryHeroText;
