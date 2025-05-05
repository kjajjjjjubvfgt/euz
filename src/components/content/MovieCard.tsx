import React from 'react';
import styled from 'styled-components';
import { Card } from '../ui';
import { Movie } from '../../types';
import { useUserDataStore } from '../../store';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  className?: string;
  autoFocus?: boolean;
  width?: string;
  height?: string;
  aspectRatio?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  className,
  autoFocus = false,
  width,
  height,
  aspectRatio = '2/3',
}) => {
  const { watchHistory } = useUserDataStore();
  
  const handleClick = () => {
    onClick(movie);
  };
  
  // Find watch progress for this movie
  const watchProgress = watchHistory.find(
    item => item.type === 'movie' && item.streamId === movie.stream_id
  );
  
  const progress = watchProgress ? (watchProgress.position / watchProgress.duration) * 100 : 0;
  
  return (
    <StyledCard
      onClick={handleClick}
      className={className}
      autoFocus={autoFocus}
      poster={movie.stream_icon || movie.cover || undefined}
      title={movie.name}
      subtitle={movie.year ? `${movie.year}` : undefined}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      progress={progress > 0 && progress < 95 ? progress : undefined}
      badge={watchProgress?.completed ? '✓ Watched' : undefined}
    />
  );
};

const StyledCard = styled(Card)`
  margin-bottom: 8px;
`;

export default MovieCard;