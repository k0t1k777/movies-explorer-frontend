import "./Techs.css"

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <h3 className="techs__name">Технологии</h3>
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили
        в дипломном проекте.</p>
      <ul className="techs__list">
       <li className="techs__item techs__item_uppercase_up">html</li>
       <li className="techs__item techs__item_uppercase_up">css</li>
       <li className="techs__item techs__item_uppercase_up">js</li>
       <li className="techs__item">React</li>
       <li className="techs__item">Git</li>
       <li className="techs__item">Express.js</li>
       <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  )
}
