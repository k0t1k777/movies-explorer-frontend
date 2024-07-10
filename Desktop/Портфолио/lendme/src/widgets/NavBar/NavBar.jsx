import './NavBar.scss';
import { LinkIcons } from '../../shared/ui/Links/LinksIcons/LinkIcons';
import { dataNavLinks } from '../../shared/consts/dataNavLinks';

export const NavBar = () => {
	return (
		<div className="navbar">
			{dataNavLinks.map((navLink) => (
				<LinkIcons
					key={navLink.id}
					className="linkIcon"
					classIcon="svg"
					{...navLink}
				/>
			))}
		</div>
	);
};
