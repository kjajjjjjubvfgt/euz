/**
 * Format a date string to a human-readable format
 * @param dateString ISO date string
 * @param locale Locale for formatting (default: 'tr-TR')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: string = 'tr-TR'): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a timestamp to a time string (HH:MM)
 * @param timestamp Unix timestamp in seconds
 * @param locale Locale for formatting (default: 'tr-TR')
 * @returns Formatted time string
 */
export const formatTime = (timestamp: number, locale: string = 'tr-TR'): string => {
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

/**
 * Format duration in seconds to a human-readable format (HH:MM:SS or MM:SS)
 * @param seconds Duration in seconds
 * @param showHours Whether to always show hours (default: false)
 * @returns Formatted duration string
 */
export const formatDuration = (seconds: number, showHours: boolean = false): string => {
  try {
    if (!seconds || isNaN(seconds)) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0 || showHours) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting duration:', error);
    return '00:00';
  }
};

/**
 * Format duration in minutes to a human-readable format (Xh Ym)
 * @param minutes Duration in minutes
 * @param locale Locale for formatting (default: 'tr-TR')
 * @returns Formatted duration string
 */
export const formatRuntimeMinutes = (minutes: number, locale: string = 'tr-TR'): string => {
  try {
    if (!minutes || isNaN(minutes)) return '';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (locale === 'tr-TR') {
      if (hours > 0 && mins > 0) {
        return `${hours} saat ${mins} dakika`;
      } else if (hours > 0) {
        return `${hours} saat`;
      } else {
        return `${mins} dakika`;
      }
    } else {
      if (hours > 0 && mins > 0) {
        return `${hours}h ${mins}m`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        return `${mins}m`;
      }
    }
  } catch (error) {
    console.error('Error formatting runtime:', error);
    return '';
  }
};