const types = [
  {
    name: 'scholar',
    benefits: [
      'Acesso aos cursos para estudantes do ensino fundamental e médio',
      'Preparo para vestibular',
      '12 meses de acesso ilimitado',
    ],
    price: '300,00',
  },
  {
    name: 'professional',
    benefits: [
      'Acesso aos cursos para estudantes do ensino fundamental e médio',
      'Cursos voltados para mercado de trabalho',
      '12 meses de acesso ilimitado',
      'Certificado de conclusão',
    ],
    price: '850,00',
  },
];

const plans = (plan) => {
  if (types.filter(({ name }) => name === plan).length || !plan) {
    return types;
  }
};

export default plans;
