import React from 'react';
import styled from 'styled-components';
import { Card } from '../ui';
import { Episode } from '../../types';
import { useUserDataStore } from '../../store';

interface EpisodeCardProps {
  episode: Episode;
  onClick: (episode: Episode) => void;
  className?: string;
  autoFocus?: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onClick,
  className,
  autoFocus = false,
}) => {
  const { watchHistory } = useUserDataStore();
  
  const handleClick = () => {
    onClick(episode);
  };
  
  // Find watch progress for this episode
  const watchProgress = watchHistory.find(
    item => 
      item.type === 'series' && 
      item.streamId === episode.id && 
      item.seasonNumber === episode.season_number && 
      item.episodeNumber === episode.episode_num
  );
  
  const progress = watchProgress ? (watchProgress.position / watchProgress.duration) * 100 : 0;
  
  return (
    <StyledCard
      onClick={handleClick}
      className={className}
      autoFocus={autoFocus}
      poster={episode.info?.movie_image || undefined}
      title={`${episode.episode_num}. ${episode.title}`}
      subtitle={episode.info?.plot || undefined}
      progress={progress > 0 && progress < 95 ? progress : undefined}
      badge={watchProgress?.completed ? '✓ Watched' : undefined}
    >
      <EpisodeInfo>
        <EpisodeTitle>
          {episode.title}
        </EpisodeTitle>
        <EpisodeNumber>
          S{episode.season_number} E{episode.episode_num}
        </EpisodeNumber>
        {episode.info?.duration && (
          <EpisodeDuration>
            {episode.info?.duration ? Math.floor(parseInt(episode.info.duration) / 60) : 0} min
          </EpisodeDuration>
        )}
        {episode.info?.plot && (
          <EpisodePlot>
            {episode.info.plot}
          </EpisodePlot>
        )}
      </EpisodeInfo>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  height: 120px;
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: var(--color-background-card);
  border-radius: 8px;
  margin-bottom: 8px;
  
  img {
    width: 160px;
    height: 90px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 4px;
  }
`;

const EpisodeInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EpisodeTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EpisodeNumber = styled.div`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
`;

const EpisodeDuration = styled.div`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
`;

const EpisodePlot = styled.div`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default EpisodeCard;