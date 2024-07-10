import './Header.scss';
import HeaderInfoLinks from '../../shared/ui/HeaderInfoLinks/HeaderInfoLinks';
import { NavBar } from '../NavBar/NavBar';
import { Button } from '../../shared/ui/Button/Button';
import { CategoriesBar } from '../CategoriesBar/CategoriesBar';
import usePopupOpen from '../../shared/libs/helpers/usePopupOpen';
import { GeneralForm } from '../Forms';

export const Header = () => {
	const { isOpenPopup, handleOpenPopup, handleClosePopup } = usePopupOpen();
	return (
		<header className="header">
			<HeaderInfoLinks />
			<section className="header__main">
				<p className="header_logo">LendMe</p>
				<div className="header__main_box">
					<NavBar />
					<div className="header__login">
						<Button
							className="button__coral button__coral_transparent"
							onClick={() => handleOpenPopup()}
						>
							Вход и регистрация
						</Button>
						{/* <LinkIcons
							title="Вход и регистрация"
							className="linkIconLogin"
							iconId="login-profile"
							classIcon="svg-login"
						/> */}
						<Button className="button__coral">Разместить объявление</Button>
					</div>
				</div>
			</section>
			<CategoriesBar />
			<GeneralForm isOpenPopup={isOpenPopup} onClosePopup={handleClosePopup} />
		</header>
	);
};
