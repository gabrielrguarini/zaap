import { Raleway } from "next/font/google";
import FeatureItem from "./feature-item";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const FeatureBar = () => {
  return (
    <div
      className={`${raleway.className} no-scrollbar flex w-full gap-8 overflow-scroll text-sm sm:p-8`}
    >
      <FeatureItem
        src="/features/truck.png"
        title="Atendemos toda região"
        subTitle="MG, ES e RJ"
        alt="Truck"
      />
      <FeatureItem
        src="/features/assessment.png"
        title="Equipe especializada"
        subTitle="100% Profissional"
        alt="Assessment"
      />
      <FeatureItem
        src="/features/premium.png"
        title="Desde 2010"
        subTitle="Mais de 2.000 eventos"
        alt="Premium"
      />
      <FeatureItem
        src="/features/card.png"
        title="Parcele no cartão"
        subTitle="cartão de crédito"
        alt="Card"
      />
    </div>
  );
};

export default FeatureBar;
