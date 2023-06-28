import React from 'react';
import styles from './HomeAbout.module.css';
import Kids from '../../Assets/kids.jpg';
import Scholar from '../../Assets/scholar.jpg';
import Professional from '../../Assets/professional.jpg';
import HomeAboutDetails from './HomeAboutDetails';

const HomeAbout = () => {
  return (
    <section id="sobre" className={`${styles.about}`}>
      <h2 className="title">Conheça nossos planos</h2>
      <p className="subtitle">
        fique por dentro de tudo sobre os planos oferecidos
      </p>

      <main className={`${styles.container}`}>
        <HomeAboutDetails
          title="Plano SCHOLAR"
          description="Não está com boas notas na escola ou precisa estudar para aquele
          vestibular complicado? Assine já o plano scholar! Neste plano, o
          aluno terá acesso a todos os cursos voltados para os estudos desde
          o ensino fundamental, até o médio. Ele contará com atividades e
          simulados para se preparar para o mundo acadêmico. Assine já e se
          mantenha antenado sobre o que acontece no mundo da biologia!"
          img={Scholar}
          alt="Adolescente segurando cadernos entre os braços cruzados sobre a barriga"
        />

        <HomeAboutDetails
          title="Plano PROFESSIONAL"
          description="Seja para aqueles que já trabalham na área ou desejam se
          especializar, o plano professional garante seu caminho no mercado
          de trabalho! Contamos com cursos avançados em diversas subáreas da
          biologia, como por exemplo a Biologia Forense! Venha já fazer
          parte da nossa turma e se torne um biólogo certificado!"
          img={Professional}
          alt="Profissional usando microscópio"
          inverted={true}
        />

        <HomeAboutDetails
          title="Aulas para crianças"
          description="Temos conteúdos para a criançada matar a curiosidade! Você terá
              acesso a todas as aulas destinadas aos pequeninos, independente do
              plano escolhido! Assine o BioReino para seu filho e veja-o
              desenvolver conhecimentos na área da biologia de uma forma
              criativa, divertida e eficiente!"
          img={Kids}
          alt="Crianças se divertindo em sala de aula"
        />
      </main>
    </section>
  );
};

export default HomeAbout;
