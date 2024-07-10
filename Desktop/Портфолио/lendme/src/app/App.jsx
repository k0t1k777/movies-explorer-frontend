import './styles/App.scss';
import { Main } from '../pages/Main';
import { Header } from '../widgets/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';

function App() {
  
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
