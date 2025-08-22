
export default function getStageColor (stage: string): 'default' | 'success' | 'info' {
    switch (stage.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'inprogress':
        return 'info';
      case 'notstarted':
        return 'default';
      default:
        return 'default';
    }
};
