import { Icon } from '../../Icon/Icon';
import './LinkIcons.scss';

export const LinkIcons = (props) => {
	const { title, iconId, classIcon, className = 'linkIcon' } = props;
	return (
		<div className={className}>
			<Icon id={iconId} className={classIcon} />
			<span>{title}</span>
		</div>
	);
};
