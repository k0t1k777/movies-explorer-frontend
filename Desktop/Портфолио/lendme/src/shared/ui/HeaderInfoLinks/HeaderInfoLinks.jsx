import './HeaderInfoLinks.scss';

export default function HeaderInfoLinks() {
	return (
		<ul className="header__info">
			<li className="header__info_link">
				<a>Как сдать в аренду?</a>
			</li>
			<li className="header__info_link">
				<a>Как взять в аренду?</a>
			</li>
			<li className="header__info_link">
				<a>О нас</a>
			</li>
		</ul>
	);
}
