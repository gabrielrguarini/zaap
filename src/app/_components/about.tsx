const About = () => {
  return (
    <div className="flex flex-col gap-4 p-2 md:gap-8 md:p-8">
      <h2 className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-4xl font-semibold text-transparent">
        Conheça um pouco da nossa história!
      </h2>
      <div className="m-auto flex flex-col gap-6 text-2xl">
        <p>
          A equipe <span className="font-bold">Zaap Eventos</span> foi{" "}
          <span className="font-bold">fundada em 2010</span> com o objetivo de
          suprir as necessidades do mercado de locação de equipamentos para{" "}
          <span className="font-bold">todos os tipos de evento.</span> Desde
          então, investe constantemente em equipamentos de ponta e{" "}
          <span className="font-bold">alta tecnologia.</span>
        </p>
        <p>
          Somos uma <span className="font-bold">equipe altamente treinada</span>{" "}
          que garante a{" "}
          <span className="font-bold">excelência no atendimento</span> e a{" "}
          <span className="font-bold">qualidade total do seu evento.</span>{" "}
          Tendo como principal foco a{" "}
          <span className="font-bold">satisfação plena</span> de seus clientes.
        </p>
        <p>
          A <span className="font-bold">Zaap Eventos</span> é uma das{" "}
          <span className="font-bold">maiores empresas do ramo</span> na região
          e se destaca com o{" "}
          <span className="font-bold">
            profissionalismo, qualidade e exclusividade
          </span>{" "}
          de suas estruturas.
        </p>
      </div>
    </div>
  );
};

export default About;
