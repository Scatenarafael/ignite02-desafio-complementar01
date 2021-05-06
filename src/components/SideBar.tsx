import { useEffect } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { Button } from './Button';
import '../styles/sidebar.scss';

export function SideBar() {
  // Complete aqui

  const {
    selectedGenreId,
    genres,
    getGenreData,
    handleClickButton
  } = useMainContext();

  useEffect(() => {
    getGenreData();
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}