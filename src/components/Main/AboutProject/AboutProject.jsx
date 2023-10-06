import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__tittle">О проекте</h2>
      <ul className="aboutProject__items">
        <li className="aboutProject__items-list">
          <h3 className="aboutProject__items-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__items-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboutProject__items-list">
          <h3 className="aboutProject__items-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__items-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="aboutProject__times">
        <li>
          <h3 className="aboutProject__times-title aboutProject__times-title_color_green">
            1 неделя
          </h3>
          <p className="aboutProject__times-subtitle">Back-end</p>
        </li>
        <li>
          <h3 className="aboutProject__times-title aboutProject__times-title_size_xl">
            4 недели
          </h3>
          <p className="aboutProject__times-subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  );
}
